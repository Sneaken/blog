// 博客首页的接口
import axios from 'axios';

/**
 * 获取语录
 */
export async function getQuotation(): Promise<Quotation> {
  const url = 'http://127.0.0.1:3000/quotation';
  const { data } = await axios.get<QuotationResponse>(url);
  return data.data;
}

/**
 * 获取访问量
 */
export async function getVisits(): Promise<Visit> {
  const url = 'http://127.0.0.1:3000/blog/visits';
  const { data } = await axios.get<VisitsResponse>(url);
  return data.data;
}
