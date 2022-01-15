import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  PostLoadingActionsType,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_SUCCESS,
  PostWriteActionsType,
  POSTS_LIKE_REQUEST,
  POSTS_LIKE_SUCCESS,
  POSTS_LIKE_FAILURE,
  postLikeActionsType,
} from "../postTypes";
import { PostType, User } from "types";

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
  action: PostWriteActionsType | PostLoadingActionsType | postLikeActionsType,
) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.result],
        loading: false,
      };
    case POSTS_LOADING_FAILURE:
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
