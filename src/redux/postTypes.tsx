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

//// Post_Category
export const POSTS_CATEGORY_REQUEST = "POST_CATEGORY_REQUEST";
export const POSTS_CATEGORY_SUCCESS = "POST_CATEGORY_SUCCESS";
export const POSTS_CATEGORY_FAILURE = "POST_CATEGORY_FAILURE";

export const postCategoryRequest = () => ({ type: POSTS_CATEGORY_REQUEST });
export const postCategorySuccess = (result: PostType[]) => ({
  type: POSTS_CATEGORY_SUCCESS,
  payload: result,
});
export const postCategoryFailure = (error: any) => ({
  type: POSTS_CATEGORY_FAILURE,
  payload: error,
});

export type PostCategoryActionsType =
  | ReturnType<typeof postCategorySuccess>
  | ReturnType<typeof postCategoryFailure>;

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

//// Post_MyWrite
export const POSTS_MYWRITE_REQUEST = "POST_MYWRITE_REQUEST";
export const POSTS_MYWRITE_SUCCESS = "POST_MYWRITE_SUCCESS";
export const POSTS_MYWRITE_FAILURE = "POST_MYWRITE_FAILURE";

export const postMyWriteRequest = () => ({ type: POSTS_MYWRITE_REQUEST });
export const postMyWriteSuccess = (result: PostType[]) => ({
  type: POSTS_MYWRITE_SUCCESS,
  payload: result,
});
export const postMyWriteFailure = (error: any) => ({
  type: POSTS_MYWRITE_FAILURE,
  payload: error,
});

export type postMyWriteActionsType =
  | ReturnType<typeof postLikeSuccess>
  | ReturnType<typeof postLikeFailure>;

//// Post_MyWrite
export const POSTS_MYLIKE_REQUEST = "POST_MYLIKE_REQUEST";
export const POSTS_MYLIKE_SUCCESS = "POST_MYLIKE_SUCCESS";
export const POSTS_MYLIKE_FAILURE = "POST_MYLIKE_FAILURE";

export const postMyLikeRequest = () => ({ type: POSTS_MYLIKE_REQUEST });
export const postMyLikeSuccess = (result: PostType[]) => ({
  type: POSTS_MYLIKE_SUCCESS,
  payload: result,
});
export const postMyLikeFailure = (error: any) => ({
  type: POSTS_MYLIKE_FAILURE,
  payload: error,
});

export type postMyLikeActionsType =
  | ReturnType<typeof postLikeSuccess>
  | ReturnType<typeof postLikeFailure>;
