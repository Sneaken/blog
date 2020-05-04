import { Document } from 'mongoose';
export interface Report extends Document {
  userID: string;
  ipv4: string;
  ua: string;
  actionType: number;
  createAt: Date;
}
