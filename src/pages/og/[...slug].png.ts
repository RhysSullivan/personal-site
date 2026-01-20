import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = await getCollection("blog");
  const ideas = await getCollection("ideas");
  const projects = await getCollection("projects");
  const photos = await getCollection("photos");

  const pages = [
    { slug: "index", title: "Rhys Sullivan", description: "Software engineer at Vercel", type: "home" },
    { slug: "blog", title: "Blog", description: "", type: "section" },
    { slug: "ideas", title: "Ideas", description: "", type: "section" },
    { slug: "projects", title: "Projects", description: "", type: "section" },
    { slug: "photos", title: "Space Photos", description: "", type: "section" },
    ...blog.map((post) => ({ slug: `blog/${post.slug}`, title: post.data.title, description: post.data.description, type: "blog" })),
    ...ideas.map((idea) => ({ slug: `ideas/${idea.slug}`, title: idea.data.title, description: idea.data.description, type: "idea" })),
    ...projects.map((project) => ({ slug: `projects/${project.slug}`, title: project.data.title, description: project.data.description, type: "project" })),
    ...photos.map((photo) => ({ slug: `photos/${photo.slug}`, title: photo.data.title, description: "", type: "photo" })),
  ];

  return pages.map(({ slug, title, description, type }) => ({
    params: { slug },
    props: { title, description, type },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.title, props.description, props.type);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
