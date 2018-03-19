import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Event, eventFields } from "./interfaces"
import { Point } from "./scalars"
import { Entity, EntityFilter, EntityOrder, EntityInput } from "./entity"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `IdleEvent`,
  description: `An Idle Event records when an Entity changes their Idle status. This data is used to calculate Entity usage efficiency.`,
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
    state: {
      type: GqlBool |> nonNull,
      description: `The idle status of the Entity.`,
      sqlColumn: `state`,
      column: table => table.boolean(`state`).notNullable(),
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
  Definition as IdleEvent,
  Connection as IdleEventConnection,
  Filter as IdleEventFilter,
  Input as IdleEventInput,
  Order as IdleEventOrder
}

export default { Definition, Queries, Mutations }
