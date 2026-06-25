# NetWizard AI

> AI-powered network configuration assistant for MikroTik, Ubiquiti, and TP-Link devices.

🔗 **Live site:** [netwizard-ai-frontend.vercel.app](https://netwizard-ai-frontend.vercel.app)

---

## Overview

NetWizard AI is a web application that helps network engineers and IT professionals configure, troubleshoot, and manage their network devices using an AI chat assistant. Users can manage their network inventory and get step-by-step configuration guidance — including CLI commands — for MikroTik, Ubiquiti, and TP-Link hardware.

---

## The Problem

Network configuration is time-consuming and error-prone. Engineers regularly need to look up CLI syntax across multiple vendor documentation sites, Stack Overflow threads, and Reddit posts — just to do routine tasks like setting up VLANs, firewall rules, or DHCP. One wrong command can take down a live network.

There is no single tool that combines a network device inventory with an AI assistant that understands the specific platforms engineers actually use.

---

## Target Audience

- Network engineers and IT administrators managing small-to-medium networks
- Students in networking/IT courses learning RouterOS or UniFi
- Homelab enthusiasts running MikroTik or Ubiquiti hardware
- IT contractors managing multiple client networks

**Situation:** They are mid-configuration, need a specific CLI command or step-by-step guide, and don't want to dig through vendor docs.

---

## Competitors & Differentiation

| Competitor | How it's used today | Our differentiation |
|---|---|---|
| Google + vendor docs | Manual search across multiple sites | NetWizard gives a direct, platform-specific answer in seconds |
| Reddit / r/homelab | Post a question, wait for replies | Instant AI response with working CLI commands |
| ChatGPT / Claude | Generic AI, no network context | NetWizard is pre-loaded with MikroTik/Ubiquiti/TP-Link expertise |
| Network management tools (PRTG, Zabbix) | Monitoring, not configuration guidance | NetWizard focuses on configuration help, not monitoring |
| Excel / pen and paper | Network inventory tracking | NetWizard combines inventory + AI assistant in one place |

---

## Features

- **AI Wizard** — Chat interface powered by Groq (Llama 3.3 70b) with network-expert system prompt. Responds with syntax-highlighted CLI code blocks and step-by-step instructions.
- **Network Dashboard** — Add, edit, and delete network devices with name, type, status, and IP address. Data persists per user in Supabase.
- **Project History** — Log of past configuration sessions, exportable as CSV.
- **Auth** — Email/password sign up and sign in via Supabase Auth. Each user sees only their own networks (Row Level Security).
- **Feedback widget** — In-app feedback button (Bug / Suggestion / Question) that saves to Supabase.

---

## External Services

| Service | Type | Role in the product |
|---|---|---|
| Groq (Llama 3.3 70b) | AI API | Powers the Wizard chat — generates network configuration advice and CLI commands |
| Supabase | Backend / Auth / Database | User authentication, stores networks, sessions, and feedback per user with RLS |
| Vercel | Deployment / Serverless | Hosts the frontend and runs the `/api/chat` serverless function (hides the Groq API key) |
| Vercel Analytics | Analytics | Tracks page visits and traffic patterns |
| Microsoft Clarity | Session recording | Records anonymous user sessions and generates heatmaps |

> **Security note:** The Groq API key is stored as a Vercel environment variable and only accessed server-side via the `/api/chat` serverless function. It is never exposed to the browser.

---

## Data Model (ERD)

> See `/supabase-setup.sql` for the full schema.

### Tables

**`networks`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | Foreign key → auth.users |
| name | text | Network name |
| device | text | Device type |
| status | text | Active / Warning |
| ip | text | IP address |
| uptime | text | Uptime string |
| created_at | timestamptz | Auto-set |

**`sessions`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | Foreign key → auth.users |
| network | text | Network name |
| device | text | Device type |
| issue | text | Issue description |
| status | text | Success / CLI Ready / In Review |
| status_color | text | Hex colour for badge |
| created_at | timestamptz | Auto-set |

**`feedback`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | Foreign key → auth.users |
| message | text | Feedback message |
| type | text | Bug / Suggestion / Question |
| created_at | timestamptz | Auto-set |

All tables have **Row Level Security (RLS)** enabled. Users can only read and write their own rows.

---

## Demo Account

To test the app without creating an account:

- **Email:** `demo@netwizard.ai`
- **Password:** `demo1234`

> Note: The demo account's networks are shared. Please don't delete them.

---

## Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/seandonnelly836/netwizard-ai-frontend.git
cd netwizard-ai-frontend

# 2. Install frontend dependencies
npm install

# 3. Install proxy server dependencies
cd server && npm install && cd ..

# 4. Create environment file
cp server/.env.example server/.env
# Edit server/.env and add your keys:
# GROQ_API_KEY=your_groq_key
# (Supabase keys go in .env at root as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)

# 5. Run both servers
npm run dev
```

---

## Project Structure

```
netwizard-ai-frontend/
├── api/
│   └── chat.js           # Vercel serverless function → Groq API
├── server/
│   └── index.js          # Express proxy for local dev
├── src/
│   ├── components/       # Navbar, Footer, FeedbackWidget, ProtectedRoute
│   ├── context/          # AuthContext (Supabase Auth)
│   ├── pages/            # Dashboard, Wizard, History, Login
│   └── services/         # supabase.js, api.js
├── vercel.json
└── vite.config.js
```

---

*Built by Sean Donnelly — AI-Based Product Development Course, 2026*
