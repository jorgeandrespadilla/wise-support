import bcrypt from 'bcryptjs';

const hashRounds = 10;

export const generateHashSync = (password: string) => {
    const salt = bcrypt.genSaltSync(hashRounds);
    return bcrypt.hashSync(password, salt);
};

export const generateHash = async (password: string) => {
    const salt = await bcrypt.genSalt(hashRounds);
    return await bcrypt.hash(password, salt);
};

export const verifyHash = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
