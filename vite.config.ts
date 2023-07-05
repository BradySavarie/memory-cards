import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@mui/styled-engine': resolve(
                __dirname,
                'node_modules/@mui/styled-engine-sc'
            ),
        },
    },
    base: '/memory-cards/',
    plugins: [react()],
});
