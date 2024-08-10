import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constants";

// This function receives an string and returns the same string hashed
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// This function compares a default string and a hashed string and determines if are equal or not
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
