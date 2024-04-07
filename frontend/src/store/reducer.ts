import {
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SAVE_TODOS,
  UNDONE_TODO,
} from "./actions";
import { State } from "./StoreContext";

export function reducer(state: State, action: any) {
  switch (action.type) {
    case SAVE_TODOS: {
      return { ...state, todos: action.todos };
    }
    case DELETE_TODO: {
      const oldTodos = state.todos;
      const newTodos = oldTodos.filter((todo) => todo.id !== action.todoId);
      console.log(newTodos);
      return { ...state, todos: newTodos };
    }
    case EDIT_TODO: {
      const todos = state.todos;
      const updatedTodos = todos.map((todo) => {
        if (todo.id == action.todo.id) {
          return { ...todo, title: action.todo.title };
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };
    }
    case COMPLETE_TODO: {
      const todos = state.todos;
      const completeTodo = todos.map((todo) => {
        if (todo.id == action.todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      console.log(todos);
      return { ...state, todos: completeTodo };
    }
    case UNDONE_TODO: {
      const todos = state.todos;
      const unCompleteTodo = todos.map((todo) => {
        if (todo.id == action.todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      console.log(todos);
      return { ...state, todos: unCompleteTodo };
    }

    default: {
      return state;
    }
  }
}
