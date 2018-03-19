import { isArray, isNumber } from "lodash"
import { parseLiteral } from "@/utilities"

const validate = value => {
  const point = JSON.parse(value)
  if (isArray(point) && point.length === 2 && isNumber(point[0]) && isNumber(point[1])) return JSON.stringify(point)
  throw new GqlError(`Expected Point but got: ${JSON.stringify(point)}`)
}

export const Point = new GqlScalar({
  name: `Point`,
  serialize: ast => JSON.parse(validate(ast)),
  parseValue: validate,
  parseLiteral: ast => validate(parseLiteral(ast))
})
