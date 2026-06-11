# NetWizard AI

AI-powered network configuration assistant for MikroTik, Ubiquiti, and TP-Link devices.

Built with React + Vite (frontend) and an Express proxy (backend) that keeps your Anthropic API key secure server-side.

---

## Quick Start

### 1. Install dependencies

```bash
# Frontend
npm install

# Proxy server
cd server && npm install && cd ..
```

### 2. Add your API key

```bash
cp server/.env.example server/.env
# Edit server/.env and paste your Anthropic API key
```

Get a key at: https://console.anthropic.com/

### 3. Run

```bash
npm run dev
```

This starts both the Vite dev server (port 5173) and the Express proxy (port 3001) together.

Open http://localhost:5173

---

## Project Structure

```
netwizard-ai-frontend/
├── src/
│   ├── components/       # Navbar, Footer
│   ├── pages/            # Dashboard, Wizard, History
│   ├── services/api.js   # Calls /api/chat
│   └── App.jsx
├── server/
│   ├── index.js          # Express proxy → Anthropic API
│   ├── .env              # ANTHROPIC_API_KEY (never committed)
│   └── .env.example      # Template
├── vite.config.js        # Proxies /api to :3001 in dev
└── package.json
```

---

## Deploying

### Vercel
Convert `server/index.js` to `api/chat.js` as a Vercel serverless function, and set `ANTHROPIC_API_KEY` in the Vercel dashboard under Environment Variables.

### Railway / Render
Deploy the `server/` folder as a Node service. Set `ANTHROPIC_API_KEY` as an environment variable. Update the frontend's `vite.config.js` proxy target (or set `VITE_API_URL` for production builds) to point at your deployed server URL.
