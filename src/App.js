import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import NotFound from "./Components/NotFound";
import SelfSignedCertificate from "./Components/SelfSignedCertificate";
import MyCertificates from "./Components/MyCertificates";
import RootCA from "./Components/RootCA";
import DashboardLanding from "./Components/DashboardLanding";
import SignedCert from "./Components/SignedCert";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route index element={<About />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />} >
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardLanding />} />
            <Route path="/dashboard/myCertificates" element={<MyCertificates />} />
            <Route path="/dashboard/selfSigned" element={<SelfSignedCertificate />} />
            <Route path="/dashboard/rootCA" element={<RootCA />} />
            <Route path="/dashboard/signedCert" element={<SignedCert />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
