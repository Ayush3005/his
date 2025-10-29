import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";
import HospitalSpinner from "./components/HospitalSpinner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <HospitalSpinner size={100} />
        </div>
      }
    >
      <App />
    </React.Suspense>
  </StrictMode>
);
