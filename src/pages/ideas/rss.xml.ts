import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const ideas = (await getCollection('ideas'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Rhys Sullivan - Ideas',
    description: 'Ideas and experiments in various stages.',
    site: context.site ?? 'https://rhys.dev',
    items: ideas.map((idea) => ({
      title: idea.data.title,
      description: idea.data.description,
      pubDate: idea.data.date,
      link: `/ideas/${idea.slug}/`,
    })),
  });
}
