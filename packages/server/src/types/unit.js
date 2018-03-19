import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Range, StringList } from "./filters"
import { Races, UnitTypes } from "./enums"
import { Patch, PatchFilter, PatchOrder, PatchInput } from "./patch"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Unit`,
  description: `An in-game Unit definition.`,
  fields: () => ({
    name: {
      type: GqlString |> nonNull,
      description: `The name of the Unit.`,
      sqlColumn: `name`,
      column: table => table.string(`name`).notNullable(),
      input: true,
      sortable: true,
      filter: StringList
    },
    type: {
      type: UnitTypes |> nonNull,
      description: `The Unit's type.`,
      sqlColumn: `type`,
      column: table => table.string(`type`).notNullable(),
      input: true,
      mutable: true
    },
    race: {
      type: Races |> nonNull,
      description: `The Race category this Unit belongs to.`,
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
    unitID: {
      type: GqlString |> nonNull,
      description: ``,
      sqlColumn: `unitID`,
      column: table => table.string(`unitID`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    mineralCost: {
      type: GqlInt |> nonNull,
      description: `The Mineral cost of the Unit.`,
      sqlColumn: `mineralCost`,
      column: table => table.integer(`mineralCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneCost: {
      type: GqlInt |> nonNull,
      description: `The Vespene cost of the Unit.`,
      sqlColumn: `vespeneCost`,
      column: table => table.integer(`vespeneCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyCost: {
      type: GqlFloat |> nonNull,
      description: `The Supply cost of the Unit.`,
      sqlColumn: `supplyCost`,
      column: table => table.float(`supplyCost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyProvided: {
      type: GqlFloat |> nonNull,
      description: `The Supply provided by the Unit.`,
      sqlColumn: `supplyProvided`,
      column: table => table.float(`supplyProvided`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    life: {
      type: GqlInt |> nonNull,
      description: `The number of Hit Points this Unit has.`,
      sqlColumn: `life`,
      column: table => table.integer(`life`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    lifeRegen: {
      type: GqlFloat |> nonNull,
      description: `The amount of HP the Unit regenerates per tick.`,
      sqlColumn: `lifeRegen`,
      column: table => table.float(`lifeRegen`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    lifeArmor: {
      type: GqlInt |> nonNull,
      description: `The amount of Armor the Unit has.`,
      sqlColumn: `lifeArmor`,
      column: table => table.integer(`lifeArmor`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    shields: {
      type: GqlInt |> nonNull,
      description: `The number of Shield Points this Unit has.`,
      sqlColumn: `shield`,
      column: table => table.integer(`shield`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    shieldRegen: {
      type: GqlFloat |> nonNull,
      description: `The amount of Shields the Unit regenerates per tick.`,
      sqlColumn: `shieldRegen`,
      column: table => table.float(`shieldRegen`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    shieldArmor: {
      type: GqlInt |> nonNull,
      description: `The amount of Shield Armor the Unit has.`,
      sqlColumn: `shieldArmor`,
      column: table => table.integer(`shieldArmor`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    startingEnergy: {
      type: GqlInt |> nonNull,
      description: `The starting Energy the Unit has.`,
      sqlColumn: `startingEnergy`,
      column: table => table.integer(`startingEnergy`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    energy: {
      type: GqlInt |> nonNull,
      description: `The maximum Energy the Unit has.`,
      sqlColumn: `energy`,
      column: table => table.integer(`energy`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    energyRegen: {
      type: GqlInt |> nonNull,
      description: `The amount of Energy the Unit regenerates per tick.`,
      sqlColumn: `energyRegen`,
      column: table => table.integer(`energyRegen`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    speed: {
      type: GqlFloat |> nonNull,
      description: `How mast the Unit moves.`,
      sqlColumn: `speed`,
      column: table => table.float(`speed`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    creepSpeed: {
      type: GqlFloat |> nonNull,
      description: `How fast the Unit moves on creep.`,
      sqlColumn: `creepSpeed`,
      column: table => table.float(`creepSpeed`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    acceleration: {
      type: GqlFloat |> nonNull,
      description: `How fast the Unit accelerates to it's maximum speed.`,
      sqlColumn: `acceleration`,
      column: table => table.float(`acceleration`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    turningRate: {
      type: GqlFloat |> nonNull,
      description: `How fast the Unit can rotate.`,
      sqlColumn: `turningRate`,
      column: table => table.float(`turningRate`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    radius: {
      type: GqlFloat |> nonNull,
      description: `The Unit's collision radius.`,
      sqlColumn: `radius`,
      column: table => table.float(`radius`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mover: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mover`,
      column: table => table.integer(`mover`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    footprint: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `footprint`,
      column: table => table.integer(`footprint`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    sightRadius: {
      type: GqlFloat |> nonNull,
      description: `How far the Unit can see through the fog of war.`,
      sqlColumn: `sightRadius`,
      column: table => table.float(`sightRadius`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    summoned: {
      type: GqlBool |> nonNull,
      description: `Whether or not the Unit is Summoned.`,
      sqlColumn: `summoned`,
      column: table => table.boolean(`summoned`).notNullable(),
      input: true,
      mutable: true
    }
  })
})

export {
  Definition as Unit,
  Connection as UnitConnection,
  Filter as UnitFilter,
  Input as UnitInput,
  Order as UnitOrder
}

export default { Definition, Queries, Mutations }
