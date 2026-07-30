import { useState } from 'react';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]/\\<>|_-+=*#";

export default function Navbar() {
  const [word, setWord] = useState('xyphx');

  function scramble() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const target = 'xyphx';
    const duration = 450;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min(1, (now - start) / duration);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        const revealAt = i / target.length;
        out += progress > revealAt + 0.15
          ? target[i]
          : CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      setWord(out);
      if (progress < 1) requestAnimationFrame(frame);
      else setWord(target);
    }
    requestAnimationFrame(frame);
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="wordmark" onMouseEnter={scramble} aria-label="xyphx">
          {word}
        </button>
        <nav className="nav-links">
          <a className="textlink" href="#mission">Mission</a>
          <a className="textlink" href="#teams">Teams</a>
          <a className="textlink" href="#life">Life here</a>
          <a className="btn btn-primary" href="#roles">Open roles</a>
        </nav>
      </div>
    </header>
  );
}
