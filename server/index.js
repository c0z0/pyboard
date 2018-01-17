import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './schema'

export const graphqlMiddleware = graphqlExpress({
  schema
})

export const graphiqlMiddleware = graphiqlExpress({
  endpointURL: '/graphql'
})
