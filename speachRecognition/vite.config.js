import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
    base: 'https://github.com/BenZionHasida/Speach_recognition/'

})
