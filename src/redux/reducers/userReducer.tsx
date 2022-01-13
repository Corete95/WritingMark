import {
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  UserLoadingActionsType,
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
  action: UserLoadingActionsType,
) => {
  switch (action.type) {
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.userinfo,
      };
    case USER_LOADING_FAILURE:
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
