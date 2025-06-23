import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buka from "./komponen/buka";
import Isi from "./komponen/isi";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buka />
    <Isi />
  </StrictMode>
);
