require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Vite dev server
app.use(express.json());

const SYSTEM_PROMPT = `You are NetWizard AI, an expert network configuration assistant helping Sean, a network engineer and IT professional.

You specialise in:
- MikroTik RouterOS (RouterBoard, CHR, CCR)
- Ubiquiti UniFi / EdgeOS (UDM, USG, EdgeRouter)
- TP-Link Omada / EAP access points
- VLAN setup, firewall rules, routing, NAT, DHCP
- Wi-Fi optimisation, guest networks, captive portals
- Network security best practices

When providing CLI commands or config steps:
1. Specify the platform (e.g. MikroTik RouterOS)
2. Present commands in clearly labelled code blocks using markdown fences
3. Explain what each step does in plain terms
4. Warn about anything that could disrupt an active network
5. Suggest verification steps after each major change

Be concise but thorough. If a question is ambiguous, ask one targeted clarifying question before proceeding.`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in server/.env' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'Anthropic API error' });
    }

    const text = data.content.map(b => b.text || '').join('');
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`NetWizard proxy running on http://localhost:${PORT}`));
