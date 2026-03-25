import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, Mic, MicOff } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function HeritageChat() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好啊！我是名老中医传承学习助手。咱们可以像唠家常一样，您跟我说说患者的体质特点和症状表现，我来帮您分析分析，看看名老中医们是怎么辨证施治的。",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setInputValue(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (e) {
          console.error("Failed to start recording:", e);
        }
      } else {
        alert("您的浏览器不支持语音识别功能。");
      }
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "根据您描述的症状，结合历代名老中医的经验，这属于典型的“肝郁脾虚”证。名老中医通常会采用“疏肝健脾”的治法。推荐参考《景岳全书》中的柴胡疏肝散加减。建议在日常调理中注意保持心情舒畅，饮食宜清淡。",
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 2500);
  };

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
        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex mb-4", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                msg.role === "user"
                  ? "rounded-br-sm bg-[#2D5A4A] text-white"
                  : "rounded-tl-sm bg-white/90 border border-[#B8D8C8]/40 text-[#333333] backdrop-blur-sm"
              )}
            >
              <div className="text-[15px] leading-relaxed tracking-wide text-justify whitespace-pre-line">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Examples */}
        {messages.length === 1 && (
          <div className="mt-6 mb-4">
            <div className="flex items-center gap-2 mb-3 text-[#8B6E58]">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">您可以向我请教以下问题：</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                "蒲辅周老先生治疗乙型脑炎的经验是什么？",
                "刘渡舟教授是如何运用柴胡剂的？",
                "请分析一下施今墨老中医的“对药”思想在糖尿病治疗中的应用。"
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(example)}
                  className="text-left p-3 rounded-xl bg-white/60 border border-[#B8D8C8]/30 hover:bg-[#E8F5F0]/80 transition-colors text-sm text-[#666666] leading-relaxed shadow-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thinking Animation */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white/90 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-[#666666]">AI 正在查阅名医经验...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#B8D8C8]/40 p-3 pb-safe shadow-sm z-50">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            onClick={toggleRecording}
            className={cn(
              "p-2 rounded-full transition-colors flex-shrink-0",
              isRecording ? "text-red-500 bg-red-50 animate-pulse" : "text-[#2D5A4A] hover:bg-[#E8F5F0]"
            )}
            title="语音输入"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <div className="flex-1 bg-[#F8F9F5] rounded-full px-4 py-2.5 border border-[#EAEAEA] focus-within:ring-1 focus-within:ring-[#B8D8C8] transition-shadow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入您想请教的问题..."
              className="w-full bg-transparent border-none outline-none text-[15px] text-[#333333] placeholder:text-[#999999] font-sans"
              disabled={isLoading}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#2D5A4A] flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform shrink-0 hover:bg-[#3A705C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
