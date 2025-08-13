import { Hono } from 'hono'
import { krijoToken, hashFjalekalimi, krahasoFjalekalimi } from '../utils/autentifikimi.js'
import { validiObjektin, VALIDATION_TYPES } from '../utils/validimi.js'
import { 
  ERROR_CODES, 
  pergjigjjeGabimi, 
  pergjigjjeValidimi, 
  krijoPergjigjeAuth 
} from '../utils/gabimet.js'

const auth = new Hono()

const SKEMA_REGJISTRIM = {
  email: {
    tipi: VALIDATION_TYPES.EMAIL,
    opcione: { emri: 'Email-i', required: true }
  },
  fjalekalimi: {
    tipi: VALIDATION_TYPES.FJALEKALIMI,
    opcione: { 
      emri: 'Fjalekalimi', 
      required: true,
      gjatesiaMinimum: 8,
      kerkoNumra: true,
      kerkoShkronja: true,
      kerkoSimbole: false
    }
  }
}

const SKEMA_LOGIN = {
  email: {
    tipi: VALIDATION_TYPES.EMAIL,
    opcione: { emri: 'Email-i', required: true }
  },
  fjalekalimi: {
    tipi: VALIDATION_TYPES.TEKSTI,
    opcione: { 
      emri: 'Fjalekalimi', 
      required: true,
      gjatesiaMinimum: 1
    }
  }
}

auth.post('/regjistrohu', async (c) => {
  try {
    const teDhenat = await c.req.json()
    
    const validimi = validiObjektin(teDhenat, SKEMA_REGJISTRIM)
    if (!validimi.valid) {
      return pergjigjjeValidimi(c, validimi.gabimet)
    }

    const { email, fjalekalimi } = teDhenat
    const db = c.env.DB
    
    const perdoruesEkziston = await db.prepare(
      'SELECT email FROM perdorues WHERE email = ?'
    ).bind(email).first()

    if (perdoruesEkziston) {
      return pergjigjjeGabimi(c, ERROR_CODES.AUTH_USER_EXISTS)
    }

    const fjalekalimihash = await hashFjalekalimi(fjalekalimi)
    
    const rezultati = await db.prepare(
      'INSERT INTO perdorues (email, fjalekalimi_hash) VALUES (?, ?)'
    ).bind(email, fjalekalimihash).run()

    if (!rezultati.success) {
      return pergjigjjeGabimi(c, ERROR_CODES.DATABASE_ERROR, 'Gabim ne ruajtjen e perdoruesit')
    }

    const perdoruesi = { id: rezultati.meta.last_row_id, email: email }
    const tokeni = await krijoToken(perdoruesi, c.env.JWT_SECRET)
    const pergjigja = krijoPergjigjeAuth(tokeni, perdoruesi, 'Llogaria u krijua me sukses')

    return c.json(pergjigja, 201)

  } catch (error) {
    console.error('Gabim ne regjistrim:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate regjistrimit')
  }
})

auth.post('/hyr', async (c) => {
  try {
    const teDhenat = await c.req.json()
    
    const validimi = validiObjektin(teDhenat, SKEMA_LOGIN)
    if (!validimi.valid) {
      return pergjigjjeValidimi(c, validimi.gabimet)
    }

    const { email, fjalekalimi } = teDhenat
    const db = c.env.DB
    
    const perdoruesi = await db.prepare(
      'SELECT id, email, fjalekalimi_hash FROM perdorues WHERE email = ?'
    ).bind(email).first()

    if (!perdoruesi) {
      return pergjigjjeGabimi(c, ERROR_CODES.AUTH_LOGIN_FAILED)
    }

    const fjalekalimivalid = await krahasoFjalekalimi(fjalekalimi, perdoruesi.fjalekalimi_hash)
    
    if (!fjalekalimivalid) {
      return pergjigjjeGabimi(c, ERROR_CODES.AUTH_LOGIN_FAILED)
    }

    const perdoruesiteDhenat = { id: perdoruesi.id, email: perdoruesi.email }
    const tokeni = await krijoToken(perdoruesiteDhenat, c.env.JWT_SECRET)
    const pergjigja = krijoPergjigjeAuth(tokeni, perdoruesiteDhenat, 'Keni hyre me sukses')

    return c.json(pergjigja)

  } catch (error) {
    console.error('Gabim ne login:', error)
    return pergjigjjeGabimi(c, ERROR_CODES.SERVER_ERROR, 'Gabim gjate hyrjes')
  }
})

export default auth
