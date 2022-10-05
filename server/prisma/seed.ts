import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.com",
        password: "jd123",
        birthDate: new Date("2001-02-01T00:00:00.000"),
    },
    {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@test.com",
        password: "as123",
        birthDate: new Date("2001-04-10T00:00:00.000"),
    }
];

async function main() {
    console.log(`Start seeding...`)
    for (const user of userData) {
        await prisma.user.create({
            data: user,
        });
    }
    console.log(`Seeding process finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });