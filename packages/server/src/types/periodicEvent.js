import { typeFactory, where, orderBy, sqlJoin, nonNull, wrapInput } from "@/utilities"
import { Range } from "./filters"
import { Event, eventFields } from "./interfaces"
import { Player, PlayerFilter, PlayerOrder, PlayerInput } from "./player"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `PeriodicEvent`,
  description: `A Periodic Event records statistics about a Player's performance at regular intervals during a Match.`,
  interfaces: new Map([[Event, eventFields]]),
  fields: () => ({
    player: {
      type: Player |> nonNull,
      description: `The Player for which stats are being recorded.`,
      column: table => table.string(`player`).notNullable(),
      ...PlayerInput |> nonNull |> wrapInput,
      args: { ...PlayerFilter, ...PlayerOrder },
      where,
      orderBy,
      sqlJoin: sqlJoin(`player`)
    },
    apm: {
      type: GqlInt |> nonNull,
      description: `The player's current Actions Per Minute score`,
      sqlColumn: `apm`,
      column: table => table.integer(`apm`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    averageMineralsStockpiled: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `averageMineralsStockpiled`,
      column: table => table.integer(`averageMineralsStockpiled`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    averageVespeneStockpiled: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `averageVespeneStockpiled`,
      column: table => table.integer(`averageVespeneStockpiled`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    combatEfficiency: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `combatEfficiency`,
      column: table => table.integer(`combatEfficiency`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyEfficiency: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `supplyEfficiency`,
      column: table => table.integer(`supplyEfficiency`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    damageDealt: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `damageDealt`,
      column: table => table.integer(`damageDealt`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    energySpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `energySpent`,
      column: table => table.integer(`energySpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    economyEnergyAvailable: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `economyEnergyAvailable`,
      column: table => table.integer(`economyEnergyAvailable`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    economyEnergyTotal: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `economyEnergyTotal`,
      column: table => table.integer(`economyEnergyTotal`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    lifeSpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `lifeSpent`,
      column: table => table.integer(`lifeSpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    damageTaken: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `damageTaken`,
      column: table => table.integer(`damageTaken`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    shieldsDamageTaken: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `shieldsDamageTaken`,
      column: table => table.integer(`shieldsDamageTaken`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    lifeHealed: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `lifeHealed`,
      column: table => table.integer(`lifeHealed`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    shieldsRegenerated: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `shieldsRegenerated`,
      column: table => table.integer(`shieldsRegenerated`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsGathered: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsGathered`,
      column: table => table.integer(`mineralsGathered`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsCollectionRate: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsCollectionRate`,
      column: table => table.integer(`mineralsCollectionRate`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsReceived: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsReceived`,
      column: table => table.integer(`mineralsReceived`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsSpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsSpent`,
      column: table => table.integer(`mineralsSpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsTraded: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsTraded`,
      column: table => table.integer(`mineralsTraded`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    mineralsAvailable: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `mineralsAvailable`,
      column: table => table.integer(`mineralsAvailable`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneGathered: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneGathered`,
      column: table => table.integer(`vespeneGathered`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneCollectionRate: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneCollectionRate`,
      column: table => table.integer(`vespeneCollectionRate`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneReceived: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneReceived`,
      column: table => table.integer(`vespeneReceived`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneSpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneSpent`,
      column: table => table.integer(`vespeneSpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneTraded: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneTraded`,
      column: table => table.integer(`vespeneTraded`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    vespeneAvailable: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `vespeneAvailable`,
      column: table => table.integer(`vespeneAvailable`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyUsed: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `supplyUsed`,
      column: table => table.integer(`supplyUsed`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyAvailable: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `supplyAvailable`,
      column: table => table.integer(`supplyAvailable`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyKilled: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `supplyKilled`,
      column: table => table.integer(`supplyKilled`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    supplyLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `supplyLost`,
      column: table => table.integer(`supplyLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    armySize: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `armySize`,
      column: table => table.integer(`armySize`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsTrained: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsTrained`,
      column: table => table.integer(`unitsTrained`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsTrainedMineralsSpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsTrainedMineralsSpent`,
      column: table => table.integer(`unitsTrainedMineralsSpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsTrainedVespeneSpent: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsTrainedVespeneSpent`,
      column: table => table.integer(`unitsTrainedVespeneSpent`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsLost`,
      column: table => table.integer(`unitsLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsLostMineralValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsLostMineralValue`,
      column: table => table.integer(`unitsLostMineralValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsLostVespeneValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsLostVespeneValue`,
      column: table => table.integer(`unitsLostVespeneValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsKilled: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsKilled`,
      column: table => table.integer(`unitsKilled`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsKilledMineralValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsKilledMineralValue`,
      column: table => table.integer(`unitsKilledMineralValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    unitsKilledVespeneValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `unitsKilledVespeneValue`,
      column: table => table.integer(`unitsKilledVespeneValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    workerCount: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `workerCount`,
      column: table => table.integer(`workerCount`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    workersTrained: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `workersTrained`,
      column: table => table.integer(`workersTrained`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    workersLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `workersLost`,
      column: table => table.integer(`workersLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    workersKilled: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `workersKilled`,
      column: table => table.integer(`workersKilled`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    structuresBuilt: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `structuresBuilt`,
      column: table => table.integer(`structuresBuilt`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    structuresLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `structuresLost`,
      column: table => table.integer(`structuresLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    structuresRazed: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `structuresRazed`,
      column: table => table.integer(`structuresRazed`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    upgradesResearched: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `upgradesResearched`,
      column: table => table.integer(`upgradesResearched`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    upgradesMineralValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `upgradesMineralValue`,
      column: table => table.integer(`upgradesMineralValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    upgradesMineralsLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `upgradesMineralsLost`,
      column: table => table.integer(`upgradesMineralsLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    upgradesVespeneValue: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `upgradesVespeneValue`,
      column: table => table.integer(`upgradesVespeneValue`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    upgradesVespeneLost: {
      type: GqlInt |> nonNull,
      description: ``,
      sqlColumn: `upgradesVespeneLost`,
      column: table => table.integer(`upgradesVespeneLost`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    }
  })
})

export {
  Definition as PeriodicEvent,
  Connection as PeriodicEventConnection,
  Filter as PeriodicEventFilter,
  Input as PeriodicEventInput,
  Order as PeriodicEventOrder
}

export default { Definition, Queries, Mutations }
