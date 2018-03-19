export const nonNull = input => (input ? new GqlNonNull(input) : input)
