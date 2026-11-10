import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Summary from "./pages/Summary";
import Pregnancy from "./pages/Pregnancy";
import Appointments from "./pages/Appointments";
import Results from "./pages/Results";
import Comorbidities from "./pages/Comorbidities";
import CarePlans from "./pages/CarePlans";
import Documents from "./pages/Documents";
import Audit from "./pages/Audit";
import RecordShell from "./layouts/RecordShell";
import FrailtySnapshot from "./pages/frailty/Snapshot";
import FrailtyCga from "./pages/frailty/Cga";
import FrailtyCarePlan from "./pages/frailty/CarePlan";
import "nhsuk-frontend/dist/nhsuk/nhsuk-frontend.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RecordShell>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/results" element={<Results />} />
          <Route path="/comorbidities" element={<Comorbidities />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/frailty" element={<FrailtySnapshot />} />
          <Route path="/frailty/cga" element={<FrailtyCga />} />
          <Route path="/frailty/care-plan" element={<FrailtyCarePlan />} />
        </Routes>
      </RecordShell>
    </BrowserRouter>
  </React.StrictMode>,
);
