import { isObject } from "lodash"
import { invariant, missingArgument, cache, list, nonNull } from "./"
import { Combination } from "@/types/enums"

/**
 * Uses the 'filter' field properties of a type definition to create a filter input
 * filter must be an object with the same properties as a regular graphql field,
 * ie: { type: new GqlNonNull(new GqlString) } <- filters by a string (required)
 * @param  {[type]} type [description]
 * @return {Filter}      [description]
 */
export function createFilter(type) {
  invariant(isObject(type), missingArgument({ type }, `object`))
  const typeName = type._typeConfig.name
  try {
    const filterName = `${typeName.toLowerCase()}Filter`
    const enumName = `${filterName}Values`
    return {
      filter: {
        type: cache(filterName, () => new GqlInput({
          name: filterName,
          description: `Used to filter ${typeName} results.`,
          fields: () => ({
            conditions: {
              type: cache(enumName, () => new GqlInput({
                name: enumName,
                description: `Fields by which ${typeName} can be filtered.`,
                fields: () => Object.entries(type._typeConfig.fields())
                  .filter(([name, props]) => !!props.filter)
                  .reduce((hash, [name, props]) => {
                    hash[name] = props.filter
                    return hash
                  }, {})
              })) |> nonNull |> list,
              description: `A list of conditions by which to filter.`
            },
            combination: {
              type: Combination,
              description: `Operator by which to combine conditions.`,
              defaultValue: `AND`
            }
          })
        })),
        description: `Filters the results by a set of conditions.`
      }
    }
  } catch (err) {
    error(`Failed to run createFilter: ${typeName}`, err)
  }
}
