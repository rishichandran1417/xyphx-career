import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { setLastAuthProvider } from "../hooks/useLastAuthProvider";

const AuthContext = createContext(null);
const PROVIDER_NAMES = { google: "google", github: "github" };

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const rememberOAuthProvider = (method) => {
    const provider = PROVIDER_NAMES[method];
    if (provider) setLastAuthProvider(provider);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) console.error("Unable to read the current session:", error);
        if (isMounted) setSession(data.session ?? null);
        rememberOAuthProvider(data.session?.user?.app_metadata?.provider);
      })
      .catch((error) => console.error("Unable to initialize authentication:", error))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
        setIsLoading(false);
      }
      if (nextSession && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        rememberOAuthProvider(nextSession?.user?.app_metadata?.provider);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider, redirectPath) => {
    const savedReturnTo = sessionStorage.getItem("xyphx-careers:return-to");
    const destination = redirectPath ?? savedReturnTo ?? `${window.location.pathname}${window.location.search}`;
    sessionStorage.setItem("xyphx-careers:return-to", destination);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${destination}`,
      },
    });

    if (error) throw error;
  };

  const signInWithGoogle = (redirectPath) => signInWithProvider("google", redirectPath);

  const signInWithPassword = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUpWithPassword = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${window.location.pathname}`,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw error;

    sessionStorage.removeItem("xyphx-careers:return-to");
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isLoading,
        signInWithGoogle,
        signInWithProvider,
        signInWithPassword,
        signUpWithPassword,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
