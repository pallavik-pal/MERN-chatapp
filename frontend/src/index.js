import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <HashRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </HashRouter>
  </ChakraProvider>
);
