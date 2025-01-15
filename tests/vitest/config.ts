import { defineConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    alias: {
      '~': new URL('../../app', import.meta.url).pathname,
    },
    setupFiles: ['./tests/vitest/setup.ts'],
  },
})

export default config
