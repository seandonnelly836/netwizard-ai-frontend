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

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in Vercel environment variables' });
  }

  try {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'Gemini API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.status(200).json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
