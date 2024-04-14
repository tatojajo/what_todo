import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import axiosInstance from "../../helpers/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";


const defaultTheme = createTheme();

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function Register({ open, setOpen }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: RegisterFormData) => {
      try {
        const { data } = await axiosInstance.post("/users/register", values);
        if (data) {
          const { data } = await axiosInstance.post("/users/login", {
            email: values.email,
            password: values.password,
          });
          localStorage.setItem("token", data.token);
          window.location.reload();
          setOpen(false);
        }
      } catch (error: AxiosError | any) {
        toast.error(error.response.data.message);
        console.error("Error registering user:", error?.message);
        throw new Error("Failed to register user. Please try again later.");
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      maxWidth="xs"
      PaperProps={{ style: { width: "100%", maxWidth: "none" } }}
      onClose={handleClose}
      aria-labelledby="edit todo"
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    id="email"
                    label="mail"
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="password"
                    fullWidth
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
