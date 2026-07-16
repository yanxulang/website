import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout, type Page } from "./components/Layout";
import { DownloadPage } from "./pages/DownloadPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles.css";

const page = (document.body.dataset.page || "home") as Page;
const content = page === "download"
  ? <DownloadPage />
  : page === "not-found"
    ? <NotFoundPage />
    : <HomePage />;

createRoot(document.getElementById("root")!).render(
  <StrictMode><Layout page={page}>{content}</Layout></StrictMode>
);
