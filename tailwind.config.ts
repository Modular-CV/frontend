import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { CSSRuleObject } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import { ButtonStyle, InputStyle } from './app/types' // Alias is not working '~/types'

const inputs: CSSRuleObject = {
  input: {
    '@apply rounded-md border py-2 px-4 shadow-md font-medium transition duration-200 focus:ring-1 focus:outline-none':
      {},
  },
  [`input:where(.${InputStyle.PRIMARY})`]: {
    '@apply bg-white text-gray-800 border-gray-300 focus:ring-blue-300 focus:border-blue-500 hover:border-gray-400':
      {},
  },
  [`input:where(.${InputStyle.SECONDARY})`]: {
    '@apply bg-gray-100 text-gray-800 border-gray-300 focus:ring-gray-400 focus:border-gray-500 hover:border-gray-400':
      {},
  },
  [`input:where(.${InputStyle.TERTIARY})`]: {
    '@apply bg-transparent text-blue-600 border-transparent focus:ring-blue-300 focus:border-blue-500 hover:bg-blue-50':
      {},
  },
  [`input:where(.${InputStyle.ERROR})`]: {
    '@apply bg-red-50 text-red-600 border-red-500 focus:ring-red-300 focus:border-red-600 hover:border-red-400':
      {},
  },
  [`input:where(.${InputStyle.SUCCESS})`]: {
    '@apply bg-green-50 text-green-600 border-green-500 focus:ring-green-300 focus:border-green-600 hover:border-green-400':
      {},
  },
  [`input:where(.${InputStyle.DISABLED})`]: {
    '@apply bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed shadow-none':
      {},
  },
}

const inputsPlugin = plugin(({ addComponents }) => {
  addComponents(inputs)
})

const buttons: CSSRuleObject = {
  '.btn': {
    '@apply rounded-md border py-2 px-4 shadow-md font-medium transition duration-200 focus:ring-1':
      {},
  },
  [`.btn:where(.${ButtonStyle.PRIMARY})`]: {
    '@apply bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-300':
      {},
  },
  [`.btn:where(.${ButtonStyle.SECONDARY})`]: {
    '@apply bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400':
      {},
  },
  [`.btn:where(.${ButtonStyle.TERTIARY})`]: {
    '@apply bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-300':
      {},
  },
  [`.btn:where(.${ButtonStyle.ERROR})`]: {
    '@apply bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-300':
      {},
  },
  [`.btn:where(.${ButtonStyle.SUCCESS})`]: {
    '@apply bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-300':
      {},
  },
  [`.btn:where(.${ButtonStyle.DISABLED})`]: {
    '@apply bg-gray-100 text-gray-400 cursor-not-allowed shadow-none': {},
  },
}

const buttonsPlugin = plugin(({ addComponents }) => {
  addComponents(buttons)
})

const config: Config = {
  content: [
    './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
    './tests/cypress/support/**/*.{html, tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [
    forms({ strategy: 'class' }),
    typography,
    buttonsPlugin,
    inputsPlugin,
  ],
}

export default config
