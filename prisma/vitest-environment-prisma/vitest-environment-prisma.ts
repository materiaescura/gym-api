import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Environment } from 'vitest'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const database_URL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = database_URL
    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
}
