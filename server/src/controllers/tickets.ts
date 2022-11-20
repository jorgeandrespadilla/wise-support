import { EntityNotFoundError, ValidationError } from "@/common/errors";
import { db } from "@/database/client";
import { catchErrors } from "@/utils/catchErrors";
import { SelectFields, TicketCategory, TicketDetail, TicketTask, TicketUser } from "@/types";
import { omit } from "lodash";
import { validateAndParse } from "@/utils/validation";
import { TicketCreateRequestSchema, TicketUpdateRequestSchema } from "@/schemas/tickets";
import { generateCode } from "@/utils/uuid";
import { TicketPriority, TicketStatus } from "@prisma/client";
import { today } from "@/utils/dateHelpers";


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


export const getTickets = catchErrors(async (_req, res) => {
    const tickets = await db.ticket.findMany({
        select: ticketFieldsToSelect
    });

    const data = tickets.map(mapToTicketResponse);
    res.send(data);
});

export const getTicketById = catchErrors(async (req, res) => {
    const ticketId = Number(req.params.ticketId);

    await validateTicket(ticketId);

    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: ticketFieldsToSelect
    });
    res.send(mapToTicketResponse(ticket!));
});

export const createTicket = catchErrors(async (req, res) => {
    const { assigneeId, supervisorId, categoryId, ...data } = validateAndParse(TicketCreateRequestSchema, req.body);

    const ticket = await db.ticket.create({
        data: {
            ...data,
            code: generateCode(),
            priority: data.priority as TicketPriority,
            status: "OPEN",
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
    const { assigneeId, supervisorId, categoryId, ...data } = validateAndParse(TicketUpdateRequestSchema, req.body);

    await validateTicket(ticketId);
    await validateCurrentTicketStatus(ticketId);

    const ticket = await db.ticket.update({
        where: { id: ticketId },
        data: {
            ...data,
            status: data.status as TicketStatus,
            priority: data.priority as TicketPriority,
            endedAt: hasEnded(data.status) ? today() : null,
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
    await validateCurrentTicketStatus(ticketId);
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

export function hasEnded(ticketStatus: string) {
    return ticketStatus === "CLOSED" || ticketStatus === "CANCELED";
}

async function validateTicket(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId }
    });
    if (!ticket) throw new EntityNotFoundError("Ticket", { id: ticketId });
}

async function validateCurrentTicketStatus(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: { status: true }
    });
   
    if (hasEnded(ticket!.status)) {
        throw new ValidationError(`El ticket ha sido finalizado`);
    }
}

async function validateTicketToDelete(ticketId: number) {
    const tasks = await db.task.findMany({
        where: { ticketId }
    });

    if (!tasks.isEmpty()) {
        throw new ValidationError("El ticket tiene tareas asociadas.");
    }
}

//#endregion