export interface UserPayload {
  sub: string | number; 
  username: string;
  iat?: number; 
  exp?: number; 
}