import { ArrowLeft, Bell, Moon, Shield, Info, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">设置</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center justify-between p-3 border-b border-[#B8D8C8]/20">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#666666]" />
              <span className="text-sm text-[#333333]">消息通知</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#B8D8C8]" />
          </div>
          <div className="flex items-center justify-between p-3 border-b border-[#B8D8C8]/20">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#666666]" />
              <span className="text-sm text-[#333333]">深色模式</span>
            </div>
            <span className="text-xs text-[#999999] flex items-center gap-1">跟随系统 <ChevronRight className="w-4 h-4 text-[#B8D8C8]" /></span>
          </div>
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#666666]" />
              <span className="text-sm text-[#333333]">账号与安全</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#B8D8C8]" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#666666]" />
              <span className="text-sm text-[#333333]">关于应用</span>
            </div>
            <span className="text-xs text-[#999999] flex items-center gap-1">v1.0.0 <ChevronRight className="w-4 h-4 text-[#B8D8C8]" /></span>
          </div>
        </div>

        <button className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40 flex items-center justify-center gap-2 text-[#E53E3E] active:scale-95 transition-transform mt-8">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold">退出登录</span>
        </button>
      </div>
    </div>
  );
}
