import { Todo } from "./StoreContext";

export const SAVE_TODOS = "SAVE_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

export const saveTodos = (todos: Todo) => ({
  type: SAVE_TODOS,
  todos,
});

export const delTodoLocaly = (todoId: string) => ({
  type: DELETE_TODO,
  todoId,
});

export const editTodo = (todo:Todo) => ({
  type: EDIT_TODO,
  todo,
});
