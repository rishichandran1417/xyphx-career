import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [maintenanceNotice, setMaintenanceNotice] = useState(false);

  const handleSignIn = (event) => {
  event.preventDefault();

  setMenuOpen(false);
  setMaintenanceNotice(true);

  setTimeout(() => {
    setMaintenanceNotice(false);
  }, 5000);
};

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a
            className="wordmark"
            href="https://xyphx.com"
            target="_blank"
            rel="noreferrer"
            aria-label="XYPHX"
          >
            <img src="https://xyphx.com/logo.png" alt="XYPHX" />
          </a>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <nav className="nav-links">
            <button type="button" className="nav-cta" onClick={handleSignIn}>
              Sign in
            </button>
          </nav>
        </div>
      </header>

      {maintenanceNotice && (
        <div className="maintenance-banner">Currently under maintenance</div>
      )}

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <div className="mobile-header">
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        <button
          type="button"
          className="mobile-btn"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </div>
    </>
  );
}