import bcrypt from "bcrypt";

const salts = 10;

async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, salts);
  return hash;
}

async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export { hashPassword, verifyPassword };
