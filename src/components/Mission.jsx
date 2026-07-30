const PILLARS = [
  {
    cmd: '$ train',
    text: 'Frontier-scale models, trained by a team small enough that everyone reads their own eval results.',
  },
  {
    cmd: '$ ship',
    text: 'Agents and APIs developers can put into production the same week they try them — not the same quarter.',
  },
  {
    cmd: '$ align',
    text: "Every model card lists what it won't do. We treat a good refusal as a feature, not a bug to route around.",
  },
];

export default function Mission() {
  return (
    <section className="pad" id="mission">
      <div className="wrap">
        <div className="section-head">
          <span className="tag mono">$ cat thesis.md</span>
          <h2>Capability is easy. Judgment is the job.</h2>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.cmd}>
              <span className="cmd mono">{p.cmd}</span>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
