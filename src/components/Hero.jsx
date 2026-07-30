import { useEffect, useRef, useState } from 'react';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]/\\<>|_-+=*#";
const GLYPHS = ['0', '1', 'λ', '∑', 'Δ', '{', '}', '(', ')', '⟩', '⟨', '/', '∇'];

export default function Hero({ roleTitles }) {
  const canvasRef = useRef(null);
  const [decodeText, setDecodeText] = useState(roleTitles[0] || 'RESEARCH ENGINEER');
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Decode / scramble cycle through role titles
  useEffect(() => {
    if (!roleTitles.length || reduceMotion) return;
    let idx = 0;
    let cancelled = false;

    function scrambleTo(target, duration = 700) {
      const start = performance.now();
      function frame(now) {
        if (cancelled) return;
        const progress = Math.min(1, (now - start) / duration);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          const revealAt = i / target.length;
          if (target[i] === ' ') out += ' ';
          else out += progress > revealAt + 0.15
            ? target[i]
            : CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
        setDecodeText(out);
        if (progress < 1) requestAnimationFrame(frame);
        else setDecodeText(target);
      }
      requestAnimationFrame(frame);
    }

    const interval = setInterval(() => {
      idx = (idx + 1) % roleTitles.length;
      scrambleTo(roleTitles[idx].toUpperCase());
    }, 2600);

    return () => { cancelled = true; clearInterval(interval); };
  }, [roleTitles, reduceMotion]);

  // Ambient drifting-token field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function sizeCanvas() {
      const hero = canvas.closest('.hero');
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function initParticles() {
      const count = Math.floor((canvas.width * canvas.height) / 26000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.35,
        size: 11 + Math.random() * 10,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        alpha: 0.05 + Math.random() * 0.16,
        tint: Math.random() > 0.75 ? '110,86,255' : '236,233,229',
      }));
    }

    function drawField() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.font = `${p.size}px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = `rgba(${p.tint},${p.alpha})`;
        ctx.fillText(p.glyph, p.x, p.y);
        p.y -= p.speed;
        if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(drawField);
    }

    sizeCanvas();
    initParticles();
    window.addEventListener('resize', sizeCanvas);

    if (!reduceMotion) {
      drawField();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener('resize', sizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section className="hero">
      <canvas id="field" ref={canvasRef} />
      <div className="hero-inner">
        <div className="eyebrow mono">
          <span>$ now_hiring:</span>
          <span>{decodeText}</span>
          <span className="cursor" />
        </div>
        <h1>We build the models.<br />You&apos;ll build what happens next.</h1>
        <p className="sub">
          xyphx is a generative AI research and product company. We train frontier models
          and ship the agents, tools, and interfaces that put them to work — for the
          people who use them, not just the benchmarks that score them.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#roles">See open roles</a>
          <a className="btn btn-ghost" href="#mission">Read our thesis</a>
        </div>
      </div>
    </section>
  );
}
