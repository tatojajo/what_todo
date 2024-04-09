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
  Badge,
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
          `/todos/${user?.user.userId}`,
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
            {todos.length === 0 ? (
              <div style={{ padding: "20px" }}>You haven't got any todos.</div>
            ) : (
              <List sx={{ width: "90%" }}>
                {todos.map((todo, index) => {
                  return (
                    <Badge
                      key={todo.id}
                      sx={{ width: "100%" }}
                      badgeContent={index + 1}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      color={todo.completed ? "success" : "warning"}
                    >
                      <ListItem
                        sx={{
                          margin: "10px",
                          border: "solid green",
                          borderRadius: { xs: "5px", sm: "10px" },
                          display: "flex",
                          flexDirection: {
                            md: "row",
                            xs: "column",
                          },
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
                          <ListItemButton
                            onClick={() => {
                              setSelectedTodo(todo), setOpenDilaog(true);
                            }}
                          >
                            <Edit />
                          </ListItemButton>

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
                    </Badge>
                  );
                })}
              </List>
            )}
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
