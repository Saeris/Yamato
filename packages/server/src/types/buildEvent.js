import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Progress } from "./enums"
import { Event, eventFields } from "./interfaces"
import { Point } from "./scalars"
import { Entity, EntityFilter, EntityOrder, EntityInput } from "./entity"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `BuildEvent`,
  description: `A Build Event records the construction progress of a player-made structure in a game.`,
  interfaces: new Map([[Event, eventFields]]),
  fields: () => ({
    entity: {
      type: Entity |> nonNull,
      description: `The in-game Entity which triggered this event.`,
      column: table => table.string(`entity`).notNullable(),
      ...EntityInput |> nonNull |> wrapInput,
      args: { ...EntityFilter, ...EntityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`entity`)
    },
    progress: {
      type: Progress |> nonNull,
      description: `The construction progress status.`,
      sqlColumn: `progress`,
      column: table => table.string(`progress`).notNullable(),
      input: true,
      mutable: true
    },
    location: {
      type: Point |> nonNull,
      description: `The [x,y] position of the event origin.`,
      sqlColumn: `location`,
      column: table => table.string(`location`).notNullable(),
      input: true,
      mutable: true
    }
  })
})

export {
  Definition as BuildEvent,
  Connection as BuildEventConnection,
  Filter as BuildEventFilter,
  Input as BuildEventInput,
  Order as BuildEventOrder
}

export default { Definition, Queries, Mutations }
