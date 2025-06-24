import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buka from "./komponen/buka";
import Isi from "./komponen/isi";
import Gallery from "./komponen/gallery";
import Countdown from "./komponen/hitung_mundur";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Buka />
    <Isi />
    <Gallery />
    <Countdown tanggalAcara="2025-07-31T00:00:00" />
  </StrictMode>
);
