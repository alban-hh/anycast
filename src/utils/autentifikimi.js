import { sign, verify } from 'hono/jwt'

export async function krijoToken(perdoruesi, sekret) {
  return await sign(
    { 
      perdoruesId: perdoruesi.id, 
      email: perdoruesi.email,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    },
    sekret
  )
}

export async function verifikoToken(token, sekret) {
  try {
    return await verify(token, sekret)
  } catch (error) {
    throw new Error('Token i pavlefshme')
  }
}

export async function hashFjalekalimi(fjalekalimi) {
  const encoder = new TextEncoder()
  const data = encoder.encode(fjalekalimi)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = new Uint8Array(hashBuffer)
  return btoa(String.fromCharCode.apply(null, hashArray))
}

export async function krahasoFjalekalimi(fjalekalimi, hash) {
  const fjalekalimihash = await hashFjalekalimi(fjalekalimi)
  return fjalekalimihash === hash
}
