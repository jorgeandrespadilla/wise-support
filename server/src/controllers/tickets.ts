import { EntityNotFoundError, ForbiddenError, ValidationError } from "@/common/errors";
import { db } from "@/database/client";
import { catchErrors } from "@/utils/catchErrors";
import { SelectFields, TicketCategory, TicketDetail, TicketTask, TicketUser, UserProfile } from "@/types";
import { omit } from "lodash";
import { validateAndParse } from "@/utils/validation";
import { GetTicketsRequestSchema, CreateTicketRequestSchema, UpdateTicketRequestSchema } from "@/schemas/tickets";
import { generateCode } from "@/utils/uuid";
import { today } from "@/utils/dateHelpers";
import { role } from "@/constants/roles";
import { TicketPriority, TicketStatus } from "@prisma/client";
import { allTicketStatuses, allTicketPriorities, allowedStatusByRole, friendlyTicketStatus, hasTicketEnded, ticketStatus } from "@/constants/tickets";


//#region Data selection

const categoryFieldsToSelect: SelectFields<TicketCategory> = {
    id: true,
    name: true,
    code: true,
    description: true,
};

const userFieldsToSelect: SelectFields<TicketUser> = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
};

const taskFieldsToSelect: SelectFields<TicketTask> = {
    id: true,
    timeSpent: true,
};

const ticketFieldsToSelect: SelectFields<TicketDetail> = {
    id: true,
    code: true,
    title: true,
    description: true,
    status: true,
    priority: true,
    timeEstimated: true,
    createdAt: true,
    endedAt: true,
    assigneeId: true,
    supervisorId: true,
    categoryId: true,
    assignee: {
        select: userFieldsToSelect,
    },
    supervisor: {
        select: userFieldsToSelect,
    },
    category: {
        select: categoryFieldsToSelect,
    },
    tasks: {
        select: taskFieldsToSelect,
    },
};

//#endregion


//#region Data filters

const getTicketFiltersByRole = (userId: number, roleCode: string) => {
    const filters = {
        [role.ADMIN]: {},
        [role.SUPERVISOR]: {
            supervisorId: userId,
        },
        [role.AGENT]: {
            assigneeId: userId,
        }
    }
    return filters[roleCode];
};

//#endregion


export const getTickets = catchErrors(async (req, res) => {
    const requestData = validateAndParse(GetTicketsRequestSchema, req.query);

    const ticketStatus = validateTicketStatus(requestData.status);

    const tickets = await db.ticket.findMany({
        select: ticketFieldsToSelect,
        where: {
            status: ticketStatus,
            ...getTicketFiltersByRole(req.currentUser.id, req.currentUser.role.code),
        }
    });

    res.send(tickets.map(mapToTicketResponse));
});

export const getTicketById = catchErrors(async (req, res) => {
    const ticketId = Number(req.params.ticketId);

    await validateTicket(ticketId);
    await validateAccessToTicket(ticketId, req.currentUser);

    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: ticketFieldsToSelect
    });
    res.send(mapToTicketResponse(ticket!));
});

export const createTicket = catchErrors(async (req, res) => {
    const { assigneeId, supervisorId, categoryId, ...requestData } = validateAndParse(CreateTicketRequestSchema, req.body);

    const ticketPriority = validateTicketPriority(requestData.priority);

    const ticket = await db.ticket.create({
        data: {
            ...requestData,
            code: generateCode(),
            priority: ticketPriority,
            status: ticketStatus.OPEN,
            assignee: {
                connect: { id: assigneeId }
            },
            supervisor: {
                connect: { id: supervisorId }
            },
            category: {
                connect: { id: categoryId }
            },
        },
        select: ticketFieldsToSelect
    });
    res.send(mapToTicketResponse(ticket));
});

export const updateTicket = catchErrors(async (req, res) => {
    const ticketId = Number(req.params.ticketId);
    const { assigneeId, supervisorId, categoryId, ...data } = validateAndParse(UpdateTicketRequestSchema, req.body);

    await validateTicket(ticketId);
    await validateAccessToTicket(ticketId, req.currentUser);

    const ticketStatus = validateTicketStatus(data.status)!;
    const ticketPriority = validateTicketPriority(data.priority)!;
    await validateTicketStatusByRoleCode(ticketId, ticketStatus, req.currentUser.role.code);

    const ticket = await db.ticket.update({
        where: { id: ticketId },
        data: {
            ...data,
            status: ticketStatus,
            priority: ticketPriority,
            endedAt: hasTicketEnded(ticketStatus) ? today() : null,
            assignee: {
                connect: { id: assigneeId }
            },
            supervisor: {
                connect: { id: supervisorId }
            },
            category: {
                connect: { id: categoryId }
            },
        },
        select: ticketFieldsToSelect
    });
    res.send(mapToTicketResponse(ticket));
});

export const deleteTicket = catchErrors(async (req, res) => {
    const ticketId = Number(req.params.ticketId);

    await validateTicket(ticketId);
    await validateAccessToTicket(ticketId, req.currentUser);
    await validateTicketToDelete(ticketId);

    await db.ticket.delete({
        where: { id: ticketId }
    });

    res.send({ message: "Ticket eliminado." });
});

function mapToTicketResponse(ticket: TicketDetail) {
    return {
        ...omit(ticket, "tasks"),
        timeSpent: ticket.tasks.reduce((acc, task) => acc + task.timeSpent, 0),
        assignee: {
            ...ticket.assignee,
            fullName: `${ticket.assignee.firstName} ${ticket.assignee.lastName}`,
        },
        supervisor: {
            ...ticket.supervisor,
            fullName: `${ticket.supervisor.firstName} ${ticket.supervisor.lastName}`,
        },
    };
}


//#region Validation functions

/**
 * Validates that the ticket exists.
 */
async function validateTicket(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId }
    });
    if (!ticket) throw new EntityNotFoundError("Ticket", { id: ticketId });
}

/**
 * Validates that ticket status is valid.
 * @returns The status if it is valid.
 * @throws EntityNotFoundError if the status is not valid.
 */
function validateTicketStatus(status: string | undefined) {
    if (status === undefined) return undefined;
    if (allTicketStatuses.includes(status as TicketStatus)) return status as TicketStatus;
    throw new EntityNotFoundError("Estado de ticket", { code: status });
}

/**
 * Validates that ticket priority is valid.
 * @returns The priority if it is valid.
 * @throws EntityNotFoundError if the priority is not valid.
 */
function validateTicketPriority(priority: string | undefined) {
    if (!priority) return undefined;
    if (allTicketPriorities.includes(priority as TicketPriority)) return priority as TicketPriority;
    throw new EntityNotFoundError("Prioridad de ticket", { code: priority });
}

/**
 * Validates that the user can update the ticket based on the role.
 */
async function validateTicketStatusByRoleCode(ticketId: number, newStatus: string, roleCode: string) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId }
    });
    const currentStatus = ticket!.status;

    if (roleCode !== role.ADMIN) {
        // Other roles can only change the status of a ticket if it is not ended.
        if (hasTicketEnded(currentStatus)) {
            throw new ValidationError(`El ticket ha sido finalizado.`);
        }
        if (!allowedStatusByRole[roleCode].includes(newStatus)) {
            throw new ValidationError(`El usuario no puede cambiar el estado a ${friendlyTicketStatus[newStatus]}.`);
        }
    }
}

/**
 * Validates if the ticket has been ended and if it has tasks associated. 
 */
async function validateTicketToDelete(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId }
    });
    const currentStatus = ticket!.status;

    if (hasTicketEnded(currentStatus)) {
        throw new ValidationError(`El ticket ha sido finalizado.`);
    }

    const tasks = await db.task.findMany({
        where: { ticketId }
    });

    if (!tasks.isEmpty()) {
        throw new ValidationError("El ticket tiene tareas asociadas.");
    }
}

/**
 * Validates if the user has access to the ticket.
 */
async function validateAccessToTicket(ticketId: number, user: UserProfile) {
    const hasAccess = await hasAccessToTicket(ticketId, user);
    if (!hasAccess) throw new ForbiddenError("No tiene permisos para acceder al ticket.");
}

/**
 * Checks if the user has access to the ticket.
 * 
 * 1. If role is ADMIN, has access to all tickets.
 * 2. If role is SUPERVISOR, has access all tickets where he is the supervisor.
 * 3. If role is AGENT, has access all tickets where he is the assignee.
 */
async function hasAccessToTicket(ticketId: number, user: UserProfile) {
    const roleCode = user.role.code;
    if (roleCode === role.ADMIN) return true;
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: {
            assigneeId: true,
            supervisorId: true
        }
    });
    return ticket!.supervisorId === user.id || ticket!.assigneeId === user.id;
}

//#endregion