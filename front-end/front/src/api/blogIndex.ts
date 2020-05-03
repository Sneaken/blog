// 博客首页的接口
import axios from 'axios';
export async function getQuotation(): Promise<Quotation> {
  const url = 'http://127.0.0.1:3000/quotation';
  const { data } = await axios.get<QuotationResponse>(url);
  return data.data;
}
