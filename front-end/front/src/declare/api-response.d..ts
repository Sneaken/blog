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
  content: string; // 内容
  frontCover: string; // 封面
  tags: string[]; // 标签
  type: string[]; // 分类
  views: number; // 浏览量
  updatedAt: string; // 更新时间
  createdAt: string; // 创建时间
}
