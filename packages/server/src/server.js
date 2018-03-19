import hapi from "hapi" // https://hapijs.com/
import monitor from "./monitor" // Monitoring and Logging
import playground from "./playground" // GraphQL Playground Route
import api from "./api" // GraphQL API Endpoint

const server = new hapi.Server({
  host: `localhost`,
  port: PORT,
  routes: { cors: true }
})

const plugins = [
  monitor,
  api
]

const setup = async () => {
  info(`Setting up server...`)
  try {
    if (LOCAL) plugins.push(playground)
    await server.register(plugins)
    info(`Successfully setup server!`)
    if (LOCAL) {
      await server.start()
      info(`Server running at: ${server.info.uri}`)
    }
  } catch (err) {
    error(`Failed to setup server:`, err)
  }
}

if (!module.parent) setup()

export default server
