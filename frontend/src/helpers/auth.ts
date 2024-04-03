export const isUserAuthenticated = () => {
  const key = localStorage.getItem("token");
  if (!key) return false;
  return Date.now() < Number(new Date(key));
};
