import { verifikoToken } from '../utils/autentifikimi.js'
import { ERROR_CODES, pergjigjjeGabimi } from '../utils/gabimet.js'

export async function authMiddleware(c, next) {
  const auth = c.req.header('Authorization')
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return pergjigjjeGabimi(c, ERROR_CODES.AUTH_TOKEN_MISSING)
  }

  const tokeni = auth.substring(7)
  
  try {
    const payload = await verifikoToken(tokeni, c.env.JWT_SECRET)
    c.set('perdoruesi', payload)
    await next()
  } catch (error) {
    return pergjigjjeGabimi(c, ERROR_CODES.AUTH_TOKEN_INVALID)
  }
}

export function kerkoBearerToken(c) {
  const auth = c.req.header('Authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }
  return auth.substring(7)
}

export async function optionalAuthMiddleware(c, next) {
  const auth = c.req.header('Authorization')
  
  if (auth && auth.startsWith('Bearer ')) {
    const tokeni = auth.substring(7)
    try {
      const payload = await verifikoToken(tokeni, c.env.JWT_SECRET)
      c.set('perdoruesi', payload)
    } catch (error) {
      c.set('perdoruesi', null)
    }
  } else {
    c.set('perdoruesi', null)
  }
  
  await next()
}
