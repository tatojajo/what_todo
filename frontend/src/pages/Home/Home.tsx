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
} from "@mui/material";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useEffect } from "react";
import axiosInstance from "../../helpers/axiosInstance";
import { isUserAuthenticated } from "../../helpers/auth";
import { saveTodos } from "../../store/actions";

type Props = {};

export default function Home({}: Props) {
  const { dispatch, todos } = useStore();
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
        dispatch(saveTodos(data))
      };
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(todos);
  return (
    <div>
      <Header />
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Input />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper>
            <Box>
              <Box />
            </Box>
            <List>
              {todos.map((todo) => {
                console.log(todo)
                return (
                  <ListItem key={todo.id}>
                    <ListItemText
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : undefined,
                      }}
                    >
                      {todo.title}
                    </ListItemText>
                    <Box>
                      <ListItemButton>
                        <Delete />
                      </ListItemButton>
                      <ListItemButton>
                        <Edit />
                      </ListItemButton>
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
