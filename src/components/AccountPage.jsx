import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserName } from "../utils/auth";
import "../styles/Account.css";

const pageContent = {
  dashboard: {
    tag: "$ dashboard",
    title: "Your dashboard",
    description: "Keep track of your career activity in one place.",
    body: "Your application updates will appear here as they become available.",
    action: "View my applications",
    to: "/applications",
  },
  "saved-jobs": {
    tag: "$ saved jobs",
    title: "Saved jobs",
    description: "Roles you save for later will be collected here.",
    body: "You have no saved jobs yet. Explore the open roles to find your next opportunity.",
    action: "Browse open roles",
    to: "/#roles",
  },
  settings: {
    tag: "$ settings",
    title: "Account settings",
    description: "Your account is managed securely through your sign-in provider.",
    body: "To update your name, profile image, or email, make the change with the provider you use to sign in.",
    action: "Back to dashboard",
    to: "/dashboard",
  },
};

export default function AccountPage({ page }) {
  const { user, isLoading } = useAuth();
  const content = pageContent[page];

  if (isLoading) return <main className="account-page"><div className="account-wrap"><div className="account-card">Loading your account…</div></div></main>;

  return (
    <main className="account-page">
      <div className="account-wrap">
        <Link className="account-back" to="/">← Back to careers</Link>
        <span className="tag mono">{content.tag}</span>
        <h1>{content.title}</h1>
        <p className="account-description">{content.description}</p>
        <section className="account-card" aria-label={content.title}>
          {user && <p className="account-user">Signed in as <strong>{getUserName(user)}</strong></p>}
          <p>{content.body}</p>
          <Link className="account-action" to={content.to}>{content.action}</Link>
        </section>
      </div>
    </main>
  );
}
