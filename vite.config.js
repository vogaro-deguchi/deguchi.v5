import { defineConfig } from 'vite';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import sassGlobImports from 'vite-plugin-sass-glob-import';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const jsFiles = Object.fromEntries(
  globSync('src/assets/scripts/**/*.js', { ignore: ['node_modules/**','**/modules/**','**/dist/**,']}).map(file => [
    path.relative(
      'src/assets/',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const scssFiles = Object.fromEntries(
  globSync('src/assets/styles/**/*.scss', { ignore: ['src/assets/styles/**/_*.scss'] }).map(file => [
    path.relative(
      'src/assets/',
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
        assetFileNames: `assets/[name].[ext]`
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
