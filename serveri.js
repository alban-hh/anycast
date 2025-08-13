import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './src/routes/auth.js'
import teMbrojtura from './src/routes/te-mbrojtura.js'
import { merreHtmlPergjigjjen } from './src/utils/html.js'

const app = new Hono()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (c) => {
  return c.html(merreHtmlPergjigjjen())
})

app.get('/health', (c) => {
  return c.json({
    statusi: 'healthy',
    koha: new Date().toISOString(),
    vendndodhja: 'Cloudflare Workers Edge',
    sherbimi: 'Auth Backend - Organized Structure',
    versioni: '2.0.0'
  })
})

app.route('/api', authRoutes)
app.route('/api/te-mbrojtura', teMbrojtura)

app.notFound((c) => {
  return c.json({ gabim: 'Endpoint nuk u gjet' }, 404)
})

app.onError((err, c) => {
  console.error('Gabim i serverit:', err)
  return c.json({ gabim: 'Gabim i brendshem i serverit' }, 500)
})

export default app
