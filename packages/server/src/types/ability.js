import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { AbilityTypes, Races } from "./enums"
import { Range, StringList } from "./filters"
import { Patch, PatchFilter, PatchOrder, PatchInput } from "./patch"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Ability`,
  description: `An in-game Ability definition.`,
  fields: () => ({
    name: {
      type: GqlString |> nonNull,
      description: `The name of the Ability.`,
      sqlColumn: `name`,
      column: table => table.string(`name`).notNullable().unique(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    type: {
      type: AbilityTypes |> nonNull,
      description: `The Ability's type.`,
      sqlColumn: `type`,
      column: table => table.string(`type`).notNullable(),
      input: true,
      mutable: true
    },
    race: {
      type: Races |> nonNull,
      description: `The Race category this Ability belongs to.`,
      sqlColumn: `race`,
      column: table => table.string(`race`).notNullable(),
      input: true,
      mutable: true
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
    energyCost: {
      type: GqlInt |> nonNull,
      description: `The Energy cost of the Ability.`,
      sqlColumn: `energyCost`,
      column: table => table.integer(`energyCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    lifeCost: {
      type: GqlInt |> nonNull,
      description: `The Life cost of the Ability.`,
      sqlColumn: `lifeCost`,
      column: table => table.integer(`lifeCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralCost: {
      type: GqlInt |> nonNull,
      description: `The Mineral cost of the Ability.`,
      sqlColumn: `mineralCost`,
      column: table => table.integer(`mineralCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneCost: {
      type: GqlInt |> nonNull,
      description: `The Vespene cost of the Ability.`,
      sqlColumn: `vespeneCost`,
      column: table => table.integer(`vespeneCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    }
  })
})

export {
  Definition as Ability,
  Connection as AbilityConnection,
  Filter as AbilityFilter,
  Input as AbilityInput,
  Order as AbilityOrder
}

export default { Definition, Queries, Mutations }
