import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Todo, useStore } from "../../store/StoreContext";
import { TextField } from "@mui/material";
import useDebounce from "../../helpers/useDebounce";
import { isUserAuthenticated } from "../../helpers/auth";
import axiosInstance from "../../helpers/axiosInstance";
import { editTodo } from "../../store/actions";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type Props = {
  todo: Todo | null;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function EditTodo({ todo, open, setOpen }: Props) {
  const [todoText, setTodoText] = useState<string>(todo?.title ?? "");
  const debounceValue = useDebounce(todoText, 500);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = isUserAuthenticated();
  const token = localStorage.getItem("token");
  const store = useStore();
  const dispatch = store!.dispatch;

  useEffect(() => {
    if (todo) {
      setTodoText(todo.title);
    }
  }, [todo?.id]);

  const updateTodo = async () => {
    try {
      if (!user) {
        console.log("User is not available");
        return;
      }
      if (!token) {
        console.log("Authentication token is missing");
        return;
      }
      const userToken = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedTodo = await axiosInstance.put(
        `todos/${todo?.id}`,
        { title: debounceValue },
        userToken
      );

      if (updatedTodo) {
        dispatch(editTodo(updatedTodo.data));
        toast.success("Task successfully updated!");
        setTodoText("");
        handleClose();
      }
      setTodoText("");
    } catch (error: AxiosError | any) {
      console.error("Error updating todo:", error.message);
      toast.error("Failed to update task. Please try again later.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTodoText("");
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth="xs"
        PaperProps={{ style: { width: "100%", maxWidth: "none" } }}
        onClose={handleClose}
        aria-labelledby="edit todo"
      >
        <DialogTitle id="update todo dialog">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo-text"
            label="Todo"
            type="text"
            fullWidth
            value={todoText || ""}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CANCEL
          </Button>
          <Button onClick={updateTodo} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
