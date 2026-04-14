import { ArrowLeft, User, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PersonalInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">个人信息</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-[#B8D8C8]/40 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#2D5A4A] to-[#3A705C] shadow-md mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#333333]">李医生</h2>
          <p className="text-sm text-[#666666] mt-1">中医内科</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40 space-y-4">
          <div className="flex items-center justify-between border-b border-[#B8D8C8]/20 pb-3">
            <div className="flex items-center gap-3 text-[#666666]">
              <User className="w-4 h-4" />
              <span className="text-sm">性别</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">男</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#B8D8C8]/20 pb-3">
            <div className="flex items-center gap-3 text-[#666666]">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">出生年月</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">1985-06</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#B8D8C8]/20 pb-3">
            <div className="flex items-center gap-3 text-[#666666]">
              <Phone className="w-4 h-4" />
              <span className="text-sm">手机号码</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">138****5678</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#B8D8C8]/20 pb-3">
            <div className="flex items-center gap-3 text-[#666666]">
              <Mail className="w-4 h-4" />
              <span className="text-sm">电子邮箱</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">li.doctor@example.com</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#666666]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">所在地区</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">辽宁省 沈阳市</span>
          </div>
        </div>
      </div>
    </div>
  );
}
