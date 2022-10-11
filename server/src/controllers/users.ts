import { omit } from "lodash";
import { User } from "@prisma/client";
import { db } from "@/database/client";
import { catchErrors } from "@/utils/catchErrors";
import { EntityNotFoundError, ValidationError } from "@/common/errors";
import { UserCreateRequestSchema, UserUpdateRequestSchema } from "@/schemas/users";
import { validateAndParse } from "@/utils/validation";

export const getUsers = catchErrors(async (_req, res) => {
    const users = await db.user.findMany();

    const data = users.map((user) => mapToUserResponse(user));
    res.send(data);
});

export const getUserById = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    await validateUser(userId);

    const user = await db.user.findUnique({
        where: { id: userId },
    });
    res.send(mapToUserResponse(user!));
});

export const createUser = catchErrors(async (req, res) => {
    const data = validateAndParse(UserCreateRequestSchema, req.body);
    await validateExistingEmail(data.email);

    const user = await db.user.create({
        data,
    });
    res.send(mapToUserResponse(user));
});

export const updateUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);
    const data = validateAndParse(UserUpdateRequestSchema, req.body);
    await validateUser(userId);
    await validateExistingEmail(data.email, userId);

    const user = await db.user.update({
        where: { id: userId },
        data,
    });
    res.send(mapToUserResponse(user));
});

export const deleteUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    await validateUser(userId);

    await db.user.delete({
        where: { id: userId },
    });

    res.send({ message: "Usuario eliminado." });
});

export const getCurrentUser = catchErrors(async (req, res) => {
    res.send(mapToUserResponse(req.currentUser));
});

function mapToUserResponse(user: User) {
    return {
        ...omit(user, ["password"]),
        fullName: `${user.firstName} ${user.lastName}`,
    };
}

//#region Validation functions

async function validateUser(userId: number) {
    const user = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new EntityNotFoundError("Usuario", { id: userId });
}

async function validateExistingEmail(email: string, userId?: number) {
    // Check if email is already in use
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) return;
    if (userId && user.id === userId) return;

    throw new ValidationError("El correo electrónico ya está en uso.", { email });
}

//#endregion