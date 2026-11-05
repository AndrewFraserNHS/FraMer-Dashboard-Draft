import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Pregnancy from "./Pregnancy";
import Appointments from "./Appointments";
import Results from "./Results";
import Comorbidities from "./Comorbidities";
import CarePlans from "./CarePlans";
import Documents from "./Documents";
import Audit from "./Audit";
import MaternityShell from "./MaternityShell";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaternityShell>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/results" element={<Results />} />
          <Route path="/comorbidities" element={<Comorbidities />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
      </MaternityShell>
    </BrowserRouter>
  </React.StrictMode>,
);
