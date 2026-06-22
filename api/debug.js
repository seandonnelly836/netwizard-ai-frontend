export default function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  const anthropic = process.env.ANTHROPIC_API_KEY;
  res.status(200).json({
    supabase_url: url || 'NOT SET',
    supabase_url_length: url?.length || 0,
    supabase_key_prefix: key ? key.substring(0, 20) : 'NOT SET',
    anthropic_key_set: !!anthropic,
  });
}
