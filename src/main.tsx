import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider} from "@chakra-ui/react";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import theme from "./theme";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
