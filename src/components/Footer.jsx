export default function Footer() {
  const openEmail = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href =
        "mailto:careers@xyphx.com?subject=Job%20Application";
    } else {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=careers@xyphx.com&su=Job%20Application",
        "_blank"
      );
    }
  };

  return (
    <footer>
      <div className="wrap">
        <h2>Don't see your role?</h2>

        <p>
          We'd still like to hear from you. Tell us what you'd build, and
          we'll tell you if there's a seat for it.
        </p>

        <button
          className="btn btn-primary"
          onClick={openEmail}
        >
          Reach out — careers@xyphx.com
        </button>

        <div className="foot-bottom">
          <span>© 2026 xyphx, Inc.</span>
        </div>
      </div>
    </footer>
  );
}