import { useState } from "react";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import useDebounce from "../../helpers/useDebounce";
import axiosInstance from "../../helpers/axiosInstance";
import { isUserAuthenticated } from "../../helpers/auth";
import toast from "react-hot-toast";

const Input = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  const user = isUserAuthenticated();

  const createNewTodo = async () => {
    try {
      if (!user) {
        console.log("User is not available");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Authentication token is missing");
        return;
      }
      const userToken = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const todo = await axiosInstance.post(
        `/todos/${user.userId}`,
        { title: debounceValue },
        userToken
      );
      toast.success("Task successfully added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Todo"
        inputProps={{ "aria-label": "Todo" }}
        onChange={(e) => setValue(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={createNewTodo}
      >
        <Add color="success" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Input;
