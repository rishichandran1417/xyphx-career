export const TEAMS = [
  { id: 'Research', desc: 'Push the frontier of what generative models can do, and publish what we learn.' },
  { id: 'Software Engineering', desc: 'Turn frontier capability into agents and products people actually rely on.' },
  { id: 'Infrastructure',  desc: 'Keep training runs and inference clusters fast, cheap, and awake at 3am.' },
  { id: 'Product', desc: "Design the interface between a model's judgment and a person's intent." },
  { id: 'Sales & Operations', desc: 'Get xyphx into the hands of the teams who need it, and listen when it breaks.' },
  { id: 'HR',  desc: 'Build the org that builds the models — hiring, ops, and everything between.' },
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
