import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Reveal from "./components/Reveal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Teams from "./components/Teams";
import Roles from "./components/Roles";
;
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Apply from "./components/Apply";
import Applications from "./components/Applications";
import JobDetails from "./components/JobDetails";
import "./styles/App.css";
import Cursor from "./components/Cursor";
import Background from "./components/Background";

import { supabase } from "./lib/supabase";
import { useAuth } from "./context/AuthContext";



function normalizeJobs(data) {
  return (data || []).map((job) => {
    const normalizedId = job.id ?? job.slug ?? job.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return {
      ...job,
      id: normalizedId,
      slug: normalizedId,
      team: job.team ?? job.department ?? job.department_name ?? '',
      employmentType: job.employmenttype ?? job.employment_type,
      aboutCompany: job.aboutcompany ?? job.about_company,
      sections: job.sections || [],
      status: String(job.status ?? job.state ?? 'open').toLowerCase()
    };
  });
}

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
  const { user, isLoading: isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setError(null);

      try {
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
          throw new Error("Supabase env vars are missing");
        }

        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setJobs(normalizeJobs(data || []));
      } catch (supabaseError) {
        console.warn("Falling back to local job data:", supabaseError);

        try {
          const response = await fetch("/jobs.json");
          if (!response.ok) {
            throw new Error(`Failed to load fallback jobs: ${response.status}`);
          }

          const fallbackJobs = await response.json();
          setJobs(normalizeJobs(fallbackJobs));
        } catch (fallbackError) {
          console.error(fallbackError);
          setError("Unable to load jobs right now.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  useEffect(() => {
    if (isAuthLoading || !user) return;

    const returnTo = sessionStorage.getItem("xyphx-careers:return-to");
    if (returnTo && returnTo.startsWith("/")) {
      sessionStorage.removeItem("xyphx-careers:return-to");
      if (returnTo !== location.pathname) {
        navigate(returnTo, { replace: true });
      }
    }
  }, [isAuthLoading, location.pathname, navigate, user]);

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
        <Route path="/applications" element={<Applications jobs={jobs} />} />
      </Routes>
    </>
  );
}
