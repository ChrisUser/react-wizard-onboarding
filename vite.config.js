import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
    if (mode === 'docs') {
        return {
            build: { outDir: 'docs' },
            base: '/react-wizard-onboarding/'
        }
    }
    if (mode === 'production') {
        return {
            plugins: [react(), dts({ include: ['lib'] })],
            build: {
                lib: {
                    // Could also be a dictionary or array of multiple entry points
                    entry: resolve(__dirname, 'lib/main.ts'),
                    name: 'react-wizard-onboarding',
                    // the proper extensions will be added
                    fileName: 'main'
                },
                rollupOptions: {
                    // make sure to externalize deps that shouldn't be bundled
                    // into your library
                    external: ['react', 'react-dom', 'react/jsx-runtime'],
                    output: {
                        globals: {
                            react: 'React'
                        }
                    }
                }
            }
        }
    }
})
