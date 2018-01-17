import express from 'express'
import next from 'next'
import bodyParser from 'body-parser'

import { graphqlMiddleware, graphiqlMiddleware } from './server/'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/ping', (req, res) => res.send('Pytorch Board'))

  server.use(bodyParser.json())
  server.use('/graphql', graphqlMiddleware)
  server.use('/graphiql', graphiqlMiddleware)

  server.get('/experiment/:id', (req, res) => {
    return app.render(req, res, '/experiment', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
