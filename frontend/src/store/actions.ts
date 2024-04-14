import { Todo } from "./StoreContext";

export const SAVE_TODOS = "SAVE_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const UNDONE_TODO = "UNDONE_TODO";
export const ADD_NEW_TODO = "ADD_NEW_TODO";

export const addNewTodo = (todo: Todo) => ({
  type: ADD_NEW_TODO,
  todo,
});

export const saveTodos = (todos: Todo) => ({
  type: SAVE_TODOS,
  todos,
});

export const delTodoLocaly = (todoId: string) => ({
  type: DELETE_TODO,
  todoId,
});

export const editTodo = (todo: Todo) => ({
  type: EDIT_TODO,
  todo,
});

export const completedTodo = (todoId: string) => ({
  type: COMPLETE_TODO,
  todoId,
});

export const unDoneTodo = (todoId: string) => ({
  type: UNDONE_TODO,
  todoId,
});
