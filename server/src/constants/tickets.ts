import { TicketPriority, TicketStatus } from "@prisma/client";
import { role } from "./roles";

export const ticketPriority = TicketPriority;

export const friendlyTicketPriority: Record<string, string> = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta"
};

export const allTicketPriorities = Object.values(TicketPriority);

export const ticketStatus = TicketStatus;

export const friendlyTicketStatus: Record<string, string> = {
    "OPEN": "Abierto",
    "IN_PROGRESS": "En curso",
    "RESOLVED": "Resuelto",
    "CANCELED": "Cancelado",
    "CLOSED": "Cerrado"
};

export const allTicketStatuses = Object.values(TicketStatus);

export const allowedStatusByRole: Record<string, string[]> = {
    [role.ADMIN]: allTicketStatuses,
    [role.SUPERVISOR]: allTicketStatuses,
    [role.AGENT]: allTicketStatuses.filter(status => !hasTicketEnded(status)),
};

export function hasTicketEnded(ticketStatus: string) {
    return ticketStatus === TicketStatus.CLOSED || ticketStatus === TicketStatus.CANCELED;
}
