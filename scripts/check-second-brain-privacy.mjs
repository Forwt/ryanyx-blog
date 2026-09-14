import fs from 'node:fs/promises';
import path from 'node:path';
import {root,policy,files,normalizePath} from './second-brain-policy.mjs';
const allowed=await policy();
const notes=new Set(allowed.notes), slugs=new Set(), titles=new Set(), seen=new Set();
const dir=path.join(root,'src/content/second-brain');
for(const file of await files(dir)) {
  if(!file.endsWith('.md')) throw new Error('Unexpected generated note file');
  const text=await fs.readFile(file,'utf8');
  const front=text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  const read=key=> {const value=front?.match(new RegExp('^'+key+': (.+)$','m'))?.[1]; return value ? JSON.parse(value) : null;};
  const source=read('sourcePath'), slug=read('slug');
  if(!front || !/^publish: true\r?$/m.test(front) || !source || !notes.has(normalizePath(source)) || !slug || seen.has(source)) throw new Error('Unapproved note: build blocked');
  seen.add(source); slugs.add(slug); titles.add(read('title'));
}
const graph=JSON.parse(await fs.readFile(path.join(root,'src/data/second-brain.json'),'utf8'));
if(graph.nodes.filter(n=>n.type==='note').length!==slugs.size || graph.nodes.some(n=>n.type==='note'&&!slugs.has(n.slug)) || (!slugs.size && (graph.nodes.length || graph.edges.length))) throw new Error('Unapproved graph content: build blocked');
const slugMap=JSON.parse(await fs.readFile(path.join(root,'src/data/second-brain-slugs.json'),'utf8'));
for(const [key,value] of Object.entries(slugMap)) {
  if(!slugs.has(value) || !(key.startsWith('title:') ? titles.has(key.slice(6)) : notes.has(normalizePath(key)))) throw new Error('Unapproved slug metadata: build blocked');
}
const assets=path.join(root,'public/second-brain/assets');
for(const file of await files(assets)) if(!allowed.assets.includes(normalizePath(path.relative(assets,file)))) throw new Error('Unapproved attachment: build blocked');
console.log(`Publication privacy check passed: ${slugs.size} explicitly approved notes.`);
