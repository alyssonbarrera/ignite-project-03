import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'TypeScript Gym',
        description: 'TypeScript Gym',
        phone: 'Gym Phone',
        latitude: -22.1309235,
        longitude: -51.3877818,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.1309235,
        longitude: -51.3877818,
      })

    expect(response.statusCode).toEqual(201)
  })
})
