import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { FaAmazon, FaApple, FaGithub, FaMicrosoft } from "react-icons/fa";
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

  const showMaintenance = () => {
    setError("Server under maintenance. Please try again later.");
  };

  return <div className="auth-socials flex flex-col space-y-4 w-full" aria-label="Sign in options">
    <ProviderButton provider="google" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
      <FcGoogle className="auth-social-icon" aria-hidden="true" />
      <span>Google</span>
    </ProviderButton>
    <ProviderButton provider="github" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
      <FaGithub className="auth-social-icon auth-social-github" aria-hidden="true" />
      <span>GitHub</span>
    </ProviderButton>
    <MaintenanceButton onClick={showMaintenance}>
      <FaApple className="auth-social-icon auth-social-github" aria-hidden="true" />
      <span>Apple</span>
    </MaintenanceButton>
    <MaintenanceButton onClick={showMaintenance}>
      <FaMicrosoft className="auth-social-icon auth-social-github" aria-hidden="true" />
      <span>Microsoft</span>
    </MaintenanceButton>
    <MaintenanceButton onClick={showMaintenance}>
      <FaAmazon className="auth-social-icon auth-social-github" aria-hidden="true" />
      <span>Amazon</span>
    </MaintenanceButton>
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

function MaintenanceButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return <div className="auth-provider-option">
    <button type="button" className="auth-social-button" onClick={onClick}>
      {children}
    </button>
  </div>;
}
