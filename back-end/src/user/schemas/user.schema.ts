import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    nickname: String, // 昵称
    phone: String, // 手机号
    email: String, // 邮箱
    password: String, // 手机号
  },
  {
    collection: 'user', // 默认文档名是复数形式
    // 在插入和更新时mongoose就会自动创建createdAt, updatedAt字段同时插入相关时间
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
