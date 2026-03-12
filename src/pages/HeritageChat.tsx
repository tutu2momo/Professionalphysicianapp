import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

export default function HeritageChat() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-[#f3efe9] font-serif h-full relative">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-[#7a6652] shadow-sm shrink-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/40 text-white active:scale-95 transition-transform shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-white/10">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" 
            alt="Doctor Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-white font-medium text-[15px] tracking-wide leading-tight mb-0.5">名老中医传承学习</h1>
          <span className="text-white/80 text-[11px] tracking-wider leading-tight">AI智能辨证分析</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto pb-20 scrollbar-none">
        {/* AI Message Bubble */}
        <div className="flex mb-4">
          <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[85%] border border-[#e8e2d9]">
            <p className="text-[#2c2416] text-[15px] leading-relaxed tracking-wide text-justify">
              您好啊！我是名老中医传承学习助手。咱们可以像唠家常一样，您跟我说说患者的体质特点和症状表现，我来帮您分析分析，看看名老中医们是怎么辨证施治的。
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e8e2d9] p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex-1 bg-[#f3efe9] rounded-full px-4 py-2.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入患者体质和症状..."
              className="w-full bg-transparent border-none outline-none text-[15px] text-[#2c2416] placeholder:text-[#9b8b7e] font-serif"
            />
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-[#5c728a] flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
