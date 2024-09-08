export type Menu = {
  id: string
  content: {
    technicalName: string
  }
  children: Array<{
    id: string
    permalinks: Array<{
      locale: string
      content: string
    }>
    content: {
      title: Array<{
        locale: string
        content: string
      }>
    }
  }>
}
