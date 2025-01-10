import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/" element={<h1>Welcome to the App!</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
