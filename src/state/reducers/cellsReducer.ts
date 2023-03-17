import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: null | string;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL: {
      const id = action.payload;
      delete state.data[id];
      state.order = state.order.filter((order_id) => order_id !== id);
      return state;
    }
    case ActionType.MOVE_CELL: {
      const { direction, id } = action.payload;
      const index = state.order.findIndex((order_id) => order_id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    }
    case ActionType.INSERT_CELL_BEFORE: {
      const { type, id } = action.payload;
      const cell: Cell = {
        content: "",
        type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((order_id) => order_id === id);
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }

      return state;
    }
    default:
      return state;
  }
});

const randomId = () => Math.random().toString(36).substring(2, 5);

export default reducer;
