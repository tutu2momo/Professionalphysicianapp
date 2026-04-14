import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, Plus, Clock, Bookmark, UserMinus, ChevronRight,
  MessageSquare, User, PlaySquare, Hexagon, ArrowLeft
} from "lucide-react";

export default function PatientManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-[#38B28B] text-white px-4 pt-12 pb-3 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-lg font-medium">患者管理</h1>
          
          <button className="p-1 -mr-1">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="bg-gray-100 rounded-full flex items-center px-4 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="患者姓名/手机号" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white mb-4">
        <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center text-white">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[15px] text-gray-800">接诊患者</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
        
        <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF8A65] flex items-center justify-center text-white">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[15px] text-gray-800">标签分组</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>

        <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#607D8B] flex items-center justify-center text-white">
              <UserMinus className="w-4 h-4" />
            </div>
            <span className="text-[15px] text-gray-800">黑名单</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Patient Count */}
      <div className="text-center py-4">
        <span className="text-sm text-gray-400">共0位患者</span>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around pb-safe pt-2 px-2 z-50">
        <Link to="/internet-hospital/messages" className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <MessageSquare className="w-6 h-6 mb-1" />
          <span className="text-[10px]">消息</span>
        </Link>
        <Link to="/internet-hospital/patients" className="flex flex-col items-center p-2 text-[#38B28B]">
          <User className="w-6 h-6 mb-1 fill-current" />
          <span className="text-[10px]">患者</span>
        </Link>
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <PlaySquare className="w-6 h-6 mb-1" />
          <span className="text-[10px]">讲堂</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
          <Hexagon className="w-6 h-6 mb-1" />
          <span className="text-[10px]">我的</span>
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>
    </div>
  );
}
