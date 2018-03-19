import { isObject, camelCase } from "lodash"
import { invariant, missingArgument, cache } from "./"

// Uses the 'input' field properties of a type definition to generate an input
// object for that type. That object can then be used in mutations for creating
// or updating an instance of a type. input can either be 'true' or and object
// if set to 'true', it will use the type's existing field type property, otherwise
// it will use the properties passed to the object. This can be useful for when you
// want the input type to be different from the output type, such as for computed values

export function createInput(type) {
  invariant(isObject(type), missingArgument({ type }, `object`))
  const typeName = type._typeConfig.name
  const inputName = `${camelCase(typeName)}Input`
  try {
    return cache(inputName, () => new GqlInput({
      name: inputName,
      description: `Fields needed to create or update an instance of ${typeName}.`,
      fields: () => Object.entries(type._typeConfig.fields())
        .filter(([name, props]) => !!props?.input)
        .reduce((hash, [name, props]) => {
          if (isObject(props.input)) {
            hash[name] = {
              type: props?.input?.type || props.type,
              description: props?.description,
              defaultValue: props.input?.defaultValue
            }
          } else {
            hash[name] = props
          }
          return hash
        }, {})
    }))
  } catch (err) {
    error(`Failed to run createInput: ${typeName}`, err)
  }
}

export const wrapInput = input => ({ input: { type: input } })
