import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

function merreHtmlPergjigjjen() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Auth Backend</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }
            .kontejneri {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                max-width: 500px;
            }
            .titulli {
                font-size: 2rem;
                font-weight: bold;
                color: #333;
                margin-bottom: 1rem;
            }
            .pershkrimi {
                color: #666;
                margin-bottom: 1.5rem;
            }
            .endpoint {
                background: #f8f9fa;
                padding: 0.5rem;
                margin: 0.5rem 0;
                border-radius: 5px;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <div class="kontejneri">
            <div class="titulli">Auth Backend Active</div>
            <div class="pershkrimi">Authentication system with JWT ready!</div>
            <div class="endpoint">POST /api/regjistrohu - Register</div>
            <div class="endpoint">POST /api/hyr - Login</div>
            <div class="endpoint">GET /health - Health check</div>
        </div>
    </body>
    </html>
  `
}

app.get('/', (c) => {
  return c.html(merreHtmlPergjigjjen())
})

app.get('/health', (c) => {
  return c.json({
    statusi: 'healthy',
    koha: new Date().toISOString(),
    vendndodhja: 'Cloudflare Workers Edge',
    sherbimi: 'Auth Backend'
  })
})

app.post('/api/regjistrohu', async (c) => {
  try {
    const { email, fjalekalimi } = await c.req.json()
    
    if (!email || !fjalekalimi) {
      return c.json({ gabim: 'Email dhe fjalekalimi jane te nevojshem' }, 400)
    }

    if (fjalekalimi.length < 6) {
      return c.json({ gabim: 'Fjalekalimi duhet te jete me i gjate se 6 karaktere' }, 400)
    }

    const db = c.env.DB
    
    const perdoruesEkziston = await db.prepare(
      'SELECT email FROM perdorues WHERE email = ?'
    ).bind(email).first()

    if (perdoruesEkziston) {
      return c.json({ gabim: 'Perdoruesi me kete email ekziston' }, 409)
    }

    const fjalekalimihash = await bcrypt.hash(fjalekalimi, 10)
    
    const rezultati = await db.prepare(
      'INSERT INTO perdorues (email, fjalekalimi_hash) VALUES (?, ?)'
    ).bind(email, fjalekalimihash).run()

    if (rezultati.success) {
      const tokeni = await sign(
        { 
          perdoruesId: rezultati.meta.last_row_id, 
          email: email,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        },
        c.env.JWT_SECRET
      )

      return c.json({
        sukses: true,
        mesazhi: 'Perdoruesi u regjistrua me sukses',
        tokeni: tokeni,
        perdoruesi: { id: rezultati.meta.last_row_id, email: email }
      })
    } else {
      return c.json({ gabim: 'Gabim ne regjistrimin e perdoruesit' }, 500)
    }
  } catch (error) {
    return c.json({ gabim: 'Gabim i brendshem i serverit' }, 500)
  }
})

app.post('/api/hyr', async (c) => {
  try {
    const { email, fjalekalimi } = await c.req.json()
    
    if (!email || !fjalekalimi) {
      return c.json({ gabim: 'Email dhe fjalekalimi jane te nevojshem' }, 400)
    }

    const db = c.env.DB
    
    const perdoruesi = await db.prepare(
      'SELECT id, email, fjalekalimi_hash FROM perdorues WHERE email = ?'
    ).bind(email).first()

    if (!perdoruesi) {
      return c.json({ gabim: 'Email ose fjalekalim i gabuar' }, 401)
    }

    const fjalekalimivalid = await bcrypt.compare(fjalekalimi, perdoruesi.fjalekalimi_hash)
    
    if (!fjalekalimivalid) {
      return c.json({ gabim: 'Email ose fjalekalim i gabuar' }, 401)
    }

    const tokeni = await sign(
      { 
        perdoruesId: perdoruesi.id, 
        email: perdoruesi.email,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      },
      c.env.JWT_SECRET
    )

    return c.json({
      sukses: true,
      mesazhi: 'Hyni me sukses',
      tokeni: tokeni,
      perdoruesi: { id: perdoruesi.id, email: perdoruesi.email }
    })
  } catch (error) {
    return c.json({ gabim: 'Gabim i brendshem i serverit' }, 500)
  }
})

app.use('/api/te-mbrojtura/*', async (c, next) => {
  const auth = c.req.header('Authorization')
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return c.json({ gabim: 'Token mungon' }, 401)
  }

  const tokeni = auth.substring(7)
  
  try {
    const payload = await verify(tokeni, c.env.JWT_SECRET)
    c.set('perdoruesi', payload)
    await next()
  } catch (error) {
    return c.json({ gabim: 'Token i pavlefshme' }, 401)
  }
})

app.get('/api/te-mbrojtura/profili', (c) => {
  const perdoruesi = c.get('perdoruesi')
  return c.json({
    sukses: true,
    perdoruesi: {
      id: perdoruesi.perdoruesId,
      email: perdoruesi.email
    }
  })
})

export default app
