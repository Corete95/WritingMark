import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginActionsType,
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  KakaoLoginActionsType,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  RegisterActionsType,
  clearErrorActionsType,
} from "../types";

type State = {
  token: string | null;
  isAuthenticated: null;
  isLoading: boolean;
  createdAt: string;
  email: string;
  nickname: string;
  password: string;
  role: string;
  _id: string;
  message: string;
  status?: string;
};

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  createdAt: "",
  email: "",
  nickname: "",
  password: "",
  role: "",
  _id: "",
  message: "",
  status: "",
};

const authReducer = (
  state: State = initialState,
  action:
    | LoginActionsType
    | RegisterActionsType
    | clearErrorActionsType
    | KakaoLoginActionsType,
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case KAKAO_LOGIN_REQUEST:
      return {
        ...state,
        message: "",
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case KAKAO_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        createdAt: action.payload.createdAt,
        email: action.payload.email,
        nickname: action.payload.nickname,
        password: action.payload.password,
        role: action.payload.role,
        _id: action.payload._id,
        message: "",
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case KAKAO_LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        createdAt: null,
        email: null,
        nickname: null,
        password: null,
        role: null,
        _id: null,
        message: action.payload.message,
      };

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        message: "",
        previousMatchMsg: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        message: "Clear Error Fail",
        previousMatchMsg: "Clear Error Fail",
      };
    default:
      return state;
  }
};

export default authReducer;
