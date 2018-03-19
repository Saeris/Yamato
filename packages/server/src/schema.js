import { destroy, nonNull, list } from "@/utilities"
import { nodeField } from "@/types/interfaces"
import * as Types from "./types"

export const schema = new GqlSchema({
  query: new GqlObject({
    name: `Query`,
    description: `The root query for implementing GraphQL queries.`,
    fields: () =>
      Object.assign(
        { node: nodeField },
        ...Object.values(Types)
          .filter(type => !!type.Queries)
          .map(type => type.Queries)
      )
  }),
  mutation: new GqlObject({
    name: `Mutation`,
    description: `The root query for implementing GraphQL mutations.`,
    fields: () =>
      Object.assign(
        {
          destroyNodesByID: {
            type: GqlID |> list,
            description: `Deletes Nodes by their IDs`,
            args: { ids: { type: GqlID |> nonNull |> list } },
            resolve: destroy
          }
        },
        ...Object.values(Types)
          .filter(type => !!type.Mutations)
          .map(type => type.Mutations)
      )
  })
})
