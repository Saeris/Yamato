import { nonNull } from "@/utilities"
import { database } from "@/database"
import { DateRange } from "@/types/filters"

export const timestampFields = {
  created: {
    type: GqlDateTime |> nonNull,
    description: `When this Node was created.`,
    sqlColumn: `created`,
    column: table => table.timestamp(`created`).notNullable().defaultTo(database.fn.now()),
    sortable: true,
    filter: DateRange
  },
  updated: {
    type: GqlDateTime |> nonNull,
    description: `When this Node was updated.`,
    sqlColumn: `updated`,
    column: table => table.timestamp(`updated`).notNullable().defaultTo(database.fn.now()),
    sortable: true,
    filter: DateRange
  },
  deleted: {
    type: GqlDateTime,
    description: `When this Node was deleted. (If null, this Node hasn't yet been deleted.)`,
    sqlColumn: `deleted`,
    column: table => table.timestamp(`deleted`).defaultTo(null),
    sortable: true,
    filter: DateRange
  },
  active: {
    type: GqlBool |> nonNull,
    description: `Flag specifying whether this Node is Active or Soft-Deleted. All queries ignore Soft-Deleted rows by default.`,
    sqlColumn: `active`,
    column: table => table.boolean(`active`).defaultTo(true),
    filter: { type: GqlBool }
  }
}

export const Timestamps = new GqlInterface({
  name: `Timestamps`,
  description: `Required fields for Timestamps`,
  fields: () => timestampFields
})
