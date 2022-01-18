import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  PostLoadingActionsType,
  POSTS_CATEGORY_REQUEST,
  POSTS_CATEGORY_SUCCESS,
  POSTS_CATEGORY_FAILURE,
  PostCategoryActionsType,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_SUCCESS,
  PostWriteActionsType,
  POSTS_LIKE_REQUEST,
  POSTS_LIKE_SUCCESS,
  POSTS_LIKE_FAILURE,
  postLikeActionsType,
  POSTS_MYWRITE_REQUEST,
  POSTS_MYWRITE_SUCCESS,
  POSTS_MYWRITE_FAILURE,
  postMyWriteActionsType,
  POSTS_MYLIKE_REQUEST,
  POSTS_MYLIKE_SUCCESS,
  POSTS_MYLIKE_FAILURE,
  postMyLikeActionsType,
} from "../postTypes";
import { PostType } from "types";

type State = {
  isAuthenticated: string | null;
  loading: boolean;
  posts: PostType[];
  error: any;
};
const initialState = {
  isAuthenticated: null,
  loading: false,
  posts: [],
  error: "",
};
export default function (
  state: State = initialState,
  action:
    | PostWriteActionsType
    | PostLoadingActionsType
    | postLikeActionsType
    | postMyWriteActionsType
    | postMyLikeActionsType
    | PostCategoryActionsType,
) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
    case POSTS_CATEGORY_REQUEST:
    case POSTS_MYWRITE_REQUEST:
    case POSTS_MYLIKE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
    case POSTS_CATEGORY_SUCCESS:
    case POSTS_MYWRITE_SUCCESS:
    case POSTS_MYLIKE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.result],
        loading: false,
      };
    // case POSTS_MYWRITE_SUCCESS:
    // case POSTS_MYLIKE_SUCCESS:
    //   console.log("ok", action);
    //   return {
    //     ...state,
    //     posts: [...state.posts, ...action.payload],
    //     loading: false,
    //   };
    case POSTS_LOADING_FAILURE:
    case POSTS_CATEGORY_FAILURE:
    case POSTS_MYWRITE_FAILURE:
    case POSTS_MYLIKE_FAILURE:
      console.log("err", action);
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    case POSTS_LIKE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_LIKE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    default:
      return state;
  }
}
