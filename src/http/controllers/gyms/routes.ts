import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
