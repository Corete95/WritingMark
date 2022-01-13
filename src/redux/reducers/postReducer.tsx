import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  PostLoadingActionsType,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_SUCCESS,
  PostWriteActionsType,
} from "../postTypes";
import { PostType, User } from "types";

type State = {
  isAuthenticated: string | null;
  loading: boolean;
  posts: PostType[];
  error: any;
  user: User[];
};
const initialState = {
  isAuthenticated: null,
  loading: false,
  posts: [],
  error: "",
  user: [],
};
export default function (
  state: State = initialState,
  action: PostWriteActionsType | PostLoadingActionsType,
) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
      console.log("succes", action.payload);
      return {
        ...state,
        posts: [...state.posts, ...action.payload.result],
        user: action.payload.user,
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
    default:
      return state;
  }
}
