import { useState } from "react";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import useDebounce from "../../helpers/useDebounce";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useStore } from "../../store/StoreContext";
import { addTodo } from "../../helpers/api";

const Input = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);
  const store = useStore();
  const dispatch = store!.dispatch;

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: {
          xs: "90%",
          sm: 400,
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Todo"
        inputProps={{ "aria-label": "Todo" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => {
          setValue("");
          addTodo(debounceValue, dispatch);
        }}
      >
        <AddTaskIcon color="success" fontSize="medium" />
      </IconButton>
    </Paper>
  );
};

export default Input;
