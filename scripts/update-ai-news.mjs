import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputPath = resolve(root, 'src/data/ai-news.json');

const MAX_AGE_HOURS = Number(process.env.AI_NEWS_MAX_AGE_HOURS || 72);
const FUTURE_TOLERANCE_HOURS = 6;
const MIN_ITEMS = 5;
const REQUEST_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;

const SOURCES = [
  { name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml', weight: 10, official: true, aiFocused: true },
  { name: 'Google AI Blog', url: 'https://blog.google/technology/ai/rss/', weight: 9, official: true, aiFocused: true },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', weight: 8, official: true, aiFocused: true },
  { name: 'Microsoft Azure Blog', url: 'https://azure.microsoft.com/en-us/blog/feed/', weight: 7, official: true, aiFocused: false },
  { name: 'NVIDIA Blog', url: 'https://blogs.nvidia.com/feed/', weight: 7, official: true, aiFocused: false },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', weight: 8, aiFocused: true },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', weight: 7, aiFocused: true },
  { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', weight: 7, aiFocused: true },
  { name: 'Google News AI', url: 'https://news.google.com/rss/search?q=(AI+OR+%22artificial+intelligence%22+OR+LLM+OR+%22AI+agent%22)+when%3A3d&hl=en-US&gl=US&ceid=US%3Aen', weight: 6, aiFocused: true },
  { name: 'Hacker News AI', url: 'https://hnrss.org/newest?q=AI', weight: 5, aiFocused: true }
];

const AI_SIGNALS = [
  /\bartificial intelligence\b/i,
  /\bgenerative ai\b/i,
  /\bai\b/i,
  /\bllm(?:s)?\b/i,
  /\blarge language model(?:s)?\b/i,
  /\b(?:gpt|chatgpt|claude|gemini|copilot|openai|anthropic|mistral|llama|deepseek|qwen)\b/i,
  /\b(?:machine learning|deep learning|foundation model|multimodal|reasoning model|agentic)\b/i,
  /\b(?:ai agent|software agent|coding agent|computer-use agent|robotics|humanoid robot)\b/i
];

const TECHNICAL_SIGNALS = [
  /\bmodel(?:s)?\b/i,
  /\binference\b/i,
  /\btraining\b/i,
  /\bfine[- ]?tuning\b/i,
  /\bbenchmark(?:s)?\b/i,
  /\btoken(?:s)?\b/i,
  /\bembedding(?:s)?\b/i,
  /\bmultimodal\b/i,
  /\breasoning\b/i,
  /\bdata cent(?:er|re)\b/i,
  /\bGPU(?:s)?\b/i,
  /\bdeveloper API\b/i
];

const INDUSTRY_SIGNALS = [
  /\blaunch(?:ed|es|ing)?\b|\brelease(?:d|s)?\b|\bintroduc(?:ed|es|ing)\b/i,
  /\bproduct\b|\btool\b|\bplatform\b|\bAPI\b|\bapp\b|\bdevice\b|\bhardware\b/i,
  /\bstartup\b|\bfunding\b|\bvaluation\b|\bacquisition\b|\binvestment\b|\benterprise\b/i,
  /\bchip(?:s)?\b|\bGPU(?:s)?\b|\binference\b|\bcloud\b|\binfrastructure\b|\befficiency\b/i,
  /\bresearch\b|\bbenchmark(?:s)?\b|\bsafety\b|\bsecurity\b|\bregulation\b|\bpolicy\b/i,
  /\brobotics\b|\bautonomous\b|\bsmart speaker\b|\bdrug discovery\b/i
];

const IMPACT_SIGNALS = [
  { pattern: /\blaunch(?:ed|es|ing)?\b|\brelease(?:d|s)?\b|\bintroduc(?:ed|es|ing)\b/i, points: 7 },
  { pattern: /\bopen source\b|\bopen[- ]weight(?:s)?\b/i, points: 7 },
  { pattern: /\bfunding\b|\bvaluation\b|\bacquisition\b|\bdeal\b/i, points: 6 },
  { pattern: /\bbenchmark(?:s)?\b|\bstate[- ]of[- ]the[- ]art\b/i, points: 6 },
  { pattern: /\bproduct\b|\btool\b|\bAPI\b|\bdeveloper\b/i, points: 5 },
  { pattern: /\bsafety\b|\bsecurity\b|\bregulation\b|\bpolicy\b/i, points: 5 },
  { pattern: /\brobotics\b|\bhumanoid\b|\bautonomous\b/i, points: 4 }
];

const LOW_VALUE_SIGNALS = [
  /\bpodcast\b|\bnewsletter\b|\bopinion\b|\binterview\b/i,
  /\bjob(?:s)?\b|\bcareer(?:s)?\b|\bwebinar\b|\bevent\b/i,
  /\bhow to\b|\btutorial\b|\bguide\b/i,
  /\bsponsored\b|\bpartners?\b/i
];

const NOISE_SIGNALS = [
  /^how to\b/i,
  /\bpodcast\b|\bnewsletter\b|\bwebinar\b|\bjob(?:s)?\b|\bcareer(?:s)?\b/i,
  /\btutorial\b|\bguide\b|\bopinion\b|\binterview\b/i,
  /\bsponsored\b|\bpartners?\b/i,
  /\bschool\b|\bstudent(?:s)?\b|\bsummer camp\b|\bclassroom\b|\bcourse\b|\beducation\b/i,
  /\bpoints?:\s*[0-5]\b|\bcomments?:\s*0\b/i
];

const CATEGORY_RULES = [
  ['Policy', [/\bsafety\b|\bsecurity\b|\bregulation\b|\bpolicy\b|\bcopyright\b|\blaw\b/i]],
  ['Infrastructure', [/\bchip(?:s)?\b|\bGPU(?:s)?\b|\binference\b|\bdata cent(?:er|re)\b|\bcloud\b|\binfrastructure\b|\befficiency\b|\bperformance per watt\b/i]],
  ['Business', [/\bfunding\b|\bvaluation\b|\bstartup\b|\bacquisition\b|\benterprise\b|\brevenue\b/i]],
  ['Model', [/\bmodel(?:s)?\b|\bbenchmark(?:s)?\b|\breasoning\b|\bmultimodal\b|\bopen source\b/i]],
  ['Product', [/\blaunch(?:ed|es|ing)?\b|\brelease(?:d|s)?\b|\bproduct\b|\btool\b|\bagent\b|\bAPI\b/i]]
];

const TAG_RULES = [
  ['Agents', /\bagent(?:s|ic)?\b/i],
  ['Models', /\bmodel(?:s)?\b|\bLLM(?:s)?\b|\bGPT\b|\bClaude\b|\bGemini\b/i],
  ['Products', /\blaunch(?:ed|es|ing)?\b|\brelease(?:d|s)?\b|\bproduct\b|\btool\b/i],
  ['Open source', /\bopen source\b|\bopen[- ]weight(?:s)?\b/i],
  ['Robotics', /\brobotics\b|\bhumanoid\b/i],
  ['Business', /\bfunding\b|\bvaluation\b|\bacquisition\b|\bstartup\b/i],
  ['Infrastructure', /\bGPU(?:s)?\b|\binference\b|\bcloud\b|\bdata cent(?:er|re)\b/i]
];

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

const decodeEntities = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&#x2F;|&#x2f;/g, '/')
  .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)));

const stripTags = (value = '') => decodeEntities(value)
  .replace(/<!\[CDATA\[/g, '')
  .replace(/\]\]>/g, '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pick = (xml, tags) => {
  for (const tag of tags) {
    const escaped = escapeRegExp(tag);
    const match = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
    if (match) return stripTags(match[1]);
  }
  return '';
};

const pickLink = (entry) => {
  const href = entry.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i)?.[1];
  if (href) return decodeEntities(href.trim());
  return pick(entry, ['link', 'guid']);
};

const parsePublishedDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date;
};

const parseFeed = (xml, source) => {
  const chunks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];
  return chunks.map((entry) => {
    const published = parsePublishedDate(pick(entry, ['pubDate', 'published', 'updated', 'dc:date', 'dcterms:issued']));
    return {
      title: pick(entry, ['title']),
      source: source.name,
      sourceWeight: source.weight,
      official: Boolean(source.official),
      aiFocused: Boolean(source.aiFocused),
      url: pickLink(entry),
      publishedAt: published?.toISOString() || null,
      rawSummary: pick(entry, ['description', 'summary', 'content:encoded', 'content'])
    };
  }).filter((item) => item.title && item.url && item.publishedAt);
};

const fetchWithRetry = async (url, options = {}) => {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (response.ok) return response;
      if (![408, 425, 429, 500, 502, 503, 504].includes(response.status) || attempt === MAX_RETRIES) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
      if (attempt === MAX_RETRIES) break;
    } finally {
      clearTimeout(timeout);
    }
    await sleep(750 * attempt);
  }
  throw lastError || new Error('Request failed');
};

const fetchSource = async (source) => {
  try {
    const response = await fetchWithRetry(source.url, {
      headers: {
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
        'user-agent': 'Ryanyx AI News Agent/2.0 (+https://ryanzr-blog.pages.dev/ai-news/)'
      }
    });
    return parseFeed(await response.text(), source);
  } catch (error) {
    throw new Error(`${source.name}: ${error.message}`);
  }
};

const ageHours = (item) => (Date.now() - new Date(item.publishedAt).valueOf()) / 36e5;

const isFresh = (item) => {
  const age = ageHours(item);
  return age >= -FUTURE_TOLERANCE_HOURS && age <= MAX_AGE_HOURS;
};

const signalCount = (text, patterns) => patterns.reduce((count, pattern) => count + (pattern.test(text) ? 1 : 0), 0);

const isAiRelevant = (item) => {
  const text = `${item.title} ${item.rawSummary} ${item.source}`;
  const directSignals = signalCount(text, AI_SIGNALS);
  const technicalSignals = signalCount(text, TECHNICAL_SIGNALS);
  const industrySignals = signalCount(text, INDUSTRY_SIGNALS);
  return directSignals > 0 && (technicalSignals > 0 || industrySignals > 0 || (item.aiFocused && technicalSignals > 0));
};

const isNewsworthy = (item) => !NOISE_SIGNALS.some((pattern) => pattern.test(`${item.title} ${item.rawSummary}`));

const scoreItem = (item) => {
  const text = `${item.title} ${item.rawSummary} ${item.source}`;
  const directSignals = signalCount(text, AI_SIGNALS);
  const technicalSignals = signalCount(text, TECHNICAL_SIGNALS);
  const impactScore = IMPACT_SIGNALS.reduce((score, signal) => score + (signal.pattern.test(text) ? signal.points : 0), 0);
  const lowValuePenalty = LOW_VALUE_SIGNALS.reduce((score, pattern) => score + (pattern.test(text) ? 8 : 0), 0);
  const freshnessScore = Math.max(0, 24 - Math.max(0, ageHours(item)) / 3);
  return item.sourceWeight
    + (directSignals * 12)
    + (technicalSignals * 3)
    + impactScore
    + freshnessScore
    + (item.official ? 3 : 0)
    - lowValuePenalty;
};

const categoryFor = (item) => {
  const text = `${item.title} ${sentence(item.rawSummary)}`;
  return CATEGORY_RULES.find(([, patterns]) => patterns.some((pattern) => pattern.test(text)))?.[0] || 'Industry';
};

const tagsFor = (item) => {
  const text = `${item.title} ${sentence(item.rawSummary)}`;
  const tags = TAG_RULES.filter(([, pattern]) => pattern.test(text)).map(([tag]) => tag).slice(0, 4);
  return tags.length ? tags : ['AI'];
};

const sentence = (text) => {
  const clean = stripTags(text).replace(/\s+/g, ' ');
  const match = clean.match(/^(.{36,220}?[.!?。！？])(?:\s|$)/);
  return match ? match[1] : clean.slice(0, 180);
};

const normalizeUrl = (url) => url
  .replace(/[?#].*$/, '')
  .replace(/\/$/, '')
  .toLowerCase();

const normalizeTitle = (title) => title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();

const titleTokens = (title) => new Set(normalizeTitle(title).split(' ').filter((token) => token.length > 1));

const titleSimilarity = (left, right) => {
  if (left.size < 4 || right.size < 4) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.min(left.size, right.size);
};

const uniqueItems = (items) => {
  const seenUrls = new Set();
  const seenTitles = [];
  return items.filter((item) => {
    const url = normalizeUrl(item.url);
    const title = titleTokens(item.title);
    if (seenUrls.has(url) || seenTitles.some((seenTitle) => titleSimilarity(title, seenTitle) >= 0.86)) return false;
    seenUrls.add(url);
    seenTitles.push(title);
    return true;
  });
};

const selectTop = (items) => {
  const selected = [];
  const counts = new Map();
  for (const item of items) {
    if (selected.length === MIN_ITEMS) break;
    if (counts.get(item.source)) continue;
    selected.push(item);
    counts.set(item.source, 1);
  }
  for (const item of items) {
    if (selected.length === MIN_ITEMS) break;
    if (selected.some((selectedItem) => selectedItem.url === item.url)) continue;
    const count = counts.get(item.source) || 0;
    if (count >= 2) continue;
    selected.push(item);
    counts.set(item.source, count + 1);
  }
  return selected;
};

const fallbackCopy = (item) => {
  const first = sentence(item.rawSummary);
  const category = categoryFor(item);
  const categoryZh = {
    Product: '产品',
    Model: '模型',
    Infrastructure: '基础设施',
    Business: '商业',
    Policy: '政策',
    Industry: '行业'
  }[category] || '行业';
  const article = ['Infrastructure', 'Industry'].includes(category) ? 'an' : 'a';
  return {
    titleZh: `AI ${categoryZh}动态：${item.title}`,
    titleEn: item.title,
    summaryZh: `${item.source} 发布了一条与 AI 相关的${categoryZh}动态。原文要点：${first || `报道聚焦于 ${item.title}。`}`,
    summaryEn: `${item.source} reports ${article} ${category.toLowerCase()} development in AI. Key point from the source: ${first || `The report focuses on ${item.title}.`}`,
    overviewZh: `${item.source} 发布了关于「${item.title}」的最新动态。`,
    overviewEn: `${item.source} published a new update about “${item.title}”.`
  };
};

const translateToChinese = async (text) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(text.slice(0, 1800))}`;
  const response = await fetchWithRetry(url, {
    headers: { accept: 'application/json', 'user-agent': 'Ryanyx AI News Agent/2.0' }
  });
  const payload = await response.json();
  const translated = payload?.[0]?.map((part) => part?.[0] || '').join('').trim();
  if (!translated) throw new Error('Public translation returned no text.');
  return translated;
};

const buildFallbackCopy = async (item) => {
  const copy = fallbackCopy(item);
  try {
    const [titleZh, summaryZh, overviewZh] = await Promise.all([
      translateToChinese(item.title),
      translateToChinese(copy.summaryEn),
      translateToChinese(copy.overviewEn)
    ]);
    return { copy: { ...copy, titleZh, summaryZh, overviewZh }, translated: true };
  } catch (error) {
    console.warn(`Public Chinese translation failed for ${item.url}: ${error.message}`);
    return { copy, translated: false };
  }
};

const summarizeWithOpenAI = async (items) => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not configured; using bilingual fallback copy.');
    return null;
  }

  const response = await fetchWithRetry('https://api.openai.com/v1/responses', {
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
          content: 'You are a careful bilingual AI industry news editor. Use only the supplied source material. Do not invent facts, numbers, names, or implications. Return strict JSON.'
        },
        {
          role: 'user',
          content: JSON.stringify({
            task: 'For every item, write a faithful Chinese and English title, summary, and one-line overview. Chinese summary: 50-100 Chinese characters when possible. English summary: 35-70 words when possible. Overview: direct description of what happened, no empty praise or speculation.',
            items: items.map((item) => ({
              title: item.title,
              source: item.source,
              category: categoryFor(item),
              url: item.url,
              publishedAt: item.publishedAt,
              rawSummary: stripTags(item.rawSummary).slice(0, 2400)
            }))
          })
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'bilingual_ai_news',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              items: {
                type: 'array',
                minItems: MIN_ITEMS,
                maxItems: MIN_ITEMS,
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    url: { type: 'string' },
                    titleZh: { type: 'string' },
                    titleEn: { type: 'string' },
                    summaryZh: { type: 'string' },
                    summaryEn: { type: 'string' },
                    overviewZh: { type: 'string' },
                    overviewEn: { type: 'string' }
                  },
                  required: ['url', 'titleZh', 'titleEn', 'summaryZh', 'summaryEn', 'overviewZh', 'overviewEn']
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
  if (!text) throw new Error('OpenAI summary response did not contain output text.');
  return JSON.parse(text).items;
};

const main = async () => {
  const settled = await Promise.allSettled(SOURCES.map(fetchSource));
  const failures = settled.filter((result) => result.status === 'rejected');
  failures.forEach((failure) => console.warn(`Feed failed: ${failure.reason.message}`));

  const fetched = uniqueItems(settled.flatMap((result) => result.status === 'fulfilled' ? result.value : []));
  const fresh = fetched.filter(isFresh);
  const relevant = fresh.filter((item) => isAiRelevant(item) && isNewsworthy(item));
  const candidates = relevant
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score);
  const selected = selectTop(candidates);

  console.log(`Fetched ${fetched.length} unique items; ${fresh.length} are within ${MAX_AGE_HOURS}h; ${relevant.length} pass AI relevance; ${selected.length} selected.`);
  if (selected.length < MIN_ITEMS) {
    throw new Error(`Only ${selected.length} fresh AI-relevant items found; refusing to publish stale or unrelated news.`);
  }

  let aiSummaries = null;
  try {
    aiSummaries = await summarizeWithOpenAI(selected);
  } catch (error) {
    console.warn(`Bilingual summarization failed: ${error.message}`);
  }

  const summaryByUrl = new Map((aiSummaries || []).map((item) => [normalizeUrl(item.url), item]));
  let translationMode = aiSummaries ? 'openai' : 'fallback';
  if (!aiSummaries) {
    const fallbackResults = await Promise.all(selected.map((item) => buildFallbackCopy(item)));
    fallbackResults.forEach((result, index) => {
      summaryByUrl.set(normalizeUrl(selected[index].url), result.copy);
    });
    if (fallbackResults.every((result) => result.translated)) translationMode = 'google-fallback';
  }
  const payload = {
    updatedAt: new Date().toISOString(),
    timezone: 'Asia/Shanghai',
    freshnessHours: MAX_AGE_HOURS,
    translationMode,
    generatedBy: 'scripts/update-ai-news.mjs',
    edition: process.env.GITHUB_RUN_ID ? `github-${process.env.GITHUB_RUN_ID}` : 'local',
    items: selected.map((item, index) => {
      const copy = summaryByUrl.get(normalizeUrl(item.url)) || fallbackCopy(item);
      return {
        rank: index + 1,
        titleZh: copy.titleZh,
        titleEn: copy.titleEn || item.title,
        source: item.source,
        category: categoryFor(item),
        publishedAt: item.publishedAt.slice(0, 10),
        summaryZh: copy.summaryZh,
        summaryEn: copy.summaryEn,
        overviewZh: copy.overviewZh,
        overviewEn: copy.overviewEn,
        links: [{ labelZh: '阅读原文', labelEn: 'Read source', url: item.url }],
        tags: tagsFor(item)
      };
    })
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${payload.items.length} items to ${outputPath} (${translationMode} copy).`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
