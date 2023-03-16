import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";

const reducers = combineReducers({
  cellls: cellsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
