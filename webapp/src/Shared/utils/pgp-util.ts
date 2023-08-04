import { SerializedKeyPair } from "openpgp";

export const STORAGE_KEY = "key";
interface Key extends SerializedKeyPair<string> {
  revocationCertificate: string;
}
let openpgp: typeof import("openpgp");

const loadPGP = async () => {
  if (!openpgp) {
    openpgp = await import("openpgp");
  }
};

export const generateKey = async ({
  id,
  email,
}: {
  id: string;
  email: string;
}) => {
  await loadPGP();
  return openpgp.generateKey({
    type: "ecc",
    curve: "curve25519",
    userIDs: [{ name: id, email }],
  });
};

export const savePrivateKey = (key: Key) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(key));
};

export const getKey = (): Key | undefined => {
  const keyString = localStorage.getItem(STORAGE_KEY);
  let key: Key | undefined = undefined;
  if (keyString) {
    try {
      key = JSON.parse(keyString);
    } catch {
      console.error("Invalid key");
    }
  }
  return key;
};

export const encrypt = async (keys: string[], text: string) => {
  await loadPGP();
  const encryptionKeys = await Promise.all(
    keys.map((armoredKey) => openpgp.readKey({ armoredKey })),
  );
  const message = await openpgp.createMessage({ text });
  return openpgp.encrypt({
    message,
    encryptionKeys,
  });
};

export const decryptText = async (encryptedText: string) => {
  const key = getKey();
  await loadPGP();
  if (key) {
    const message = await openpgp.readMessage({
      armoredMessage: encryptedText,
    });
    const decryptionKeys = await openpgp.readPrivateKey({
      armoredKey: key?.privateKey,
    });
    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys,
    });
    return decrypted;
  }
};
