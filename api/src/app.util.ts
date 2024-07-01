import * as argon from 'argon2';
import { v7 as uuidv7 } from 'uuid';

export const hashPassword = async (password: string) => {
  return await argon.hash(password, {
    type: argon.argon2id,
  });
};

export const verifyHashedPassword = async (
  hashedPassword: string,
  password: string,
) => {
  return await argon.verify(hashedPassword, password);
};

export const generateUuid = () => {
  return uuidv7(); // ⇨ '01695553-c90c-722d-9b5d-b38dfbbd4bed'
};
