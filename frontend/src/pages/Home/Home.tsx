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
import { useEffect } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { isUserAuthenticated } from "../../helpers/auth";
import { saveTodos } from "../../store/actions";

type Props = {};

export default function Home({}: Props) {
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
                      <ListItemButton>
                        <Delete />
                      </ListItemButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <ListItemButton>
                        <Edit />
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
