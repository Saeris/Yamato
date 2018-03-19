import { list, nonNull } from "@/utilities"

export const StringList = {
  type: GqlString |> nonNull |> list
}
