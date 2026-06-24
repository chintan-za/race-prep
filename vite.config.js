import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: change this to match your GitHub repo name exactly,
  // e.g. if your repo is github.com/yourname/race-prep, use '/race-prep/'
  base: '/race-prep/',
})
