import { AxiosError } from "axios";

export const USER_LOADING_REQUEST = "USER_LOADING_REQUEST";
export const USER_LOADING_SUCCESS = "USER_LOADING_SUCCESS";
export const USER_LOADING_FAILURE = "USER_LOADING_FAILURE";

export const userLoadingRequest = () => ({ type: USER_LOADING_REQUEST });
export const userLoadingSuccess = (result: any) => ({
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
