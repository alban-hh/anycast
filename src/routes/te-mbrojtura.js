import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.js'
import { pergjigljeSuksesi } from '../utils/gabimet.js'

const teMbrojtura = new Hono()

teMbrojtura.use('*', authMiddleware)

teMbrojtura.get('/profili', (c) => {
  const perdoruesi = c.get('perdoruesi')
  
  return pergjigljeSuksesi(c, {
    perdoruesi: {
      id: perdoruesi.perdoruesId,
      email: perdoruesi.email
    }
  }, 'Profili u ngarua me sukses')
})

teMbrojtura.get('/dashboard', (c) => {
  const perdoruesi = c.get('perdoruesi')
  
  return pergjigljeSuksesi(c, {
    perdoruesi: {
      id: perdoruesi.perdoruesId,
      email: perdoruesi.email
    },
    statistika: {
      total_kerkesa: 42,
      kerkesa_sot: 7,
      perdorues_online: 156
    }
  }, 'Miresevini ne dashboard!')
})

teMbrojtura.get('/settings', (c) => {
  const perdoruesi = c.get('perdoruesi')
  
  return pergjigljeSuksesi(c, {
    perdoruesi: {
      id: perdoruesi.perdoruesId,
      email: perdoruesi.email
    },
    konfigurimet: {
      gjuha: 'shqip',
      tema: 'e_erret',
      njoftimet: true
    }
  }, 'Konfigurimet u ngarkuan me sukses')
})

export default teMbrojtura
