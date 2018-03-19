export const Mode = new GqlEnum({
  name: `Mode`,
  description: `A list of game modes.`,
  values: {
    Custom: {},
    Solo: {},
    Twos: {},
    Threes: {},
    Fours: {},
    FFA: {}
  }
})
