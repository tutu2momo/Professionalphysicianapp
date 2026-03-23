import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Info, Sparkles, ChevronLeft } from "lucide-react";
import { GoogleGenAI, Chat } from "@google/genai";
import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router-dom";

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("GoogleGenAI initialization skipped: API Key missing or invalid.");
}

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickReplies = [
  "畏寒肢冷", "食欲不振", "失眠多梦", "舌淡苔白", "脉沉细", "头晕耳鸣", "心悸气短", "大便溏薄"
];

export default function Diagnosis() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好，我是AI中医辅助诊疗助手。请详细描述患者的症状、舌象、脉象以及其他相关信息，我将为您提供辨证分析参考。",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!ai) return;
    try {
      chatRef.current = ai.chats.create({
        model: "gemini-3-pro-preview",
        config: {
          systemInstruction: "你是一个经验丰富的老中医。请根据用户提供的症状、舌象、脉象等信息，进行中医辨证分析。请给出：1. 证型 2. 治法 3. 推荐方剂及加减 4. 调护建议。请使用专业的中医术语，但解释要清晰易懂。语气要温和、专业。",
        },
      });
    } catch (e) {
      console.error("Failed to create chat:", e);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    if (!chatRef.current) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "抱歉，系统未配置有效的 API Key，无法连接到 AI 服务。如果您在 GitHub Pages 上预览，请在本地环境运行并配置 GEMINI_API_KEY。",
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg.content });
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text || "抱歉，我无法给出分析，请稍后再试。",
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "抱歉，系统遇到了一些问题，请检查网络或稍后再试。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput((prev) => prev + (prev && !prev.endsWith("，") && !prev.endsWith("。") ? "，" : "") + reply);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5] pb-28 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#E8F5F0] flex items-center justify-center border border-[#B8D8C8]/30">
          <Bot className="w-6 h-6 text-[#2D5A4A]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-[#333333] tracking-wide">智能辨证助手</h1>
          <p className="text-xs text-[#666666] tracking-wide">AI辅助中医诊断分析</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        {/* Disclaimer */}
        <div className="bg-[#E8F5F0]/50 border border-[#B8D8C8]/40 rounded-xl p-3 flex items-start gap-2 mb-4 backdrop-blur-sm">
          <Info className="w-4 h-4 text-[#2D5A4A] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#2D5A4A]/80 leading-relaxed">
            免责声明：本系统的分析结果仅供临床医生参考，不能替代专业医疗诊断。请结合患者实际情况进行辨证论治。
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                msg.role === "user"
                  ? "rounded-br-sm bg-[#2D5A4A] text-white"
                  : "rounded-bl-sm bg-white/90 border border-[#B8D8C8]/40 text-[#333333] backdrop-blur-sm"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line tracking-wide">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white/90 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-sm">
              <Loader2 className="w-5 h-5 text-[#2D5A4A] animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#B8D8C8]/40 z-20 flex flex-col pb-safe">
        <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none border-b border-[#EAEAEA]">
          <div className="flex items-center gap-1 text-[#8B6E58] text-xs font-medium mr-1 flex-shrink-0">
            <Sparkles className="w-3 h-3" />
            快捷输入:
          </div>
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#E8F5F0] border border-[#B8D8C8]/30 text-xs text-[#2D5A4A] hover:bg-[#B8D8C8]/20 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
        <div className="px-4 py-3 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入患者体质、症状、舌脉象..."
            className="flex-1 px-4 py-3 rounded-full text-sm border-none outline-none bg-[#F8F9F5] text-[#333333] tracking-wide placeholder:text-[#999999] focus:ring-1 focus:ring-[#B8D8C8]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#2D5A4A] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-95"
          >
            <Send className="w-5 h-5 text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
