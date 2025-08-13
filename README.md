# Anycast Health Check Server

A Cloudflare Workers application that displays a health status message with global edge deployment.

## Features
- Displays "The server is healthy" in bold, centered on the page
- Health check endpoint at `/health` with location info
- Optimized for Cloudflare Workers edge runtime
- Lightning-fast response times globally

## Prerequisites

1. Install Wrangler CLI globally:
```bash
npm install -g wrangler
```

2. Authenticate with Cloudflare:
```bash
wrangler login
```

## Installation

```bash
npm install
```

## Development

Run locally with Wrangler dev server:
```bash
npm run dev
```

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Deploy to production environment:
```bash
npm run publish
```

## Configuration

Edit `wrangler.toml` to configure:
- Worker name
- Custom domains/routes
- Environment variables

## Endpoints

- `/` - Main page with health status
- `/health` - JSON health check endpoint with edge location info

## Performance Benefits

- **Global Edge**: Deployed to 300+ locations worldwide
- **Zero Cold Start**: Workers start instantly
- **Scalability**: Handles millions of requests automatically
- **Cost Effective**: Pay only for requests, not idle time
