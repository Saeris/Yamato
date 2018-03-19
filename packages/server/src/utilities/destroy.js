export const destroy = ({ _typeConfig }, { ids }, context) => {
  const model = _typeConfig.sqlTable || _typeConfig.name.toLowerCase()
  try {
    const results = ids.map(async id => {
      const result = await context[model].destroy({ id })
      return result.toJSON()
    })
    info(`Resolved Mutation: destroy ${model}`, results)
    return ids
  } catch (err) {
    error(`Failed to run Mutation: destroy ${model}`, err)
    return null
  }
}
