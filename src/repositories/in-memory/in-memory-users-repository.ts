import { $Enums, Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      ...userData,
      id: randomUUID(),
      role: 'MEMBER',
      created_at: new Date(),
    }
    this.users.push(user)
    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    if (!user) return null
    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === userId)
    return user ?? null
  }
}
