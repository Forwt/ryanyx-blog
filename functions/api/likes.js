const json = (body, init = {}) => new Response(JSON.stringify(body), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    ...init.headers
  }
});

const normalizeKey = (value) => {
  if (typeof value !== 'string') return null;
  const key = value.trim();
  if (!key.startsWith('/') || key.length > 180 || key.includes('..')) return null;
  return key;
};

const ensureTable = (db) => db.prepare(`
  CREATE TABLE IF NOT EXISTS page_likes (
    page_key TEXT PRIMARY KEY,
    like_count INTEGER NOT NULL DEFAULT 0 CHECK (like_count >= 0),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export async function onRequestGet(context) {
  const key = normalizeKey(new URL(context.request.url).searchParams.get('key'));
  if (!key) return json({ error: 'Invalid page key' }, { status: 400 });
  if (!context.env.DB) return json({ error: 'Like storage is not configured' }, { status: 503 });

  await ensureTable(context.env.DB);
  const row = await context.env.DB
    .prepare('SELECT like_count AS count FROM page_likes WHERE page_key = ?1')
    .bind(key)
    .first();

  return json({ key, count: Number(row?.count ?? 0) });
}

export async function onRequestPost(context) {
  if (!context.env.DB) return json({ error: 'Like storage is not configured' }, { status: 503 });

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const key = normalizeKey(body?.key);
  if (!key) return json({ error: 'Invalid page key' }, { status: 400 });

  await ensureTable(context.env.DB);
  const row = await context.env.DB.prepare(`
    INSERT INTO page_likes (page_key, like_count)
    VALUES (?1, 1)
    ON CONFLICT(page_key) DO UPDATE SET
      like_count = like_count + 1,
      updated_at = CURRENT_TIMESTAMP
    RETURNING like_count AS count
  `).bind(key).first();

  return json({ key, count: Number(row?.count ?? 1) });
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: { allow: 'GET, POST, OPTIONS' } });
}
