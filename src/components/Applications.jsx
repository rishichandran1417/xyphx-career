import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import "../styles/Applications.css";

const statusLabels = {
  submitted: "Submitted",
  in_review: "In review",
  interview: "Interview",
  offer: "Offer",
  rejected: "Not selected",
  withdrawn: "Withdrawn",
};

export default function Applications({ jobs }) {
  const { user, isLoading: isAuthLoading, signInWithGoogle } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      signInWithGoogle("/applications").catch((signInError) => {
        setError(signInError.message || "Unable to start sign in. Please try again.");
        setIsLoading(false);
      });
      return;
    }

    async function loadApplications() {
      setIsLoading(true);
      const { data, error: queryError } = await supabase
        .from("Xyphx-Career")
        .select("job_id, status, submitted_at")
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false });

      if (queryError) {
        setError("Unable to load your applications right now.");
      } else {
        setApplications(data || []);
      }
      setIsLoading(false);
    }

    loadApplications();
  }, [isAuthLoading, signInWithGoogle, user]);

  if (isAuthLoading || (!user && !error)) {
    return <main className="applications-page"><div className="applications-wrap"><h1>Taking you to sign in…</h1></div></main>;
  }

  const jobsById = new Map(jobs.map((job) => [String(job.id), job]));

  return (
    <main className="applications-page">
      <div className="applications-wrap">
        <Link to="/" className="applications-back">← Back to home</Link>
        <div className="applications-heading">
          <span className="tag mono">$ applications</span>
          <h1>My applications</h1>
          <p>Track the status of each role you have applied for.</p>
        </div>

        {isLoading && <div className="applications-state">Loading your applications…</div>}
        {error && <div className="applications-state">{error}</div>}
        {!isLoading && !error && applications.length === 0 && (
          <div className="applications-state">
            You have not applied for a role yet. <a href="/#roles">Browse open roles</a>
          </div>
        )}
        {!isLoading && !error && applications.map((application, index) => {
          const job = jobsById.get(String(application.job_id));
          const title = job?.title || "Role application";
          const submittedAt = application.submitted_at
            ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(application.submitted_at))
            : "Recently";

          return (
            <article className="application-card" key={`${application.job_id}-${application.submitted_at || index}`}>
              <div>
                <h2>{title}</h2>
                <p>Applied {submittedAt}</p>
              </div>
              <span className={`application-status status-${application.status || "submitted"}`}>
                {statusLabels[application.status] || "Submitted"}
              </span>
            </article>
          );
        })}
      </div>
    </main>
  );
}
