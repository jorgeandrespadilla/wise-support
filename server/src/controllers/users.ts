import { db } from "@/database/client";
import { catchErrors } from "@/utils/catchErrors";
import { EntityNotFoundError, ValidationError } from "@/common/errors";
import { GetUserRequestSchema, UserCreateRequestSchema, UserUpdateRequestSchema } from "@/schemas/users";
import { validateAndParse } from "@/utils/validation";
import { Role, SelectFields, User } from "@/types";

const roleFieldsToSelect: SelectFields<Role> = {
    id: true,
    code: true,
    name: true,
    description: true,
};

const userFieldsToSelect: SelectFields<User> = {
    id: true,
    birthDate: true,
    createdAt: true,
    email: true,
    firstName: true,
    lastName: true,
    roleId: true,
    role: {
        select: roleFieldsToSelect,
    },
};


export const getUsers = catchErrors(async (req, res) => {
    const { role: roleCode } = validateAndParse(GetUserRequestSchema, req.query);

    let filter = {};
    if (roleCode) {
        const role = await db.role.findUnique({
            where: { code: roleCode }
        });

        if (!role) throw new EntityNotFoundError("Rol", { code: roleCode });

        filter = { roleId: role.id };
    }

    const users = await db.user.findMany({
        where: filter,
        select: userFieldsToSelect
    });
    
    const data = users.map(mapToUserResponse);
    res.send(data);
});

export const getUserById = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    await validateUser(userId);

    const user = await db.user.findUnique({
        where: { id: userId },
        select: userFieldsToSelect
    });
    res.send(mapToUserResponse(user!));
});

export const createUser = catchErrors(async (req, res) => {
    const { roleId, ...data } = validateAndParse(UserCreateRequestSchema, req.body);

    await validateExistingEmail(data.email);

    const user = await db.user.create({
        data: {
            ...data,
            role: {
                connect: { id: roleId }
            },
        },
        select: userFieldsToSelect
    });
    res.send(mapToUserResponse(user));
});

export const updateUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);
    const { roleId, ...data } = validateAndParse(UserUpdateRequestSchema, req.body);

    await validateUser(userId);
    await validateExistingEmail(data.email, userId);

    const user = await db.user.update({
        where: { id: userId },
        data: {
            ...data,
            role: {
                connect: { id: roleId },
            }
        },
        select: userFieldsToSelect
    });
    res.send(mapToUserResponse(user));
});

export const deleteUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    if (userId === req.currentUser.id) {
        throw new ValidationError("La cuenta actual no puede ser eliminada.");
    }
    await validateUser(userId);
    await validateUserToDelete(userId);

    await db.user.delete({
        where: { id: userId }
    });

    res.send({ message: "Usuario eliminado." });
});

export const getCurrentUser = catchErrors(async (req, res) => {
    res.send(mapToUserResponse(req.currentUser));
});

function mapToUserResponse(user: User) {
    return {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
    };
}


//#region Validation functions

async function validateUser(userId: number) {
    const user = await db.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new EntityNotFoundError("Usuario", { id: userId });
}

async function validateExistingEmail(email: string, userId?: number) {
    // Check if email is already in use
    const user = await db.user.findUnique({
        where: { email }
    });

    if (!user) return;
    if (userId && user.id === userId) return;

    throw new ValidationError("El correo electrónico ya está en uso.", { email });
}

async function validateUserToDelete(userId: number) {
    // Check if user has any associated tickets
    const tickets = await db.ticket.findMany({
        where: {
            OR: [
                { assigneeId: userId },
                { supervisorId: userId },
            ]
        }
    });
    if (!tickets.isEmpty()) {
        throw new ValidationError("El usuario tiene tickets asociados.");
    }
}

//#endregion