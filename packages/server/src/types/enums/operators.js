export const Operators = {
  type: new GqlEnum({
    name: `Operators`,
    values: {
      gt: {},
      gte: {},
      eq: {},
      lte: {},
      lt: {}
    }
  }),
  description: `An operator ( >, >=, =, <=, < ) used to filter a field by comparing it to the 'value' argument. (Optional) Defaults to eq (equals / =)`
}
