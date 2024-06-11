import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

describe('Search gyms use case', () => {
  it('should be able search gyms', async () => {
    const gymsRepository = new InMemoryGymsRepository()
    const sut = new SearchGymsUseCase(gymsRepository)
    for (let i = 0; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym JS - ${i}`,
        latitude: 80,
        longitude: 80,
      })
    }
    const firstPage = await sut.execute({ query: 'JS', page: 1 })
    const secondPage = await sut.execute({ query: 'JS', page: 2 })
    expect(firstPage.gyms.length).toEqual(20)
    expect(secondPage.gyms.length).toEqual(3)
    expect(secondPage.gyms[0].title).toEqual('Gym JS - 20')
    expect(secondPage.gyms[1].title).toEqual('Gym JS - 21')
    expect(secondPage.gyms[2].title).toEqual('Gym JS - 22')
  })
})
