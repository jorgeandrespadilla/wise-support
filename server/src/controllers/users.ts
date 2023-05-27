import { db } from '@/database/client';
import {
    GetUsersRequestSchema,
    CreateUserRequestSchema,
    UpdateUserRequestSchema,
} from '@/schemas/users';
import {
    Role,
    SelectFields,
    User,
    UserProfile,
    UserProfileResponse,
    UserResponse,
} from '@/types';
import { EntityNotFoundError, ValidationError } from '@/common/errors';
import { catchErrors } from '@/utils/catchErrors';
import { validateAndParse } from '@/utils/validation';
import { generateHash } from '@/utils/crypto';
import { formatDate } from '@/utils/dateHelpers';

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
    const { role: roleCode } = validateAndParse(
        GetUsersRequestSchema,
        req.query,
    );

    if (roleCode) await validateRole(roleCode);

    const users = await db.user.findMany({
        where: {
            role: {
                code: roleCode,
            },
        },
        select: userFieldsToSelect,
    });

    const data = users.map(mapToUserResponse);
    res.send(data);
});

export const getUserById = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    await validateUser(userId);

    const user = await db.user.findUnique({
        where: { id: userId },
        select: userFieldsToSelect,
    });

    res.send(mapToUserResponse(user!));
});

export const createUser = catchErrors(async (req, res) => {
    const { roleId, password, ...data } = validateAndParse(
        CreateUserRequestSchema,
        req.body,
    );

    await validateExistingEmail(data.email);

    const userPassword = await generateHash(password);

    const user = await db.user.create({
        data: {
            ...data,
            password: userPassword,
            role: {
                connect: { id: roleId },
            },
        },
        select: userFieldsToSelect,
    });

    res.send(mapToUserResponse(user));
});

export const updateUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);
    const { roleId, password, ...data } = validateAndParse(
        UpdateUserRequestSchema,
        req.body,
    );

    await validateUser(userId);
    await validateExistingEmail(data.email, userId);

    const userPassword = password ? await generateHash(password) : undefined;

    const user = await db.user.update({
        where: { id: userId },
        data: {
            ...data,
            password: userPassword,
            role: {
                connect: { id: roleId },
            },
        },
        select: userFieldsToSelect,
    });

    res.send(mapToUserResponse(user));
});

export const deleteUser = catchErrors(async (req, res) => {
    const userId = Number(req.params.userId);

    await validateUser(userId);
    validateCurrentUser(userId, req.currentUser.id);
    await validateUserToDelete(userId);

    await db.user.delete({
        where: { id: userId },
    });

    res.send({ message: 'Usuario eliminado.' });
});

export const getCurrentUser = catchErrors(async (req, res) => {
    res.send(mapToUserProfileResponse(req.currentUser));
});

function mapToUserResponse(user: User): UserResponse {
    return {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        birthDate: formatDate(user.birthDate),
    };
}

function mapToUserProfileResponse(user: UserProfile): UserProfileResponse {
    return mapToUserResponse(user);
}

//#region Validation functions

async function validateUser(userId: number) {
    const user = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new EntityNotFoundError('Usuario', { id: userId });
    }
}

function validateCurrentUser(userId: number, currentUserId: number) {
    if (userId === currentUserId) {
        throw new ValidationError('La cuenta actual no puede ser eliminada.');
    }
}

async function validateRole(roleCode: string) {
    const role = await db.role.findUnique({
        where: { code: roleCode },
    });

    if (!role) {
        throw new EntityNotFoundError('Rol', { code: roleCode });
    }
}

async function validateExistingEmail(email: string, userId?: number) {
    // Check if email is already in use
    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) return;
    if (userId && user.id === userId) return;

    throw new ValidationError('El correo electrónico ya está en uso.', {
        email,
    });
}

async function validateUserToDelete(userId: number) {
    // Check if user has any associated tickets
    const tickets = await db.ticket.findMany({
        where: {
            OR: [{ assigneeId: userId }, { supervisorId: userId }],
        },
    });
    if (!tickets.isEmpty()) {
        throw new ValidationError('El usuario tiene tickets asociados.');
    }
}

//#endregion
