import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./Router/Router.jsx";
import AuthProvider from "./Firebase/AuthProvider/AuthProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
