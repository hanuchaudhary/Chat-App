import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import SingleProject from "../pages/SingleProject";
import Projects from "../pages/Projects";
import Landing from "../pages/Landing";
import Navbar from "../components/Navbar";

export default function NavigationRoutes() {
  return (
    <div className="dark:bg-neutral-950 min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Projects />} />
          <Route path="/project/:projectId" element={<SingleProject />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
