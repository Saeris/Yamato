import { isObject, camelCase } from "lodash"
import { invariant, missingArgument, cache, nonNull } from "./"
import { Sort } from "@/types/enums"

// Similar to createFilter, this will create an order input object that
// you can use in your query/field arguments to determine hwo the results
// should be sorted. It creates an enum from the given type so that the
// input object can't have arbitrary values and provides hints as to what
// fields a type can be ordered by in graphiql via it's autocomplete

export function createOrder(type) {
  invariant(isObject(type), missingArgument({ type }, `object`))
  const typeName = type._typeConfig.name
  const orderByName = `${camelCase(typeName)}OrderByInput`
  const enumName = `${camelCase(typeName)}OrderByFields`
  try {
    return {
      orderBy: {
        type: cache(orderByName, () => new GqlInput({
          name: orderByName,
          description: `Sorts the results ordered by the selected field.`,
          fields: () => ({
            field: {
              type: cache(enumName, () => new GqlEnum({
                name: enumName,
                description: `A list of field names that this type can be ordered by.`,
                values: Object.entries(type._typeConfig.fields())
                  .filter(([name, props]) => !!props?.sortable)
                  .reduce((hash, [name, props]) => {
                    hash[`${name}`] = {}
                    return hash
                  }, {})
              })) |> nonNull,
              description: `The field by which to sort the results. (Required)`
            },
            sort: {
              type: Sort,
              defaultValue: `asc`,
              description: `The direction by which to sort the results. (Optional, defaults to ascending)`
            }
          })
        })),
        description: `Sorts the results ordered by the selected field.`
      }
    }
  } catch (err) {
    error(`Failed to run createOrder: ${typeName}`, err)
  }
}
