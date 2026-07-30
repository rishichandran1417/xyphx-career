import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Apply.css";

export default function Apply({ jobs }) {
  const { id } = useParams();

  const job = jobs.find((j) => String(j.id) === String(id));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",

    linkedin: "",
    portfolio: "",

    education: "",
    university: "",
    graduationYear: "",

    authorized: "",
    visa: "",

    resume: null,
    coverLetter: null,
  });

  if (!job) {
    return (
      <main className="apply-page">
        <div
          className="wrap"
          style={{
            padding: "120px 0",
            textAlign: "center",
          }}
        >
          <h1>Job not found</h1>

          <p>
            The position you're trying to apply for doesn't exist or has been
            removed.
          </p>

          <Link className="btn btn-primary" to="/">
            Back to Careers
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, DOC and DOCX files are allowed.");
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Maximum file size is 5 MB.");
        e.target.value = "";
        return;
      }

      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("Application submitted successfully.");
  };

  return (
    <main className="apply-page">
      <section className="apply-hero">
        <div className="wrap">

          <Link to={`/job/${job.id}`} className="back-link">
            ← Back to Job Details
          </Link>

          <div className="job-card">

            <span className="job-label">
              Application
            </span>

            <h1>{job.title}</h1>
            <span>📍 {job.location}</span>
<span>{job.employmentType}</span>
<span>💰 {job.salary}</span>
            </div>

          </div>

        </div>
      </section>

      <section className="apply-form-section">
        <div className="wrap">

          <form
            className="apply-form"
            onSubmit={handleSubmit}
          >

            {/* PERSONAL INFORMATION */}

<h2 className="form-title">Personal Information</h2>

<div className="grid">

  <div className="field">
    <label>First Name *</label>
    <input
      type="text"
      name="firstName"
      placeholder="John"
      required
      minLength={2}
      maxLength={40}
      pattern="[A-Za-z ]+"
      autoComplete="given-name"
      onChange={handleChange}
    />
  </div>

  <div className="field">
    <label>Last Name *</label>
    <input
      type="text"
      name="lastName"
      placeholder="Doe"
      required
      minLength={2}
      maxLength={40}
      pattern="[A-Za-z ]+"
      autoComplete="family-name"
      onChange={handleChange}
    />
  </div>

  <div className="field">
    <label>Email Address *</label>
    <input
      type="email"
      name="email"
      placeholder="john@example.com"
      required
      autoComplete="email"
      onChange={handleChange}
    />
  </div>

  <div className="field">
  <label>Phone Number *</label>

  <input
    type="text"
    name="phone"
    placeholder="9876543210"
    required
    inputMode="numeric"
    autoComplete="tel"
    maxLength={15}
    value={form.phone}
    onChange={(e) => {
      const numbers = e.target.value.replace(/\D/g, "");

      setForm((prev) => ({
        ...prev,
        phone: numbers,
      }));
    }}
  />
</div>

</div>

<div className="field">

  <label>Current Location *</label>

  <input
    type="text"
    name="location"
    placeholder="Bangalore, India"
    required
    autoComplete="address-level2"
    onChange={handleChange}
  />

</div>

<hr className="form-divider" />

{/* PROFESSIONAL PROFILES */}

<h2 className="form-title">Professional Profiles</h2>

<div className="field">

  <label>LinkedIn Profile *</label>

  <input
    type="url"
    name="linkedin"
    placeholder="https://linkedin.com/in/yourname"
    required
    onChange={handleChange}
  />

</div>

<div className="field">

  <label>Portfolio / GitHub (Optional)</label>

  <input
    type="url"
    name="portfolio"
    placeholder="https://github.com/username"
    onChange={handleChange}
  />

</div>

<hr className="form-divider" />

{/* EDUCATION */}

<h2 className="form-title">Education</h2>

<div className="grid">

  <div className="field">

    <label>Highest Education *</label>

    <select
      name="education"
      required
      onChange={handleChange}
    >

      <option value="">Select</option>

      <option>Bachelor's Degree</option>

      <option>Master's Degree</option>

      <option>PhD</option>

      <option>Diploma</option>

      <option>Other</option>

    </select>

  </div>

  <div className="field">

    <label>Graduation Year *</label>

    <input
      type="number"
      name="graduationYear"
      min="2000"
      max="2035"
      placeholder="2027"
      required
      onChange={handleChange}
    />

  </div>

</div>

<div className="field">

  <label>University *</label>

  <input
    type="text"
    name="university"
    placeholder="College / University"
    required
    onChange={handleChange}
  />

</div>

<hr className="form-divider" />

{/* WORK AUTHORIZATION */}

<h2 className="form-title">Work Authorization</h2>

<div className="grid">

  <div className="field">

    <label>Are you legally authorized to work in this country? *</label>

    <select
      name="authorized"
      required
      onChange={handleChange}
    >

      <option value="">Select</option>

      <option>Yes</option>

      <option>No</option>

    </select>

  </div>

  <div className="field">

    <label>Will you require visa sponsorship? *</label>

    <select
      name="visa"
      required
      onChange={handleChange}
    >

      <option value="">Select</option>

      <option>Yes</option>

      <option>No</option>

    </select>

  </div>

</div>

<hr className="form-divider" />

{/* DOCUMENTS */}

<h2 className="form-title">Documents</h2>

<div className="field">

  <label>Resume / CV *</label>

  <input
    type="file"
    name="resume"
    accept=".pdf,.doc,.docx"
    required
    onChange={handleChange}
  />

  <small>
    Accepted formats: PDF, DOC, DOCX • Maximum size: 5 MB
  </small>

</div>

<div className="field">

  <label>Cover Letter (Optional)</label>

  <input
    type="file"
    name="coverLetter"
    accept=".pdf,.doc,.docx"
    onChange={handleChange}
  />

  <small>
    Accepted formats: PDF, DOC, DOCX • Maximum size: 5 MB
  </small>

</div>
{/* ADDITIONAL INFORMATION */}

<hr className="form-divider" />

<h2 className="form-title">Additional Information</h2>

<div className="field">

  <label>
    Why are you interested in joining Xyphx?
  </label>

  <textarea
    name="motivation"
    rows="6"
    maxLength={3000}
    placeholder="Tell us about yourself, your interests, and why you'd like to join Xyphx..."
    onChange={handleChange}
  />

  <small>Maximum 3000 characters</small>

</div>

<hr className="form-divider" />

{/* AGREEMENTS */}

<h2 className="form-title">Acknowledgements</h2>

<label className="agree">

  <input
    type="checkbox"
    required
  />

  I certify that all information provided in this application is true, complete, and accurate.

</label>

<label className="agree">

  <input
    type="checkbox"
    required
  />

  I consent to Xyphx processing my personal information for recruitment purposes in accordance with its Privacy Policy.

</label>

<label className="agree">

  <input
    type="checkbox"
    required
  />

  I understand that submitting this application does not guarantee employment or an interview.

</label>

<div className="submit-area">

  <button
    type="submit"
    className="btn btn-primary submit-btn"
  >
    Submit Application
  </button>

</div>

</form>

</div>
</section>

</main>
);
}
