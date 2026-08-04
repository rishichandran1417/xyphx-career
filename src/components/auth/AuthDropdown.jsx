import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthDropdown({ isOpen, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnOutside = (event) => !ref.current?.contains(event.target) && onClose();
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("mousedown", closeOnOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [isOpen, onClose]);
  return <AnimatePresence>{isOpen && <motion.div ref={ref} className="auth-dropdown" initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -8 }} transition={{ duration: 0.2 }}>{children}</motion.div>}</AnimatePresence>;
}
