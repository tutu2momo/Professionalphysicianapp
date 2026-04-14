import { ArrowLeft, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HelpFeedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">帮助与反馈</h1>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* FAQ Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-[#2D5A4A]" />
            <h2 className="text-sm font-bold text-[#333333]">常见问题</h2>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-[#B8D8C8]/40 overflow-hidden">
            <div className="p-4 border-b border-[#B8D8C8]/20 flex justify-between items-center">
              <span className="text-sm text-[#333333]">如何添加新的诊疗记录？</span>
              <ChevronDown className="w-4 h-4 text-[#999999]" />
            </div>
            <div className="p-4 border-b border-[#B8D8C8]/20 flex justify-between items-center">
              <span className="text-sm text-[#333333]">传承评分是如何计算的？</span>
              <ChevronDown className="w-4 h-4 text-[#999999]" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-[#333333]">如何导出我的笔记？</span>
              <ChevronDown className="w-4 h-4 text-[#999999]" />
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[#2D5A4A]" />
            <h2 className="text-sm font-bold text-[#333333]">意见反馈</h2>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
            <textarea 
              className="w-full bg-[#F8F9F5] border border-[#B8D8C8]/30 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A4A]/30 resize-none h-32 mb-3"
              placeholder="请详细描述您遇到的问题或建议..."
            />
            <button className="w-full bg-[#2D5A4A] text-white rounded-xl py-3 text-sm font-bold active:scale-95 transition-transform shadow-md">
              提交反馈
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
