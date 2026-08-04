import { motion } from "framer-motion";

export default function LastUsedBadge() {
  return (
    <motion.span
      className="auth-last-used-badge"
      initial={{ opacity: 0, scale: 0.9, y: -2 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -2 }}
      transition={{ duration: 0.18 }}
    >
      Last used
    </motion.span>
  );
}
