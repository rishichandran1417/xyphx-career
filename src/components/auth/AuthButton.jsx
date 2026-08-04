import { useAuthModal } from "../../hooks/useAuthModal";

export default function AuthButton() {
  const { openAuthModal } = useAuthModal();

  return <button type="button" className="nav-cta" onClick={openAuthModal}>Login</button>;
}
