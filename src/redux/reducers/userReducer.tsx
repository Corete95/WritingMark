import {
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  UserLoadingActionsType,
  USER_INFO_EDIT_REQUEST,
  USER_INFO_EDIT_SUCCESS,
  USER_INFO_EDIT_FAILURE,
  UserInfoEditActionsType,
} from "../userTypes";
import { User } from "types";

type State = {
  isAuthenticated: null;
  isLoading: boolean;
  user: User[];
};
const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: [],
};

const userReducer = (
  state: State = initialState,
  action: UserLoadingActionsType | UserInfoEditActionsType,
) => {
  switch (action.type) {
    case USER_LOADING_REQUEST:
    case USER_INFO_EDIT_REQUEST:
      return {
        ...state,
        user: "",
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
    case USER_INFO_EDIT_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.userinfo,
      };
    case USER_LOADING_FAILURE:
    case USER_INFO_EDIT_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: "",
      };
    default:
      return state;
  }
};

export default userReducer;
