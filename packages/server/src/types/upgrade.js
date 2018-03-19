import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Range, StringList } from "./filters"
import { Races, UpgradeTypes } from "./enums"
import { Patch, PatchFilter, PatchOrder, PatchInput } from "./patch"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Upgrade`,
  description: `An in-game Upgrade definition.`,
  fields: () => ({
    name: {
      type: GqlString |> nonNull,
      description: `The name of the Upgrade.`,
      sqlColumn: `name`,
      column: table => table.string(`name`).notNullable(),
      input: true,
      sortable: true,
      filter: StringList
    },
    type: {
      type: UpgradeTypes |> nonNull,
      description: `The Upgrade's type.`,
      sqlColumn: `type`,
      column: table => table.string(`type`).notNullable(),
      input: true,
      mutable: true
    },
    race: {
      type: Races |> nonNull,
      description: `The Race category this Upgrade belongs to.`,
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
    mineralCost: {
      type: GqlInt |> nonNull,
      description: `The Mineral cost of the Upgrade.`,
      sqlColumn: `mineralCost`,
      column: table => table.integer(`mineralCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneCost: {
      type: GqlInt |> nonNull,
      description: `The Vespene cost of the Upgrade.`,
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
  Definition as Upgrade,
  Connection as UpgradeConnection,
  Filter as UpgradeFilter,
  Input as UpgradeInput,
  Order as UpgradeOrder
}

export default { Definition, Queries, Mutations }
