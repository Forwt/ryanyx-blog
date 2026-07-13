import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['zh', 'en']),
    slug: z.string(),
    routeSlug: z.string(),
    translationKey: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
    aiTranslated: z.boolean().default(false)
  })
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['zh', 'en']),
    slug: z.string(),
    routeSlug: z.string(),
    translationKey: z.string(),
    coverageStart: z.coerce.date(),
    coverageEnd: z.coerce.date(),
    subject: z.string(),
    tags: z.array(z.string()).default([]),
    reportCount: z.number().int().nonnegative(),
    sourceCount: z.number().int().nonnegative(),
    readingTime: z.string(),
    stance: z.enum(['constructive', 'neutral', 'cautious']).default('neutral'),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
      note: z.string(),
      tone: z.enum(['positive', 'neutral', 'negative']).default('neutral')
    })).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    aiTranslated: z.boolean().default(false)
  })
});

export const collections = { writing, research };
