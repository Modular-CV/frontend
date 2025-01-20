/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string
  readonly VITE_API_URL: string
  readonly VITE_ORIGIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
