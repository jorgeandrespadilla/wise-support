import { EntityNotFoundError, ValidationError } from "@/common/errors";
import { hasTicketEnded } from "@/constants/tickets";
import { db } from "@/database/client";
import { TaskRequestSchema } from "@/schemas/tasks";
import { SelectFields, Task } from "@/types";
import { catchErrors } from "@/utils/catchErrors";
import { validateAndParse } from "@/utils/validation";

const fieldsToSelect: SelectFields<Task> = {
    id: true,
    description: true,
    createdAt: true,
    timeSpent: true,
};

export const getTasksByTicketId = catchErrors(async (_req, res) => {
    const ticketId = Number(_req.query.ticketId);

    await validateTicket(ticketId);

    const tasks = await db.task.findMany({
        where: { ticketId },
        select: fieldsToSelect
    });

    res.send(tasks);
});

export const getTaskById = catchErrors(async (_req, res) => {
    const taskId = Number(_req.params.taskId);

    await validateTask(taskId);

    const task = await db.task.findUnique({
        where: { id: taskId },
        select: fieldsToSelect
    });
    res.send(task);
});

export const createTask = catchErrors(async (req, res) => {
    const { ticketId, ...data } = validateAndParse(TaskRequestSchema, req.body);

    await validateTicket(ticketId);
    await validateTicketStatus(ticketId);

    const task = await db.task.create({
        data: {
            ...data,
            ticket: {
                connect: { id: ticketId },
            }
        },
        select: fieldsToSelect
    });

    res.send(task);
});

export const updateTask = catchErrors(async (req, res) => {
    const taskId = Number(req.params.taskId);
    const { ticketId, ...data } = validateAndParse(TaskRequestSchema, req.body);

    await validateTask(taskId);
    await validateTicketStatus(ticketId);

    const task = await db.task.update({
        where: { id: taskId },
        data: {
            ...data,
            ticket: {
                connect: { id: ticketId },
            }
        },
        select: fieldsToSelect
    });

    res.send(task);
});

export const deleteTask = catchErrors(async (req, res) => {
    const taskId = Number(req.params.taskId);

    await validateTask(taskId);
    const task = await db.task.findUnique({
        where: { id: taskId },
        select: { ticketId: true }
    });
    await validateTicketStatus(task!.ticketId);

    await db.task.delete({
        where: { id: taskId }
    });

    res.send({ message: "Tarea eliminada." });
});


//#region Validation functions

async function validateTicket(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId }
    });

    if (!ticket) throw new EntityNotFoundError("Ticket", { id: ticketId });
}

async function validateTicketStatus(ticketId: number) {
    const ticket = await db.ticket.findUnique({
        where: { id: ticketId },
        select: { status: true }
    });
    const currentStatus = ticket!.status;

    if (hasTicketEnded(currentStatus)) {
        throw new ValidationError(`El ticket ha sido finalizado`);
    }
}

async function validateTask(taskId: number) {
    const task = await db.task.findUnique({
        where: { id: taskId }
    });

    if (!task) throw new EntityNotFoundError("Tarea", { id: taskId });
}

//#endregion
