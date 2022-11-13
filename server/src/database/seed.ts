import { generateHashSync } from '@/utils/crypto';
import { PrismaClient, Prisma, User, Role } from '@prisma/client';

const prisma = new PrismaClient();

const seedRoles = async () => {
    const roleData: Prisma.RoleCreateInput[] = [
        {
            code: "ADMIN",
            name: "Administrador",
            description: "Administrador del sistema",
        }
    ];
    const roles: Role[] = [];
    for (const role of roleData) {
        const newRole = await prisma.role.create({
            data: role,
        });
        roles.push(newRole);
    }
    return roles;
}


const seedUsers = async (roles: Role[]) => {
    const roleId = (code: string) => roles.find((role) => role.code === code)?.id;
    const userData: Prisma.UserCreateInput[] = [
        {
            firstName: "Guest",
            lastName: "User",
            email: "guest@test.com",
            password: generateHashSync("guest123"),
            birthDate: new Date("2001-06-12T00:00:00.000"),
            role: {
                connect: {
                    id: roleId("ADMIN")
                }
            }
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: generateHashSync("123456"),
            birthDate: new Date("2001-02-01T00:00:00.000"),
            role: {
                connect: {
                    id: roleId("ADMIN")
                }
            }
        },
        {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@test.com",
            password: generateHashSync("123456"),
            birthDate: new Date("2001-04-10T00:00:00.000"),
            role: {
                connect: {
                    id: roleId("ADMIN")
                }
            }
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
    const roles = await seedRoles();
    await seedUsers(roles);
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
