import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Range } from "./filters"
import { Event, eventFields } from "./interfaces"
import { Point } from "./scalars"
import { Entity, EntityFilter, EntityOrder, EntityInput } from "./entity"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `DeathEvent`,
  description: `A Death Event records when an Entity is destroyed. An Entity can be killed/destroyed without another Entity as the Killer.`,
  interfaces: new Map([[Event, eventFields]]),
  fields: () => ({
    entity: {
      type: Entity |> nonNull,
      description: `The in-game Entity which died, triggering this event.`,
      sqlColumn: `sourceEntity`,
      column: table => table.string(`sourceEntity`).notNullable(),
      ...EntityInput |> nonNull |> wrapInput,
      args: { ...EntityFilter, ...EntityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`entity`)
    },
    location: {
      type: Point |> nonNull,
      description: `The last [x,y] position of the Entity which was destroyed.`,
      sqlColumn: `sourceLocation`,
      column: table => table.string(`sourceLocation`).notNullable(),
      input: true,
      mutable: true
    },
    killer: {
      type: Entity,
      description: `The Entity which destroyed the source Entity of this event. (May be null, some Deaths occur without a killer.)`,
      sqlColumn: `killerEntity`,
      column: table => table.string(`killerEntity`),
      ...EntityInput |> nonNull |> wrapInput,
      args: { ...EntityFilter, ...EntityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`entity`)
    },
    killerLocation: {
      type: Point,
      description: `The [x,y] position of the Entity which destroyed the source Entity.`,
      sqlColumn: `killerLocation`,
      column: table => table.string(`killerLocation`),
      input: true,
      mutable: true
    },
    distance: {
      type: GqlFloat,
      description: `The distance between the killer and the target. (Defaults to 0 if there is no killer)`,
      sqlColumn: `distance`,
      column: table => table.float(`distance`),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    }
  })
})

export {
  Definition as DeathEvent,
  Connection as DeathEventConnection,
  Filter as DeathEventFilter,
  Input as DeathEventInput,
  Order as DeathEventOrder
}

export default { Definition, Queries, Mutations }
