import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Player, PlayerFilter, PlayerOrder, PlayerInput } from "./player"
import { Unit, UnitFilter, UnitOrder, UnitInput } from "./unit"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Entity`,
  description: `An Entity is an in-game Unit controlled by a Player.`,
  fields: () => ({
    unit: {
      type: Unit |> nonNull,
      description: `The Unit type of this Entity.`,
      column: table => table.string(`unit`).notNullable(),
      ...UnitInput |> nonNull |> wrapInput,
      args: { ...UnitFilter, ...UnitOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`unit`)
    },
    player: {
      type: Player |> nonNull,
      description: `The Player which owns this Entity.`,
      column: table => table.string(`player`).notNullable(),
      ...PlayerInput |> nonNull |> wrapInput,
      args: { ...PlayerFilter, ...PlayerOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`player`)
    }
  })
})

export {
  Definition as Entity,
  Connection as EntityConnection,
  Filter as EntityFilter,
  Input as EntityInput,
  Order as EntityOrder
}

export default { Definition, Queries, Mutations }
