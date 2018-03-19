export const Progress = new GqlEnum({
  name: `Progress`,
  description: `Sort options for OrderBy.`,
  values: {
    Unknown: {},
    Started: {},
    Paused: {},
    Resumed: {},
    Cancelled: {},
    Completed: {}
  }
})
