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

export async function sendMessage(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.content.map(b => b.text || '').join('');
}
