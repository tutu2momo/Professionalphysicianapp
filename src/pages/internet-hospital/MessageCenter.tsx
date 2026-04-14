import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Search, ScanLine, ChevronDown, 
  Bell, Send, Pill, Users, MessageSquare, 
  User, PlaySquare, Hexagon
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function MessageCenter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-[#38B28B] text-white px-4 pt-12 pb-3 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button className="flex items-center gap-1 text-lg font-medium">
            消息中心 <ChevronDown className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-4">
            <button><Search className="w-5 h-5" /></button>
            <button><ScanLine className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="bg-white px-4 py-6 grid grid-cols-4 gap-4 border-b border-gray-100">
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#FFB042] flex items-center justify-center text-white shadow-sm">
            <Bell className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xs text-gray-700">系统消息</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#7C73E6] flex items-center justify-center text-white shadow-sm">
            <Send className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xs text-gray-700">群发消息</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#4A90E2] flex items-center justify-center text-white shadow-sm">
            <Pill className="w-6 h-6" />
          </div>
          <span className="text-xs text-gray-700">药品查询</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-[#8A6AE5] flex items-center justify-center text-white shadow-sm">
            <Users className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xs text-gray-700">多人会诊</span>
        </button>
      </div>

      {/* Message List */}
      <div className="bg-white mt-2">
        <div className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-medium text-gray-900 truncate">刘宇航</h3>
              <span className="text-xs text-gray-400 shrink-0">2026/03/30</span>
            </div>
            <p className="text-sm text-gray-500 truncate">由于您未及时回复患者，系统已自动退诊，...</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around pb-safe pt-2 px-2 z-50">
        <Link to="/internet-hospital/messages" className="flex flex-col items-center p-2 text-[#38B28B]">
          <MessageSquare className="w-6 h-6 mb-1 fill-current" />
          <span className="text-[10px]">消息</span>
        </Link>
        <Link to="/internet-hospital/patients" className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <User className="w-6 h-6 mb-1" />
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
