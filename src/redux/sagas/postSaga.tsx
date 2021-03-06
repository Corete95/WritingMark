import axios, { AxiosResponse } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  POSTS_LOADING_REQUEST,
  postLoadingSuccess,
  postLoadingFailure,
  POSTS_CATEGORY_REQUEST,
  postCategorySuccess,
  postCategoryFailure,
  POSTS_WRITE_REQUEST,
  postWriteSuccess,
  postWriteFailure,
  POSTS_MYWRITE_REQUEST,
  postMyWriteSuccess,
  postMyWriteFailure,
  POSTS_MYLIKE_REQUEST,
  postMyLikeSuccess,
  postMyLikeFailure,
  POSTS_DELETE_REQUEST,
  postDeleteSuccess,
  postDeleteFailure,
  POSTS_DETAIL_REQUEST,
  postDetailSuccess,
  postDetailFailure,
  POSTS_DETAIL_EDIT_REQUEST,
  postDetailEditSuccess,
  postDetailEditFailure,
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

  return payload.last
    ? axios.get(
        `posts?tab=${payload.payloadCategory}&lastId=${payload.last}`,
        config,
      )
    : axios.get(`posts?tab=${payload.payloadCategory}`, config);
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

// Post Category

const categoryPostAPI = (payload: any) => {
  return axios.get(`posts/category/${payload.path}`);
};

function* categoryPosts(action: any) {
  try {
    const result: AxiosResponse = yield call(categoryPostAPI, action.payload);
    yield put(postCategorySuccess(result.data));
  } catch (error) {
    yield put(postCategoryFailure(error));
  }
}

function* watchCategoryPosts() {
  yield takeEvery(POSTS_CATEGORY_REQUEST, categoryPosts);
}

// Post Write
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
    yield put(push(`/ListDetail/${result.data.result.postId}`));
  } catch (error: any) {
    yield put(postWriteFailure(error.response));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POSTS_WRITE_REQUEST, uploadPosts);
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
    yield put(postMyLikeFailure(error?.response?.data));
  }
}

function* watchMyLikePosts() {
  yield takeEvery(POSTS_MYLIKE_REQUEST, MyLikePosts);
}

// Post Delete
const DeletePostAPI = (payload: any) => {
  const config: any = {
    headers: {},
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.delete(`posts/${payload.id}`, config);
};

function* DeletePosts(action: any) {
  try {
    const result: AxiosResponse = yield call(DeletePostAPI, action.payload);
    yield put(postDeleteSuccess(result.data));
    yield location.replace("");
  } catch (error: any) {
    console.log(error.response);
    yield put(postDeleteFailure(error?.response?.data));
  }
}

function* watchDeletePosts() {
  yield takeEvery(POSTS_DELETE_REQUEST, DeletePosts);
}

// Post Detail
const DetailPostAPI = (payload: any) => {
  const config: any = {
    headers: {},
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }
  return axios.get(`posts/${payload.id.id}`, config);
};

function* DetailPosts(action: any) {
  try {
    const result: AxiosResponse = yield call(DetailPostAPI, action.payload);
    yield put(postDetailSuccess(result.data.result));
  } catch (error: any) {
    console.log(error.response);
    yield put(postDetailFailure(error?.response?.data));
  }
}

function* watchDetailPosts() {
  yield takeEvery(POSTS_DETAIL_REQUEST, DetailPosts);
}

// Post Detail Edit
const DetailEditPostAPI = (payload: any) => {
  const config: any = {
    headers: {},
  };
  const token = payload.token;
  if (token) {
    config.headers["authorization"] = token;
  }

  return axios.patch(
    `posts/${payload.body.id.id}`,
    payload.body.formData,
    config,
  );
};

function* DetailEditPosts(action: any) {
  try {
    const result: AxiosResponse = yield call(DetailEditPostAPI, action.payload);
    yield put(postDetailEditSuccess(result.data.result));
    yield put(push(`/ListDetail/${result.data.postId}`));
  } catch (error: any) {
    console.log(error.response);
    yield put(postDetailEditFailure(error?.response?.data));
  }
}

function* watchDetailEditPosts() {
  yield takeEvery(POSTS_DETAIL_EDIT_REQUEST, DetailEditPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchuploadPosts),
    fork(watchLoadPosts),
    fork(watchMyWritePosts),
    fork(watchMyLikePosts),
    fork(watchCategoryPosts),
    fork(watchDeletePosts),
    fork(watchDetailPosts),
    fork(watchDetailEditPosts),
  ]);
}
