export function merreHtmlPergjigjjen() {
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
                max-width: 600px;
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
                text-align: left;
            }
            .seksioni {
                margin: 1.5rem 0;
                text-align: left;
            }
            .seksion-titulli {
                font-weight: bold;
                color: #333;
                margin-bottom: 0.5rem;
            }
        </style>
    </head>
    <body>
        <div class="kontejneri">
            <div class="titulli">🔐 Auth Backend Active</div>
            <div class="pershkrimi">Authentication system with JWT ready!</div>
            
            <div class="seksioni">
                <div class="seksion-titulli">📝 Auth Endpoints:</div>
                <div class="endpoint">POST /api/regjistrohu - Register</div>
                <div class="endpoint">POST /api/hyr - Login</div>
            </div>
            
            <div class="seksioni">
                <div class="seksion-titulli">🔒 Protected Endpoints:</div>
                <div class="endpoint">GET /api/te-mbrojtura/profili - User Profile</div>
                <div class="endpoint">GET /api/te-mbrojtura/dashboard - Dashboard</div>
                <div class="endpoint">GET /api/te-mbrojtura/settings - User Settings</div>
            </div>
            
            <div class="seksioni">
                <div class="seksion-titulli">📝 Posts Endpoints:</div>
                <div class="endpoint">POST /api/postime - Create Post</div>
                <div class="endpoint">GET /api/postime - Get All Posts</div>
                <div class="endpoint">GET /api/postime/te-miat - Get My Posts</div>
                <div class="endpoint">GET /api/postime/:id - Get Single Post</div>
                <div class="endpoint">PUT /api/postime/:id - Update Post</div>
                <div class="endpoint">DELETE /api/postime/:id - Delete Post</div>
            </div>
            
            <div class="seksioni">
                <div class="seksion-titulli">⚙️ System:</div>
                <div class="endpoint">GET /health - Health check</div>
            </div>
        </div>
    </body>
    </html>
  `
}
