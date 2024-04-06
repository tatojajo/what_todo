import { SAVE_TODOS } from "./actions";

export function reducer(state: any, action: any) {
  switch (action.type) {
    case SAVE_TODOS:{
      console.log(action.todo)
      return { ...state, todos: action.todos };
    }
    default: {
      return state;
    }
  }
}
