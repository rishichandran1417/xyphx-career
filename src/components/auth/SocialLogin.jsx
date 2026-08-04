import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";

export default function SocialLogin() {
  const { signInWithProvider } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (provider) => {
    setLoadingProvider(provider);
    setError("");
    try {
      await signInWithProvider(provider);
    } catch (authError) {
      setLoadingProvider("");
      setError(authError.message || "Unable to start social sign in.");
    }
  };

  return (
    <div className="auth-socials">
      <button type="button" className="auth-social-button" onClick={() => handleLogin("google")} disabled={Boolean(loadingProvider)}>
        <FcGoogle className="auth-social-icon" aria-hidden="true" /><span>{loadingProvider === "google" ? "Connecting" : "Google"}</span>
      </button>
      <button type="button" className="auth-social-button" onClick={() => handleLogin("github")} disabled={Boolean(loadingProvider)}>
        <FaGithub className="auth-social-icon auth-social-github" aria-hidden="true" /><span>{loadingProvider === "github" ? "Connecting" : "GitHub"}</span>
      </button>
      <button type="button" className="auth-social-button" disabled aria-label="Microsoft sign in is currently unavailable"><svg className="auth-social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f35325" d="M1 1h10v10H1z" /><path fill="#81bc06" d="M13 1h10v10H13z" /><path fill="#05a6f0" d="M1 13h10v10H1z" /><path fill="#ffba08" d="M13 13h10v10H13z" /></svg><span>Microsoft</span></button>
      {error && <p className="auth-feedback auth-error" role="alert">{error}</p>}
    </div>
  );
}
