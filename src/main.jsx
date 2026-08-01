import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <React.StrictMode>
  <App />
  <Toaster
  position="top-right"
  richColors
  closeButton
/>
</React.StrictMode>
    </BrowserRouter>
  </React.StrictMode>
);