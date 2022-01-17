import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
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
  POSTS_MYWRITE_REQUEST,
  postMyWriteSuccess,
  postMyWriteFailure,
  POSTS_MYLIKE_REQUEST,
  postMyLikeSuccess,
  postMyLikeFailure,
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
    yield put(push("/"));
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

// Post MyWrite
const MyWritePostAPI = (payload: any) => {
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.get("user/posts", config);
};

function* MyWritePosts(action: any) {
  try {
    const result: AxiosResponse = yield call(MyWritePostAPI, action.payload);
    yield put(postMyWriteSuccess(result.data));
  } catch (error: any) {
    console.log(error.response);
    yield put(postMyWriteFailure(error?.response?.data));
  }
}

function* watchMyWritePosts() {
  yield takeEvery(POSTS_MYWRITE_REQUEST, MyWritePosts);
}

// Post MyLike
const MyLikePostAPI = (payload: any) => {
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.get("user/bookmarks", config);
};

function* MyLikePosts(action: any) {
  try {
    const result: AxiosResponse = yield call(MyLikePostAPI, action.payload);
    yield put(postMyLikeSuccess(result.data));
  } catch (error: any) {
    console.log(error.response);
    yield put(postMyLikeFailure(error?.response?.data));
  }
}

function* watchMyLikePosts() {
  yield takeEvery(POSTS_MYLIKE_REQUEST, MyLikePosts);
}

export default function* postSaga() {
  yield all([
    fork(watchuploadPosts),
    fork(watchLoadPosts),
    fork(watchupLikePosts),
    fork(watchMyWritePosts),
    fork(watchMyLikePosts),
  ]);
}
