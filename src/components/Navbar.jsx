import "../App.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/reset-password">Reset Password</Link></li>
        <li><Link to="/forget-password">Forget Password</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
