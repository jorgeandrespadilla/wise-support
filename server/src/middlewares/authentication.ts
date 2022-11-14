import { IncomingHttpHeaders } from "http"
import { db } from "@/database/client"
import { UnauthorizedError } from "@/common/errors"
import { verifyToken } from "@/utils/authToken"
import { catchErrors } from "@/utils/catchErrors"
import { TokenData } from "@/types"

/**
 * Middleware to validate the user's authentication token.
 */
export const authorize = catchErrors(async (req, _res, next) => {
    const token = getAuthTokenFromHeaders(req.headers);
    if (!token) throw new UnauthorizedError("No se ha proporcionado un token de autenticación.");

    const userId = verifyToken<TokenData>(token).userId;
    if (!userId) throw new UnauthorizedError('Token de autenticación inválido.');

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { role: true },
    });

    if (!user) throw new UnauthorizedError('Usuario no encontrado.');

    req.currentUser = user;
    next();
});

const getAuthTokenFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    const header = headers.authorization || '';
    const [bearer, token] = header.split(' ');
    return bearer === 'Bearer' && token ? token : null;
};
