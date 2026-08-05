import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { FaApple, FaAmazon, FaGithub, FaMicrosoft } from "react-icons/fa";
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

  return (
    <div className="auth-socials flex flex-col space-y-4 w-full" aria-label="Sign in options">
      <ProviderButton provider="google" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
        <FcGoogle className="auth-social-icon" aria-hidden="true" />
        <span>Google</span>
      </ProviderButton>

      <ProviderButton provider="github" loadingProvider={loadingProvider} lastAuthProvider={lastAuthProvider} onClick={handleLogin}>
        <FaGithub className="auth-social-icon" style={{ color: "#181717" }} aria-hidden="true" />
        <span>GitHub</span>
      </ProviderButton>

      <MaintenanceButton onClick={showMaintenance}>
        <FaApple className="auth-social-icon" style={{ color: "#000000" }} aria-hidden="true" />
        <span>Apple</span>
      </MaintenanceButton>

      <MaintenanceButton onClick={showMaintenance}>
        <FaMicrosoft className="auth-social-icon" style={{ color: "#0078D4" }} aria-hidden="true" />
        <span>Microsoft</span>
      </MaintenanceButton>

      <MaintenanceButton onClick={showMaintenance}>
        <FaAmazon className="auth-social-icon" style={{ color: "#FF9900" }} aria-hidden="true" />
        <span>Amazon</span>
      </MaintenanceButton>

      {error && (
        <p className="auth-feedback auth-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ProviderButton({
  provider,
  loadingProvider,
  lastAuthProvider,
  onClick,
  children,
}: {
  provider: AuthProvider;
  loadingProvider: AuthProvider | "";
  lastAuthProvider: AuthProvider | null;
  onClick: (provider: AuthProvider) => void;
  children: ReactNode;
}) {
  return (
    <div className="auth-provider-option">
      <button type="button" className="auth-social-button" onClick={() => onClick(provider)} disabled={Boolean(loadingProvider)}>
        {loadingProvider === provider ? "Connecting…" : children}
      </button>
      <AnimatePresence>{lastAuthProvider === provider && <LastUsedBadge />}</AnimatePresence>
    </div>
  );
}

function MaintenanceButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div className="auth-provider-option">
      <button type="button" className="auth-social-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
function AmazonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#FF9900"
      aria-hidden="true"
    >
      <path d="M18.42 15.79c-2.1 1.6-5.15 2.45-7.78 2.45-3.68 0-7-1.38-9.5-3.68-.2-.18-.02-.42.22-.28 2.7 1.58 6.02 2.53 9.46 2.53 2.32 0 4.87-.48 7.22-1.48.35-.15.65.24.38.46zM19.3 14.77c-.27-.35-1.78-.17-2.46-.08-.2.02-.24-.15-.05-.29 1.2-.85 3.18-.6 3.4-.32.23.28-.06 2.28-1.19 3.24-.17.15-.34.07-.26-.12.26-.65.83-2.1.56-2.43z"/>
      <text x="4" y="14" fontSize="10" fontWeight="bold" fill="#FF9900">a</text>
    </svg>
  );
}