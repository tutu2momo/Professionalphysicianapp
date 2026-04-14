import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Diagnosis from "./pages/Diagnosis";
import Heritage from "./pages/Heritage";
import Classics from "./pages/Classics";
import Profile from "./pages/Profile";
import RecordDetail from "./pages/RecordDetail";
import HeritageChat from "./pages/HeritageChat";
import HeritageEval from "./pages/HeritageEval";
import PrescriptionDetail from "./pages/recommendations/PrescriptionDetail";
import CaseComparison from "./pages/recommendations/CaseComparison";
import MasterThinking from "./pages/recommendations/MasterThinking";

import PersonalInfo from "./pages/profile/PersonalInfo";
import PracticeInfo from "./pages/profile/PracticeInfo";
import MyNotes from "./pages/profile/MyNotes";
import MyFavorites from "./pages/profile/MyFavorites";
import Settings from "./pages/profile/Settings";
import HelpFeedback from "./pages/profile/HelpFeedback";
import CommonPrescriptions from "./pages/tools/CommonPrescriptions";
import MessageCenter from "./pages/internet-hospital/MessageCenter";
import PatientManagement from "./pages/internet-hospital/PatientManagement";

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
          <Route path="recommendation/prescription" element={<PrescriptionDetail />} />
          <Route path="recommendation/cases" element={<CaseComparison />} />
          <Route path="recommendation/thinking" element={<MasterThinking />} />
          <Route path="profile/personal-info" element={<PersonalInfo />} />
          <Route path="profile/practice-info" element={<PracticeInfo />} />
          <Route path="profile/my-notes" element={<MyNotes />} />
          <Route path="profile/my-favorites" element={<MyFavorites />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/help-feedback" element={<HelpFeedback />} />
          <Route path="tools/prescriptions" element={<CommonPrescriptions />} />
        </Route>
        <Route path="/internet-hospital/messages" element={
          <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-sans text-gray-900">
            <div className="w-full max-w-md bg-white h-screen relative shadow-2xl overflow-hidden flex flex-col" style={{ transform: 'translateZ(0)' }}>
              <MessageCenter />
            </div>
          </div>
        } />
        <Route path="/internet-hospital/patients" element={
          <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-sans text-gray-900">
            <div className="w-full max-w-md bg-white h-screen relative shadow-2xl overflow-hidden flex flex-col" style={{ transform: 'translateZ(0)' }}>
              <PatientManagement />
            </div>
          </div>
        } />
        <Route path="/heritage/chat" element={
          <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-serif text-[#2c2416]">
            <div className="w-full max-w-md bg-[#f5f1eb] h-screen relative shadow-2xl overflow-hidden flex flex-col" style={{ transform: 'translateZ(0)' }}>
              <HeritageChat />
            </div>
          </div>
        } />
        <Route path="/heritage/eval" element={
          <div className="min-h-screen bg-[#e8e2d9] flex justify-center font-serif text-[#2c2416]">
            <div className="w-full max-w-md bg-[#f5f1eb] h-screen relative shadow-2xl overflow-hidden flex flex-col" style={{ transform: 'translateZ(0)' }}>
              <HeritageEval />
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
