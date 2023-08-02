import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import viteEslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteEslint({
            failOnError: false,
        }),
    ],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
