import "../App.css"
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !resetToken || !newPassword) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: resetToken, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password has been reset successfully.");
        window.location.href = "/login";
      } else {
        setMessage(null);
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error(error)
      setMessage(null);
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="resetEmail">Email</label>
        <input
          type="email"
          id="resetEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="resetToken">Reset Token</label>
        <input
          type="text"
          id="resetToken"
          value={resetToken}
          onChange={(e) => setResetToken(e.target.value)}
          placeholder="Enter your reset token"
          required
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default ResetPassword;
