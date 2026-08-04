import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading, signInWithGoogle, signOut } = useAuth();


 const handleSignIn = async (event) => {
  event.preventDefault();

  setMenuOpen(false);

  try {
    await signInWithGoogle();
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    alert(error.message);
  }
};

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      setProfileOpen(false);
    } catch (error) {
      console.error("Sign-out error:", error);
      alert(error.message || "Unable to sign out. Please try again.");
    }
  };

  const handleApplications = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/applications");
  };

  const profileImage = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const profileLabel = user?.user_metadata?.full_name || user?.email || "Profile";

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

          <button
            type="button"
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className="nav-links">
            {!isLoading && (user ? (
              <div className="profile-menu">
                <button
                  type="button"
                  className="profile-button"
                  title={profileLabel}
                  aria-label={`Signed in as ${profileLabel}`}
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  {profileImage ? <img src={profileImage} alt="" referrerPolicy="no-referrer" /> : profileLabel.charAt(0).toUpperCase()}
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <span>{profileLabel}</span>
                    <button type="button" onClick={handleApplications}>My applications</button>
                    <button type="button" onClick={handleSignOut}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button type="button" className="nav-cta" onClick={handleSignIn}>
                Sign in
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <div className="mobile-header">
          <button type="button" className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        {!isLoading && (user ? (
          <div className="mobile-profile" aria-label={`Signed in as ${profileLabel}`}>
            <span className="profile-button" aria-hidden="true">
              {profileImage ? <img src={profileImage} alt="" referrerPolicy="no-referrer" /> : profileLabel.charAt(0).toUpperCase()}
            </span>
            <div className="mobile-profile-details">
              <div className="mobile-profile-name">{profileLabel}</div>
              <div className="mobile-account-actions">
                <button type="button" className="mobile-account-action" onClick={handleApplications}>My applications</button>
                <button type="button" className="mobile-account-action mobile-sign-out" onClick={handleSignOut}>Sign out</button>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" className="mobile-btn" onClick={handleSignIn}>
            Sign in
          </button>
        ))}
      </div>
    </>
  );
}
