import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Heritage from "./pages/Heritage";
import Classics from "./pages/Classics";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter basename="/Professionalphysicianapp">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="diagnosis" element={<Diagnosis />} />
          <Route path="heritage" element={<Heritage />} />
          <Route path="classics" element={<Classics />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
