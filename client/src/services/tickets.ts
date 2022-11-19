import { AddTicketRequest, GetTicketResponse, UpdateTicketRequest } from "types";
import api from "utils/api";

export const getTicket = async (id: string) => {
    return await api.get<GetTicketResponse>(`/tickets/${id}`);
}

export const getTickets = async () => {
    return await api.get<GetTicketResponse[]>("/tickets");
}

export const addTicket = async (request: AddTicketRequest) => {
    return await api.post("/tickets", request);
}

export const updateTicket = async (id: string, request: UpdateTicketRequest) => {
    return await api.put(`/tickets/${id}`, request);
}

export const deleteTicket = async (id: string) => {
    return await api.delete(`/tickets/${id}`);
}
