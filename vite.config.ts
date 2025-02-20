import { reactRouter } from '@react-router/dev/vite'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const MODE = process.env.NODE_ENV

export default defineConfig({
	plugins: [reactRouter(), tailwind()],
	server: {
		allowedHosts: ['.snehaa.store'],
		watch: {},
	},
	build: {
		cssMinify: MODE === 'production',
		sourcemap: true,
		assetsInlineLimit: (source: string) => {
			if (
				source.endsWith('sprite.svg') ||
				source.endsWith('favicon.svg') ||
				source.endsWith('apple-touch-icon.png')
			) {
				return false
			}
		},
	},
})
