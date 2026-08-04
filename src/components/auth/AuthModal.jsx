import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthModal } from "../../hooks/useAuthModal";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeAuthModal();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const elements = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), [href]')];
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => dialogRef.current?.querySelector("button, input")?.focus(), 0);
    return () => { document.removeEventListener("keydown", handleKeyDown); window.clearTimeout(focusTimer); };
  }, [closeAuthModal, isOpen]);

  return <AnimatePresence>{isOpen && (
    <motion.div className="auth-overlay" onMouseDown={(event) => event.target === event.currentTarget && closeAuthModal()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section ref={dialogRef} className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.2 }}>
        <button type="button" className="auth-close" onClick={closeAuthModal} aria-label="Close sign in dialog">×</button>
        <header className="auth-modal-header"><img className="auth-logo" src="https://xyphx.com/logo.png" alt="XyphX" /><h1 id="auth-modal-title">Sign in to XyphX</h1><p>Continue to your account</p></header>
        <SocialLogin />
        <div className="auth-divider"><span>OR</span></div>
        <LoginForm />
      </motion.section>
    </motion.div>
  )}</AnimatePresence>;
}
