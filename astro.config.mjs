import { defineConfig, envField } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import graphqlLoader from 'vite-plugin-graphql-loader'

export default defineConfig({
  devToolbar: {
    enabled: false
  },

  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [
    vue({
      appEntrypoint: '/src/vue-app.ts'
    }),
    tailwind({
      nesting: true
    })
  ],
  vite: {
    plugins: [graphqlLoader()]
  },

  experimental: {
    env: {
      schema: {
        GRAPHQL_URL: envField.string({ context: 'client', access: 'public' })
      }
    }
  }
})
