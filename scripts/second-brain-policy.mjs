import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const normalizePath = value => value.replaceAll('\\', '/');
export async function policy() {
  const data = JSON.parse(await fs.readFile(path.join(root, 'second-brain.publish.json'), 'utf8'));
  if (data.version !== 1) throw new Error('Unsupported publication policy');
  for (const key of ['notes', 'assets']) {
    if (!Array.isArray(data[key])) throw new Error('Missing explicit publication allowlist');
    for (const item of data[key]) {
      if (typeof item !== 'string' || !item || item.includes('\\') || item.includes(':') || item.startsWith('/') || item.split('/').some(x => !x || x === '.' || x === '..')) throw new Error('Invalid publication path');
      if (key === 'notes' && !item.endsWith('.md')) throw new Error('Only reviewed Markdown notes can be published');
    }
    if (new Set(data[key]).size !== data[key].length) throw new Error('Duplicate publication path');
  }
  return data;
}
export async function files(dir) {
  let entries;
  try { entries = await fs.readdir(dir, {withFileTypes:true}); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
  const out=[];
  for (const e of entries) {
    const p=path.join(dir,e.name);
    if (e.isSymbolicLink()) throw new Error('Symlinks are not permitted in publication output');
    if(e.isDirectory()) out.push(...await files(p)); else out.push(p);
  }
  return out;
}
