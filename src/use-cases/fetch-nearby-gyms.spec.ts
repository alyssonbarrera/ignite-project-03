import { FetchNearbyUseCase } from './fetch-nearby-gyms'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'JavaScript Gym',
      phone: 'Gym Phone',
      latitude: -22.1309235,
      longitude: -51.3877818,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'TypeScript Gym',
      phone: 'Gym Phone',
      latitude: -22.1757499,
      longitude: -51.2512718,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.1309235,
      userLongitude: -51.3877818,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
