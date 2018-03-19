export const Handicaps = new GqlEnum({
  name: `Handicaps`,
  description: `Multiplate handicap value. Determines the maximum HP percentage of units in-game.`,
  values: {
    None: {},
    Ninety: {},
    Eighty: {},
    Seventy: {},
    Sixty: {},
    Fifty: {}
  }
})
