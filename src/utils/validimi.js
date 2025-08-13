const REGEX_PATTERNS = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  fjalekalimi: {
    gjatesiaMinimum: /^.{8,}$/,
    nrShkronja: /[a-zA-Z]/,
    nrNumra: /[0-9]/,
    nrSimbole: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    asnjeTabs: /^[^\s]*$/
  },
  telefoni: /^\+?[1-9]\d{1,14}$/,
  emri: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  ipAdresa: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  kodiPostor: /^\d{4,10}$/,
  ngjyra: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  data: /^\d{4}-\d{2}-\d{2}$/,
  koha: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
}

const VALIDATION_TYPES = {
  EMAIL: 'email',
  FJALEKALIMI: 'fjalekalimi',
  TELEFONI: 'telefoni',
  EMRI: 'emri',
  USERNAME: 'username',
  URL: 'url',
  IP_ADRESA: 'ipAdresa',
  KODI_POSTOR: 'kodiPostor',
  NGJYRA: 'ngjyra',
  DATA: 'data',
  KOHA: 'koha',
  TEKSTI: 'teksti',
  NUMRI: 'numri',
  BOOL: 'bool',
  ARRAY: 'array',
  OBJECT: 'object'
}

export function validiTipin(vlera, tipi, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  
  if (vlera === null || vlera === undefined) {
    if (opcione.required !== false) {
      rezultati.valid = false
      rezultati.gabimet.push(`${opcione.emri || 'Fusha'} eshte e nevojshme`)
    }
    return rezultati
  }

  switch (tipi) {
    case VALIDATION_TYPES.EMAIL:
      return validiEmailin(vlera, opcione)
    
    case VALIDATION_TYPES.FJALEKALIMI:
      return validiFjalekalimin(vlera, opcione)
    
    case VALIDATION_TYPES.TELEFONI:
      return validiTelefonin(vlera, opcione)
    
    case VALIDATION_TYPES.EMRI:
      return validiEmrin(vlera, opcione)
    
    case VALIDATION_TYPES.USERNAME:
      return validiUsername(vlera, opcione)
    
    case VALIDATION_TYPES.URL:
      return validiUrl(vlera, opcione)
    
    case VALIDATION_TYPES.TEKSTI:
      return validiTekstin(vlera, opcione)
    
    case VALIDATION_TYPES.NUMRI:
      return validiNumrin(vlera, opcione)
    
    case VALIDATION_TYPES.BOOL:
      return validiBool(vlera, opcione)
    
    case VALIDATION_TYPES.ARRAY:
      return validiArray(vlera, opcione)
    
    case VALIDATION_TYPES.DATA:
      return validiDaten(vlera, opcione)
    
    case VALIDATION_TYPES.KOHA:
      return validiKohen(vlera, opcione)
    
    default:
      rezultati.valid = false
      rezultati.gabimet.push('Tipi i validimit nuk njihet')
  }
  
  return rezultati
}

export function validiEmailin(email, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Email'
  
  if (!email || typeof email !== 'string') {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete tekst`)
    return rezultati
  }

  if (!REGEX_PATTERNS.email.test(email)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} nuk eshte ne formatin e duhur`)
  }

  if (email.length > 254) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} eshte shume i gjate (maksimum 254 karaktere)`)
  }

  return rezultati
}

export function validiFjalekalimin(fjalekalimi, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Fjalekalimi'
  const gjatesiaMin = opcione.gjatesiaMinimum || 8
  const kerkoNumra = opcione.kerkoNumra !== false
  const kerkoShkronja = opcione.kerkoShkronja !== false
  const kerkoSimbole = opcione.kerkoSimbole || false
  
  if (!fjalekalimi || typeof fjalekalimi !== 'string') {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete tekst`)
    return rezultati
  }

  if (fjalekalimi.length < gjatesiaMin) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete me i gjate se ${gjatesiaMin} karaktere`)
  }

  if (kerkoShkronja && !REGEX_PATTERNS.fjalekalimi.nrShkronja.test(fjalekalimi)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te permbaje te pakten nje shkronje`)
  }

  if (kerkoNumra && !REGEX_PATTERNS.fjalekalimi.nrNumra.test(fjalekalimi)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te permbaje te pakten nje numer`)
  }

  if (kerkoSimbole && !REGEX_PATTERNS.fjalekalimi.nrSimbole.test(fjalekalimi)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te permbaje te pakten nje simbol special`)
  }

  return rezultati
}

export function validiTekstin(teksti, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Teksti'
  const gjatesiaMin = opcione.gjatesiaMinimum || 1
  const gjatesiaMax = opcione.gjatesiaMaksimum || 1000
  
  if (typeof teksti !== 'string') {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete tekst`)
    return rezultati
  }

  if (teksti.length < gjatesiaMin) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete me i gjate se ${gjatesiaMin} karaktere`)
  }

  if (teksti.length > gjatesiaMax) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete me i shkurter se ${gjatesiaMax} karaktere`)
  }

  if (opcione.regex && !opcione.regex.test(teksti)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} nuk eshte ne formatin e duhur`)
  }

  return rezultati
}

export function validiNumrin(numri, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Numri'
  
  const numriParsuar = typeof numri === 'string' ? parseFloat(numri) : numri
  
  if (isNaN(numriParsuar) || !isFinite(numriParsuar)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete numer valid`)
    return rezultati
  }

  if (opcione.minimumi !== undefined && numriParsuar < opcione.minimumi) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete me i madhe se ${opcione.minimumi}`)
  }

  if (opcione.maksimumi !== undefined && numriParsuar > opcione.maksimumi) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete me i vogel se ${opcione.maksimumi}`)
  }

  if (opcione.vetemNumerTePlote && !Number.isInteger(numriParsuar)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete numer i plote`)
  }

  return rezultati
}

export function validiArray(array, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Lista'
  
  if (!Array.isArray(array)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete liste`)
    return rezultati
  }

  if (opcione.gjatesiaMinimum && array.length < opcione.gjatesiaMinimum) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te kete te pakten ${opcione.gjatesiaMinimum} elemente`)
  }

  if (opcione.gjatesiaMaksimum && array.length > opcione.gjatesiaMaksimum) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te kete maksimum ${opcione.gjatesiaMaksimum} elemente`)
  }

  return rezultati
}

export function validiTelefonin(telefoni, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Telefoni'
  
  if (!REGEX_PATTERNS.telefoni.test(telefoni)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} nuk eshte ne formatin e duhur`)
  }

  return rezultati
}

export function validiEmrin(emri, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emriLabel = opcione.emri || 'Emri'
  
  if (!REGEX_PATTERNS.emri.test(emri)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emriLabel} duhet te permbaje vetem shkronja dhe hapesira`)
  }

  return rezultati
}

export function validiUsername(username, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Username'
  
  if (!REGEX_PATTERNS.username.test(username)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te permbaje vetem shkronja, numra dhe '_' (3-20 karaktere)`)
  }

  return rezultati
}

export function validiUrl(url, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'URL'
  
  if (!REGEX_PATTERNS.url.test(url)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} nuk eshte URL valid`)
  }

  return rezultati
}

export function validiDaten(data, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Data'
  
  if (!REGEX_PATTERNS.data.test(data)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete ne formatin YYYY-MM-DD`)
  }

  return rezultati
}

export function validiKohen(koha, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Koha'
  
  if (!REGEX_PATTERNS.koha.test(koha)) {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete ne formatin HH:MM`)
  }

  return rezultati
}

export function validiBool(bool, opcione = {}) {
  const rezultati = { valid: true, gabimet: [] }
  const emri = opcione.emri || 'Vlera'
  
  if (typeof bool !== 'boolean') {
    rezultati.valid = false
    rezultati.gabimet.push(`${emri} duhet te jete true ose false`)
  }

  return rezultati
}

export function validiObjektin(obj, skema) {
  const gabimet = []
  
  for (const [celesi, rregullat] of Object.entries(skema)) {
    const vlera = obj[celesi]
    const rezultati = validiTipin(vlera, rregullat.tipi, rregullat.opcione || {})
    
    if (!rezultati.valid) {
      gabimet.push(...rezultati.gabimet)
    }
  }
  
  return {
    valid: gabimet.length === 0,
    gabimet
  }
}

export { VALIDATION_TYPES, REGEX_PATTERNS }
