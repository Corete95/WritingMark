import {
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  UserLoadingActionsType,
} from "../userTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: [],
  _id: "",
  nickname: "",
  role: "",
  profileImage: "",
};

const userReducer = (state = initialState, action: UserLoadingActionsType) => {
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
