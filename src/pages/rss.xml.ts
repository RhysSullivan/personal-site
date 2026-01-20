import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [blog, photos, ideas, projects] = await Promise.all([
    getCollection('blog'),
    getCollection('photos'),
    getCollection('ideas'),
    getCollection('projects'),
  ]);

  const site = context.site ?? new URL('https://rhys.dev');

  const blogItems = blog
    .filter((post) => !post.data.draft)
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    }));

  const photoItems = photos.map((photo) => {
    const imgSrc = new URL(photo.data.image.src, site).href;
    return {
      title: photo.data.title,
      description: photo.data.alt,
      pubDate: photo.data.date,
      link: `/photos/${photo.slug}/`,
      content: `<img src="${imgSrc}" alt="${photo.data.alt}" /><p>${photo.data.alt}</p>`,
    };
  });

  const ideaItems = ideas.map((idea) => ({
    title: idea.data.title,
    description: idea.data.description,
    pubDate: idea.data.date,
    link: `/ideas/${idea.slug}/`,
  }));

  const projectItems = projects.map((project) => ({
    title: project.data.title,
    description: project.data.description,
    pubDate: project.data.date,
    link: `/projects/${project.slug}/`,
  }));

  const allItems = [...blogItems, ...photoItems, ...ideaItems, ...projectItems]
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Rhys Sullivan',
    description: 'Blog posts, space photos, ideas, and projects.',
    site: site,
    items: allItems,
  });
}
