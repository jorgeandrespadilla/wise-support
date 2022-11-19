import { AddTaskRequest, GetTaskResponse, UpdateTaskRequest } from "types";
import api from "utils/api";

export const getTask = async (id: string) => {
    return await api.get<GetTaskResponse>(`/tasks/${id}`);
}

export const getTasksByTicketId = async (ticketId: string) => {
    return await api.get<GetTaskResponse[]>("/tasks", { 
        ticketId: ticketId
    });
}

export const addTask = async (request: AddTaskRequest) => {
    return await api.post("/tasks", request);
}

export const updateTask = async (id: string, request: UpdateTaskRequest) => {
    return await api.put(`/tasks/${id}`, request);
}

export const deleteTask = async (id: string) => {
    return await api.delete(`/tasks/${id}`);
}
