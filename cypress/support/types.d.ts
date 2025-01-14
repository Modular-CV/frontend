import { type MemoryRouterProps } from 'react-router'
import type { MountOptions, MountReturn } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps },
      ): Cypress.Chainable<MountReturn>
    }
  }
}
