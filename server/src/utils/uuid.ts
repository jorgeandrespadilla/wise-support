import { v4 as uuid } from 'uuid';

export const generateCode = () => {
    return uuid().split('-').join('').toUpperCase();
};
