import { hash, compare } from "bcryptjs";

function hashed(password: string) {
  return hash(password, 8);
}

function comparePassword(password: string, hashed: string) {
  return compare(password, hashed);
}

export { hashed, comparePassword };
