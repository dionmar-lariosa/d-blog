import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  const userWithPosts = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      posts: {
        createMany: {
          data: [1, 2, 3].map(() => ({
            title: faker.lorem.word(),
            content: faker.lorem.paragraphs(),
          })),
        },
      },
    },
  });
  console.log(userWithPosts);
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
