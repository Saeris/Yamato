import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class players extends Model {
  static fields(table) {
    table.string(`match`).notNullable()

    table.string(`player`).notNullable()

    table.primary([`match`, `player`, `active`])
  }
}
