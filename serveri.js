const express = require('express');
const app = express();
const porti = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const htmlPergjigjja = `
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
  `;
  
  res.send(htmlPergjigjja);
});

app.get('/health', (req, res) => {
  res.status(200).json({ statusi: 'healthy', koha: new Date().toISOString() });
});

app.listen(porti, () => {
  console.log(`Serveri po punon ne portin ${porti}`);
});
