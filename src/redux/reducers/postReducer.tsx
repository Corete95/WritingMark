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
  POSTS_MYWRITE_REQUEST,
  POSTS_MYWRITE_SUCCESS,
  POSTS_MYWRITE_FAILURE,
  postMyWriteActionsType,
  POSTS_MYLIKE_REQUEST,
  POSTS_MYLIKE_SUCCESS,
  POSTS_MYLIKE_FAILURE,
  postMyLikeActionsType,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_FAILURE,
  postDeleteActionsType,
} from "../postTypes";
import { PostType } from "types";

type State = {
  isAuthenticated: string | null;
  loading: boolean;
  posts: PostType[];
  postDetail: PostType[];
  error: any;
};
const initialState = {
  isAuthenticated: null,
  loading: false,
  posts: [],
  postDetail: [],
  error: "",
};
export default function (
  state: State = initialState,
  action:
    | PostWriteActionsType
    | PostLoadingActionsType
    | postMyWriteActionsType
    | postMyLikeActionsType
    | PostCategoryActionsType
    | postDeleteActionsType,
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
    case POSTS_DELETE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_WRITE_SUCCESS:
    case POSTS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_FAILURE:
    case POSTS_DELETE_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    default:
      return state;
  }
}
