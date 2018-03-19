import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class abilities extends Model {
  static fields(table) {
    table.string(`patch`).notNullable()

    table.string(`ability`).notNullable()

    table.primary([`patch`, `ability`, `active`])
  }
}
