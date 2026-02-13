import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://king-movie.vercel.app',
  integrations: [tailwind()],
  output: 'static'
});
