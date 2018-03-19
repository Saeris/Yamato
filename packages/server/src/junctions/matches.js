import { Model } from "@/database"
import { bookshelfOptions } from "@/utilities"

@bookshelfOptions({ gid: false })
export class matches extends Model {
  static fields(table) {
    table.string(`account`).notNullable()

    table.string(`match`).notNullable()

    table.primary([`account`, `match`, `active`])
  }
}
