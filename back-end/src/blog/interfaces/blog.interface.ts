import { Document } from 'mongoose';
export interface Blog extends Document {
  title: string; // 标题
  content: string; // 内容
  frontPart: string; // 列表页内容
  type: string[]; // 分类
  tags: string[]; // 标签
  views: number; // 浏览次数
  rewardsOpen: boolean; // 赏赞开启
  copyrightOn: boolean; // 版权开启
  commentable: boolean; // 评论开启
  published: boolean; // 发布
  createdAt: Date; // 创建时间
  updatedAt: Date; // 更新时间
}
