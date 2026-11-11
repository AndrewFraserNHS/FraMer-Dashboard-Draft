import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Summary from "./pages/Summary";
import Pregnancy from "./pages/Pregnancy";
import Appointments from "./pages/Appointments";
import Results from "./pages/Results";
import Comorbidities from "./pages/Comorbidities";
import CarePlans from "./pages/CarePlans";
import Documents from "./pages/Documents";
import Audit from "./pages/Audit";
import ContentPatternLibrary from "./pages/ContentPatternLibrary";
import Patterns from "./pages/patterns/Patterns";
import RecordShell from "./layouts/RecordShell";
import FrailtySnapshot from "./pages/frailty/Snapshot";
import FrailtyCga from "./pages/frailty/Cga";
import FrailtyCarePlan from "./pages/frailty/CarePlan";
import CgaStart from "./pages/frailty/cgaV2/CgaStart";
import CgaQuestion from "./pages/frailty/cgaV2/CgaQuestion";
import CgaCheck from "./pages/frailty/cgaV2/CgaCheck";
import CgaDone from "./pages/frailty/cgaV2/CgaDone";
import "nhsuk-frontend/dist/nhsuk/nhsuk-frontend.css";
import "./index.css";

const nhsLogoSrc = `${import.meta.env.BASE_URL}assets/images/NHS%2010mm%20-%20RGB%20Blue.jpg`;

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
        <Route
          path="/frailty"
          element={<FrailtyRoute element={<FrailtySnapshot />} />}
        />
        <Route
          path="/frailty/cga"
          element={<FrailtyRoute element={<FrailtyCga />} />}
        />
        <Route
          path="/frailty/care-plan"
          element={<FrailtyRoute element={<FrailtyCarePlan />} />}
        />
      </Routes>
    </RecordShell>
  );
}

function CgaV2StandalonePage({ children }: { children: React.ReactElement }) {
  return (
    <div className="record-shell text-medium cga-v2-shell">
      <a className="record-skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="ncrs-service">
        <div className="ncrs-service__brand">
          <img className="ncrs-logo" src={nhsLogoSrc} alt="NHS" />
          <span className="ncrs-service__name">
            National Care Records Service
          </span>
        </div>
        <div className="ncrs-service__actions">
          <Link className="ncrs-service__link" to="/frailty">
            Back to frailty record
          </Link>
        </div>
      </header>
      <main id="main-content" className="cga-v2-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

function CgaV2Routes() {
  return (
    <Routes>
      <Route
        path="/frailty/cga/v2"
        element={
          <FrailtyRoute
            element={
              <CgaV2StandalonePage>
                <CgaStart />
              </CgaV2StandalonePage>
            }
          />
        }
      />
      <Route
        path="/frailty/cga/v2/question/:stepId"
        element={
          <FrailtyRoute
            element={
              <CgaV2StandalonePage>
                <CgaQuestion />
              </CgaV2StandalonePage>
            }
          />
        }
      />
      <Route
        path="/frailty/cga/v2/check"
        element={
          <FrailtyRoute
            element={
              <CgaV2StandalonePage>
                <CgaCheck />
              </CgaV2StandalonePage>
            }
          />
        }
      />
      <Route
        path="/frailty/cga/v2/done"
        element={
          <FrailtyRoute
            element={
              <CgaV2StandalonePage>
                <CgaDone />
              </CgaV2StandalonePage>
            }
          />
        }
      />
    </Routes>
  );
}

function AppRouter() {
  const location = useLocation();

  if (location.pathname.startsWith("/frailty/cga/v2")) {
    return <CgaV2Routes />;
  }

  if (location.pathname === "/patterns") {
    return (
      <Routes>
        <Route path="/patterns" element={<Patterns />} />
      </Routes>
    );
  }

  if (location.pathname === "/maternity-content-pattern-library") {
    return (
      <Routes>
        <Route
          path="/maternity-content-pattern-library"
          element={<ContentPatternLibrary />}
        />
      </Routes>
    );
  }

  return <RecordRoutes />;
}

if (import.meta.env.DEV) {
  void import("./dev/axe").then((module) => module.startAxe());
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
);
