import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // Map the 'require' function to 'vite/node_modules/@types/node/globals'
      // This allows CommonJS modules to be resolved correctly
      'require': 'vite/node_modules/@types/node/globals',
    },
  },
  optimizeDeps: {
    include: ['axios'],
  },
})
