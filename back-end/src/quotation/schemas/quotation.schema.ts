import * as mongoose from 'mongoose';

export const QuotationSchema = new mongoose.Schema(
  {
    english: String,
    chinese: {
      type: String,
      unique: true,
    },
  },
  {
    collection: 'quotation', // 默认文档名是复数形式
    // 在插入和更新时mongoose就会自动创建createdAt, updatedAt字段同时插入相关时间
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
