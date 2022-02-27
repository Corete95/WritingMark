import axios, { AxiosResponse } from "axios";
import { put, call, takeEvery, all, fork, delay } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  KAKAO_LOGIN_REQUEST,
  kakaoLoginSuccess,
  kakaoLoginFailure,
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
  CLEAR_ERROR_REQUEST,
  clearErrorSuccess,
  clearErrorFailure,
} from "../types";
import { push } from "connected-react-router";
import { ToastContainer, toast } from "react-toastify";

//Login
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
    yield toast("로그인 완료", { autoClose: 1000, position: "bottom-center" });
    yield delay(1000);
    yield put(push("/"));
  } catch (error: any) {
    yield put(loginFailure(error.response.data));
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

//Kakao_Login
const kakaoLoginUserAPI = (payload: any) => {
  const config: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload;
  if (token) {
    config.headers["authorization"] = token;
  }
  console.log("payload", payload);
  return axios.get("user/kakao", config);
};

function* kakaoLoginUser(action: any) {
  try {
    const result: AxiosResponse = yield call(kakaoLoginUserAPI, action.payload);
    yield put(kakaoLoginSuccess(result.data));
    yield put(push("/"));
  } catch (error: any) {
    yield put(kakaoLoginFailure(error.response.data));
  }
}

function* watchKakaoLoginUser() {
  yield takeEvery(KAKAO_LOGIN_REQUEST, kakaoLoginUser);
}

// Register

const registerUserAPI = (req: string) => {
  return axios.post("user/register", req);
};

function* registerUser(action: any) {
  try {
    const result: AxiosResponse = yield call(registerUserAPI, action.payload);
    yield put(registerSuccess(result.data.result));
    yield toast("회원가입 완료", {
      autoClose: 1000,
      position: "bottom-center",
    });
    yield delay(1000);
    yield put(push("/Login"));
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
    fork(watchKakaoLoginUser),
    fork(watchregisterUser),
    fork(watchclearError),
  ]);
}
