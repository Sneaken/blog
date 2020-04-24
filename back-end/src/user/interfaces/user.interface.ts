import { Document } from 'mongoose';
export interface User extends Document {
  nickname: string;
  phone: string;
  email: string;
  password: string;
}
