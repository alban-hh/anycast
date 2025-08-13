export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_TOKEN_MISSING: 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
  AUTH_USER_EXISTS: 'AUTH_USER_EXISTS',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  DATABASE_ERROR: 'DATABASE_ERROR',
  DATABASE_CONNECTION_FAILED: 'DATABASE_CONNECTION_FAILED',
  DATABASE_QUERY_FAILED: 'DATABASE_QUERY_FAILED',
  DATABASE_RECORD_NOT_FOUND: 'DATABASE_RECORD_NOT_FOUND',
  DATABASE_DUPLICATE_ENTRY: 'DATABASE_DUPLICATE_ENTRY',
  SERVER_ERROR: 'SERVER_ERROR',
  SERVER_TIMEOUT: 'SERVER_TIMEOUT',
  SERVER_UNAVAILABLE: 'SERVER_UNAVAILABLE',
  REQUEST_INVALID: 'REQUEST_INVALID',
  REQUEST_MISSING_PARAMS: 'REQUEST_MISSING_PARAMS',
  REQUEST_INVALID_FORMAT: 'REQUEST_INVALID_FORMAT',
  REQUEST_TOO_LARGE: 'REQUEST_TOO_LARGE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_FORBIDDEN: 'RESOURCE_FORBIDDEN',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_INVALID_TYPE: 'FILE_INVALID_TYPE',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  EXTERNAL_API_TIMEOUT: 'EXTERNAL_API_TIMEOUT',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_INVALID: 'PAYMENT_INVALID',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  SMS_SEND_FAILED: 'SMS_SEND_FAILED'
}

export const ERROR_MESSAGES = {
  [ERROR_CODES.VALIDATION_ERROR]: {
    mesazhi: 'Te dhenat e derguar nuk jane valide',
    pershkrimi: 'Ju lutem kontrolloni fushat dhe provoni perseri',
    statusi: 400
  },
  [ERROR_CODES.AUTH_TOKEN_MISSING]: {
    mesazhi: 'Token i autentifikimit mungon',
    pershkrimi: 'Ju lutem hyni ne sistem per te vazhduar',
    statusi: 401
  },
  [ERROR_CODES.AUTH_TOKEN_INVALID]: {
    mesazhi: 'Token i autentifikimit eshte i pavlefshme',
    pershkrimi: 'Ju lutem hyni perseri ne sistem',
    statusi: 401
  },
  [ERROR_CODES.AUTH_LOGIN_FAILED]: {
    mesazhi: 'Email ose fjalekalim i gabuar',
    pershkrimi: 'Ju lutem kontrolloni te dhenat tuaja',
    statusi: 401
  },
  [ERROR_CODES.AUTH_USER_EXISTS]: {
    mesazhi: 'Perdoruesi me kete email ekziston',
    pershkrimi: 'Ju lutem perdorni nje email tjeter ose hyni ne sistem',
    statusi: 409
  },
  [ERROR_CODES.AUTH_USER_NOT_FOUND]: {
    mesazhi: 'Perdoruesi nuk u gjet',
    pershkrimi: 'Nuk ekziston perdorues me keto te dhena',
    statusi: 404
  },
  [ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS]: {
    mesazhi: 'Nuk keni leje per kete veprim',
    pershkrimi: 'Llogaria juaj nuk ka akses ne kete resurse',
    statusi: 403
  },
  [ERROR_CODES.DATABASE_ERROR]: {
    mesazhi: 'Gabim ne databaze',
    pershkrimi: 'Ka ndodhur nje gabim ne ruajtjen e te dhenave',
    statusi: 500
  },
  [ERROR_CODES.DATABASE_CONNECTION_FAILED]: {
    mesazhi: 'Lidhja me databazen deshtoi',
    pershkrimi: 'Nuk mund te lidhemi me databazen',
    statusi: 500
  },
  [ERROR_CODES.DATABASE_QUERY_FAILED]: {
    mesazhi: 'Pyetja ne databaze deshtoi',
    pershkrimi: 'Ka ndodhur nje gabim gjate kerkimit te te dhenave',
    statusi: 500
  },
  [ERROR_CODES.DATABASE_RECORD_NOT_FOUND]: {
    mesazhi: 'Te dhenat nuk u gjeten',
    pershkrimi: 'Nuk ekziston asnje rekord me keto kritere',
    statusi: 404
  },
  [ERROR_CODES.DATABASE_DUPLICATE_ENTRY]: {
    mesazhi: 'Te dhenat ekzistojne',
    pershkrimi: 'Ky rekord ekziston ne sistem',
    statusi: 409
  },
  [ERROR_CODES.SERVER_ERROR]: {
    mesazhi: 'Gabim i brendshem i serverit',
    pershkrimi: 'Ka ndodhur nje gabim i papritur ne server',
    statusi: 500
  },
  [ERROR_CODES.SERVER_TIMEOUT]: {
    mesazhi: 'Koha e kerkeses skadoi',
    pershkrimi: 'Serveri nuk iu pergjigj ne kohe',
    statusi: 504
  },
  [ERROR_CODES.SERVER_UNAVAILABLE]: {
    mesazhi: 'Serveri nuk eshte i disponueshem',
    pershkrimi: 'Serveri eshte ne mirembajtje',
    statusi: 503
  },
  [ERROR_CODES.REQUEST_INVALID]: {
    mesazhi: 'Kerkesa eshte e pavlefshme',
    pershkrimi: 'Te dhenat e derguar nuk jane ne formatin e duhur',
    statusi: 400
  },
  [ERROR_CODES.REQUEST_MISSING_PARAMS]: {
    mesazhi: 'Parametra te nevojshem mungojne',
    pershkrimi: 'Ju lutem plotesoni te gjitha fushat e nevojshme',
    statusi: 400
  },
  [ERROR_CODES.REQUEST_INVALID_FORMAT]: {
    mesazhi: 'Formati i kerkeses eshte i gabuar',
    pershkrimi: 'Te dhenat duhet te jene ne format JSON',
    statusi: 400
  },
  [ERROR_CODES.REQUEST_TOO_LARGE]: {
    mesazhi: 'Kerkesa eshte shume e madhe',
    pershkrimi: 'Te dhenat e derguar tejkalojne kufirin e lejuar',
    statusi: 413
  },
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: {
    mesazhi: 'Shume kerkesa ne kohe te shkurter',
    pershkrimi: 'Ju lutem prisni pak para se te provoni perseri',
    statusi: 429
  },
  [ERROR_CODES.RESOURCE_NOT_FOUND]: {
    mesazhi: 'Resursi nuk u gjet',
    pershkrimi: 'Faqja ose resursi qe kerkoni nuk ekziston',
    statusi: 404
  },
  [ERROR_CODES.RESOURCE_FORBIDDEN]: {
    mesazhi: 'Akses i ndaluar',
    pershkrimi: 'Nuk keni leje per te aksesuar kete resurse',
    statusi: 403
  },
  [ERROR_CODES.FILE_UPLOAD_ERROR]: {
    mesazhi: 'Gabim ne ngarkimin e skedarit',
    pershkrimi: 'Nuk mund te ngarkohet skedari',
    statusi: 400
  },
  [ERROR_CODES.FILE_TOO_LARGE]: {
    mesazhi: 'Skedari eshte shume i madhe',
    pershkrimi: 'Madhesia e skedarit tejkalon kufirin e lejuar',
    statusi: 413
  },
  [ERROR_CODES.FILE_INVALID_TYPE]: {
    mesazhi: 'Tipi i skedarit nuk eshte i lejuar',
    pershkrimi: 'Ju lutem zgjidhni nje skedar ne format te pranueshem',
    statusi: 400
  },
  [ERROR_CODES.EXTERNAL_API_ERROR]: {
    mesazhi: 'Gabim ne API te jashtme',
    pershkrimi: 'Nuk mund te komunikohet me sherbimin e jashtme',
    statusi: 502
  },
  [ERROR_CODES.EXTERNAL_API_TIMEOUT]: {
    mesazhi: 'API e jashtme nuk pergjigjet',
    pershkrimi: 'Sherbimi i jashtme po merr shume kohe per tu pergjigje',
    statusi: 504
  },
  [ERROR_CODES.PAYMENT_FAILED]: {
    mesazhi: 'Pagesa deshtoi',
    pershkrimi: 'Nuk mund te perfundohet pagesa',
    statusi: 402
  },
  [ERROR_CODES.PAYMENT_INVALID]: {
    mesazhi: 'Te dhenat e pageses jane te gabuara',
    pershkrimi: 'Ju lutem kontrolloni te dhenat e kartës',
    statusi: 400
  },
  [ERROR_CODES.EMAIL_SEND_FAILED]: {
    mesazhi: 'Dergimi i email-it deshtoi',
    pershkrimi: 'Nuk mund te dergojme email ne adresen tuaj',
    statusi: 500
  },
  [ERROR_CODES.SMS_SEND_FAILED]: {
    mesazhi: 'Dergimi i SMS-it deshtoi',
    pershkrimi: 'Nuk mund te dergojme SMS ne numrin tuaj',
    statusi: 500
  }
}

export function krijoGabim(kodi, detaje = null, gabimetValidimi = null) {
  const gabimi = ERROR_MESSAGES[kodi]
  
  if (!gabimi) {
    return {
      kodi: ERROR_CODES.SERVER_ERROR,
      mesazhi: 'Gabim i panjohur',
      pershkrimi: 'Ka ndodhur nje gabim i papritur',
      statusi: 500,
      koha: new Date().toISOString()
    }
  }

  const rezultati = {
    kodi,
    mesazhi: gabimi.mesazhi,
    pershkrimi: gabimi.pershkrimi,
    statusi: gabimi.statusi,
    koha: new Date().toISOString()
  }

  if (detaje) {
    rezultati.detaje = detaje
  }

  if (gabimetValidimi && gabimetValidimi.length > 0) {
    rezultati.gabimet_validimi = gabimetValidimi
  }

  return rezultati
}

export function pergjigjjeGabimi(c, kodi, detaje = null, gabimetValidimi = null) {
  const gabimi = krijoGabim(kodi, detaje, gabimetValidimi)
  return c.json(gabimi, gabimi.statusi)
}

export function pergjigjjeValidimi(c, gabimet) {
  return pergjigjjeGabimi(
    c, 
    ERROR_CODES.VALIDATION_ERROR, 
    'Ju lutem korrigoni gabimet e meposhme dhe provoni perseri',
    gabimet
  )
}

export function pergjigljeSuksesi(c, te_dhenat = {}, mesazhi = 'Operacioni u krye me sukses') {
  return c.json({
    sukses: true,
    mesazhi,
    te_dhenat,
    koha: new Date().toISOString()
  })
}

export function krijoPergjigjeAuth(tokeni, perdoruesi, mesazhi = 'Autentifikimi u krye me sukses') {
  return {
    sukses: true,
    mesazhi,
    tokeni,
    perdoruesi: {
      id: perdoruesi.id,
      email: perdoruesi.email
    },
    koha: new Date().toISOString()
  }
}
