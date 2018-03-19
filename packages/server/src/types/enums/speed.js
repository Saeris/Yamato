export const Speed = new GqlEnum({
  name: `Speed`,
  description: `A list of speeds at which the game can be played at.`,
  values: {
    Slower: {},
    Slow: {},
    Normal: {},
    Fast: {},
    Faster: {}
  }
})
