import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    if (!userName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://3.219.117.230:5000/api/v1/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "User registered successfully");
        setError(null);
        alert("User signed up successfully.");
        setTimeout(() => navigate("/login"), 3000); // Automatically navigate to login after 3 seconds
      } else {
        setMessage(null);
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
        console.error(error)
      setMessage(null);
      setError("Network error, please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="userName">Name</label>
        <input
          name="userName"
          type="text"
          placeholder="Enter your username..."
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="userEmail">Email</label>
        <input
          name="userEmail"
          type="email"
          placeholder="Enter your email..."
          id="userEmail"
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
        <button type="submit">Register</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {/* Link to Login Page for users who already have an account */}
      <div className="auth-footer">
        <p>Already have an account? <button onClick={() => navigate("/login")}>Login</button></p>
      </div>
    </div>
  );
};

export default Register;
