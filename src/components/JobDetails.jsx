import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Apply.css";
import { useAuth } from "../context/AuthContext";

function normalizeSlug(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function JobDetails({ jobs = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  const handleApply = async () => {
    if (user) {
      navigate(`/apply/${job.id}`);
      return;
    }

    try {
      await signInWithGoogle(`/apply/${job.id}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert(error.message);
    }
  };

  const job = jobs.find((item) => {
    const itemSlug = normalizeSlug(item.slug ?? item.id ?? item.title);
    const routeSlug = normalizeSlug(id);
    return itemSlug === routeSlug;
  });

  if (!jobs.length) {
    return (
      <main className="pad">
        <div className="wrap" style={styles.emptyState}>
          Loading role details…
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="pad">
        <div className="wrap" style={styles.emptyState}>
          <h1 style={styles.title}>Role not found</h1>
          <p style={styles.text}>This opening is no longer available or the link is incorrect.</p>
          <Link to="/" className="btn btn-ghost">
            Back to roles
          </Link>
        </div>
      </main>
    );
  }

  const sections = Array.isArray(job.sections) ? job.sections : [];
  const employmentType = job.employmentType ?? job.employmenttype ?? "Full-time";
  const location = job.location ?? "Remote";
  const salary = job.salary ?? "Competitive";
  const aboutCompany = job.aboutCompany ?? job.aboutcompany ?? "We're building the next generation of AI-native products.";

  return (
    <main className="apply-page">
      <section className="apply-hero">
        <div className="wrap">
          <div className="job-card">
            <button
              type="button"
              className="job-back"
              onClick={() => {
                if (window.history && window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
            >
              ← Back
            </button>

            <h1>{job.title}</h1>

            <div className="job-meta">
              <span>{job.team || "Open role"}</span>
              <span>📍 {location}</span>
              <span>{employmentType}</span>
              <span>💰 {salary}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="apply-form-section">
        <div className="wrap">
          <div className="apply-form-card">
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>About the role</h2>
              <p style={styles.text}>{job.description || "More details will be shared with applicants once the role is reviewed."}</p>
            </section>

            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>About Xyphx</h2>
              <p style={styles.text}>{aboutCompany}</p>
            </section>

            {sections.length > 0 && (
              <section style={styles.card}>
                <h2 style={styles.sectionTitle}>What you'll do</h2>
                {sections.map((section, index) => (
                  <div key={`${section.title || "section"}-${index}`} style={styles.sectionBlock}>
                    {section.title && <h3 style={styles.subTitle}>{section.title}</h3>}
                    <ul style={styles.list}>
                      {(section.items || []).map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`} style={styles.listItem}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            <div style={styles.footer}>
              <button type="button" onClick={handleApply} className="btn btn-primary">
                Apply for this role
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  shell: {
    maxWidth: 980,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: 24,
    alignItems: "flex-start",
    padding: "24px 0",
    borderBottom: "1px solid var(--line)",
  },
  title: {
    fontSize: "clamp(28px, 4vw, 42px)",
    margin: "8px 0 12px",
    color: "var(--ink-900)",
  },
  metaRow: {
    marginTop: 8,
  },
  ctaCard: {
    minWidth: 240,
    padding: 20,
    borderRadius: 16,
    border: "1px solid var(--line)",
    background: "var(--card)",
    boxShadow: "var(--shadow-sm)",
  },
  card: {
    background: "var(--card)",
    borderRadius: 16,
    padding: 24,
    boxShadow: "var(--shadow-sm)",
  },
  sectionTitle: {
    margin: "0 0 12px",
    fontSize: 22,
    color: "var(--ink-900)",
  },
  subTitle: {
    margin: "0 0 8px",
    fontSize: 16,
    color: "var(--ink-900)",
  },
  text: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "var(--ink-700)",
    margin: 0,
  },
  emptyState: {
    padding: "48px 0",
    textAlign: "center",
  },
  sectionBlock: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid var(--line)",
  },
  list: {
    margin: "0 0 0 18px",
    padding: 0,
    display: "grid",
    gap: 8,
  },
  listItem: {
    color: "var(--ink-700)",
    lineHeight: 1.6,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 8,
  },
};
