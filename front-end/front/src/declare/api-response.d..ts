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
