import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StoreProvider from "./store/StoreContext.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StoreProvider>
          <Toaster />
          <App />
        </StoreProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
