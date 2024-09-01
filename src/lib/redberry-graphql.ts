import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GRAPHQL_URL } from 'astro:env/server'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

export default client
