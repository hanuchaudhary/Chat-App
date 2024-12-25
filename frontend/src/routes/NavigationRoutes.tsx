import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import SingleProject from "../pages/SingleProject";
import Projects from "../pages/Projects";
import Landing from "../pages/Landing";

export default function NavigationRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:projectId" element={<SingleProject />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
