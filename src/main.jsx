import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";

import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
import "./styles/auth.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <App />
          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
