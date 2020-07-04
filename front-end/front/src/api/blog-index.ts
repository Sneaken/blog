// 博客首页的接口
import axios from 'axios';
import { store } from '@/store';
/**
 * 获取语录
 */
export async function getQuotation(): Promise<Quotation> {
  const url = 'http://127.0.0.1:3000/quotation';
  const { data } = await axios.get<QuotationResponse>(url, {
    params: {
      userID: store.userID,
    },
  });
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

/**
 * 获取博文列表
 */
export async function blogList() {
  const url = 'http://127.0.0.1:3000/blog/list';
  const { data } = await axios.get<BlogListResponse>(url, { params: {} });
  return data.data;
}

/**
 * 获取最新5篇博文
 */
export async function latestBlogList() {
  const url = 'http://127.0.0.1:3000/blog/list/hot';
  const { data } = await axios.get<HotBlogResponse>(url, { params: {} });
  return data.data;
}

/**
 * 获取博主信息
 */
export async function getBlogAuthorInfo() {
  const url = 'http://127.0.0.1:3000/blog/info/author';
  const { data } = await axios.get<BlogAuthorInfoResponse>(url, { params: {} });
  return data.data;
}

/**
 * 获取分类和标签
 */
export async function getTypesAndTags() {
  const url = 'http://127.0.0.1:3000/blog/info';
  const { data } = await axios.get<BlogTypesAndTagsResponse>(url, {
    params: {},
  });
  return data.data;
}
