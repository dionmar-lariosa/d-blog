import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hashPassword } from '../src/app.util';

const prisma = new PrismaClient();
async function main() {
  const userWithPosts = await prisma.user.create({
    data: {
      uuid: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hashPassword('test'),
      posts: {
        createMany: {
          data: [1, 2, 3].map(() => ({
            uuid: faker.string.uuid(),
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
