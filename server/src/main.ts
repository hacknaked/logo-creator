import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { LogoService } from './services'
import typeDefs from './api.sdl'

async function main() {
  const service = new LogoService()

  const resolvers = {
    Query: {
      logos: async () => service.getAllLogos()
    },
    Mutation: {
      generateLogo: (_parent, { input }) => service.generateLogo(input)
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })
  console.log(`🚀 Server ready at ${url}`)
}

// -- entry point --
main().catch((err) => console.error(err))
