import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema(
  {
    userID: String, // 访客id
    ipv4: String, // 访客ipv4
    ua: String, // user-agent
    actionType: Number, // 访客动作
  },
  {
    collection: 'report', // 默认文档名是复数形式
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);
