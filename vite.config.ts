import { defineConfig } from 'vite'
// @ts-ignore: module resolution for @vitejs/plugin-react doesn't match current tsconfig settings
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
