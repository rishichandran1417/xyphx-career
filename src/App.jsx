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
import Cursor from "./components/Cursor";
import Background from "./components/Background";

import { supabase } from "./lib/supabase";



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
  async function loadJobs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setJobs(data);
    }

    setLoading(false);
  }

  loadJobs();
}, []);

  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");

    const update = () => setShowCursor(!media.matches);

    update();

    const listener = (event) => setShowCursor(!event.matches);

    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      {showCursor && <Cursor />}

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

        <Route path="/jobs/:id" element={<JobDetails jobs={jobs} />} />
        <Route path="/apply/:id" element={<Apply jobs={jobs} />} />
      </Routes>
    </>
  );
}
