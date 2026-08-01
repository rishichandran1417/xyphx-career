import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]/\\<>|_-+=*#";

export default function Navbar() {
  const [word, setWord] = useState('XYPHX');
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
const [menuOpen, setMenuOpen] = useState(false);

  function scramble() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const target = 'XYPHX';
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
     <>
    <header className="nav">
      <div className="nav-inner">
        <button className="wordmark" onMouseEnter={scramble} aria-label="xyphx">
          {word}
        </button>
         <button
          className="hamburger"
               onClick={() => setMenuOpen(!menuOpen)}
               >
             ☰
           </button>
               <nav className="nav-links">
                

  

  <Link className="nav-cta" to="/#roles">
    Open Roles 
  </Link>
</nav>
         </div>
    </header>

    <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
  <div className="mobile-header">
    <button
      className="close-btn"
      onClick={() => setMenuOpen(false)}
    >
      ✕
    </button>
  </div>

  <Link
    className="mobile-btn"
    to="/#roles"
    onClick={() => setMenuOpen(false)}
  >
    Open Roles
  </Link>
</div>
  </>
);
}