import { camelCase } from "lodash"

export const update = async ({ _typeConfig }, { inputs }, context) => {
  const model = _typeConfig.sqlTable || camelCase(_typeConfig.name)
  try {
    info(`Updating rows on Model: ${model} with inputs:`, inputs)
    const results = await Promise.all(inputs.map(({ id, input }) => context[model].update(input, { id })))
    info(`Resolved Mutation: update ${model} with results:`, results.map(result => result.toJSON()))
    return results.map(result => result.toJSON())
  } catch (err) {
    error(`Failed to run Mutation: update ${model}`, err)
    return null
  }
}
