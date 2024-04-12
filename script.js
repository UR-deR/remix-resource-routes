import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  for (let i = 0; i < 10; i++) {
    const userId = i % 2 === 0 ? 1 : 2;
    await prisma.post.create({
      data: {
        title: `Post ${i}`,
        content: `This is the content of post ${i}`,
        published: true,
        authorId: userId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
