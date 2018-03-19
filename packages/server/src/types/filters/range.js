import { Operators } from "@/types/enums"

// Creates a Range input which can be used with GqlInt and GqlFloat fields
// in conjunction with createFilter, allowing you to do some more advanced
// filtering on numbers. usage:
// filter: { amount: { value: 500 operator: gte } } <- filters for values greater than 500
// filter: { amount: { min: 100 max: 150 } } <- filters for values between 100-150 (inclusive)
export const Range = {
  type: new GqlInput({
    name: `Range`,
    fields: () => ({
      value: {
        type: GqlFloat,
        description: `A number to compare a field against. Used with the 'operator' argument.`
      },
      min: {
        type: GqlFloat,
        description: `A number for the minimum (inclusive) range to compare against. Must be used together with the 'max' argument.`
      },
      max: {
        type: GqlFloat,
        description: `A number for the maximum (inclusive) range to compare against. Must be used together with the 'min' argument.`
      },
      operator: Operators
    })
  })
}

// Similarly, DateRange is an input that allows you to do complex filtering
// on GqlDate / GqlDateTime fields. All Dates need to be JavaScript dateTime
// strings
export const DateRange = {
  type: new GqlInput({
    name: `DateRange`,
    fields: () => ({
      date: {
        type: GqlDateTime,
        description: `A date to compare a field against. Used with the 'operator' argument.`
      },
      startDate: {
        type: GqlDateTime,
        description: `A date for the minimum (inclusive) date range to compare against. Must be used together with the 'endDate' argument.`
      },
      endDate: {
        type: GqlDateTime,
        description: `A date for the maximum (inclusive) date range to compare against. Must be used together with the 'startDate' argument.`
      },
      operator: Operators
    })
  })
}
