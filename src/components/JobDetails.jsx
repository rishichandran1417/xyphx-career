import { Link, useParams } from "react-router-dom";

export default function JobDetails({ jobs }) {
  const { id } = useParams();

  const job = jobs.find((j) => String(j.id) === String(id));

  if (!job) {
    return (
      <main className="apply-page">
        <div className="wrap" style={{ padding: "120px 0", textAlign: "center" }}>
          <h1>Job not found</h1>
          <p>This position doesn't exist or is no longer available.</p>

          <Link className="btn btn-primary" to="/">
            Back to Careers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="apply-page">

      <section className="apply-hero">
        <div className="wrap">

          <Link to="/" className="back-link">
            ← Back to Careers
          </Link>

          <div className="job-card">

            <span className="job-label">
              Open Position
            </span>

            <div className="job-meta">
              <span>{job.team}</span>
              <span>📍 {job.location}</span>
<span>{job.employmentType}</span>
<span>💰 {job.salary}</span>
            </div>
                    <div className="job-header">
  <h1>{job.title}</h1>

  <Link
    to={`/apply/${job.id}`}
    className="btn btn-primary"
  >
    Apply Now
  </Link>
</div>

          </div>

        </div>
      </section>

      <section className="pad">
        <div className="wrap">

          <div className="job-content">

           <div className="job-section">
  <p>{job.description}</p>
</div>

{job.sections.map((section) => (
  <div className="job-section" key={section.title}>
    <h2>{section.title}</h2>

    <ul>
      {section.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
))}

      <div className="job-section">
      <h2>About Xyphx</h2>
  <p>{job.aboutCompany}</p>
</div>


            <div
              style={{
                marginTop: "60px",
                textAlign: "center",
              }}
            >
              <Link
                to={`/apply/${job.id}`}
                className="btn btn-primary"
              >
                Apply Now
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}