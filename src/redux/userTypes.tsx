import { AxiosError } from "axios";
import { User } from "types";

//// User_Loading
export const USER_LOADING_REQUEST = "USER_LOADING_REQUEST";
export const USER_LOADING_SUCCESS = "USER_LOADING_SUCCESS";
export const USER_LOADING_FAILURE = "USER_LOADING_FAILURE";

export const userLoadingRequest = () => ({ type: USER_LOADING_REQUEST });
export const userLoadingSuccess = (result: User[]) => ({
  type: USER_LOADING_SUCCESS,
  payload: result,
});
export const userLoadingFailure = (error: any) => ({
  type: USER_LOADING_FAILURE,
  payload: error,
});

export type UserLoadingActionsType =
  | ReturnType<typeof userLoadingSuccess>
  | ReturnType<typeof userLoadingFailure>;

//// User_Info_Edit
export const USER_INFO_EDIT_REQUEST = "USER_INFO_EDIT_REQUEST";
export const USER_INFO_EDIT_SUCCESS = "USER_INFO_EDIT_SUCCESS";
export const USER_INFO_EDIT_FAILURE = "USER_INFO_EDIT_FAILURE";

export const userInfoEditRequest = () => ({ type: USER_INFO_EDIT_REQUEST });
export const userInfoEditSuccess = (result: User[]) => ({
  type: USER_INFO_EDIT_SUCCESS,
  payload: result,
});
export const userInfoEditFailure = (error: any) => ({
  type: USER_INFO_EDIT_FAILURE,
  payload: error,
});

export type UserInfoEditActionsType =
  | ReturnType<typeof userInfoEditSuccess>
  | ReturnType<typeof userInfoEditFailure>;
