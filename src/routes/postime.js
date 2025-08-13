import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.js'
import { validiObjektin, VALIDATION_TYPES } from '../utils/validimi.js'
import { 
  ERROR_CODES, 
  pergjigjjeGabimi, 
  pergjigjjeValidimi, 
  pergjigljeSuksesi 
} from '../utils/gabimet.js'

const postime = new Hono()

postime.use('*', authMiddleware)

const SKEMA_POSTIMI = {
  pershkrimi: {
    tipi: VALIDATION_TYPES.TEKSTI,
    opcione: { 
      emri: 'Pershkrimi', 
      required: true,
      gjatesiaMinimum: 10,
      gjatesiaMaksimum: 1000
    }
  }
}

const SKEMA_PERDITESIMI = {
  pershkrimi: {
    tipi: VALIDATION_TYPES.TEKSTI,
    opcione: { 
      emri: 'Pershkrimi', 
      required: true,
      gjatesiaMinimum: 10,
      gjatesiaMaksimum: 1000
    }
  }
}

postime.post('/', async (c) => {
  try {
    const teDhenat = await c.req.json()
    const perdoruesi = c.get('perdoruesi')
    
    const validimi = validiObjektin(teDhenat, SKEMA_POSTIMI)
    if (!validimi.valid) {
      return pergjigjjeValidimi(c, validimi.gabimet)
    }

    const { pershkrimi } = teDhenat
    const db = c.env.DB
    
    const rezultati = await db.prepare(
      'INSERT INTO postime (pershkrimi, perdorues_id) VALUES (?, ?)'
    ).bind(pershkrimi, perdoruesi.perdoruesId).run()

    if (!rezultati.success) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_ERROR, 'Gabim ne ruajtjen e postimit')
    }

    const postimiRi = await db.prepare(
      'SELECT id, pershkrimi, perdorues_id, krijuar_ne FROM postime WHERE id = ?'
    ).bind(rezultati.meta.last_row_id).first()

    return pergjigljeSuksesi(c, {
      postimi: {
        id: postimiRi.id,
        pershkrimi: postimiRi.pershkrimi,
        perdorues_id: postimiRi.perdorues_id,
        krijuar_ne: postimiRi.krijuar_ne
      }
    }, 'Postimi u krijua me sukses')

  } catch (error) {
    console.error('Gabim ne krijimin e postimit:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate krijimit te postimit')
  }
})

postime.get('/', async (c) => {
  try {
    const db = c.env.DB
    const faqja = parseInt(c.req.query('faqja') || '1')
    const madhesia = Math.min(parseInt(c.req.query('madhesia') || '20'), 50)
    const offset = (faqja - 1) * madhesia

    const postimet = await db.prepare(`
      SELECT 
        p.id, 
        p.pershkrimi, 
        p.perdorues_id,
        p.krijuar_ne,
        u.email as perdoruesi_email
      FROM postime p 
      JOIN perdorues u ON p.perdorues_id = u.id 
      ORDER BY p.krijuar_ne DESC 
      LIMIT ? OFFSET ?
    `).bind(madhesia, offset).all()

    const totalPostimet = await db.prepare(
      'SELECT COUNT(*) as total FROM postime'
    ).first()

    return pergjigljeSuksesi(c, {
      postimet: postimet.results,
      metadata: {
        faqja: faqja,
        madhesia: madhesia,
        total: totalPostimet.total,
        total_faqe: Math.ceil(totalPostimet.total / madhesia)
      }
    }, 'Postimet u ngarkuan me sukses')

  } catch (error) {
    console.error('Gabim ne ngarkimin e postimeve:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate ngarkimit te postimeve')
  }
})

postime.get('/te-miat', async (c) => {
  try {
    const perdoruesi = c.get('perdoruesi')
    const db = c.env.DB
    const faqja = parseInt(c.req.query('faqja') || '1')
    const madhesia = Math.min(parseInt(c.req.query('madhesia') || '20'), 50)
    const offset = (faqja - 1) * madhesia

    const postimet = await db.prepare(`
      SELECT 
        id, 
        pershkrimi, 
        perdorues_id,
        krijuar_ne,
        perditesuar_ne
      FROM postime 
      WHERE perdorues_id = ? 
      ORDER BY krijuar_ne DESC 
      LIMIT ? OFFSET ?
    `).bind(perdoruesi.perdoruesId, madhesia, offset).all()

    const totalPostimet = await db.prepare(
      'SELECT COUNT(*) as total FROM postime WHERE perdorues_id = ?'
    ).bind(perdoruesi.perdoruesId).first()

    return pergjigljeSuksesi(c, {
      postimet: postimet.results,
      metadata: {
        faqja: faqja,
        madhesia: madhesia,
        total: totalPostimet.total,
        total_faqe: Math.ceil(totalPostimet.total / madhesia)
      }
    }, 'Postimet tuaja u ngarkuan me sukses')

  } catch (error) {
    console.error('Gabim ne ngarkimin e postimeve te perdoruesit:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate ngarkimit te postimeve tuaja')
  }
})

postime.get('/:id', async (c) => {
  try {
    const postimiId = c.req.param('id')
    const db = c.env.DB

    const postimi = await db.prepare(`
      SELECT 
        p.id, 
        p.pershkrimi, 
        p.perdorues_id,
        p.krijuar_ne,
        p.perditesuar_ne,
        u.email as perdoruesi_email
      FROM postime p 
      JOIN perdorues u ON p.perdorues_id = u.id 
      WHERE p.id = ?
    `).bind(postimiId).first()

    if (!postimi) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_RECORD_NOT_FOUND, 'Postimi nuk u gjet')
    }

    return pergjigljeSuksesi(c, {
      postimi: postimi
    }, 'Postimi u ngarktua me sukses')

  } catch (error) {
    console.error('Gabim ne ngarkimin e postimit:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate ngarkimit te postimit')
  }
})

postime.put('/:id', async (c) => {
  try {
    const postimiId = c.req.param('id')
    const teDhenat = await c.req.json()
    const perdoruesi = c.get('perdoruesi')
    
    const validimi = validiObjektin(teDhenat, SKEMA_PERDITESIMI)
    if (!validimi.valid) {
      return pergjigjjeValidimi(c, validimi.gabimet)
    }

    const db = c.env.DB
    
    const postimi = await db.prepare(
      'SELECT id, perdorues_id FROM postime WHERE id = ?'
    ).bind(postimiId).first()

    if (!postimi) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_RECORD_NOT_FOUND, 'Postimi nuk u gjet')
    }

    if (postimi.perdorues_id !== perdoruesi.perdoruesId) {
      return pergjigjjeGabimi(c, ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS, 'Mund te perditesoni vetem postimet tuaja')
    }

    const { pershkrimi } = teDhenat
    
    const rezultati = await db.prepare(
      'UPDATE postime SET pershkrimi = ?, perditesuar_ne = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(pershkrimi, postimiId).run()

    if (!rezultati.success) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_ERROR, 'Gabim ne perditesimin e postimit')
    }

    const postimiPerditesuar = await db.prepare(
      'SELECT id, pershkrimi, perdorues_id, krijuar_ne, perditesuar_ne FROM postime WHERE id = ?'
    ).bind(postimiId).first()

    return pergjigljeSuksesi(c, {
      postimi: postimiPerditesuar
    }, 'Postimi u perditesua me sukses')

  } catch (error) {
    console.error('Gabim ne perditesimin e postimit:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate perditesimit te postimit')
  }
})

postime.delete('/:id', async (c) => {
  try {
    const postimiId = c.req.param('id')
    const perdoruesi = c.get('perdoruesi')
    const db = c.env.DB
    
    const postimi = await db.prepare(
      'SELECT id, perdorues_id FROM postime WHERE id = ?'
    ).bind(postimiId).first()

    if (!postimi) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_RECORD_NOT_FOUND, 'Postimi nuk u gjet')
    }

    if (postimi.perdorues_id !== perdoruesi.perdoruesId) {
      return pergjigjjeGabimi(c, ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS, 'Mund te fshini vetem postimet tuaja')
    }

    const rezultati = await db.prepare(
      'DELETE FROM postime WHERE id = ?'
    ).bind(postimiId).run()

    if (!rezultati.success) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_ERROR, 'Gabim ne fshirjen e postimit')
    }

    return pergjigljeSuksesi(c, {
      postimi_id: postimiId
    }, 'Postimi u fshi me sukses')

  } catch (error) {
    console.error('Gabim ne fshirjen e postimit:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate fshirjes se postimit')
  }
})

export default postime
