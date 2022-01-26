import { AxiosError } from "axios";
import { UsersType, UsersErrorType, LoginType } from "types";

//// login
export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (result: UsersType) => ({
  type: LOGIN_SUCCESS,
  payload: result,
});
export const loginFailure = (error: UsersErrorType) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export type LoginActionsType =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>;

//// Kakao_login
export const KAKAO_LOGIN_REQUEST = "KAKAO_LOGIN_REQUEST" as const;
export const KAKAO_LOGIN_SUCCESS = "KAKAO_LOGIN_SUCCESS" as const;
export const KAKAO_LOGIN_FAILURE = "KAKAO_LOGIN_FAILURE" as const;

export const kakaoLoginRequest = () => ({ type: KAKAO_LOGIN_REQUEST });
export const kakaoLoginSuccess = (result: UsersType) => ({
  type: KAKAO_LOGIN_SUCCESS,
  payload: result,
});
export const kakaoLoginFailure = (error: UsersErrorType) => ({
  type: KAKAO_LOGIN_FAILURE,
  payload: error,
});

export type KakaoLoginActionsType =
  | ReturnType<typeof kakaoLoginRequest>
  | ReturnType<typeof kakaoLoginSuccess>
  | ReturnType<typeof kakaoLoginFailure>;

//// register
export const REGISTER_REQUEST = "REGISTER_REQUEST" as const;
export const REGISTER_SUCCESS = "REGISTER_SUCCESS" as const;
export const REGISTER_FAILURE = "REGISTER_FAILURE" as const;

export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (result: LoginType) => ({
  type: REGISTER_SUCCESS,
  payload: result,
});
export const registerFailure = (error: UsersErrorType) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export type RegisterActionsType =
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>;

//// clear
export const CLEAR_ERROR_REQUEST = "CLEAR_ERROR_REQUEST";
export const CLEAR_ERROR_SUCCESS = "CLEAR_ERROR_SUCCESS";
export const CLEAR_ERROR_FAILURE = "CLEAR_ERROR_FAILURE";

export const clearErrorRequest = () => ({ type: REGISTER_REQUEST });
export const clearErrorSuccess = (result: any) => ({
  type: CLEAR_ERROR_SUCCESS,
  payload: result,
});
export const clearErrorFailure = (error: any) => ({
  type: CLEAR_ERROR_FAILURE,
  payload: error,
});
export type clearErrorActionsType =
  | ReturnType<typeof clearErrorRequest>
  | ReturnType<typeof clearErrorSuccess>
  | ReturnType<typeof clearErrorFailure>;
