import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputPath = resolve(root, 'src/data/ai-news.json');

const SOURCES = [
  { name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml', weight: 9, official: true },
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/', weight: 8, official: true },
  { name: 'NVIDIA Blog', url: 'https://blogs.nvidia.com/feed/', weight: 7, official: true },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', weight: 7, official: true },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', weight: 7 },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', weight: 6 },
  { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', weight: 6 },
  { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', weight: 5 }
];

const IMPORTANT_TERMS = [
  'agent', 'agents', 'model', 'models', 'open source', 'benchmark', 'reasoning',
  'multimodal', 'robot', 'robotics', 'chip', 'gpu', 'inference', 'enterprise',
  'safety', 'regulation', 'funding', 'acquisition', 'launch', 'release',
  'product', 'startup', 'developer', 'api', 'research'
];

const CATEGORY_RULES = [
  ['Product', ['launch', 'release', 'product', 'app', 'tool', 'agent']],
  ['Model', ['model', 'benchmark', 'reasoning', 'multimodal', 'open source']],
  ['Infrastructure', ['chip', 'gpu', 'inference', 'data center', 'cloud']],
  ['Business', ['funding', 'startup', 'acquisition', 'enterprise', 'revenue']],
  ['Policy', ['safety', 'policy', 'regulation', 'copyright', 'law']]
];

const stripTags = (value = '') =>
  decodeEntities(value)
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const decodeEntities = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/');

const pick = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? stripTags(match[1]) : '';
};

const pickLink = (entry) => {
  const href = entry.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)?.[1];
  if (href) return decodeEntities(href);
  return pick(entry, 'link');
};

const parseFeed = (xml, source) => {
  const chunks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];
  return chunks.map((entry) => {
    const title = pick(entry, 'title');
    const summary = pick(entry, 'description') || pick(entry, 'summary') || pick(entry, 'content');
    const publishedRaw = pick(entry, 'pubDate') || pick(entry, 'published') || pick(entry, 'updated');
    const published = publishedRaw ? new Date(publishedRaw) : new Date();
    return {
      title,
      source: source.name,
      sourceWeight: source.weight,
      official: Boolean(source.official),
      url: pickLink(entry),
      publishedAt: Number.isNaN(published.valueOf()) ? new Date().toISOString() : published.toISOString(),
      rawSummary: summary
    };
  }).filter((item) => item.title && item.url);
};

const fetchSource = async (source) => {
  const response = await fetch(source.url, {
    headers: {
      'user-agent': 'Ryanzr AI News Agent/1.0 (+https://ryanzr.com/ai-news/)'
    }
  });
  if (!response.ok) throw new Error(`${source.name}: ${response.status}`);
  return parseFeed(await response.text(), source);
};

const scoreItem = (item) => {
  const text = `${item.title} ${item.rawSummary}`.toLowerCase();
  const termScore = IMPORTANT_TERMS.reduce((sum, term) => sum + (text.includes(term) ? 2 : 0), 0);
  const ageHours = Math.max(0, (Date.now() - new Date(item.publishedAt).valueOf()) / 36e5);
  const recencyScore = Math.max(0, 18 - ageHours / 6);
  return item.sourceWeight + termScore + recencyScore + (item.official ? 2 : 0);
};

const categoryFor = (item) => {
  const text = `${item.title} ${item.rawSummary}`.toLowerCase();
  return CATEGORY_RULES.find(([, terms]) => terms.some((term) => text.includes(term)))?.[0] || 'Industry';
};

const tagsFor = (item) => {
  const text = `${item.title} ${item.rawSummary}`.toLowerCase();
  const tags = IMPORTANT_TERMS.filter((term) => text.includes(term)).slice(0, 3);
  return tags.length ? tags : ['AI'];
};

const sentence = (text) => {
  const clean = stripTags(text);
  const match = clean.match(/^(.{36,180}?[.!?。！？])\s/);
  return match ? match[1] : clean.slice(0, 160);
};

const fallbackSummary = (item) => {
  const first = sentence(item.rawSummary);
  if (first) return `${item.source} 关注了「${item.title}」。原文要点：${first}`;
  return `${item.source} 发布了「${item.title}」这条 AI 行业动态，值得结合原文继续判断其产品、技术或商业影响。`;
};

const fallbackOverview = (item) => {
  const first = sentence(item.rawSummary);
  return first || `${item.source} 发布了关于「${item.title}」的最新动态。`;
};

const summarizeWithOpenAI = async (items) => {
  if (!process.env.OPENAI_API_KEY) return null;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: '你是一个谨慎的中文 AI 行业新闻编辑。只根据输入材料写摘要，不编造事实。输出严格 JSON。'
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: '为每条新闻写中文 summary 和 overview。summary 50-90 字；overview 用一行 20-45 字直接概述发生了什么，不评价意义，不使用“值得关注”等套话。',
            items: items.map((item) => ({
              title: item.title,
              source: item.source,
              category: categoryFor(item),
              url: item.url,
              rawSummary: item.rawSummary
            }))
          })
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'ai_news_summaries',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    title: { type: 'string' },
                    summary: { type: 'string' },
                    overview: { type: 'string' }
                  },
                  required: ['title', 'summary', 'overview']
                }
              }
            },
            required: ['items']
          }
        }
      }
    })
  });

  if (!response.ok) throw new Error(`OpenAI summary failed: ${response.status} ${await response.text()}`);
  const payload = await response.json();
  const text = payload.output_text || payload.output?.flatMap((entry) => entry.content || []).find((part) => part.text)?.text;
  return JSON.parse(text).items;
};

const uniqueByUrl = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.url.replace(/[?#].*$/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const diversify = (items, size = 5, perSource = 2) => {
  const counts = new Map();
  const selected = [];
  for (const item of items) {
    const count = counts.get(item.source) || 0;
    if (count >= perSource) continue;
    selected.push(item);
    counts.set(item.source, count + 1);
    if (selected.length === size) return selected;
  }
  return selected.length === size ? selected : items.slice(0, size);
};

const main = async () => {
  const settled = await Promise.allSettled(SOURCES.map(fetchSource));
  const failures = settled.filter((result) => result.status === 'rejected');
  failures.forEach((failure) => console.warn(failure.reason.message));

  const candidates = uniqueByUrl(settled.flatMap((result) => result.status === 'fulfilled' ? result.value : []))
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score);

  const selected = diversify(candidates, 5, 2);

  if (selected.length === 0) throw new Error('No AI news candidates were fetched.');

  let aiSummaries = null;
  try {
    aiSummaries = await summarizeWithOpenAI(selected);
  } catch (error) {
    console.warn(error.message);
  }

  const summaryByTitle = new Map((aiSummaries || []).map((item) => [item.title, item]));
  const payload = {
    updatedAt: new Date().toISOString(),
    timezone: 'Asia/Shanghai',
    generatedBy: 'scripts/update-ai-news.mjs',
    edition: process.env.GITHUB_RUN_ID ? `github-${process.env.GITHUB_RUN_ID}` : 'local',
    items: selected.map((item, index) => {
      const ai = summaryByTitle.get(item.title);
      return {
        rank: index + 1,
        title: item.title,
        source: item.source,
        category: categoryFor(item),
        publishedAt: item.publishedAt.slice(0, 10),
        summary: ai?.summary || fallbackSummary(item),
        overview: ai?.overview || fallbackOverview(item),
        links: [{ label: '原文', url: item.url }],
        tags: tagsFor(item)
      };
    })
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${payload.items.length} items to ${outputPath}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
