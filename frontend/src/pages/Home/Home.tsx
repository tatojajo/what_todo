import { useStore } from "../../store/StoreContext";
import { DoneAll, Delete, Edit, DoneTwoTone } from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { isUserAuthenticated } from "../../helpers/auth";
import { delTodoLocaly, saveTodos } from "../../store/actions";
import toast from "react-hot-toast";
import EditTodo from "../../components/Edit/EditTodo";

type Props = {};

export default function Home({}: Props) {
  const [openDilaog, setOpenDilaog] = useState(false);
  const store = useStore();
  const dispatch = store!.dispatch;
  const todos = store!.todos;
  const user = isUserAuthenticated();
  const token = localStorage.getItem("token");

  const deleteTodo = async (todoId: string) => {
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

      const delTodo = await axiosInstance.delete(`todos/${todoId}`, userToken);
      if (delTodo) {
        dispatch(delTodoLocaly(todoId));
        toast.error("Task successfully Deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
      const getTodos = async () => {
        const { data } = await axiosInstance(
          `/todos/${user?.userId}`,
          userToken
        );
        dispatch(saveTodos(data));
      };
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }, [token, dispatch]);

  return (
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <Input />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "90%",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List sx={{ width: "90%" }}>
              {todos.map((todo) => {
                return (
                  <ListItem
                    key={todo.id}
                    sx={{
                      margin: "10px",
                      border: "solid green",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : undefined,
                      }}
                    >
                      {todo.title}
                    </ListItemText>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemButton onClick={() => deleteTodo(todo.id)}>
                        <Delete />
                      </ListItemButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <ListItemButton>
                        <EditTodo
                          open={openDilaog}
                          setOpen={setOpenDilaog}
                          todo={todo}
                        />
                      </ListItemButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <ListItemButton>
                        <DoneTwoTone />
                      </ListItemButton>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      </main>
    </div>
  );
}
