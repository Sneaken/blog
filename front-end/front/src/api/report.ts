// 上报接口
import axios from 'axios';
import store from '@/store';
import { ActionType } from '@/enums/action-type';

interface Params {
  blogID?: string;
}

async function report(actionType: ActionType, params?: Params) {
  const url = `http://127.0.0.1:3000/report/${actionType}`;
  await axios.get<BaseResponse>(url, {
    params: {
      userID: store.state.userID,
      ...params,
    },
  });
}

/**
 * 博客访问上报
 */
export async function reportVisit() {
  await report(ActionType.VISIT);
}

/**
 * 博文阅读上报
 * @param blogID 博客ID
 */
export async function reportBlogViews(blogID: string) {
  await report(ActionType.BLOG_VIEWS, { blogID });
}
