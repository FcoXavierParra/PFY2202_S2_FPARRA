import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { InventarioProvider } from "./context/InventarioContext";
import "./index.css";

// BrowserRouter habilita la navegación; InventarioProvider comparte el estado global con toda la app.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* basename permite publicar en un subdirectorio (GitHub Pages); en local queda en "/" */}
    <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
      <InventarioProvider>
        <App />
      </InventarioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
