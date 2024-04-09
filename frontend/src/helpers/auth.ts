import { jwtDecode } from "jwt-decode";

export type User = {
  email: string;
  exp: number;
  firstName: string;
  lastName: string;
  userId: string;
  iat: number;
};

export const isUserAuthenticated = () => {
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const user: User = jwtDecode(token);

  if (Date.now() / 1000 > user.exp) {
    localStorage.removeItem("token");
    return null;
  }
  if (user.email) {
    return { user: user, isAuth: true };
  }
  return null;
};
