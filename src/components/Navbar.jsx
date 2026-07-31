import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]/\\<>|_-+=*#";

export default function Navbar() {
  const [word, setWord] = useState('XyphX');
  const location = useLocation();

const goToSection = (section) => {
  if (location.pathname === "/") {
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    window.location.href = "/#" + section;
  }
};

  function scramble() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const target = 'XyphX';
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
  <Link className="nav-item" to="/#mission">
    <span>01</span> Mission
  </Link>

  <Link className="nav-item" to="/#teams">
    <span>02</span> Teams
  </Link>

  <Link className="nav-item" to="/#life">
    <span>03</span> Life here
  </Link>

  <Link className="nav-cta" to="/#roles">
    Open Roles ↗
  </Link>
</nav>
      </div>
    </header>
  );
}
