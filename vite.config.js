import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({mode}) => ({
    base: mode === 'production'
        ? '/SmartGrow_Frontend/'
        : '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
}))