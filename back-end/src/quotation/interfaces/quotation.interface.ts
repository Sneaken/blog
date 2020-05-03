import { Document } from 'mongoose';
export interface Quotation extends Document {
  english: string; // 英文
  chinese: string; // 中文
  createAt: Date; // 创建时间
  updateAt: Date; // 更新时间
}
