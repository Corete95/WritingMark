import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  POSTS_WRITE_REQUEST,
  postWriteSuccess,
  postWriteFailure,
} from "../postTypes";

const uploadPostAPI = (payload: any) => {
  const config: any = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.post("posts", payload.body.formData, config);
};

function* uploadPosts(action: any) {
  try {
    const result: AxiosResponse = yield call(uploadPostAPI, action.payload);
    yield put(postWriteSuccess(result.data.result));
  } catch (error: any) {
    yield put(postWriteFailure(error.response.data));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POSTS_WRITE_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all([fork(watchuploadPosts)]);
}
