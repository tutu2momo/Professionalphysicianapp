import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Heritage from "./pages/Heritage";
import Classics from "./pages/Classics";
import Profile from "./pages/Profile";
import RecordDetail from "./pages/RecordDetail";
import HeritageChat from "./pages/HeritageChat";

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
          <Route path="record/:id" element={<RecordDetail />} />
        </Route>
        <Route path="/heritage/chat" element={
          <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-serif text-[#2c2416]">
            <div className="w-full max-w-md bg-[#f5f1eb] h-screen relative shadow-2xl overflow-hidden flex flex-col" style={{ transform: 'translateZ(0)' }}>
              <HeritageChat />
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
