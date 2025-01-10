import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import ResetPassword from "./components/resetPassword";
import ForgetPassword from "./components/forgetPassword";

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
