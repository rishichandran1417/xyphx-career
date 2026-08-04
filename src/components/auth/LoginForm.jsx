import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { signInWithPassword, signUpWithPassword, resetPassword } = useAuth();
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      if (mode === "reset") {
        await resetPassword(email);
        setMessage("Check your email for a password reset link.");
      } else if (mode === "create") {
        await signUpWithPassword(email, password);
        setMessage("Account created. Check your email to confirm your account.");
      } else {
        await signInWithPassword(email, password);
      }
    } catch (authError) {
      setError(authError.message || "Unable to continue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReset = mode === "reset";
  const isCreate = mode === "create";
  const title = isReset ? "Reset password" : isCreate ? "Create account" : "Sign In";

  return (
    <form className="auth-form" onSubmit={submit}>
      {mode !== "sign-in" && <h2>{title}</h2>}
      <label htmlFor="auth-email">Email</label>
      <input id="auth-email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      {!isReset && <><label htmlFor="auth-password">Password</label><div className="auth-password-field"><input id="auth-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete={isCreate ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /><button type="button" className="auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div></>}
      {error && <p className="auth-feedback auth-error" role="alert">{error}</p>}
      {message && <p className="auth-feedback" role="status">{message}</p>}
      <button className="auth-primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait…" : isReset ? "Send reset link" : isCreate ? "Create Account" : "Sign In"}</button>
      {!isReset && <button type="button" className="auth-text-button" onClick={() => setMode("reset")}>Forgot Password?</button>}
      <p className="auth-switch">{isCreate ? "Already have an account?" : "Don't have an account?"} <button type="button" onClick={() => setMode(isCreate ? "sign-in" : "create")}>{isCreate ? "Sign In" : "Create Account"}</button></p>
      {isReset && <button type="button" className="auth-text-button" onClick={() => setMode("sign-in")}>Back to Sign In</button>}
    </form>
  );
}
