import { defineConfig } from 'vite';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import sassGlobImports from 'vite-plugin-sass-glob-import';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const jsFiles = Object.fromEntries(
  globSync('src/**/*.js', { ignore: ['node_modules/**','**/modules/**','**/dist/**']}).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const scssFiles = Object.fromEntries(
  globSync('src/assets/styles/pages/**/*.scss', { ignore: ['src/assets/styles/pages/**/_*.scss'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const htmlFiles = Object.fromEntries(
  globSync('src/**/*.html', { ignore: ['node_modules/**', '**/dist/**'] }).map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const inputObject = { ...scssFiles, ...jsFiles, ...htmlFiles };

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: inputObject,
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
            return 'assets/[name].[ext]';
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/styles/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/styles/main.scss';`,
      },
    },
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/'),
    },
  },
  plugins: [
    ViteEjsPlugin(),
    sassGlobImports()
  ],
  server: {
    port: 3000
  }
});
