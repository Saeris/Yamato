import { typeFactory, junction, where, orderBy, list, nonNull, wrapInput } from "@/utilities"
import { DateRange, StringList } from "./filters"
import { AbilityConnection, AbilityFilter, AbilityOrder, AbilityInput } from "./ability"
import { UnitConnection, UnitFilter, UnitOrder, UnitInput } from "./unit"
import { UpgradeConnection, UpgradeFilter, UpgradeOrder, UpgradeInput } from "./upgrade"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Patch`,
  description: `A specific version of the game.`,
  fields: () => ({
    version: {
      type: GqlString |> nonNull,
      description: `The Patch's version number.`,
      sqlColumn: `version`,
      column: table => table.string(`version`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    date: {
      type: GqlDateTime |> nonNull,
      description: `The Date and Time the Patch was published.`,
      sqlColumn: `date`,
      column: table => table.dateTime(`date`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: DateRange
    },
    notes: {
      type: GqlString,
      description: `A developer description of the changes introduced with the Patch.`,
      sqlColumn: `notes`,
      column: table => table.string(`notes`),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    abilities: {
      type: AbilityConnection,
      description: ``,
      ...AbilityInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...AbilityFilter, ...AbilityOrder },
      junction: junction(`abilities`),
      where,
      orderBy,
      resolve: ({ abilities }, args) => connectionFromArray(abilities, args)
    },
    units: {
      type: UnitConnection,
      description: ``,
      ...UnitInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...UnitFilter, ...UnitOrder },
      junction: junction(`units`),
      where,
      orderBy,
      resolve: ({ units }, args) => connectionFromArray(units, args)
    },
    upgrades: {
      type: UpgradeConnection,
      description: ``,
      ...UpgradeInput |> nonNull |> list |> wrapInput,
      args: { ...connectionArgs, ...UpgradeFilter, ...UpgradeOrder },
      junction: junction(`upgrades`),
      where,
      orderBy,
      resolve: ({ upgrades }, args) => connectionFromArray(upgrades, args)
    }
  })
})

export {
  Definition as Patch,
  Connection as PatchConnection,
  Filter as PatchFilter,
  Input as PatchInput,
  Order as PatchOrder
}

export default { Definition, Queries, Mutations }
