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
      serverUrl="https://l7jf4xw2bx34.usemoralis.com:2053/server"
      appId="vJtnxiCIxE3vOaa7KdBo0esCHrySaAbH928eldj9"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
