import { db } from "@/database/client";
import { Role, SelectFields } from "@/types";
import { catchErrors } from "@/utils/catchErrors";

const fieldsToSelect: SelectFields<Role> = {
    id: true,
    code: true,
    name: true,
    description: true,
};

export const getRoles = catchErrors(async (_req, res) => {
    const roles = await db.role.findMany({
        select: fieldsToSelect
    });

    res.send(roles);
});
