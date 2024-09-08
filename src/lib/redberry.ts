import { ApolloClient, InMemoryCache, type DocumentNode, type NormalizedCacheObject } from '@apollo/client/core'
import { GRAPHQL_URL } from 'astro:env/client'

import menusQuery from '@graphql/queries/menus.graphql'
import contentlistQuery from '@graphql/queries/contentlist.graphql'

import type { Menu } from '@typings/menu'
import type { QueryDtoItem } from '@typings/querydto'
import type { Article } from '@typings/article'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

class Redberry {
  client: ApolloClient<NormalizedCacheObject>

  menus: Array<Menu> = []

  constructor() {
    this.client = client
  }

  async initialFetch() {
    await this.fetchMenus(['header-menu']);
  }

  async fetchMenus(menuNames: Array<string>) {
    this.menus = await this.singleQuery(menusQuery, {
      query: {
        filters: [
          { fieldName: 'content.technicalName', value: menuNames.join(','), option: 'In' }
        ]
      },
      locales: ['de']
    })
  }

  async fetchContentlist(filters: Array<QueryDtoItem>, page: number = 1, size: number = 25) {
    const contentlist: { total: number, items: Array<Article> } = await this.singleQuery(contentlistQuery, {
      query: {
        filters,
        limit: size,
        offset: (page - 1) * size
      },
      locales: ['de']
    })
    
    return this.stripAlias(contentlist)
  }

  getMenu(technicalName: string) {
    return this.menus.find((menu) => menu.content.technicalName === technicalName)
  }

  async singleQuery(query: DocumentNode, variables = {}) {
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

  stripAlias<T extends object>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map((v: object) => this.stripAlias(v)) as unknown as T;
    }

    return Object.entries(obj)?.reduce<T>((acc, [key, value]: [key: string, value: unknown]) => {
        const strippedKey = key.replace(/.*FieldAlias/, '');

        const isObjectStrippable = typeof value === 'object' && value;

        if (Array.isArray(value)) {
            return {
                ...acc,
                [strippedKey]: (value as unknown[]).map((v) =>
                    isObjectStrippable && v && typeof v === 'object' ? this.stripAlias(v) : v
                )
            } as T;
        }
        return { ...acc, [strippedKey]: isObjectStrippable ? this.stripAlias(value) : value } as T;
    }, {} as T);
}
}

const redberry = new Redberry()

export default redberry
