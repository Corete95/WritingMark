import axios, { AxiosResponse, AxiosError } from "axios";
import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { USERINFO_REQUEST, userInfoSuccess, userInfoFailure } from "../types";

const userInfoAPI = (loginData: string) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("user/login", loginData, config);
};

function* userInfo(action: any) {
  try {
    const result: AxiosResponse = yield call(userInfoAPI, action.payload);
    console.log(result);
    yield put(userInfoSuccess(result.data));
    yield location.reload();
  } catch (error: any) {
    yield put(userInfoFailure(error.response.data));
  }
}

function* watchUserInfo() {
  yield takeEvery(USERINFO_REQUEST, userInfo);
}
