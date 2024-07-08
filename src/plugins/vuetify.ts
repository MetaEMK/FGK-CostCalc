/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { VuetifyOptions, createVuetify } from 'vuetify'

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const opts: VuetifyOptions = {
  theme: {
    defaultTheme: prefersDarkScheme.matches ? 'dark' : 'light',
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify(opts)

prefersDarkScheme.addEventListener('change', (e) => {
  console.log("CHANGING THEME")
  opts.theme = {
    defaultTheme: prefersDarkScheme.matches ? 'dark' : 'light',
  }
});