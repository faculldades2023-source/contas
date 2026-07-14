import { put, list } from '@vercel/blob';

const DB_FILENAME = 'db.json';

const EMPTY_DB = { users: [], customBancos: {}, userData: {} };

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { blobs } = await list({ prefix: DB_FILENAME });
      const existing = blobs.find((b) => b.pathname === DB_FILENAME);

      if (!existing) {
        res.status(200).json(EMPTY_DB);
        return;
      }

      const response = await fetch(existing.url);
      const data = await response.json();
      res.status(200).json(data);
      return;
    }

    if (req.method === 'POST') {
      const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');

      await put(DB_FILENAME, JSON.stringify(body), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      });

      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    console.error('Erro na API /api/db:', err);
    res.status(500).json({ error: 'Erro interno ao acessar o banco de dados' });
  }
}
