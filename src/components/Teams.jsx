export const TEAMS = [
  { id: 'UI/UX Team', desc: 'Design intuitive, elegant, and high-performance user experiences across web and mobile products.' },
  { id: 'Marketing Team', desc: 'Drive product adoption, brand awareness, storytelling, growth campaigns, and community engagement.' },
  { id: 'DevOps Team', desc: 'Build secure, scalable cloud infrastructure, CI/CD pipelines, observability, and production reliability.' },
  { id: 'Frontend Development Team', desc: 'Create fast, responsive, and accessible interfaces using modern web technologies with exceptional user experience.' },
  { id: 'App Development Team', desc: 'Develop high-quality mobile applications that deliver seamless experiences across Android and iOS platforms.' },
  { id: 'Backend Development Team', desc: 'Design scalable APIs, databases, authentication systems, and distributed services powering the entire platform.' },
];

export default function Teams({ jobs }) {
  return (
    <section className="pad" id="teams">
      <div className="wrap">
        <div className="section-head">
          <span className="tag mono">$ ls teams/</span>
          <h2>Six teams. One model lifecycle.</h2>
        </div>
        <div className="teams-grid">
          {TEAMS.map((t) => {
            const count = jobs.filter(
              (r) =>
                (r.team === t.id || r.department === t.id) &&
                r.status === 'open'
            ).length;
            return (
              <div className="team-card" key={t.id}>
          
                <h3>{t.id}</h3>
                <p>{t.desc}</p>
                <div className="team-count">
                  <b>{count}</b> open role{count === 1 ? '' : 's'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
