import * as Crypto from 'expo-crypto';
import forge from 'node-forge';

// Polyfill node-forge random bytes with expo-crypto
forge.random.getBytesSync = (count: number): string => {
  const bytes = Crypto.getRandomBytes(count);
  return forge.util.createBuffer(bytes as unknown as forge.util.ArrayBufferView).getBytes();
};

let masterKey: string | null = null;
const SALT = 'password-vault-static-salt-v1'; // Consider making this dynamic per-user in the future
const ITERATIONS = 100000;
const KEY_LENGTH = 32; // 256 bits

export const setMasterKey = (password: string) => {
  // Use PBKDF2 to derive a 256-bit key
  const derivedKey = forge.pkcs5.pbkdf2(
    password,
    SALT,
    ITERATIONS,
    KEY_LENGTH
  );
  masterKey = forge.util.bytesToHex(derivedKey);
};

export const clearMasterKey = () => {
  masterKey = null;
};

export const encryptData = (data: string): string => {
  if (!masterKey) throw new Error('Master key not set');
  
  // Generate random 12-byte IV for GCM
  const iv = forge.random.getBytesSync(12);
  const keyBytes = forge.util.hexToBytes(masterKey);
  
  const cipher = forge.cipher.createCipher('AES-GCM', keyBytes);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data, 'utf8'));
  cipher.finish();
  
  const encrypted = cipher.output.getBytes();
  const tag = cipher.mode.tag.getBytes();
  
  // Combine IV, Salt, tag, encrypted data
  const payload = iv + tag + encrypted;
  
  // Return base64 encoded payload
  return forge.util.encode64(payload);
};

export const decryptData = (ciphertext: string): string => {
  if (!masterKey) throw new Error('Master key not set');
  
  const payload = forge.util.decode64(ciphertext);
  
  // Extract IV (12 bytes), Tag (16 bytes), and encrypted data
  const iv = payload.slice(0, 12);
  const tag = payload.slice(12, 28);
  const encrypted = payload.slice(28);
  
  const keyBytes = forge.util.hexToBytes(masterKey);
  
  const decipher = forge.cipher.createDecipher('AES-GCM', keyBytes);
  decipher.start({
    iv: iv,
    tag: forge.util.createBuffer(tag)
  });
  decipher.update(forge.util.createBuffer(encrypted));
  const pass = decipher.finish();
  
  if (!pass) {
    throw new Error('Decryption Failed - Authentication Tag Mismatch');
  }
  
  return forge.util.decodeUtf8(decipher.output.getBytes());
};
