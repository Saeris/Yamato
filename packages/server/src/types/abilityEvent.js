import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Range } from "./filters"
import { Event, eventFields } from "./interfaces"
import { Point } from "./scalars"
import { Entity, EntityFilter, EntityOrder, EntityInput } from "./entity"
import { Ability, AbilityFilter, AbilityOrder, AbilityInput } from "./ability"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `AbilityEvent`,
  description: `An Ability Event records when an Ability was cast by an in-game Entity, either player or AI controlled.`,
  interfaces: new Map([[Event, eventFields]]),
  fields: () => ({
    entity: {
      type: Entity,
      description: `The in-game Entity which cast the Ability, if the source was an Entity and not a Player or Global.`,
      column: table => table.string(`entity`),
      ...EntityInput |> wrapInput,
      args: { ...EntityFilter, ...EntityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`entity`)
    },
    ability: {
      type: Ability |> nonNull,
      description: `The Ability used in the event.`,
      column: table => table.string(`ability`).notNullable(),
      ...AbilityInput |> nonNull |> wrapInput,
      args: { ...AbilityFilter, ...AbilityOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`ability`)
    },
    source: {
      type: Point,
      description: `The [x,y] position of the source Entity. (Optional, some Abilities are global and have no source location)`,
      sqlColumn: `source`,
      column: table => table.string(`source`),
      input: true,
      mutable: true
    },
    target: {
      type: Point,
      description: `The [x,y] position of the Ability's target. (Optional, some Abilities are not targeted.)`,
      sqlColumn: `target`,
      column: table => table.string(`target`),
      input: true,
      mutable: true
    },
    distance: {
      type: GqlFloat,
      description: `The distance between the source and the target.`,
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
  Definition as AbilityEvent,
  Connection as AbilityEventConnection,
  Filter as AbilityEventFilter,
  Input as AbilityEventInput,
  Order as AbilityEventOrder
}

export default { Definition, Queries, Mutations }
