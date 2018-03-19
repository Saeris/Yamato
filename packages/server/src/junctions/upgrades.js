import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class upgrades extends Model {
  static fields(table) {
    table.string(`patch`).notNullable()

    table.string(`upgrade`).notNullable()

    table.primary([`patch`, `upgrade`, `active`])
  }
}
