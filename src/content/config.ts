import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const ideas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['thinking', 'exploring', 'building', 'shipped', 'abandoned']).default('thinking'),
    date: z.coerce.date(),
  }),
});

const photos = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    image: image(),
    alt: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, ideas, photos };
