import * as argon from 'argon2';

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
