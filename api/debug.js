export default function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  res.status(200).json({
    key_exists: !!key,
    key_length: key ? key.length : 0,
    key_prefix: key ? key.substring(0, 10) : 'NOT SET',
    key_has_spaces: key ? (key !== key.trim()) : false,
  });
}
