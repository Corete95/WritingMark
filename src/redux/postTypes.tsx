import { PostType } from "types";

//// Post_Loading
export const POSTS_LOADING_REQUEST = "POST_LOADING_REQUEST";
export const POSTS_LOADING_SUCCESS = "POST_LOADING_SUCCESS";
export const POSTS_LOADING_FAILURE = "POST_LOADING_FAILURE";

export const postLoadingRequest = () => ({ type: POSTS_LOADING_REQUEST });
export const postLoadingSuccess = (result: PostType[]) => ({
  type: POSTS_LOADING_SUCCESS,
  payload: result,
});
export const postLoadingFailure = (error: any) => ({
  type: POSTS_LOADING_FAILURE,
  payload: error,
});

export type PostLoadingActionsType =
  | ReturnType<typeof postLoadingSuccess>
  | ReturnType<typeof postLoadingFailure>;

//// Post_Write
export const POSTS_WRITE_REQUEST = "POST_WRITE_REQUEST";
export const POSTS_WRITE_SUCCESS = "POST_WRITE_SUCCESS";
export const POSTS_WRITE_FAILURE = "POST_WRITE_FAILURE";

export const postWriteRequest = () => ({ type: POSTS_WRITE_REQUEST });
export const postWriteSuccess = (result: PostType[]) => ({
  type: POSTS_WRITE_SUCCESS,
  payload: result,
});
export const postWriteFailure = (error: any) => ({
  type: POSTS_WRITE_FAILURE,
  payload: error,
});

export type PostWriteActionsType =
  | ReturnType<typeof postWriteSuccess>
  | ReturnType<typeof postWriteFailure>;

//// Post_Like
export const POSTS_LIKE_REQUEST = "POST_LIKE_REQUEST";
export const POSTS_LIKE_SUCCESS = "POST_LIKE_SUCCESS";
export const POSTS_LIKE_FAILURE = "POST_LIKE_FAILURE";

export const postLikeRequest = () => ({ type: POSTS_LIKE_REQUEST });
export const postLikeSuccess = (result: any) => ({
  type: POSTS_LIKE_SUCCESS,
  payload: result,
});
export const postLikeFailure = (error: any) => ({
  type: POSTS_LIKE_FAILURE,
  payload: error,
});

export type postLikeActionsType =
  | ReturnType<typeof postLikeSuccess>
  | ReturnType<typeof postLikeFailure>;
