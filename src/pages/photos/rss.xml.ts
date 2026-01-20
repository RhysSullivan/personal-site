import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const photos = (await getCollection('photos'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = context.site ?? new URL('https://rhys.dev');

  return rss({
    title: 'Rhys Sullivan - Space Photos',
    description: 'Astrophotography and space photos captured from San Francisco.',
    site: site,
    items: photos.map((photo) => {
      const imgSrc = new URL(photo.data.image.src, site).href;
      return {
        title: photo.data.title,
        description: photo.data.alt,
        pubDate: photo.data.date,
        link: `/photos/${photo.slug}/`,
        content: `<img src="${imgSrc}" alt="${photo.data.alt}" /><p>${photo.data.alt}</p>`,
      };
    }),
  });
}
