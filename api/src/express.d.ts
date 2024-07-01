import { TokenPayload_i } from './auth/auth.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenPayload_i;
  }
}
