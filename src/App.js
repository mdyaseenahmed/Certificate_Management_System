import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CSRForm from "./Components/CSRForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/csr" element={<CSRForm />} />
      </Routes>
    </>
  );
}

export default App;
