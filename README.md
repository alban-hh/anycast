# Anycast Health Check Server

A simple Node.js application that displays a health status message.

## Features
- Displays "The server is healthy" in bold, centered on the page
- Health check endpoint at `/health`
- Ready for deployment on Heroku, Railway, or similar platforms

## Installation

```bash
npm install
```

## Running locally

```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

## Deployment

This app is ready to deploy to any platform that supports Node.js. It includes:
- `Procfile` for Heroku
- `engines` specification in `package.json`
- Environment variable support for PORT

## Endpoints

- `/` - Main page with health status
- `/health` - JSON health check endpoint
