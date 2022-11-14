import { UserData } from "types";
import api from "utils/api";

export const getUsers = async () => {
    return await api.get<UserData[]>("/users");
};