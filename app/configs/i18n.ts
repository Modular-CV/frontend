import i18next, { type i18n, type TFunction } from 'i18next'
import LanguageDetector, {
  type DetectorOptions,
} from 'i18next-browser-languagedetector'
import Backend, { type HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { Language } from '~/types'

const viteOrigin = import.meta.env.VITE_ORIGIN

const i18n = () => {
  let i18n: Promise<TFunction> | null = null

  /**
   * Initializes the i18n instance and specifies the origin path for the `loadPath`.
   *
   * @param {string} [origin] - The origin path (e.g., http://localhost:5173).
   *                            Defaults to `import.meta.env.VITE_ORIGIN`.
   */
  const init = (origin = viteOrigin) => {
    if (i18n) return

    i18n = i18next
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init<HttpBackendOptions & DetectorOptions>({
        supportedLngs: Object.keys(Language),
        load: 'currentOnly',
        fallbackLng: 'en-US',
        backend: {
          loadPath: origin + '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
          useSuspense: false,
        },
      })

    return i18n
  }

  return {
    init,
    get t() {
      return i18n
    },
  }
}

export default i18n()
