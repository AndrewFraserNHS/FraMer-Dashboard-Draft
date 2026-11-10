import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Summary from "./pages/Summary";
import Pregnancy from "./pages/Pregnancy";
import Appointments from "./pages/Appointments";
import Results from "./pages/Results";
import Comorbidities from "./pages/Comorbidities";
import CarePlans from "./pages/CarePlans";
import Documents from "./pages/Documents";
import Audit from "./pages/Audit";
import MaternityContentPatternLibrary from "./pages/MaternityContentPatternLibrary";
import RecordShell from "./layouts/RecordShell";
import FrailtySnapshot from "./pages/frailty/Snapshot";
import FrailtyCga from "./pages/frailty/Cga";
import FrailtyCarePlan from "./pages/frailty/CarePlan";
import "nhsuk-frontend/dist/nhsuk/nhsuk-frontend.css";
import "./index.css";

function FrailtyRoute({ element }: { element: React.ReactElement }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("frailty-auth") === "@lpha");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password === "@lpha") {
      sessionStorage.setItem("frailty-auth", "@lpha");
      setAuthenticated(true);
      setError("");
      return;
    }
    setError("Incorrect password");
  };

  if (authenticated) {
    return element;
  }

  return (
    <div className="ncrs-app maternity-dashboard">
      <div className="ncrs-main">
        <h1 className="record-page-title">Frailty access</h1>
        <p className="record-page-intro">Enter the password to access this record.</p>
        <form onSubmit={onSubmit} className="action-form" style={{ maxWidth: 420 }}>
          <label htmlFor="frailty-password" className="nhsuk-label">Password</label>
          <input
            id="frailty-password"
            type="password"
            className="nhsuk-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
          />
          {error && <p className="review-field__hint" role="alert">{error}</p>}
          <div className="page-steps" style={{ justifyContent: "flex-start", marginTop: 16 }}>
            <button type="submit" className="nhsuk-button">Access record</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RecordRoutes() {
  return (
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
        <Route path="/frailty" element={<FrailtyRoute element={<FrailtySnapshot />} />} />
        <Route path="/frailty/cga" element={<FrailtyRoute element={<FrailtyCga />} />} />
        <Route path="/frailty/care-plan" element={<FrailtyRoute element={<FrailtyCarePlan />} />} />
      </Routes>
    </RecordShell>
  );
}

function AppRouter() {
  const location = useLocation();

  if (location.pathname === "/maternity-content-pattern-library") {
    return (
      <Routes>
        <Route path="/maternity-content-pattern-library" element={<MaternityContentPatternLibrary />} />
      </Routes>
    );
  }

  return <RecordRoutes />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
);
