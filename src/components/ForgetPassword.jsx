// src/components/ForgetPassword.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'; // If you want to use specific styles for auth components

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/forget-password-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      alert(data.message || data.error);
      navigate("/reset-password");
      if (data.message && data.message.includes("successfully")) {
        navigate("/reset-password");
      } else {
        setMessage(null);
        setError(data.message || "Failed to send reset token.");
      }
    } catch (error) {
      console.error(error)
      setMessage(null);
      setError("Network error, please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="forgetEmail">Email</label>
        <input
          type="email"
          id="forgetEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Request Reset Token</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default ForgetPassword;


