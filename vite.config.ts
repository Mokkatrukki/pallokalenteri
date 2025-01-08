import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig as defineVitestConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base: '/pallokalenteri/',
  }),
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: [...configDefaults.exclude, 'e2e/*']
    }
  })
)
