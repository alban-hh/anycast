import { validiObjektin, validiTipin, VALIDATION_TYPES } from './validimi.js'

export const SHEMBUJ_VALIDIMI = {
  
  PRODUKTI: {
    emri: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Emri i produktit', 
        required: true,
        gjatesiaMinimum: 3,
        gjatesiaMaksimum: 100
      }
    },
    pershkrimi: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Pershkrimi', 
        required: false,
        gjatesiaMaksimum: 500
      }
    },
    cmimi: {
      tipi: VALIDATION_TYPES.NUMRI,
      opcione: { 
        emri: 'Cmimi', 
        required: true,
        minimumi: 0,
        maksimumi: 999999.99
      }
    },
    kategoria: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Kategoria', 
        required: true,
        gjatesiaMinimum: 2,
        gjatesiaMaksimum: 50
      }
    },
    ne_stok: {
      tipi: VALIDATION_TYPES.BOOL,
      opcione: { emri: 'Ne stok', required: true }
    },
    sasia: {
      tipi: VALIDATION_TYPES.NUMRI,
      opcione: { 
        emri: 'Sasia', 
        required: true,
        minimumi: 0,
        vetemNumerTePlote: true
      }
    }
  },

  PERDORUESI_PROFILI: {
    emri: {
      tipi: VALIDATION_TYPES.EMRI,
      opcione: { emri: 'Emri', required: true }
    },
    mbiemri: {
      tipi: VALIDATION_TYPES.EMRI,
      opcione: { emri: 'Mbiemri', required: true }
    },
    username: {
      tipi: VALIDATION_TYPES.USERNAME,
      opcione: { emri: 'Username', required: true }
    },
    email: {
      tipi: VALIDATION_TYPES.EMAIL,
      opcione: { emri: 'Email-i', required: true }
    },
    telefoni: {
      tipi: VALIDATION_TYPES.TELEFONI,
      opcione: { emri: 'Telefoni', required: false }
    },
    mosha: {
      tipi: VALIDATION_TYPES.NUMRI,
      opcione: { 
        emri: 'Mosha', 
        required: false,
        minimumi: 13,
        maksimumi: 120,
        vetemNumerTePlote: true
      }
    },
    website: {
      tipi: VALIDATION_TYPES.URL,
      opcione: { emri: 'Website', required: false }
    }
  },

  EVENTI: {
    titulli: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Titulli', 
        required: true,
        gjatesiaMinimum: 5,
        gjatesiaMaksimum: 200
      }
    },
    data: {
      tipi: VALIDATION_TYPES.DATA,
      opcione: { emri: 'Data', required: true }
    },
    koha: {
      tipi: VALIDATION_TYPES.KOHA,
      opcione: { emri: 'Koha', required: true }
    },
    vendndodhja: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Vendndodhja', 
        required: true,
        gjatesiaMinimum: 3,
        gjatesiaMaksimum: 100
      }
    },
    cmimi_biletave: {
      tipi: VALIDATION_TYPES.NUMRI,
      opcione: { 
        emri: 'Cmimi i biletave', 
        required: false,
        minimumi: 0
      }
    },
    kategorite: {
      tipi: VALIDATION_TYPES.ARRAY,
      opcione: { 
        emri: 'Kategorite', 
        required: true,
        gjatesiaMinimum: 1,
        gjatesiaMaksimum: 5
      }
    }
  },

  KOMENTET: {
    teksti: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Teksti i komentit', 
        required: true,
        gjatesiaMinimum: 10,
        gjatesiaMaksimum: 1000
      }
    },
    vleresiimi: {
      tipi: VALIDATION_TYPES.NUMRI,
      opcione: { 
        emri: 'Vleresimi', 
        required: false,
        minimumi: 1,
        maksimumi: 5,
        vetemNumerTePlote: true
      }
    }
  },

  KONFIGURIMET: {
    gjuha: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Gjuha', 
        required: true,
        regex: /^(shqip|anglisht|frëngjisht|gjermanisht)$/
      }
    },
    tema: {
      tipi: VALIDATION_TYPES.TEKSTI,
      opcione: { 
        emri: 'Tema', 
        required: true,
        regex: /^(e_erret|e_celes|automatike)$/
      }
    },
    njoftimet_email: {
      tipi: VALIDATION_TYPES.BOOL,
      opcione: { emri: 'Njoftimet ne email', required: true }
    },
    njoftimet_push: {
      tipi: VALIDATION_TYPES.BOOL,
      opcione: { emri: 'Njoftimet push', required: true }
    }
  }
}

export function validiProduktin(produkti) {
  return validiObjektin(produkti, SHEMBUJ_VALIDIMI.PRODUKTI)
}

export function validiPerdoruesin(perdoruesi) {
  return validiObjektin(perdoruesi, SHEMBUJ_VALIDIMI.PERDORUESI_PROFILI)
}

export function validiEventin(eventi) {
  return validiObjektin(eventi, SHEMBUJ_VALIDIMI.EVENTI)
}

export function validiKomentin(komenti) {
  return validiObjektin(komenti, SHEMBUJ_VALIDIMI.KOMENTET)
}

export function validiKonfigurimet(konfigurimet) {
  return validiObjektin(konfigurimet, SHEMBUJ_VALIDIMI.KONFIGURIMET)
}

export const SHEMBUJ_KODI = {
  VALIDIMI_I_THJESHTE: `
// Validim i nje fushe te vetme
import { validiTipin, VALIDATION_TYPES } from './validimi.js'

const emailRezultati = validiTipin('test@example.com', VALIDATION_TYPES.EMAIL, {
  emri: 'Email-i',
  required: true
})

if (!emailRezultati.valid) {
  console.log('Gabimet:', emailRezultati.gabimet)
}
  `,

  VALIDIMI_OBJEKTI: `
// Validim i nje objekti te plote
import { validiObjektin, VALIDATION_TYPES } from './validimi.js'

const skema = {
  emri: {
    tipi: VALIDATION_TYPES.TEKSTI,
    opcione: { emri: 'Emri', required: true, gjatesiaMinimum: 2 }
  },
  mosha: {
    tipi: VALIDATION_TYPES.NUMRI,
    opcione: { emri: 'Mosha', required: true, minimumi: 18 }
  }
}

const rezultati = validiObjektin({ emri: 'Alban', mosha: 25 }, skema)
  `,

  VALIDIMI_NE_ROUTE: `
// Perdorimi ne route
import { validiObjektin } from '../utils/validimi.js'
import { pergjigjjeValidimi } from '../utils/gabimet.js'

app.post('/api/produkti', async (c) => {
  const teDhenat = await c.req.json()
  
  const validimi = validiObjektin(teDhenat, SHEMBUJ_VALIDIMI.PRODUKTI)
  if (!validimi.valid) {
    return pergjigjjeValidimi(c, validimi.gabimet)
  }
  
  // Vazhdo me logjiken...
})
  `
}
