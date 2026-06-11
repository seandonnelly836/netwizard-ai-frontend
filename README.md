# NetWizard AI

AI-powered network configuration assistant for MikroTik, Ubiquiti, and TP-Link devices.

Built with React + Vite (frontend) and a serverless proxy that keeps your Anthropic API key secure.

---

## Local Development

### 1. Install dependencies

```bash
# Frontend
npm install

# Express proxy (local dev only)
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

Opens at http://localhost:5173. Vite proxies `/api` to the Express server on `:3001`.

---

## Deploy to Vercel

### 1. Push to GitHub, then import the repo at vercel.com/new

### 2. Add your API key in Vercel
Dashboard → Project → Settings → Environment Variables
```
ANTHROPIC_API_KEY = sk-ant-...
```

### 3. Deploy
Vercel auto-deploys on every push to `main`. The `api/chat.js` file is served as a serverless function — no Express server needed in production.

---

## Project Structure

```
netwizard-ai-frontend/
├── api/
│   └── chat.js           # Vercel serverless function (production)
├── server/
│   ├── index.js          # Express proxy (local dev)
│   ├── .env              # ANTHROPIC_API_KEY — never committed
│   └── .env.example
├── src/
│   ├── components/       # Navbar, Footer
│   ├── pages/            # Dashboard, Wizard, History
│   ├── services/api.js   # Calls /api/chat
│   └── App.jsx
├── vercel.json           # Build + routing config
├── vite.config.js        # Proxies /api → :3001 in dev
└── package.json
```
