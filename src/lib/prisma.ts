import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

prisma.$connect().catch((err) => {
  console.error("Failed to connect to database:", err)
  process.exit(1)
})

export default prisma
