import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nano-tuner/',
  build: {
    copyPublicDir: true,
		rollupOptions: {
			output: {
				entryFileNames: `assets/index.js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: (info) => {
					if (info.names.includes("styles.css")) {
						return "index.css";
					}
					return 'assets/[name][extname]';
				},
			},
		},
  },
})
