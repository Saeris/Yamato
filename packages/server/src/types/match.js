import { typeFactory, junction, where, orderBy, sqlJoin, list, nonNull, wrapInput } from "@/utilities"
import { DateRange, StringList } from "./filters"
import { Mode, Speed } from "./enums"
import { Patch, PatchFilter, PatchOrder, PatchInput } from "./patch"
import { PlayerConnection, PlayerFilter, PlayerOrder, PlayerInput } from "./player"
import { SC2Map, SC2MapFilter, SC2MapOrder, SC2MapInput } from "./map"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Match`,
  description: `A SC2 Match`,
  fields: () => ({
    matchID: {
      type: GqlString |> nonNull,
      description: `The Battlenet Match ID.`,
      sqlColumn: `matchID`,
      column: table => table.string(`matchID`).notNullable().unique(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    date: {
      type: GqlDateTime |> nonNull,
      description: `The Date and Time the Match was played.`,
      sqlColumn: `date`,
      column: table => table.dateTime(`date`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: DateRange
    },
    patch: {
      type: Patch |> nonNull,
      description: `The Patch version of the Game the Match was played in.`,
      column: table => table.string(`patch`).notNullable(),
      ...PatchInput |> nonNull |> wrapInput,
      args: { ...PatchFilter, ...PatchOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`patch`)
    },
    map: {
      type: SC2Map |> nonNull,
      description: `The Map the Match was played on.`,
      column: table => table.string(`map`).notNullable(),
      ...SC2MapInput |> nonNull |> wrapInput,
      args: { ...SC2MapFilter, ...SC2MapOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`map`)
    },
    mode: {
      type: Mode |> nonNull,
      description: `The Game Mode the Match was played on.`,
      sqlColumn: `mode`,
      column: table => table.string(`mode`).notNullable(),
      input: true,
      mutable: true
    },
    speed: {
      type: Speed |> nonNull,
      description: `The Game Speed the Match was played on.`,
      sqlColumn: `speed`,
      column: table => table.string(`speed`).notNullable(),
      input: true,
      mutable: true
    },
    players: {
      type: PlayerConnection,
      description: `A list of players involved in this match.`,
      ...PlayerInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...PlayerFilter, ...PlayerOrder },
      junction: junction(`players`),
      where,
      orderBy,
      resolve: ({ players }, args) => connectionFromArray(players, args)
    }
  })
})

export {
  Definition as Match,
  Connection as MatchConnection,
  Filter as MatchFilter,
  Input as MatchInput,
  Order as MatchOrder
}

export default { Definition, Queries, Mutations }
