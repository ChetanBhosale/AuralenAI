// import { PrismaClient } from "./generated/prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'

// export const prisma = new PrismaClient().$extend(withAccelerate())

import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import secrets from '@repo/secrets'
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: secrets.DATABASE_URL })
})