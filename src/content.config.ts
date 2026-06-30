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
    draft: z.boolean().default(false),
    aiTranslated: z.boolean().default(false)
  })
});

export const collections = { writing };
