import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

export default function HeritageChat() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F5] font-sans h-full relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 shadow-sm shrink-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform shrink-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B8D8C8]/40 shrink-0 bg-[#E8F5F0]">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" 
            alt="Doctor Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-[#333333] font-bold text-[15px] tracking-wide leading-tight mb-0.5">名老中医传承学习</h1>
          <span className="text-[#666666] text-[11px] tracking-wider leading-tight">AI智能辨证分析</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto pb-20 scrollbar-none relative z-10">
        {/* AI Message Bubble */}
        <div className="flex mb-4">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%] border border-[#B8D8C8]/40">
            <p className="text-[#333333] text-[15px] leading-relaxed tracking-wide text-justify">
              您好啊！我是名老中医传承学习助手。咱们可以像唠家常一样，您跟我说说患者的体质特点和症状表现，我来帮您分析分析，看看名老中医们是怎么辨证施治的。
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#B8D8C8]/40 p-3 pb-safe shadow-sm z-50">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex-1 bg-[#F8F9F5] rounded-full px-4 py-2.5 border border-[#EAEAEA] focus-within:ring-1 focus-within:ring-[#B8D8C8] transition-shadow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入患者体质和症状..."
              className="w-full bg-transparent border-none outline-none text-[15px] text-[#333333] placeholder:text-[#999999] font-sans"
            />
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-[#2D5A4A] flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform shrink-0 hover:bg-[#3A705C]"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
