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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured in Vercel environment variables' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'Groq API error' });
    }

    const text = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
