import { IncomingHttpHeaders } from "http"
import { db } from "@/database/client"
import { InvalidTokenError, UnauthorizedError } from "@/common/errors"
import { catchErrors } from "@/utils/catchErrors"
import { SelectFields, UserProfile } from "@/types"
import { verifyAccessToken } from "@/utils/authToken"

const userFieldsToSelect: SelectFields<UserProfile> = {
    id: true,
    birthDate: true,
    createdAt: true,
    email: true,
    firstName: true,
    lastName: true,
    roleId: true,
    role: {
        select: {
            id: true,
            code: true,
            name: true,
            description: true,
        },
    },
};

/**
 * Middleware to validate the user's authentication token.
 */
export const authorize = (roles: string[]) => catchErrors(async (req, _res, next) => {
    const token = getAuthTokenFromHeaders(req.headers);
    if (!token) throw new InvalidTokenError("No se ha proporcionado un token de autenticación.");

    const userId = verifyAccessToken(token).userId;
    if (!userId) throw new InvalidTokenError('Token de autenticación inválido.');

    const user = await db.user.findUnique({
        where: { id: userId },
        select: userFieldsToSelect
    });

    if (!user) throw new InvalidTokenError('Usuario no encontrado.');

    if (!roles.includes(user.role.code)) throw new UnauthorizedError('El usuario no puede acceder a este recurso.');

    req.currentUser = user;
    next();
});

const getAuthTokenFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    const header = headers.authorization || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};
