import { generateHashSync } from '@/utils/crypto';
import { PrismaClient, Prisma, User } from '@prisma/client';

const prisma = new PrismaClient();

const seedUsers = async () => {
    const userData: Prisma.UserCreateInput[] = [
        {
            firstName: "Guest",
            lastName: "User",
            email: "guest@test.com",
            password: generateHashSync("guest123"),
            birthDate: new Date("2001-06-12T00:00:00.000"),
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: generateHashSync("123456"),
            birthDate: new Date("2001-02-01T00:00:00.000"),
        },
        {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@test.com",
            password: generateHashSync("123456"),
            birthDate: new Date("2001-04-10T00:00:00.000"),
        }
    ];
    const users: User[] = [];
    for (const user of userData) {
        const newUser = await prisma.user.create({
            data: user,
        });
        users.push(newUser);
    }
    return users;
}

async function main() {
    console.log(`Start seeding...`)
    await seedUsers();
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
