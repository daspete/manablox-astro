import { defineConfig, envField } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'

export default defineConfig({
  devToolbar: {
    enabled: false
  },

  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [
    vue({}),
    tailwind({
      nesting: true
    })
  ],

  experimental: {
    env: {
      schema: {
        API_URL: envField.string({ context: 'server', access: 'public' }),
        GRAPHQL_URL: envField.string({ context: 'server', access: 'public' })
      }
    }
  }
})
