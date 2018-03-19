import { isString, isObject, camelCase } from "lodash"
import { invariant, missingArgument, cache, update } from "./"

export const createUpdateMethods = (typeName, fields) => {
  invariant(isString(typeName), missingArgument({ typeName }, `string`))
  invariant(isObject(fields), missingArgument({ fields }, `object`))
  try {
    return cache(typeName, () => Object.entries(fields)
      .filter(([field, props]) => props?.mutable)
      .reduce((hash, [field, props]) => {
        info(`Creating Method for ${field} on ${typeName}`)
        hash[`${camelCase(`update ${field}`)}`] = {
          type: props.type,
          description: `Updates an existing ${typeName} ${field} field`,
          args: { [field]: isObject(props?.input) && props?.input || { type: props.type } },
          resolve: async ({ id, ...parent }, input, context) => {
            const _typeConfig = isLeafType(getNamedType(props.type)) ? props.type._typeConfig : parent._typeConfig
            const results = await update({ _typeConfig }, { id, input }, context)
            return results[field]
          }
        }
        return hash
      }, {}))
  } catch (err) {
    error(`Failed to run createUpdateMethods! \n`, err)
  }
}
