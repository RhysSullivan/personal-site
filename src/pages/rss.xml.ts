import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [blog, photos, ideas] = await Promise.all([
    getCollection('blog'),
    getCollection('photos'),
    getCollection('ideas'),
  ]);

  const blogItems = blog
    .filter((post) => !post.data.draft)
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    }));

  const photoItems = photos.map((photo) => ({
    title: photo.data.title,
    description: photo.data.alt,
    pubDate: photo.data.date,
    link: `/photos/${photo.slug}/`,
  }));

  const ideaItems = ideas.map((idea) => ({
    title: idea.data.title,
    description: idea.data.description,
    pubDate: idea.data.date,
    link: `/ideas/${idea.slug}/`,
  }));

  const allItems = [...blogItems, ...photoItems, ...ideaItems]
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Rhys Sullivan',
    description: 'Blog posts, space photos, and ideas.',
    site: context.site ?? 'https://rhys.dev',
    items: allItems,
  });
}
