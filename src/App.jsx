import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Reveal from "./components/Reveal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Teams from "./components/Teams";
import Roles from "./components/Roles";
;
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Apply from "./components/Apply";
import JobDetails from "./components/JobDetails";
import "./styles/App.css";
import AnimatedCursor from "react-animated-cursor";
import Background from "./components/Background";





function CareersPage({ jobs, loading, error }) {
  const roleTitles = jobs.map((r) => r.title);

  return (
   <>
  <Reveal>
    <Hero roleTitles={roleTitles} />
  </Reveal>

  

  <Reveal delay={0.2}>
    <Teams jobs={jobs} />
  </Reveal>

  <Reveal delay={0.3}>
    <Roles jobs={jobs} loading={loading} error={error} />
  </Reveal>

  

  <Reveal delay={0.5}>
    <Footer />
  </Reveal>
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
  const [showCursor, setShowCursor] = useState(false);

useEffect(() => {
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");

  const update = () => setShowCursor(media.matches);

  update();

  media.addEventListener("change", update);

  return () => media.removeEventListener("change", update);
}, []);

  return (
    <>
          {showCursor && (
  <AnimatedCursor
    innerSize={6}
    outerSize={28}
    color="110,86,255"
    outerAlpha={0}
    innerScale={1}
    outerScale={1.8}
    trailingSpeed={4}
    zIndex={1000000} 
    clickables={[
      "a",
      "button",
      ".btn",
      ".nav-cta",
      ".hamburger",
      "input",
      "textarea",
      "select"
    ]}
    innerStyle={{
      backgroundColor: "#6E56FF",
    }}
    outerStyle={{
      border: "1.5px solid #6E56FF",
      backgroundColor: "transparent",
    }}
  />
)}

    <ScrollToTop />
     <Background />
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