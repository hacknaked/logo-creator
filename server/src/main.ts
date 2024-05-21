import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { LogoService } from './services'
import { logger } from './logger'
import typeDefs from './api.sdl'

async function main() {
  try {
    const service = new LogoService()
    const server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query: {
          logos: async () => service.getAllLogos()
        },
        Mutation: {
          generateLogo: (_parent, { input }) => {
            logger.info({ req: input })
            return service.generateLogo(input)
          }
        }
      }
    })
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 }
    })
    logger.info(`🚀 Server ready at ${url}`)
  } catch (err) {
    logger.error(err)
  }
}

// -- entry point --
main().catch((err) => logger.error(`Unexpected error: ${err}`))
