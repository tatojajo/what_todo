export const SAVE_TODOS = "SAVE_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export const saveTodos = (todos) => ({
  type: SAVE_TODOS,
  todos,
});

export const deleteItemsFromCart = (todos) => ({
  type: DELETE_TODO,
  todos,
});

export const updateTodo = (todos) => ({
  type: UPDATE_TODO,
  todos,
});
