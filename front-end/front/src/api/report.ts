// 上报接口
import axios from 'axios';
import store from '@/store';
import { ActionType } from '@/enums/action-type';

async function report(actionType: ActionType) {
  const url = `http://127.0.0.1:3000/report/${actionType}`;
  await axios.get<BaseResponse>(url, {
    params: {
      userID: store.state.userID,
    },
  });
}

export async function reportVisit(actionType: ActionType) {
  await report(actionType);
}
