export const Races = new GqlEnum({
  name: `Races`,
  description: `A list of Races in the game.`,
  values: {
    Neutral: {},
    Protoss: {},
    Random: {},
    Terran: {},
    Zerg: {}
  }
})
