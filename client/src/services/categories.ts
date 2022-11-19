import { AddCategoryRequest, GetCategoryResponse, UpdateCategoryRequest } from "types";
import api from "utils/api";

export const getCategory = async (id: string) => {
    return await api.get<GetCategoryResponse>(`/categories/${id}`);
}

export const getCategories = async () => {
    return await api.get<GetCategoryResponse[]>("/categories");
}

export const addCategory = async (request: AddCategoryRequest) => {
    return await api.post("/categories", request);
}

export const updateCategory = async (id: string, request: UpdateCategoryRequest) => {
    return await api.put(`/categories/${id}`, request);
}

export const deleteCategory = async (id: string) => {
    return await api.delete(`/categories/${id}`);
}
