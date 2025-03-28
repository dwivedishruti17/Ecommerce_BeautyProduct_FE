import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
import CartAndOrderNavigations from "./CartAndOrderNavigations";
import "./index.css";

const App = () => (
  <BrowserRouter>
  <CartAndOrderNavigations/>
  </BrowserRouter>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)