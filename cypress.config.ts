import { defineConfig } from 'cypress'
import viteConfig from './cypress.vite.config'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },

  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
})
