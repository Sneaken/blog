import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: String, // 标题
    content: String, // 内容
    frontCover: String, // 封面
    type: [String], // 分类
    tags: [String], // 标签
    views: Number, // 浏览次数
    rewardsOpen: Boolean, // 赏赞开启
    copyrightOn: Boolean, // 版权开启
    commentable: Boolean, // 评论开启
    published: Boolean, // 发布
  },
  {
    collection: 'blog', // 默认文档名是复数形式
    // 在插入和更新时mongoose就会自动创建createdAt, updatedAt字段同时插入相关时间
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
