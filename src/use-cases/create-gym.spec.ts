import { CreateGymUseCase } from './create-gym'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'TypeScript Gym',
      description: 'TypeScript Gym',
      phone: 'Gym Phone',
      latitude: 123,
      longitude: 456,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
