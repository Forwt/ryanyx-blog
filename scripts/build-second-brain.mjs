import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.resolve(
  process.env.OBSIDIAN_VAULT
    ?? (process.platform === 'win32' ? 'D:\\Obsidian' : path.join(projectRoot, '..', 'obsidian-vault'))
);
const contentOutput = path.join(projectRoot, 'src', 'content', 'second-brain');
const assetOutput = path.join(projectRoot, 'public', 'second-brain', 'assets');
const dataOutput = path.join(projectRoot, 'src', 'data', 'second-brain.json');

const topicRules = [
  ['GALGAME', ['galgame', 'gal game']],
  ['影视', ['影视', '电视剧', '电影']],
  ['游戏', ['游戏', 'galgame', '线']],
  ['武侠', ['武侠']],
  ['读书', ['读书', '评分细则']],
  ['实习', ['实习', '报销', '函证', '开会']],
  ['大学与毕业', ['大学', '毕业', '港大']],
  ['健身', ['健身']],
  ['曼森方法', ['曼森', '雄性极性', '服从性', '侵略感', '屈从感']],
  ['亲密关系', ['亲密关系', '搭讪', '女演员倒追', '说服术']],
  ['方法论', ['方法', '模型', '框架', '内核', '实战', '实操']],
  ['日记与随笔', ['日记', '随笔', '除夕', '有感']],
  ['评分与总结', ['评分', '总结', '总述', '细则']]
];

const normalize = (value) => value.toLocaleLowerCase('zh-CN');

const slugify = (value, index) => {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `note-${String(index + 1).padStart(3, '0')}-${(hash >>> 0).toString(36)}`;
};

const yamlString = (value) => JSON.stringify(String(value ?? '').replace(/\r?\n/g, ' ').trim());

const listFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(entryPath));
    else files.push(entryPath);
  }
  return files;
};

const fileDate = (filePath, stat) => {
  const name = path.basename(filePath);
  const full = name.match(/(20\d{2})[.\-_年](\d{1,2})[.\-_月](\d{1,2})/u);
  const short = name.match(/(?<!\d)(\d{2})[.\-_](\d{1,2})[.\-_](\d{1,2})/u);
  const match = full ?? short;
  if (match) {
    const year = full ? Number(match[1]) : 2000 + Number(match[1]);
    return `${year}-${String(Number(match[2])).padStart(2, '0')}-${String(Number(match[3])).padStart(2, '0')}`;
  }
  const date = stat.mtime;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const stripFrontmatter = (body) => body.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/u, '');

const extractTags = (body) => {
  const frontmatter = body.match(/^---\s*\n([\s\S]*?)\n---/u)?.[1] ?? '';
  const inline = frontmatter.match(/^tags:\s*\[([^\]]*)\]/mu)?.[1];
  if (inline) return [...inline.matchAll(/['"]([^'"]+)['"]|([^,\s]+)/g)].map((match) => (match[1] ?? match[2]).trim()).filter(Boolean);
  const block = frontmatter.match(/^tags:\s*\n((?:\s+-\s+.*\n?)+)/mu)?.[1];
  return block ? [...block.matchAll(/^\s+-\s+['"]?(.+?)['"]?\s*$/gmu)].map((match) => match[1].trim()) : [];
};

const cleanText = (body) => stripFrontmatter(body)
  .replace(/!??\[\[[^\]]+\]\]/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[`*_>#~-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const excerptFor = (body, title) => {
  const text = cleanText(body);
  return text ? text.slice(0, 180) : `${title}，这篇笔记暂时没有正文。`;
};

const topicFor = (title, body) => {
  const text = normalize(`${title} ${body}`);
  return topicRules.filter(([, terms]) => terms.some((term) => text.includes(normalize(term)))).map(([label]) => label);
};

const slugPath = (value) => value.split(path.sep).join('/');

const encodedAssetPath = (relativePath) => `/second-brain/assets/${slugPath(relativePath).split('/').map(encodeURIComponent).join('/')}`;

const pairKey = (a, b) => a < b ? `${a}::${b}` : `${b}::${a}`;

const readSource = async () => {
  const allFiles = await listFiles(sourceRoot);
  const markdownFiles = allFiles.filter((file) => file.toLocaleLowerCase().endsWith('.md')).sort((a, b) => a.localeCompare(b, 'zh-CN'));
  const assetFiles = allFiles.filter((file) => /\.(png|jpe?g|gif|webp|svg)$/iu.test(file));
  const assetsByName = new Map();
  for (const asset of assetFiles) {
    const basename = path.basename(asset);
    if (!assetsByName.has(basename)) assetsByName.set(basename, []);
    assetsByName.get(basename).push(asset);
  }
  const notes = [];
  for (const [index, filePath] of markdownFiles.entries()) {
    const body = await fs.readFile(filePath, 'utf8');
    const stat = await fs.stat(filePath);
    const relative = path.relative(sourceRoot, filePath);
    const parts = relative.split(path.sep);
    const title = path.basename(filePath, path.extname(filePath));
    const category = parts.length > 1 ? parts[0] : '未分类';
    const folder = parts.length > 2 ? parts.slice(0, -1).join(' / ') : category;
    const clean = cleanText(body);
    notes.push({
      id: `note:${slugify(relative, index)}`,
      slug: slugify(relative, index),
      title,
      relative,
      category,
      folder,
      date: fileDate(filePath, stat),
      updatedAt: stat.mtime.toISOString(),
      tags: extractTags(body),
      topics: topicFor(title, body),
      excerpt: excerptFor(body, title),
      wordCount: clean.replace(/\s/g, '').length,
      body: stripFrontmatter(body),
      filePath,
      assetsByName
    });
  }
  return { allFiles, assetFiles, notes, assetsByName };
};

const resolveNoteLinks = (notes) => {
  const byTitle = new Map();
  const byRelative = new Map();
  for (const note of notes) {
    byTitle.set(note.title, note);
    byRelative.set(note.relative.replace(/\.md$/iu, ''), note);
  }
  const findNote = (target, current) => {
    const cleanTarget = target.split('#')[0].split('^')[0].trim().replace(/\.md$/iu, '');
    if (!cleanTarget) return null;
    const relativeCandidate = path.normalize(path.join(path.dirname(current.relative), cleanTarget));
    return byRelative.get(relativeCandidate) ?? byTitle.get(path.basename(cleanTarget)) ?? notes.find((note) => note.relative.endsWith(`${path.sep}${cleanTarget}.md`) || note.relative.endsWith(`/${cleanTarget}.md`));
  };
  const resolveAsset = (target, current) => {
    const cleanTarget = target.split('#')[0].trim();
    const local = path.normalize(path.join(path.dirname(current.filePath), cleanTarget));
    if (current.assetsByName.get(path.basename(cleanTarget))?.includes(local)) return local;
    return current.assetsByName.get(path.basename(cleanTarget))?.[0] ?? null;
  };
  const edges = [];
  const transformed = new Map();
  for (const note of notes) {
    let body = note.body.replace(/!\[\[([^\]]+)\]\]/g, (match, target) => {
      const asset = resolveAsset(target, note);
      return asset ? `![${path.basename(target)}](${encodedAssetPath(path.relative(sourceRoot, asset))})` : `*${target}*`;
    });
    body = body.replace(/\[\[([^\]]+)\]\]/g, (match, targetWithAlias) => {
      const [target, alias] = targetWithAlias.split('|');
      const linked = findNote(target, note);
      if (!linked) return alias ?? target;
      edges.push({ source: note.id, target: linked.id, type: 'explicit', weight: 1.5 });
      return `[${alias ?? linked.title}](/second-brain/${linked.slug}/)`;
    });
    transformed.set(note.id, body);
  }
  return { edges, transformed };
};

const addPairScores = (scores, members, weight) => {
  for (const group of members.values()) {
    for (let i = 0; i < group.length; i += 1) {
      for (let j = i + 1; j < group.length; j += 1) {
        const key = pairKey(group[i], group[j]);
        scores.set(key, (scores.get(key) ?? 0) + weight);
      }
    }
  }
};

const buildGraph = (notes, explicitEdges) => {
  const nodes = notes.map(({ id, slug, title, category, folder, date, updatedAt, excerpt, wordCount, tags, topics }) => ({
    id, slug, title, category, folder, date, updatedAt, excerpt, wordCount, tags, topics, type: 'note'
  }));
  const edges = [...explicitEdges];
  const nodeIds = new Set(nodes.map((node) => node.id));
  const addNode = (node) => {
    if (!nodeIds.has(node.id)) {
      nodes.push(node);
      nodeIds.add(node.id);
    }
  };
  const addEdge = (source, target, type, weight = 1) => {
    if (!source || !target || source === target) return;
    const exists = edges.some((edge) => edge.source === source && edge.target === target && edge.type === type || edge.source === target && edge.target === source && edge.type === type);
    if (!exists) edges.push({ source, target, type, weight });
  };
  const groups = new Map();
  const topics = new Map();
  const tags = new Map();
  for (const note of notes) {
    if (!groups.has(note.category)) groups.set(note.category, []);
    groups.get(note.category).push(note.id);
    if (note.folder !== note.category) {
      if (!groups.has(note.folder)) groups.set(note.folder, []);
      groups.get(note.folder).push(note.id);
    }
    for (const topic of note.topics) {
      if (!topics.has(topic)) topics.set(topic, []);
      topics.get(topic).push(note.id);
    }
    for (const tag of note.tags) {
      if (!tags.has(tag)) tags.set(tag, []);
      tags.get(tag).push(note.id);
    }
  }
  for (const [label, members] of groups) {
    const id = `cluster:${label}`;
    addNode({ id, label, title: label, type: 'cluster', size: Math.max(1, Math.min(4, members.length / 4)), count: members.length });
    members.forEach((member) => addEdge(member, id, 'folder', 0.85));
  }
  for (const [label, members] of topics) {
    if (members.length < 2) continue;
    const id = `topic:${label}`;
    addNode({ id, label, title: label, type: 'topic', size: Math.max(1, Math.min(3.5, members.length / 3)), count: members.length });
    members.forEach((member) => addEdge(member, id, 'topic', 0.65));
  }
  for (const [label, members] of tags) {
    const id = `tag:${label}`;
    addNode({ id, label, title: label, type: 'tag', size: Math.max(1, Math.min(3, members.length / 2)), count: members.length });
    members.forEach((member) => addEdge(member, id, 'tag', 0.75));
  }
  const scores = new Map();
  addPairScores(scores, groups, 1.2);
  addPairScores(scores, topics, 1.6);
  addPairScores(scores, tags, 1.8);
  for (const edge of explicitEdges) scores.set(pairKey(edge.source, edge.target), (scores.get(pairKey(edge.source, edge.target)) ?? 0) + 4);
  for (const [key, score] of scores) {
    const [source, target] = key.split('::');
    if (score >= 1.2) addEdge(source, target, 'related', Math.min(3, score));
  }
  const related = new Map(notes.map((note) => [note.id, []]));
  for (const [key, score] of scores) {
    const [source, target] = key.split('::');
    related.get(source)?.push({ id: target, score });
    related.get(target)?.push({ id: source, score });
  }
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  for (const note of nodes.filter((node) => node.type === 'note')) {
    note.related = (related.get(note.id) ?? []).sort((a, b) => b.score - a.score).slice(0, 6).map(({ id, score }) => ({ slug: nodeById.get(id)?.slug, title: nodeById.get(id)?.title, score: Math.round(score * 10) / 10 })).filter((item) => item.slug);
  }
  return { nodes, edges };
};

const generate = async () => {
  const { allFiles, assetFiles, notes } = await readSource();
  const { edges: explicitEdges, transformed } = resolveNoteLinks(notes);
  const graph = buildGraph(notes, explicitEdges);
  await fs.rm(contentOutput, { recursive: true, force: true });
  await fs.rm(assetOutput, { recursive: true, force: true });
  await fs.mkdir(contentOutput, { recursive: true });
  await fs.mkdir(assetOutput, { recursive: true });
  for (const note of notes) {
    const frontmatter = [
      '---',
      `title: ${yamlString(note.title)}`,
      `description: ${yamlString(note.excerpt)}`,
      `pubDate: ${note.date}`,
      `updatedDate: ${note.updatedAt.slice(0, 10)}`,
      `category: ${yamlString(note.category)}`,
      `folder: ${yamlString(note.folder)}`,
      `sourcePath: ${yamlString(note.relative)}`,
      `slug: ${yamlString(note.slug)}`,
      `tags: ${JSON.stringify(note.tags)}`,
      '---',
      ''
    ].join('\n');
    await fs.writeFile(path.join(contentOutput, `${note.slug}.md`), `${frontmatter}${transformed.get(note.id) ?? ''}`, 'utf8');
  }
  for (const asset of assetFiles) {
    const destination = path.join(assetOutput, path.relative(sourceRoot, asset));
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(asset, destination);
  }
  const noteNodes = graph.nodes.filter((node) => node.type === 'note');
  const graphData = {
    generatedAt: new Date().toISOString(),
    source: path.basename(sourceRoot),
    stats: {
      notes: noteNodes.length,
      clusters: graph.nodes.filter((node) => node.type === 'cluster').length,
      topics: graph.nodes.filter((node) => node.type === 'topic').length,
      tags: graph.nodes.filter((node) => node.type === 'tag').length,
      edges: graph.edges.length,
      explicitLinks: explicitEdges.length
    },
    nodes: graph.nodes,
    edges: graph.edges
  };
  await fs.writeFile(dataOutput, `${JSON.stringify(graphData, null, 2)}\n`, 'utf8');
  console.log(`Second Brain generated from ${sourceRoot}: ${allFiles.length} files, ${noteNodes.length} notes, ${graph.edges.length} edges.`);
};

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
