import { ApolloClient, InMemoryCache, type DocumentNode, type NormalizedCacheObject } from '@apollo/client/core'
import { GRAPHQL_URL } from 'astro:env/server'

console.log('GRAPHQL_URL:', GRAPHQL_URL)

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

class Redberry {
  client: ApolloClient<NormalizedCacheObject>

  constructor() {
    this.client = client
  }

  async query(query: DocumentNode, variables = {}) {
    const { data } = await this.client.query({
      query,
      variables
    })

    const resultField = this.getResultSelectionField(query)
    if (resultField) {
      return data[resultField]
    }
    return data
  }

  getResultSelectionField(query: DocumentNode) {
    const operationDefinition = query.definitions.find((definition) => definition.kind === 'OperationDefinition')
    if (operationDefinition) {
      const field = operationDefinition.selectionSet.selections[0]
      if (field && field.kind === 'Field') {
        return field.name.value
      }
    }

    return null
  }
}

const redberry = new Redberry()

export default redberry
