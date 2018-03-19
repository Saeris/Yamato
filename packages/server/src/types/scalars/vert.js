import { isArray, isNumber } from "lodash"
import { parseLiteral } from "@/utilities"

const validate = value => {
  const vert = JSON.parse(value)
  if (isArray(vert) && vert.length === 3 && isNumber(vert[0]) && isNumber(vert[1]) && isNumber(vert[2])) {
    return JSON.stringify(vert)
  }
  throw new GqlError(`Expected Vert but got: ${JSON.stringify(vert)}`)
}

export const Vert = new GqlScalar({
  name: `Vert`,
  serialize: ast => JSON.parse(validate(ast)),
  parseValue: validate,
  parseLiteral: ast => validate(parseLiteral(ast))
})
