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

//// user Loding
export const USER_LOADING_REQUEST = "USER_LOADING_REQUEST";
export const USER_LOADING_SUCCESS = "USER_LOADING_SUCCESS";
export const USER_LOADING_FAILURE = "USER_LOADING_FAILURE";

export const userLodingRequest = () => ({ type: USER_LOADING_REQUEST });
export const userLodingSuccess = (result: any) => ({
  type: USER_LOADING_SUCCESS,
  payload: result,
});
export const userLodingFailure = (error: any) => ({
  type: USER_LOADING_FAILURE,
  payload: error,
});
export type userLodingActionsType =
  | ReturnType<typeof userLodingRequest>
  | ReturnType<typeof userLodingSuccess>
  | ReturnType<typeof userLodingFailure>;

//// userInfo
export const USERINFO_REQUEST = "USERINFO_REQUEST" as const;
export const USERINFO_SUCCESS = "USERINFO_SUCCESS" as const;
export const USERINFO_FAILURE = "USERINFO_FAILURE" as const;

export const userInfoRequest = () => ({ type: USERINFO_REQUEST });
export const userInfoSuccess = (result: any) => ({
  type: USERINFO_SUCCESS,
  payload: result,
});
export const userInfoFailure = (error: any) => ({
  type: USERINFO_FAILURE,
  payload: error,
});
export type userInfoActionsType =
  | ReturnType<typeof userInfoRequest>
  | ReturnType<typeof userInfoSuccess>
  | ReturnType<typeof userInfoFailure>;
