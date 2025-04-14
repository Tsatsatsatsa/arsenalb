import 'express'; 
import { UserPayload } from 'src/auth/interfaces/user-payload.interface';

declare module 'express' {
  export interface Request {
    user: UserPayload; 
  }
}
