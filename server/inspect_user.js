
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function inspectUser() {
    const user = await prisma.user.findUnique({
        where: { id: 2 }
    });
    console.log(user);
}

inspectUser()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
