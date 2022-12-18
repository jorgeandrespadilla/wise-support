import { DropdownOption } from "types/ui";

export const ticketStatus: Record<string, string> = {
    "OPEN": "Abierto",
    "IN_PROGRESS": "En curso",
    "RESOLVED": "Resuelto",
    "CANCELED": "Cancelado",
    "CLOSED": "Cerrado"
};

export const ticketPriority: Record<string, string> = {
    "LOW": "Baja",
    "MEDIUM": "Media",
    "HIGH": "Alta"
};

export const ticketStatusOptions: DropdownOption[] = Object.entries(ticketStatus).map(([key, value]) => ({
    label: value,
    value: key,
}));

export const ticketPriorityOptions: DropdownOption[] = Object.entries(ticketPriority).map(([key, value]) => ({
    label: value,
    value: key,
}));

export const showAllFilter = "ALL";

export const showAllFilterOption: DropdownOption = {
    label: "Todos",
    value: showAllFilter,
};

