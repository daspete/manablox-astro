export enum QueryFilterOption {
  Contains = 'Contains',
  ContainsLocalized = 'ContainsLocalized',
  Equals = 'Equals',
  EqualsLocalized = 'EqualsLocalized',
  GreaterThan = 'GreaterThan',
  GreaterThanOrEqual = 'GreaterThanOrEqual',
  In = 'In',
  LessThan = 'LessThan',
  LessThanOrEqual = 'LessThanOrEqual',
  NotContains = 'NotContains',
  NotEquals = 'NotEquals',
  NotIn = 'NotIn'
}

export enum QueryFilterType {
  And = 'And',
  Or = 'Or'
}

export type QueryDtoItem = {
  fieldName: string
  fieldType?: string
  locale?: string
  option?: QueryFilterOption
  value?: string
  type?: QueryFilterType
}

export type QueryDto = {
  filters: Array<QueryDtoItem>
}
