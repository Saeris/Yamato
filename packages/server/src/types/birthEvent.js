import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Event, eventFields } from "./interfaces"
import { Point } from "./scalars"
import { Entity, EntityFilter, EntityOrder, EntityInput } from "./entity"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `BirthEvent`,
  description: `A Birth Event records when a new Unit was created by a player in a game.`,
  interfaces: new Map([[Event, eventFields]]),
  fields: () => ({
    entity: {
      type: Entity |> nonNull,
      description: `The created in-game Entity which triggered this event.`,
      column: table => table.string(`entity`).notNullable(),
      ...EntityInput |> nonNull |> wrapInput,
      args: { ...EntityFilter, ...EntityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`entity`)
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
  Definition as BirthEvent,
  Connection as BirthEventConnection,
  Filter as BirthEventFilter,
  Input as BirthEventInput,
  Order as BirthEventOrder
}

export default { Definition, Queries, Mutations }
