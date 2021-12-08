import Prisma from '@prisma/client';

const prisma = new Prisma.PrismaClient();

// await prisma.user.create({data: {name:'thomas', email: 'thomas@thomas.de', password:'hau'}})
// await prisma.user.delete({
//     where: {
//         email: "thomas@thomas.de"
//     }
// })
const users = await prisma.user.findMany({
  select: {
    name: true,
    password: true,
  },
});
console.log('users', users);
