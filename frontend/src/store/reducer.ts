import { SAVE_TODOS } from "./actions";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case SAVE_TODOS:{
      return { ...state, todos: action.todos };
    }
    default: {
      return state;
    }
  }
}
