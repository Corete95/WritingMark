import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import clearReducer from "./clearReducer";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    clear: clearReducer,
  });

export type RootReducerType = ReturnType<typeof createRootReducer>;

export default createRootReducer;
