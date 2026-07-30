import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Teams from "./components/Teams";
import Roles from "./components/Roles";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";

import Apply from "./components/Apply";
import JobDetails from "./components/JobDetails";
import "./styles/App.css";

function CareersPage({ jobs, loading, error }) {
  const roleTitles = jobs.map((r) => r.title);

  return (
    <>
      <Hero roleTitles={roleTitles} />
      <Mission />
      <Teams jobs={jobs} />
      <Roles jobs={jobs} loading={loading} error={error} />
      <Benefits />
      <Footer />
    </>
  );
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/jobs.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setJobs(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <CareersPage
              jobs={jobs}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/job/:id"
          element={<JobDetails jobs={jobs} />}
        />

        <Route
          path="/apply/:id"
          element={<Apply jobs={jobs} />}
        />
      </Routes>
    </>
  );
}