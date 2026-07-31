import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TEAMS } from "./Teams";

import "../styles/App.css";

export default function Roles({ jobs, loading, error }) {
  const [activeTeam, setActiveTeam] = useState('All');
  const [activeLoc, setActiveLoc] = useState('All');

 const locs = useMemo(
  () => ["All", ...new Set(jobs.map((r) => r.location))],
  [jobs]
);

  const filtered = jobs.filter(
    (r) =>
      (activeTeam === 'All' || r.team === activeTeam) &&
      (activeLoc === 'All' || r.location === activeLoc)
  );

  return (
    <section className="pad" id="roles">
      <div className="wrap">
        <div className="section-head">
          <span className="tag mono">$ grep -r &quot;open&quot; roles/</span>
          <h2>Open roles</h2>
        </div>

        <div className="filters">
          <button
            className={`chip${activeTeam === 'All' ? ' active' : ''}`}
            onClick={() => setActiveTeam('All')}
          >
            All teams
          </button>
          {TEAMS.map((t) => (
            <button
              key={t.id}
              className={`chip${activeTeam === t.id ? ' active' : ''}`}
              onClick={() => setActiveTeam(t.id)}
            >
              {t.id}
            </button>
          ))}
          <select
            className="locfilter"
            value={activeLoc}
            onChange={(e) => setActiveLoc(e.target.value)}
          >
            {locs.map((l) => (
              <option key={l} value={l}>
                {l === 'All' ? 'All locations' : l}
              </option>
            ))}
          </select>
        </div>

        <div className="role-list">
          {loading && (
            <div className="loading-state">$ fetching roles/jobs.json …</div>
          )}
          {error && !loading && (
            <div className="empty-state">$ could not load roles/jobs.json — try refreshing.</div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="empty-state">$ no roles match that filter — try clearing it.</div>
          )}
          {!loading && !error && filtered.map((r) => (
            <div className="role-row" key={r.id}>
              <div className="role-main">
                <h3>{r.title}</h3>
                <div className="role-tags">
                 <span className="tag">{r.location}</span>
                <span className="tag">{r.employmentType}</span>
                  <span className="tag">{r.salary}</span>
                </div>
              </div>
                  <Link
  to={`/job/${r.id}`}
  className="btn btn-ghost role-apply role-arrow"
  aria-label={`View ${r.title}`}
>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
