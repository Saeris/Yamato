import { typeFactory, junction, where, orderBy, sqlJoin, list, nonNull, wrapInput } from "@/utilities"
import { Range } from "./filters"
import { Races, Colors, Handicaps } from "./enums"
import { Point } from "./scalars"
import { Match, MatchFilter, MatchOrder, MatchInput } from "./match"
import { EntityConnection, EntityFilter, EntityOrder, EntityInput } from "./entity"
import { PeriodicEventConnection, PeriodicEventFilter, PeriodicEventOrder, PeriodicEventInput } from "./periodicEvent"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Player`,
  description: `A Player in a Match`,
  fields: () => ({
    match: {
      type: Match |> nonNull,
      description: ``,
      column: table => table.string(`match`).notNullable(),
      ...MatchInput |> nonNull |> wrapInput,
      args: { ...MatchFilter, ...MatchOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`match`)
    },
    race: {
      type: Races |> nonNull,
      description: ``,
      sqlColumn: `race`,
      column: table => table.string(`race`).notNullable(),
      input: true,
      mutable: true
    },
    lobbyRace: {
      type: Races |> nonNull,
      description: ``,
      sqlColumn: `lobbyRace`,
      column: table => table.string(`lobbyRace`).notNullable(),
      input: true,
      mutable: true
    },
    playerNum: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `playerNum`,
      column: table => table.integer(`playerNum`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    teamNum: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `teamNum`,
      column: table => table.integer(`teamNum`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    color: {
      type: Colors |> nonNull,
      description: ``,
      sqlColumn: `color`,
      column: table => table.string(`color`).notNullable(),
      input: true,
      mutable: true
    },
    ai: {
      type: GqlBool |> nonNull,
      description: ``,
      sqlColumn: `ai`,
      column: table => table.boolean(`ai`).notNullable(),
      input: true,
      mutable: true
    },
    handicap: {
      type: Handicaps |> nonNull,
      description: ``,
      sqlColumn: `handicap`,
      column: table => table.string(`handicap`).notNullable(),
      input: true,
      mutable: true
    },
    startLocation: {
      type: Point |> nonNull,
      description: `The [x,y] location of the Player's starting point on the map.`,
      sqlColumn: `startLocation`,
      column: table => table.string(`startLocation`).notNullable(),
      input: true,
      mutable: true
    },
    units: {
      type: EntityConnection,
      description: `A list of units created/controled by this player.`,
      ...EntityInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...EntityFilter, ...EntityOrder },
      junction: junction(`entities`),
      where,
      orderBy,
      resolve: ({ units }, args) => connectionFromArray(units, args)
    },
    stats: {
      type: PeriodicEventConnection,
      description: ``,
      ...PeriodicEventInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...PeriodicEventFilter, ...PeriodicEventOrder },
      junction: junction(`stats`),
      where,
      orderBy,
      resolve: ({ stats }, args) => connectionFromArray(stats, args)
    }
  })
})

export {
  Definition as Player,
  Connection as PlayerConnection,
  Filter as PlayerFilter,
  Input as PlayerInput,
  Order as PlayerOrder
}

export default { Definition, Queries, Mutations }
