import { useEffect, useState } from "react";

export const AUTH_PROVIDERS = ["google", "github"] as const;
export type AuthProvider = (typeof AUTH_PROVIDERS)[number];

const STORAGE_KEY = "lastAuthProvider";
const CHANGE_EVENT = "xyphx-careers:last-auth-provider-changed";

export function getLastAuthProvider(): AuthProvider | null {
  try {
    const provider = localStorage.getItem(STORAGE_KEY);
    return AUTH_PROVIDERS.includes(provider as AuthProvider) ? (provider as AuthProvider) : null;
  } catch {
    return null;
  }
}

export function setLastAuthProvider(provider: AuthProvider) {
  try {
    localStorage.setItem(STORAGE_KEY, provider);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    // Browser storage can be unavailable in private or restricted contexts.
  }
}

export function useLastAuthProvider() {
  const [lastAuthProvider, setLastAuthProviderState] = useState<AuthProvider | null>(getLastAuthProvider);

  useEffect(() => {
    const updateProvider = () => setLastAuthProviderState(getLastAuthProvider());
    window.addEventListener(CHANGE_EVENT, updateProvider);
    window.addEventListener("storage", updateProvider);
    return () => {
      window.removeEventListener(CHANGE_EVENT, updateProvider);
      window.removeEventListener("storage", updateProvider);
    };
  }, []);

  return lastAuthProvider;
}
