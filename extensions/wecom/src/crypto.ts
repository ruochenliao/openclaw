import { createDecipheriv, createCipheriv, createHash, randomBytes } from "node:crypto";

/**
 * WeCom message encryption/decryption utilities.
 * Based on the official WeCom encryption spec.
 */

export function decryptWeComMessage(
  encodingAesKey: string,
  encrypted: string,
): { message: string; corpId: string } {
  const aesKey = Buffer.from(encodingAesKey + "=", "base64");
  const iv = aesKey.subarray(0, 16);
  const decipher = createDecipheriv("aes-256-cbc", aesKey, iv);
  decipher.setAutoPadding(false);
  const decrypted = Buffer.concat([decipher.update(encrypted, "base64"), decipher.final()]);

  // Remove PKCS#7 padding
  const padLen = decrypted[decrypted.length - 1]!;
  const content = decrypted.subarray(0, decrypted.length - padLen);

  // Format: 16 bytes random + 4 bytes msg length (big endian) + msg + corpId
  const msgLen = content.readUInt32BE(16);
  const message = content.subarray(20, 20 + msgLen).toString("utf8");
  const corpId = content.subarray(20 + msgLen).toString("utf8");

  return { message, corpId };
}

export function encryptWeComMessage(
  encodingAesKey: string,
  message: string,
  corpId: string,
): string {
  const aesKey = Buffer.from(encodingAesKey + "=", "base64");
  const iv = aesKey.subarray(0, 16);

  const random = randomBytes(16);
  const msgBuf = Buffer.from(message, "utf8");
  const corpIdBuf = Buffer.from(corpId, "utf8");
  const msgLenBuf = Buffer.alloc(4);
  msgLenBuf.writeUInt32BE(msgBuf.length, 0);

  let payload = Buffer.concat([random, msgLenBuf, msgBuf, corpIdBuf]);

  // PKCS#7 padding
  const blockSize = 32;
  const padLen = blockSize - (payload.length % blockSize);
  const padding = Buffer.alloc(padLen, padLen);
  payload = Buffer.concat([payload, padding]);

  const cipher = createCipheriv("aes-256-cbc", aesKey, iv);
  cipher.setAutoPadding(false);
  return Buffer.concat([cipher.update(payload), cipher.final()]).toString("base64");
}

export function generateWeComSignature(
  token: string,
  timestamp: string,
  nonce: string,
  encrypted: string,
): string {
  const sortedArr = [token, timestamp, nonce, encrypted].sort();
  return createHash("sha1").update(sortedArr.join("")).digest("hex");
}
