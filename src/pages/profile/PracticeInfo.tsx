import { ArrowLeft, Activity, Building2, Award, ShieldCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PracticeInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">执业信息</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40 space-y-4">
          <div className="flex items-start gap-4 border-b border-[#B8D8C8]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#666666] mb-1">执业机构</div>
              <div className="text-sm font-bold text-[#333333]">辽宁中医医院</div>
              <div className="text-xs text-[#8B6E58] mt-1">三级甲等</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 border-b border-[#B8D8C8]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#666666] mb-1">执业科室</div>
              <div className="text-sm font-bold text-[#333333]">中医内科</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b border-[#B8D8C8]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#666666] mb-1">职称</div>
              <div className="text-sm font-bold text-[#333333]">主治医师</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b border-[#B8D8C8]/20 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#666666] mb-1">医师执业证书编码</div>
              <div className="text-sm font-mono font-bold text-[#333333]">141210000001234</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#666666] mb-1">执业年限</div>
              <div className="text-sm font-bold text-[#333333]">5 年</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
