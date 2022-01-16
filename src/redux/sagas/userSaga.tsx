import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  USER_LOADING_REQUEST,
  userLoadingSuccess,
  userLoadingFailure,
} from "../userTypes";
// User Loading

const userLoadingAPI = (token: string) => {
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.get("user", config);
};

function* userLoading(action: any) {
  try {
    const result: AxiosResponse = yield call(userLoadingAPI, action.payload);
    yield put(userLoadingSuccess(result.data));
  } catch (error: any) {
    yield put(userLoadingFailure(error.response));
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* userSaga() {
  yield all([fork(watchuserLoading)]);
}
