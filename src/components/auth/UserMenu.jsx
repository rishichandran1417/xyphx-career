import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserAvatar, getUserName } from "../../utils/auth";
import AuthDropdown from "./AuthDropdown";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const name = getUserName(user);
  const avatar = getUserAvatar(user);
  const go = (path) => { setIsOpen(false); navigate(path); };
  const handleSignOut = async () => { await signOut(); setIsOpen(false); };
  return <div className="auth-user-menu">
    <button type="button" className="profile-button profile-button-large" onClick={() => setIsOpen((open) => !open)} aria-label={`Open account menu for ${name}`} aria-haspopup="menu" aria-expanded={isOpen}>{avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" /> : name.charAt(0).toUpperCase()}</button>
    <AuthDropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="user-summary"><span className="profile-button profile-button-large" aria-hidden="true">{avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" /> : name.charAt(0).toUpperCase()}</span><div><strong>{name}</strong><span>{user?.email}</span></div></div>
      <div className="user-menu-links" role="menu" aria-label="Account menu"><button type="button" role="menuitem" onClick={() => go("/applications")}>Applications</button><button type="button" role="menuitem" className="user-menu-danger" onClick={handleSignOut}>Sign Out</button></div>
    </AuthDropdown>
  </div>;
}
