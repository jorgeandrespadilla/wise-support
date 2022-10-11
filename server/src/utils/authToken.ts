import { randomBytes } from 'crypto';
import { isPlainObject } from 'lodash';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_CONFIG } from '@/constants/settings';
import { UnauthorizedError } from '@/common/errors';

export const generateToken = <T extends object>(payload: T, options?: SignOptions): string => {
    return jwt.sign(payload, JWT_CONFIG.secret, {
        expiresIn: JWT_CONFIG.expiresIn,
        ...options
    });
}

export const verifyToken = <T = Record<string, any>>(token: string): T => {
    try {
        const payload = jwt.verify(token, JWT_CONFIG.secret);
        if (isPlainObject(payload)) {
            return payload as T;
        }
        throw new UnauthorizedError("Token de autenticación inválido.");
    } catch (err) {
        throw new UnauthorizedError("Token de autenticación inválido.");
    }
}

export const generateSecret = (): string => {
    // If your secret is simple, the token verification process 
    // will be much easier to break by an unauthorized user.
    return randomBytes(64).toString('hex');
}