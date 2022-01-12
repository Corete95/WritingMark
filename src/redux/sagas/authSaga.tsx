import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
  CLEAR_ERROR_REQUEST,
  clearErrorSuccess,
  clearErrorFailure,
  RegisterActionsType,
} from "../types";
import { push } from "connected-react-router";
import { history } from "store";

const loginUserAPI = (loginData: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("user/login", loginData, config);
};

function* loginUser(action: any) {
  try {
    const result: AxiosResponse = yield call(loginUserAPI, action.payload);
    yield put(loginSuccess(result.data));
    yield put(push("/"));
    // yield location.reload();
  } catch (error: any) {
    yield put(loginFailure(error.response.data));
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}
// Register

const registerUserAPI = (req: string) => {
  return axios.post("user/register", req);
};

function* registerUser(action: any) {
  try {
    const result: AxiosResponse = yield call(registerUserAPI, action.payload);
    yield put(registerSuccess(result.data.result));
    yield put(push("/Login"));
    yield location.reload();
  } catch (error: any) {
    yield put(registerFailure(error.response.data));
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// clear Error

function* clearError() {
  try {
    const result = "";
    yield put(clearErrorSuccess(result));
  } catch (e) {
    yield put(clearErrorFailure(e));
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchregisterUser),
    fork(watchclearError),
  ]);
}
