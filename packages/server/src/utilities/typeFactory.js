import { isString, isObject, isFunction, camelCase } from "lodash"
import {
  createUpdateMethods,
  createFilter,
  createInput,
  createOrder,
  create,
  read,
  update,
  orderBy,
  where,
  invariant,
  missingArgument,
  list,
  nonNull,
  wrapInput
} from "./"
import { Node, nodeFields, Timestamps, timestampFields } from "@/types/interfaces"

export const typeFactory = ({ name, description, fields, interfaces, sqlTable, isTable = true, node = true, timestamps = true }) => {
  invariant(isString(name), missingArgument({ name }, `string`))
  invariant((isObject(fields) || isFunction(fields)), missingArgument({ fields }, `object`))
  try {
    info(`Creating Type ${name}...`)
    const Definition = new GqlObject({
      name,
      description,
      interfaces: [
        ...(node ? [Node] : []),
        ...(isTable && timestamps ? [Timestamps] : []),
        ...(interfaces ? Array.from(interfaces.keys()) : [])
      ],
      sqlTable: isTable && sqlTable ? sqlTable : camelCase(name),
      ...(isTable ? { uniqueKey: `id` } : {}),
      ...(isTable && timestamps ? { timestamps: table => table.timestamps() } : {}),
      fields: () => ({
        ...(node ? nodeFields : {}),
        ...(timestamps ? timestampFields : {}),
        ...(interfaces
          ? Array.from(interfaces.values())
            .reduce((hash, interfaceFields) => ({ ...interfaceFields, ...hash }), {})
          : {}),
        ...fields(),
        ...createUpdateMethods(name, fields())
      })
    })

    info(`Creating connection...`)
    const { connectionType: Connection } = connectionDefinitions({ nodeType: Definition })
    info(`Creating filter...`)
    const Filter = createFilter(Definition)
    info(`Creating input...`)
    const Input = createInput(Definition)
    info(`Creating order...`)
    const Order = createOrder(Definition)

    info(`Creating queries...`)
    const Queries = {
      [`${name}`]: {
        type: Definition |> list,
        description: `Returns an ${name}.`,
        args: { ...Filter, ...Order },
        where,
        orderBy,
        resolve: read
      }
    }

    info(`Creating mutations...`)
    const Mutations = {
      [`create${name}`]: {
        type: Definition |> list,
        description: `Creates a new ${name}`,
        args: Input |> nonNull |> list |> wrapInput,
        resolve: (parent, args, context, ast) => create(Definition, args, context, ast)
      },
      [`update${name}`]: {
        type: Definition |> list,
        description: `Updates an existing ${name}, creates it if it does not already exist`,
        args: { inputs: {
          type: new GqlInput({
            name: `update${name}Input`,
            fields: () => ({
              id: { type: GqlID |> nonNull },
              ...Input |> nonNull |> wrapInput
            })
          }) |> nonNull |> list
        } },
        resolve: (parent, args, context) => update(Definition, args, context)
      }
    }
    info(`Finished creating Type: ${name}!`)
    return { Definition, Connection, Filter, Input, Order, Queries, Mutations }
  } catch (err) {
    error(`Failed to run typeFactory! \n`, err)
  }
}
