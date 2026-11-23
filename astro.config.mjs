import { defineConfig, envField, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import ogPreview from './src/integrations/og-preview';

export default defineConfig({
  site: 'https://rhys.dev',
  adapter: vercel(),
  integrations: [mdx(), tailwind(), ogPreview()],
  image: {
    service: { entrypoint: './src/lib/image-service.ts' },
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      GOOGLE_CLIENT_ID: envField.string({ context: 'server', access: 'secret' }),
      GOOGLE_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret' }),
      SESSION_SECRET: envField.string({ context: 'server', access: 'secret', min: 32 }),
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-inter',
        weights: [400, 500, 600],
        fallbacks: ['sans-serif'],
        display: 'optional',
      },
      {
        provider: fontProviders.google(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains-mono',
        weights: [400],
        fallbacks: ['monospace'],
        display: 'optional',
      },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
