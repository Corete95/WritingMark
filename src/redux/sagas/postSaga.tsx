import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  POSTS_WRITE_REQUEST,
  postWriteSuccess,
  postWriteFailure,
  POSTS_LOADING_REQUEST,
  postLoadingSuccess,
  postLoadingFailure,
  POSTS_LIKE_REQUEST,
  postLikeSuccess,
  postLikeFailure,
} from "../postTypes";

// All Posts load

const loadPostAPI = (payload: any) => {
  const config: any = {
    headers: {},
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.get(`posts?tab=${payload.payloadCategory}`, config);
};

function* loadPosts(action: any) {
  try {
    const result: AxiosResponse = yield call(loadPostAPI, action.payload);
    yield put(postLoadingSuccess(result.data));
  } catch (error) {
    yield put(postLoadingFailure(error));
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// PostWrite
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
    console.log("1", action);
    const result: AxiosResponse = yield call(uploadPostAPI, action.payload);
    console.log("2", result);
    yield put(postWriteSuccess(result.data.result));
  } catch (error: any) {
    yield put(postWriteFailure(error.response.data));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POSTS_WRITE_REQUEST, uploadPosts);
}

// PostLike
const LikePostAPI = (payload: any) => {
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.post(`user/bookmark/${payload.id}`, {}, config);
};

function* LikePosts(action: any) {
  try {
    console.log("Like 전송전", action);
    const result: AxiosResponse = yield call(LikePostAPI, action.payload);
    console.log("Like 전송후", result);
    yield put(postLikeSuccess(result?.data?.result));
  } catch (error: any) {
    yield put(postLikeFailure(error?.response?.data));
  }
}

function* watchupLikePosts() {
  yield takeEvery(POSTS_LIKE_REQUEST, LikePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchuploadPosts),
    fork(watchLoadPosts),
    fork(watchupLikePosts),
  ]);
}
