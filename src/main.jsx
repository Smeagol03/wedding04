import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buka from "./komponen/buka";
import Isi from "./komponen/isi";
import Gallery from "./komponen/gallery";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buka />
    <Isi />
    <Gallery />
  </StrictMode>
);
