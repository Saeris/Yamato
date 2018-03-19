import { camelCase } from "lodash"

export const create = async (parent, args, context, ast) => {
  const { name, sqlTable, fields } = getNamedType(ast.returnType)._typeConfig
  const model = sqlTable || camelCase(name)
  try {
    const nestedFields = Object.entries(fields())
      .filter(([field, props]) => !!props?.input && (!!props?.sqlJoin || !!props?.junction))
    console.info(`Parent:`, parent)
    console.info(`Args:`, args)
    //console.info(`Contenxt:`, context)
    //console.info(`AST Info:`, ast)
    console.info(`Parent Fields:`, fields())
    console.info(`Nested Fields:`, nestedFields)
    info(`Creating rows on Model: ${model} with input:`, args.input)
    const results = await Promise.all(args.input.map(data => context[model].findOrCreate(data, data)))
    info(`Resolved Mutation: create ${model} with results:`, results.map(result => result.toJSON()))
    return results.map(result => result.toJSON())
  } catch (err) {
    error(`Failed to run Mutation: create ${model}`, err)
    return null
  }
}
