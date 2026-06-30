import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ryanzr.com',
  trailingSlash: 'always',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false
    }
  }
});
