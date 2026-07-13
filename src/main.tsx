import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout";
import { DownloadPage } from "./pages/DownloadPage";
import { HomePage } from "./pages/HomePage";
import "./styles.css";

type Page = "home" | "download";
const page = (document.body.dataset.page || "home") as Page;
const content = page === "download" ? <DownloadPage /> : <HomePage />;

createRoot(document.getElementById("root")!).render(
  <StrictMode><Layout page={page}>{content}</Layout></StrictMode>
);
