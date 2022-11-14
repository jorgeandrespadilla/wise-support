import { db } from "@/database/client";
import { catchErrors } from "@/utils/catchErrors";

export const getRoles = catchErrors(async (_req, res) => {
    const roles = await db.role.findMany({
        select: {
            id: true,
            code: true,
            name: true,
            description: true,
        }
    });

    res.send(roles);
});
