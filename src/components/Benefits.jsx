const BENEFITS = [
  { tag: 'COMP', title: 'Real equity, not a rounding error', text: 'Meaningful ownership at every level, priced transparently against current valuation.' },
  { tag: 'HEALTH', title: 'Full medical, dental, vision', text: 'Covered for you and your dependents from day one — no waiting period.' },
  { tag: 'WORK', title: 'Remote-friendly, not remote-first', text: 'Hybrid hubs in SF and London, fully remote for most engineering and GTM roles.' },
  { tag: 'GROWTH', title: '$3K annual learning budget', text: 'Courses, conferences, books, or compute for your own side project.' },
  { tag: 'MOBILITY', title: 'Visa sponsorship, handled', text: 'We sponsor and cover legal fees for work visas and relocation where we have entities.' },
  { tag: 'TIME OFF', title: 'Unlimited PTO, 20-day floor', text: 'We track a floor, not a ceiling — and we mean it when we ask people to use it.' },
];

export default function Benefits() {
  return (
    <section className="pad" id="life">
      <div className="wrap">
        <div className="section-head">
          <span className="tag mono">$ man benefits</span>
          <h2>What you get for showing up</h2>
        </div>
        <div className="benefits">
          {BENEFITS.map((b) => (
            <div className="benefit" key={b.tag}>
              <span className="b-tag mono">{b.tag}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
