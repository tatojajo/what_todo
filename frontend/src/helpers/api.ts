import { AxiosError } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { Todo } from "../store/StoreContext";
import { delTodoLocaly, completedTodo, unDoneTodo } from "../store/actions";
import toast from "react-hot-toast";

export const deleteTodo = async (
  todoId: string,
  dispatch: any
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Authentication token is missing");
    return;
  }

  try {
    const userToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const delTodo = await axiosInstance.delete(`todos/${todoId}`, userToken);
    if (delTodo) {
      dispatch(delTodoLocaly(todoId));
      toast.error("Task successfully Deleted!");
    }
  } catch (error: AxiosError | any) {
    console.error("Error deleting todo:", error.message);
    throw new Error("Failed to delete todo. Please try again later.");
  }
};

export const completeTodo = async (
  todo: Todo,
  dispatch: any
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Authentication token is missing");
    return;
  }

  try {
    const userToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosInstance.put(
      `todos/${todo.id}`,
      { completed: true },
      userToken
    );

    if (data.completed) {
      console.log(data.completed);
      dispatch(completedTodo(todo.id));
      toast.success("Task done successfully!");
    }
  } catch (error: AxiosError | any) {
    console.error("Error completing todo:", error.message);
    throw new Error("Failed to complete todo. Please try again later.");
  }
};

export const inCompleteTodo = async (
  todo: Todo,
  dispatch: any
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Authentication token is missing");
    return;
  }

  try {
    const userToken = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosInstance.put(
      `todos/${todo.id}`,
      { completed: false },
      userToken
    );
    if (data) {
      console.log(data.completed);
      dispatch(unDoneTodo(data.id));
      toast.success("Task is still incompleted!");
    }
  } catch (error: AxiosError | any) {
    console.error("Error marking todo incomplete:", error.message);
    throw new Error("Failed to mark todo incomplete. Please try again later.");
  }
};
