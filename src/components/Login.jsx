import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Add styling for better user interface

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Validate input fields
    if (!email || !password) {
      setError("Email and password are required.");
      setMessage(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem("token", token);
        setMessage(data.message || "Login successful!");
        setError(null);
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        setMessage(null);
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage(null);
      setError("Network error, please try again later.");
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email..."
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password..."
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="auth-footer">
        <p>
          Forgot password? <button onClick={() => navigate("/forget-password")}>Reset it</button>
        </p>
        <p>Dont have an account? <button onClick={() => navigate("/register")}>Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
