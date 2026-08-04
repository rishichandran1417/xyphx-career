import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthContext";
import { useLastAuthProvider, type AuthProvider } from "../../hooks/useLastAuthProvider";
import LastUsedBadge from "./LastUsedBadge";

export default function SocialLogin() {
  const { signInWithProvider } = useAuth();
  const lastAuthProvider = useLastAuthProvider();
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | "">("");
  const [error, setError] = useState("");

  const handleLogin = async (provider: AuthProvider) => {
    setLoadingProvider(provider);
    setError("");
    try {
      await signInWithProvider(provider);
    } catch (authError) {
      setLoadingProvider("");
      setError(authError instanceof Error ? authError.message : "Unable to start social sign in.");
    }
  };

  return <div className="auth-socials" aria-label="Sign in options">
    <ProviderButton provider="google" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
      <FcGoogle className="auth-social-icon" aria-hidden="true" />
      Google
    </ProviderButton>
    <ProviderButton provider="github" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
      <FaGithub className="auth-social-icon auth-social-github" aria-hidden="true" />
      GitHub
    </ProviderButton>
    {error && <p className="auth-feedback auth-error" role="alert">{error}</p>}
  </div>;
}

function ProviderButton({ provider, loadingProvider, lastAuthProvider, onClick, children }: { provider: AuthProvider; loadingProvider: AuthProvider | ""; lastAuthProvider: AuthProvider | null; onClick: (provider: AuthProvider) => void; children: ReactNode }) {
  return <div className="auth-provider-option">
    <button type="button" className="auth-social-button" onClick={() => onClick(provider)} disabled={Boolean(loadingProvider)}>
      {loadingProvider === provider ? "Connecting…" : children}
    </button>
    <AnimatePresence>{lastAuthProvider === provider && <LastUsedBadge />}</AnimatePresence>
  </div>;
}
