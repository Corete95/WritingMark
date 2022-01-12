import {
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_FAILURE,
  POSTS_WRITE_SUCCESS,
  PostWriteActionsType,
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
  action: PostWriteActionsType,
) {
  switch (action.type) {
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
