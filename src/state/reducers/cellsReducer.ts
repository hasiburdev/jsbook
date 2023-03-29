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
  order: ["5zz", "kbm", "aci"],
  data: {
    kbm: {
      content:
        "import React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst App = () => {\n    return <h1>App</h1>;\n}\n\nReactDOM.render(<App/>, document.querySelector(\"#root\"));",
      type: "code",
      id: "kbm",
    },
    "5zz": {
      content:
        "# JS Book\nAn online markdown editor.\n\nRun JavaScript on the browser!\n\nHere are some special features:\n\nEverything in client side JavaScript works.\n\nYou can also see the value of anything in screen using the special `show` function.\n\n```javascript\nshow(\"Hello\");   // Works with data.\nshow(variable);  // Works with variable.\nshow(<h1>Heading</h1>);  // Can display React Components also.\n```\n\nYou can write react as well.\n\n```javascript\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nconst App = () => {\n    return <h1>App</h1>;\n}\n\nReactDOM.render(<App/>, document.querySelector(\"#root\"));\n```\nSome other features:\n\n- You can create as many code cells and text cells as you want. \n- You can reorganize the cells as you want.\n\nSome upcoming features I want to add:\n- [ ] Data persistence\n- [ ] Page sharing",
      type: "text",
      id: "5zz",
    },
    aci: { content: "", type: "text", id: "aci" },
  },
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
    case ActionType.INSERT_CELL_AFTER: {
      const { type, id } = action.payload;
      const cell: Cell = {
        content: "",
        type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((order_id) => order_id === id);
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    }
    default:
      return state;
  }
});

const randomId = () => Math.random().toString(36).substring(2, 5);

export default reducer;
