declare interface BaseResponse {
  code: string;
  message?: string;
}

declare interface QuotationResponse extends BaseResponse {
  data: Quotation;
}

declare interface Quotation {
  english: String;
  chinese: String;
}

declare interface VisitsResponse extends BaseResponse {
  data: Visit;
}

declare interface Visit {
  visitors: number; // 独立访客量
  views: number; // 总访问量
}

declare interface BlogListResponse extends BaseResponse {
  data: BlogListItem[];
}

declare interface BlogListItem {
  _id: string;
  title: string; // 标题
  frontPart: string; // 列表页展示段落
  type: string[]; // 分类
  tags: string[]; // 标签
  views: number; // 浏览量
  updatedAt: string; // 更新时间
  createdAt: string; // 创建时间
}

declare interface BlogResponse extends BaseResponse {
  data: Blog;
}
declare interface Blog {
  _id: string;
  title: string; // 标题
  type: string[]; // 分类
  tags: string[]; // 标签
  views: number; // 浏览量
  content: string; // 内容
  commentable: boolean; // 是否可评论
  copyrightOn: boolean; // 版权信息
  rewardsOpen: boolean; // 是否显示打赏
  updatedAt: string; // 更新时间
  createdAt: string; // 创建时间
}
