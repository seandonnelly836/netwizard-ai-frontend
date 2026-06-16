// All requests go to /api/chat — Vite proxies this to localhost:3001 in dev,
// and your host (Vercel/Railway/etc.) routes it in production.
export async function sendMessage(messages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || `Server error ${response.status}`);
  }

  return data.reply;
}
