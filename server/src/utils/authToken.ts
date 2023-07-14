import { randomBytes } from 'crypto';
import { isPlainObject } from 'lodash';
import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { JWT_CONFIG } from '@/constants/settings';
import { InvalidTokenError } from '@/common/errors';
import { TokenData } from '@/types';

export const generateAccessToken = (payload: TokenData) => {
    const expiresIn = JWT_CONFIG.accessToken.expiresIn;
    const token = generateToken(payload, JWT_CONFIG.accessToken.secret, {
        expiresIn,
    });
    return {
        token,
        expiresIn: ms(expiresIn),
    };
};

export const generateRefreshToken = (payload: TokenData) => {
    const expiresIn = JWT_CONFIG.refreshToken.expiresIn;
    const token = generateToken(payload, JWT_CONFIG.refreshToken.secret, {
        expiresIn,
    });
    return {
        token,
        expiresIn: ms(expiresIn),
    };
};

export const verifyAccessToken = (token: string) =>
    verifyToken<TokenData>(token, JWT_CONFIG.accessToken.secret);

export const verifyRefreshToken = (token: string) =>
    verifyToken<TokenData>(token, JWT_CONFIG.refreshToken.secret);

const generateToken = <T extends object>(
    payload: T,
    secret: string,
    options?: SignOptions,
) => {
    return jwt.sign(payload, secret, options);
};

const verifyToken = <T = Record<string, unknown>>(
    token: string,
    secret: string,
): T & jwt.JwtPayload => {
    try {
        const payload = jwt.verify(token, secret);
        if (isPlainObject(payload)) {
            return payload as T & jwt.JwtPayload;
        }
        throw new InvalidTokenError();
    } catch (err) {
        throw new InvalidTokenError();
    }
};

export const readToken = <T = Record<string, unknown>>(
    token: string,
): T & jwt.JwtPayload => {
    try {
        const payload = jwt.decode(token);
        if (isPlainObject(payload)) {
            return payload as T & jwt.JwtPayload;
        }
        throw new InvalidTokenError();
    } catch (err) {
        throw new InvalidTokenError();
    }
};

export const generateSecret = (): string => {
    // If your secret is simple, the token verification process
    // will be much easier to break by an unauthorized user.
    return randomBytes(64).toString('hex');
};
