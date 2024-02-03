import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  bcrypt.hash("123admin", saltRounds, async function(err, hash) {
    await prisma.user.create({
      data: {
       password: hash,
        name: 'Herbert Asis',
        email: 'mickmickasis123@gmail.com',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
  });
  

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

