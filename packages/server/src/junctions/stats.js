import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class stats extends Model {
  static fields(table) {
    table.string(`player`).notNullable()

    table.string(`periodicEvent`).notNullable()

    table.primary([`player`, `periodicEvent`, `active`])
  }
}
