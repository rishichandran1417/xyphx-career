import { useAuth } from "../context/AuthContext";
import AuthButton from "./auth/AuthButton";
import UserMenu from "./auth/UserMenu";

export default function Navbar() {
  const { user, isLoading } = useAuth();

  return (
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

        <nav className="nav-links">
          {!isLoading && (user ? <UserMenu /> : <AuthButton />)}
        </nav>
      </div>
    </header>
  );
}
