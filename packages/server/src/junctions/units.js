import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class units extends Model {
  static fields(table) {
    table.string(`patch`).notNullable()

    table.string(`unit`).notNullable()

    table.primary([`patch`, `unit`, `active`])
  }
}
