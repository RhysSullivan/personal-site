import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import ogPreview from './src/integrations/og-preview';

export default defineConfig({
  site: 'https://rhys.dev',
  adapter: vercel(),
  integrations: [mdx(), tailwind(), ogPreview()],
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      GOOGLE_CLIENT_ID: envField.string({ context: 'server', access: 'secret' }),
      GOOGLE_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret' }),
      SESSION_SECRET: envField.string({ context: 'server', access: 'secret', min: 32 }),
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
