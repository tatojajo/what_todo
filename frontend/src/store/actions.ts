export const SAVE_TODOS = "SAVE_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export const saveTodos = (todos) => ({
  type: SAVE_TODOS,
  payload: todos,
});

export const deleteItemsFromCart = (todo) => ({
  type: DELETE_TODO,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});
