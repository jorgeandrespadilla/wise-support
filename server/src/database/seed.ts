import { IS_DEV } from '@/constants/settings';
import { generateHashSync } from '@/utils/crypto';
import { generateCode } from '@/utils/uuid';
import { PrismaClient, Prisma, User, Role, Category, Ticket, Task } from '@prisma/client';

type IdFn = (value: string) => number | undefined;

const prisma = new PrismaClient();

const seedRoles = async () => {
    const roleData: Prisma.RoleCreateInput[] = [
        {
            code: "ADMIN",
            name: "Administrador",
            description: "Administrador del sistema",
        },
        {
            code: "SUPERVISOR",
            name: "Supervisor",
            description: "Supervisor",
        },
        {
            code: "AGENT",
            name: "Agente",
            description: "Usuario de soporte",
        }
    ];
    const roles: Role[] = [];
    for (const role of roleData) {
        const newRole = await prisma.role.create({
            data: role,
        });
        roles.push(newRole);
    }
    return {
        roles,
        roleId: (code: string) => roles.find((role) => role.code === code)?.id
    };
}

const seedUsers = async ({ roleId }: { roleId: IdFn }) => {
    const userData: Prisma.UserCreateInput[] = [
        {
            firstName: "Admin",
            lastName: "user",
            email: "admin@test.com",
            password: generateHashSync("admin123"),
            birthDate: new Date("2000-01-01T00:00:00.000"),
            role: {
                connect: {
                    id: roleId("ADMIN")
                }
            }
        },
    ];

    const users: User[] = [];
    for (const user of userData) {
        const newUser = await prisma.user.create({
            data: user,
        });
        users.push(newUser);
    }
    return {
        users,
        userId: (email: string) => users.find((user) => user.email === email)?.id
    };
}

const seedTestUsers = async ({ roleId }: { roleId: IdFn }) => {
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
                    id: roleId("SUPERVISOR")
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
                    id: roleId("AGENT")
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
    return {
        users,
        userId: (email: string) => users.find((user) => user.email === email)?.id
    };
}

const seedTestCategories = async () => {
    const categoryData: Prisma.CategoryCreateInput[] = [
        {
            code: "LICENSE",
            name: "Licencias y permisos",
        },
    ];
    const categories: Category[] = [];
    for (const category of categoryData) {
        const newCategory = await prisma.category.create({
            data: category,
        });
        categories.push(newCategory);
    }
    return {
        categories,
        categoryId: (code: string) => categories.find((category) => category.code === code)?.id
    };
}

const seedTestTickets = async ({ userId, categoryId }: { userId: IdFn, categoryId: IdFn }) => {
    const ticketCode: Record<string, string> = {
        "TICKET_1": generateCode(),
    };

    const ticketData: Prisma.TicketCreateInput[] = [
        {
            code: ticketCode["TICKET_1"],
            title: "Problemas con la licencia de Windows",
            description: "Los usuarios no pueden iniciar sesión en el sistema",
            timeEstimated: 1,
            category: {
                connect: {
                    id: categoryId("LICENSE")
                }
            },
            supervisor: {
                connect: {
                    id: userId("john.doe@test.com")
                }
            },
            assignee: {
                connect: {
                    id: userId("alice.smith@test.com")
                }
            },
        }
    ];
    const tickets: Ticket[] = [];
    for (const ticket of ticketData) {
        const newTicket = await prisma.ticket.create({
            data: ticket,
        });
        tickets.push(newTicket);
    }

    return {
        tickets,
        ticketId: (altCode: string) => {
            const code = ticketCode[altCode];
            return tickets.find((ticket) => ticket.code === code)?.id;
        }
    };
}

const seedTestTasks = async ({ ticketId }: { ticketId: IdFn }) => {
    const taskData: Prisma.TaskCreateInput[] = [
        {
            description: "Revisar el estado de la licencia",
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId("TICKET_1")
                }
            },
        }
    ];
    const tasks: Task[] = [];
    for (const task of taskData) {
        const newTask = await prisma.task.create({
            data: task,
        });
        tasks.push(newTask);
    }
    return {
        tasks,
    };
}

async function main() {
    console.log(`Start seeding...`);
    const { roleId } = await seedRoles();
    const { } = await seedUsers({ roleId });
    if (IS_DEV) {
        const { userId: testUserId } = await seedTestUsers({ roleId });
        const { categoryId } = await seedTestCategories();
        const { ticketId } = await seedTestTickets({ userId: testUserId, categoryId });
        await seedTestTasks({ ticketId });
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
