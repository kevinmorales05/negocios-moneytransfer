import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

// Example theme configuration


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <ChakraProvider value={defaultSystem}>
        <Router>
          <AppRoutes />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);