import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import ogPreview from './src/integrations/og-preview';

export default defineConfig({
  site: 'https://rhys.dev',
  integrations: [mdx(), tailwind(), ogPreview()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
