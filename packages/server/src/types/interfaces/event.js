import { nonNull } from "@/utilities"
import { DateRange } from "@/types/filters"

export const eventFields = {
  time: {
    type: GqlDateTime |> nonNull,
    description: `The game time at which the event occured.`,
    sqlColumn: `time`,
    column: table => table.timestamp(`time`).notNullable(),
    input: true,
    sortable: true,
    filter: DateRange
  }
}

export const Event = new GqlInterface({
  name: `Event`,
  description: `Required fields for in-game Events.`,
  fields: () => eventFields
})
