import { Todo, useStore } from "../../store/StoreContext";
import { Delete, Edit, DoneTwoTone, RemoveDone } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { isUserAuthenticated } from "../../helpers/auth";
import { saveTodos } from "../../store/actions";
import EditTodo from "../../components/Edit/EditTodo";
import { deleteTodo, completeTodo, inCompleteTodo } from "../../helpers/api";

type Props = {};

export default function Home({}: Props) {
  const [openDilaog, setOpenDilaog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const store = useStore();
  const dispatch = store!.dispatch;
  const todos = store!.todos;
  const user = isUserAuthenticated();
  const token = localStorage.getItem("token");

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
      console.error("Error fetching todos:", error);
    }
  }, [token]);

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
                      <ListItemButton
                        onClick={() => deleteTodo(todo.id, dispatch)}
                      >
                        <Delete color="error" />
                      </ListItemButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        onClick={() => {
                          setSelectedTodo(todo), setOpenDilaog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>

                      <Divider
                        sx={{ height: 28, m: 0.9 }}
                        orientation="vertical"
                      />
                      {todo.completed ? (
                        <ListItemButton
                          onClick={() => inCompleteTodo(todo, dispatch)}
                        >
                          <RemoveDone color="error" />
                        </ListItemButton>
                      ) : (
                        <ListItemButton
                          onClick={() => completeTodo(todo, dispatch)}
                        >
                          <DoneTwoTone color="warning" />
                        </ListItemButton>
                      )}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <EditTodo
            open={openDilaog}
            setOpen={setOpenDilaog}
            todo={selectedTodo}
          />
        </Box>
      </main>
    </div>
  );
}
