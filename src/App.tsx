import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Heritage from "./pages/Heritage";
import Classics from "./pages/Classics";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#e8e2d9] flex justify-center overflow-hidden">
        <div className="w-full max-w-[750px] h-screen relative shadow-2xl bg-[#f5f1eb] transform-gpu">
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="diagnosis" element={<Diagnosis />} />
                <Route path="heritage" element={<Heritage />} />
                <Route path="classics" element={<Classics />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
