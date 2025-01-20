import { defineConfig } from 'cypress'
import viteConfig from './cypress.vite.config'

export default defineConfig({
  port: 5000,
  supportFolder: './tests/cypress/support',
  downloadsFolder: './tests/cypress/downloads',
  component: {
    indexHtmlFile: './tests/cypress/support/component-index.html',
    supportFile: './tests/cypress/support/component.tsx',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },
  e2e: {
    supportFile: './tests/cypress/support/e2e.ts',
  },
})
