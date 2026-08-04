import { createContext, useCallback, useContext, useState } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openAuthModal = useCallback((returnTo) => {
    if (typeof returnTo === "string" && returnTo.startsWith("/")) {
      sessionStorage.setItem("xyphx-careers:return-to", returnTo);
    }
    setIsOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => setIsOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ isOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within an AuthModalProvider");
  return context;
}
