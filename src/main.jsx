import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Buka from "./komponen/buka";
import Isi from "./komponen/isi";
import Gallery from "./komponen/gallery";
import Countdown from "./komponen/hitung_mundur";
import Jadwal from "./komponen/jadwal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Isi />
    <Gallery />
    <Countdown tanggalAcara="2025-07-24T10:00:00" />
    <Jadwal />
  </StrictMode>
);
