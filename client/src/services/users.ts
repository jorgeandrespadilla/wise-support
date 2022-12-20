import {
    AddUserRequest,
    GetUserProfileResponse,
    GetUserResponse,
    UpdateUserRequest,
} from 'types';
import api from 'utils/api';

export const getProfile = async () => {
    return await api.get<GetUserProfileResponse>('/profile');
};

export const getUser = async (id: string) => {
    return await api.get<GetUserResponse>(`/users/${id}`);
};

export const getUsers = async () => {
    return await api.get<GetUserResponse[]>('/users');
};

export const getUsersByRole = async (roleCode: string) => {
    return await api.get<GetUserResponse[]>('/users', { role: roleCode });
};

export const addUser = async (request: AddUserRequest) => {
    return await api.post('/users', request);
};

export const updateUser = async (id: string, request: UpdateUserRequest) => {
    return await api.put(`/users/${id}`, request);
};

export const deleteUser = async (id: string) => {
    return await api.delete(`/users/${id}`);
};
