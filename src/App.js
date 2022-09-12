import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CSRForm from "./Components/CSRForm";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} /> 
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route path="/csr" element={<CSRForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
