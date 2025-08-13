addEventListener('fetch', event => {
  event.respondWith(pergjigjeKerkeses(event.request))
})

async function pergjigjeKerkeses(kerkesa) {
  const url = new URL(kerkesa.url)
  const rruga = url.pathname

  if (rruga === '/') {
    return new Response(merreHtmlPergjigjjen(), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    })
  }

  if (rruga === '/health') {
    const shendeti = {
      statusi: 'healthy',
      koha: new Date().toISOString(),
      vendndodhja: 'Cloudflare Workers'
    }
    
    return new Response(JSON.stringify(shendeti), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }

  return new Response('Faqja nuk u gjet', { status: 404 })
}

function merreHtmlPergjigjjen() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Shendeti</title>
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
            .mesazhi {
                font-size: 2rem;
                font-weight: bold;
                color: #333;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="mesazhi">The server is healthy</div>
    </body>
    </html>
  `
}
