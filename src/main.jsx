import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CountryProvider } from "./CartContext.jsx";
import App from "./App.jsx";
import CountryInfo from "./CountryInfo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:code" element={<CountryInfo />} />
        </Routes>
      </BrowserRouter>
    </CountryProvider>
  </StrictMode>,
);
