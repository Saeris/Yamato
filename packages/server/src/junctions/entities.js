import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class entities extends Model {
  static fields(table) {
    table.string(`player`).notNullable()

    table.string(`entity`).notNullable()

    table.primary([`player`, `entity`, `active`])
  }
}
