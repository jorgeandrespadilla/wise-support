import { RoleResponse } from "types";
import api from "utils/api";

export const getRoles = async () => {
    return await api.get<RoleResponse[]>("/roles");
}
