import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
  });

export type RootReducerType = ReturnType<typeof createRootReducer>;

export default createRootReducer;
