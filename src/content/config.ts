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
    cropArea: z.string().default("0% 0% 100% 100%"),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    date: z.coerce.date(),
    period: z.string().optional(),
    role: z.string().optional(),
    preview: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }).optional(),
    media: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('youtube'), id: z.string().regex(/^[\w-]{11}$/) }),
      z.object({
        kind: z.literal('recordings'),
        source: z.string().url(),
        clips: z.array(z.object({
          src: z.string(),
          poster: z.string(),
          title: z.string(),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
        })).nonempty(),
      }),
      z.object({
        kind: z.literal('animation'),
        src: z.string(),
        alt: z.string(),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
    ]).optional(),
  }),
});

export const collections = { blog, ideas, photos, projects };
