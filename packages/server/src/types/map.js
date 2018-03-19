import { typeFactory, nonNull } from "@/utilities"
import { DateRange, Range, StringList } from "./filters"
import { Point } from "./scalars"

export const { Definition, Connection, Filter, Input, Order, Queries, Mutations } = typeFactory({
  name: `Map`,
  description: `A playable Map in-game.`,
  fields: () => ({
    name: {
      type: GqlString |> nonNull,
      description: `The name of the Map.`,
      sqlColumn: `name`,
      column: table => table.string(`name`).notNullable().unique(),
      input: true,
      mutable: true,
      sortable: true,
      filter: StringList
    },
    version: {
      type: GqlFloat |> nonNull,
      description: `The Map version number.`,
      sqlColumn: `version`,
      column: table => table.float(`version`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: Range
    },
    date: {
      type: GqlDateTime |> nonNull,
      description: `The Date on which this version of the Map was published.`,
      sqlColumn: `date`,
      column: table => table.dateTime(`date`).notNullable(),
      input: true,
      mutable: true,
      sortable: true,
      filter: DateRange
    },
    size: {
      type: Point |> nonNull,
      description: `The [x,y] size of the Map.`,
      sqlColumn: `size`,
      column: table => table.string(`size`).notNullable(),
      input: true,
      mutable: true
    },
    playable: {
      type: Point |> nonNull,
      description: `The playable [x,y] size of the Map.`,
      sqlColumn: `playable`,
      column: table => table.string(`playable`).notNullable(),
      input: true,
      mutable: true
    }
  })
})

export {
  Definition as SC2Map,
  Connection as SC2MapConnection,
  Filter as SC2MapFilter,
  Input as SC2MapInput,
  Order as SC2MapOrder
}

export default { Definition, Queries, Mutations }
