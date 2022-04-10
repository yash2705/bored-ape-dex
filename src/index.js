import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://fhdwnqtbmw2a.usemoralis.com:2053/server"
      appId="HFUAnalrIhv6dFL1dLC9DI1MGB5a2RPaZbfDDzLh"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
