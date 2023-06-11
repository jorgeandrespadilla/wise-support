import { KMS_CONFIG } from '@/constants/settings';
import { KeyManagementServiceClient } from '@google-cloud/kms';

// Instantiate new client
const client = new KeyManagementServiceClient({
    keyFilename: KMS_CONFIG.credentialsFilePath,
});

/**
 * Encrypts the given plaintext using the configured crypto key.
 * @param plaintext The plaintext to encrypt
 * @returns The encrypted ciphertext
 */
export const encrypt = async (plaintext: string): Promise<string> => {
    const plaintextBuffer = Buffer.from(plaintext);
    const [encryptResponse] = await client.encrypt({
        name: KMS_CONFIG.cryptoKeyId,
        plaintext: plaintextBuffer,
    });
    const ciphertextBuffer = Buffer.from(encryptResponse.ciphertext ?? '');
    return ciphertextBuffer.toString('base64');
};

/**
 * Decrypts the given ciphertext using the configured crypto key.
 * @param ciphertext The ciphertext to decrypt
 * @return The decrypted plaintext
 */
export const decrypt = async (ciphertext: string): Promise<string> => {
    const ciphertextBuffer = Buffer.from(ciphertext);
    const [decryptResponse] = await client.decrypt({
        name: KMS_CONFIG.cryptoKeyId,
        ciphertext: ciphertextBuffer.toString(),
    });
    return decryptResponse.plaintext?.toString() ?? '';
};
