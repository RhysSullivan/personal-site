import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const photos = (await getCollection('photos'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Rhys Sullivan - Space Photos',
    description: 'Astrophotography and space photos captured from San Francisco.',
    site: context.site ?? 'https://rhys.dev',
    items: photos.map((photo) => ({
      title: photo.data.title,
      description: photo.data.alt,
      pubDate: photo.data.date,
      link: `/photos/${photo.slug}/`,
    })),
  });
}
