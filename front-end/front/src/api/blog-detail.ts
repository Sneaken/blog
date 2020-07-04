import axios from 'axios';

export async function getBlog(id: string) {
  const url = `http://127.0.0.1:3000/blog/${id}`;
  const { data } = await axios.get<BlogResponse>(url, { params: {} });
  return data.data;
}
