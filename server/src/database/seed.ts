import { IS_DEV } from '@/constants/settings';
import { generateHashSync } from '@/utils/crypto';
import { generateCode } from '@/utils/uuid';
import {
    PrismaClient,
    Prisma,
    User,
    Role,
    Category,
    Ticket,
    Task,
} from '@prisma/client';

type IdFn = (value: string) => number | undefined;

const prisma = new PrismaClient();

// const randomDate = (start: Date, end: Date) => {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

const seedRoles = async () => {
    const roleData: Prisma.RoleCreateInput[] = [
        {
            code: 'ADMIN',
            name: 'Administrador',
            description: 'Administrador del sistema',
        },
        {
            code: 'SUPERVISOR',
            name: 'Supervisor',
            description: 'Supervisor',
        },
        {
            code: 'AGENT',
            name: 'Agente',
            description: 'Usuario de soporte',
        },
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
        roleId: (code: string) => roles.find(role => role.code === code)?.id,
    };
};

const seedUsers = async ({ roleId }: { roleId: IdFn }) => {
    const userData: Prisma.UserCreateInput[] = [
        {
            firstName: 'Usuario',
            lastName: 'Administrador',
            email: 'admin@test.com',
            password: generateHashSync('admin123'),
            birthDate: new Date('2000-01-01T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('ADMIN'),
                },
            },
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
        userId: (email: string) => users.find(user => user.email === email)?.id,
    };
};

const seedTestUsers = async ({ roleId }: { roleId: IdFn }) => {
    const userData: Prisma.UserCreateInput[] = [
        {
            firstName: 'Usuario',
            lastName: 'Invitado',
            email: 'guest@test.com',
            password: generateHashSync('guest123'),
            birthDate: new Date('2001-06-12T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('ADMIN'),
                },
            },
        },
        {
            firstName: 'Daniela',
            lastName: 'Rodriguez',
            email: 'daniela.rodriguez@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('2002-09-24T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('SUPERVISOR'),
                },
            },
        },
        {
            firstName: 'Juan',
            lastName: 'Alvarez',
            email: 'juan.alvarez@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('2001-02-01T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('SUPERVISOR'),
                },
            },
        },
        {
            firstName: 'Ernesto',
            lastName: 'Perez',
            email: 'ernesto.perez@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('1997-10-18T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('AGENT'),
                },
            },
        },
        {
            firstName: 'Ana',
            lastName: 'Gonzalez',
            email: 'ana.gonzalez@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('2001-04-10T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('AGENT'),
                },
            },
        },
        {
            firstName: 'Carlos',
            lastName: 'Gomez',
            email: 'carlos.gomez@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('2000-08-15T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('AGENT'),
                },
            },
        },
        {
            firstName: 'Andrés',
            lastName: 'García',
            email: 'andres.garcia@test.com',
            password: generateHashSync('123456'),
            birthDate: new Date('1984-06-03T00:00:00.000'),
            role: {
                connect: {
                    id: roleId('AGENT'),
                },
            },
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
        userId: (email: string) => users.find(user => user.email === email)?.id,
    };
};

const seedTestCategories = async () => {
    const categoryData: Prisma.CategoryCreateInput[] = [
        {
            code: 'LICENSE',
            name: 'Licencias y permisos',
        },
        {
            code: 'HARDWARE',
            name: 'Hardware',
        },
        {
            code: 'SOFTWARE',
            name: 'Software',
        },
        {
            code: 'NETWORK',
            name: 'Redes',
        },
        {
            code: 'OTHER',
            name: 'Otros',
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
        categoryId: (code: string) =>
            categories.find(category => category.code === code)?.id,
    };
};

const seedTestTickets = async ({
    userId,
    categoryId,
}: {
    userId: IdFn;
    categoryId: IdFn;
}) => {
    const ticketCode: Record<string, string> = {
        TICKET_1: generateCode(),
        TICKET_2: generateCode(),
        TICKET_3: generateCode(),
        TICKET_4: generateCode(),
        TICKET_5: generateCode(),
        TICKET_6: generateCode(),
        TICKET_7: generateCode(),
        TICKET_8: generateCode(),
        TICKET_9: generateCode(),
    };

    const ticketData: Prisma.TicketCreateInput[] = [
        {
            code: ticketCode['TICKET_1'],
            title: 'Solicitud de renovación de licencia de software',
            description:
                'Se requiere renovar la licencia del software de Windows que está a punto de vencer.',
            priority: 'HIGH',
            status: 'CLOSED',
            createdAt: new Date('2022-12-11T03:27:29.391Z'),
            updatedAt: new Date('2022-12-11T03:27:29.391Z'),
            endedAt: new Date('2022-12-12T09:13:35.371Z'),
            timeEstimated: 1,
            category: {
                connect: {
                    id: categoryId('LICENSE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('daniela.rodriguez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ernesto.perez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_2'],
            title: 'Solicitud de permiso de acceso a recursos compartidos',
            description:
                'El usuario con código U012 necesita tener acceso a ciertos recursos compartidos en la red y requiere un permiso especial para ello.',
            priority: 'MEDIUM',
            status: 'RESOLVED',
            createdAt: new Date('2022-11-25T03:40:02.532Z'),
            updatedAt: new Date('2022-11-25T03:40:02.532Z'),
            timeEstimated: 2,
            category: {
                connect: {
                    id: categoryId('LICENSE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('juan.alvarez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ernesto.perez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_3'],
            title: 'Problema con la impresora',
            description:
                'La impresora de la oficina no está funcionando correctamente y necesita ser reparada o reemplazada.',
            priority: 'MEDIUM',
            status: 'IN_PROGRESS',
            createdAt: new Date('2022-11-19T12:17:19.357Z'),
            updatedAt: new Date('2022-11-19T12:17:19.357Z'),
            timeEstimated: 4,
            category: {
                connect: {
                    id: categoryId('HARDWARE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('daniela.rodriguez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ernesto.perez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_4'],
            title: 'Problema con el teclado',
            description:
                'El teclado del ordenador del usuario con código U021 no está funcionando correctamente y necesita ser reparado o reemplazado.',
            priority: 'LOW',
            status: 'CLOSED',
            createdAt: new Date('2022-11-27T07:27:55.751Z'),
            updatedAt: new Date('2022-11-27T07:27:55.751Z'),
            endedAt: new Date('2022-12-14T18:14:05.458Z'),
            timeEstimated: 3,
            category: {
                connect: {
                    id: categoryId('HARDWARE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('juan.alvarez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ernesto.perez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_5'],
            title: 'Error en el sistema operativo',
            description:
                ' El administrador del centro de datos ha informado que está recibiendo un mensaje de error en el sistema operativo y necesita ayuda para solucionarlo.',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            createdAt: new Date('2022-12-10T11:50:06.018Z'),
            updatedAt: new Date('2022-12-10T11:50:06.018Z'),
            timeEstimated: 5,
            category: {
                connect: {
                    id: categoryId('SOFTWARE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('daniela.rodriguez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ana.gonzalez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_6'],
            title: 'Actualización de software',
            description:
                'Se necesita actualizar el CRM en todos los ordenadores de la oficina para corregir un problema de seguridad conocido.',
            priority: 'HIGH',
            status: 'CLOSED',
            createdAt: new Date('2022-12-09T02:47:37.828Z'),
            updatedAt: new Date('2022-12-09T02:47:37.828Z'),
            endedAt: new Date('2022-12-13T06:14:56.390Z'),
            timeEstimated: 8,
            category: {
                connect: {
                    id: categoryId('SOFTWARE'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('juan.alvarez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('ana.gonzalez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_7'],
            title: 'Problemas de conectividad a internet',
            description:
                'Los usuarios están informando problemas para conectarse a internet en ciertas áreas de la oficina. Se necesita investigar el problema y solucionarlo.',
            priority: 'HIGH',
            status: 'OPEN',
            createdAt: new Date('2022-11-23T20:38:04.096Z'),
            updatedAt: new Date('2022-11-23T20:38:04.096Z'),
            timeEstimated: 10,
            category: {
                connect: {
                    id: categoryId('NETWORK'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('daniela.rodriguez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('carlos.gomez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_8'],
            title: 'Configuración de red inalámbrica',
            description:
                'El jefe de recursos humanos (código U004)necesita ayuda para configurar la conexión inalámbrica en su ordenador.',
            priority: 'LOW',
            status: 'OPEN',
            createdAt: new Date('2022-12-08T06:03:32.332Z'),
            updatedAt: new Date('2022-12-08T06:03:32.332Z'),
            timeEstimated: 4,
            category: {
                connect: {
                    id: categoryId('NETWORK'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('juan.alvarez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('carlos.gomez@test.com'),
                },
            },
        },
        {
            code: ticketCode['TICKET_9'],
            title: 'Problemas con el sistema de climatización del servidor',
            description:
                'La temperatura en el centro de datos está demasiado alta y se necesita solucionar el problema.',
            priority: 'HIGH',
            status: 'OPEN',
            createdAt: new Date('2022-11-17T10:57:49.815Z'),
            updatedAt: new Date('2022-11-17T10:57:49.815Z'),
            timeEstimated: 6,
            category: {
                connect: {
                    id: categoryId('OTHER'),
                },
            },
            supervisor: {
                connect: {
                    id: userId('juan.alvarez@test.com'),
                },
            },
            assignee: {
                connect: {
                    id: userId('andres.garcia@test.com'),
                },
            },
        },
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
            return tickets.find(ticket => ticket.code === code)?.id;
        },
    };
};

const seedTestTasks = async ({ ticketId }: { ticketId: IdFn }) => {
    const taskData: Prisma.TaskCreateInput[] = [
        {
            description:
                'Revisar el estado de la licencia y aplicar la actualización',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_1'),
                },
            },
        },
        {
            description: 'Revisar los recursos solicitados por el usuario',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_2'),
                },
            },
        },
        {
            description:
                'Crear permiso especial para el usuario con acceso limitado',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_2'),
                },
            },
        },
        {
            description:
                'Compartir recursos con el usuario y comprobar el funcionamiento con la nueva política de acceso',
            timeSpent: 2,
            ticket: {
                connect: {
                    id: ticketId('TICKET_2'),
                },
            },
        },
        {
            description: 'Reemplazar el teclado dañado',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_4'),
                },
            },
        },
        {
            description: 'Revisar logs del sistema',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_5'),
                },
            },
        },
        {
            description: 'Solicitar acceso a la nueva actualización del CRM',
            timeSpent: 1,
            ticket: {
                connect: {
                    id: ticketId('TICKET_6'),
                },
            },
        },
        {
            description:
                'Revisar y comprobar requisitos de la nueva actualización del CRM',
            timeSpent: 2,
            ticket: {
                connect: {
                    id: ticketId('TICKET_6'),
                },
            },
        },
        {
            description:
                'Instalar nueva actualización del CRM en entorno de pruebas',
            timeSpent: 2,
            ticket: {
                connect: {
                    id: ticketId('TICKET_6'),
                },
            },
        },
        {
            description:
                'Desplegar nueva actualización del CRM en los ordenadores de los usuarios',
            timeSpent: 4,
            ticket: {
                connect: {
                    id: ticketId('TICKET_6'),
                },
            },
        },
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
};

async function main() {
    console.log(`Start seeding...`);
    const { roleId } = await seedRoles();
    await seedUsers({ roleId });
    if (IS_DEV) {
        const { userId: testUserId } = await seedTestUsers({ roleId });
        const { categoryId } = await seedTestCategories();
        const { ticketId } = await seedTestTickets({
            userId: testUserId,
            categoryId,
        });
        await seedTestTasks({ ticketId });
    }
    console.log(`Seeding process finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
