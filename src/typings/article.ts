export type Article = {
  id: string
  type: string
  permalinks: Array<{ locale: string; content: string }>
  content: {
    title: Array<{ locale: string; content: string }>
    featuredImage: {
      id: string
      title: string
      url: string
    }
  }
}
