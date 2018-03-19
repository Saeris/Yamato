import sqlString from "sqlstring"
import database from "@/database"

// Taken from join-monster documentation
// http://join-monster.readthedocs.io/en/latest/relay/
export const { nodeInterface: Node, nodeField } = nodeDefinitions(
  (globalId, context, resolveInfo) => {
    const { type, id } = fromGlobalId(globalId)

    return joinMonster.getNode(
      type,
      resolveInfo,
      context,
      table => sqlString.escape(`{table}.id = ${id}`),
      sql => database.raw(sql)
    )
  },
  obj => obj.__type__
)

export const nodeFields = {
  globalId: {
    ...globalId(),
    description: `The global ID for the Relay spec`,
    sqlDeps: [`id`]
  },
  id: {
    type: new GqlNonNull(GqlID),
    description: `The Ability Type ID.`,
    sqlColumn: `id`,
    column: table => table.string(`id`).notNullable().primary().unique()
  }
}
