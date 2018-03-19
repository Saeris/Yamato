import { typeFactory, junction, where, orderBy, list, nonNull, wrapInput } from "@/utilities"
import { StringList } from "./filters"
import { MatchConnection, MatchFilter, MatchOrder, MatchInput } from "./match"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Account`,
  description: `A Player's Battlenet Account Information.`,
  fields: () => ({
    alias: {
      type: GqlString |> nonNull,
      description: `An alias is the public visible username of an Account. This value can be changed by the Account owner.`,
      sqlColumn: `alias`,
      column: table => table.string(`alias`).notNullable().unique(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    bnetID: {
      type: GqlString |> nonNull,
      description: `The Battlenet Account ID. Not publicly visible.`,
      sqlColumn: `bnetID`,
      column: table => table.string(`bnetID`).notNullable().unique(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    matches: {
      type: MatchConnection,
      description: `A list of matches this Account has played.`,
      args: { ...connectionArgs, ...MatchFilter, ...MatchOrder },
      ...MatchInput |> nonNull |> list |> wrapInput,
      junction: junction(`matches`),
      where,
      orderBy,
      resolve: ({ matches }, args) => connectionFromArray(matches, args)
    }
  })
})

export {
  Definition as Account,
  Connection as AccountConnection,
  Filter as AccountFilter,
  Input as AccountInput,
  Order as AccountOrder
}

export default { Definition, Queries, Mutations }
