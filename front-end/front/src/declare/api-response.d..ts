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
