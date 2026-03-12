import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Info, Sparkles } from "lucide-react";
import { GoogleGenAI, Chat } from "@google/genai";
import { cn } from "@/src/lib/utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickReplies = [
  "畏寒肢冷", "食欲不振", "失眠多梦", "舌淡苔白", "脉沉细", "头晕耳鸣", "心悸气短", "大便溏薄"
];

export default function Diagnosis() {
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
    chatRef.current = ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: "你是一个经验丰富的老中医。请根据用户提供的症状、舌象、脉象等信息，进行中医辨证分析。请给出：1. 证型 2. 治法 3. 推荐方剂及加减 4. 调护建议。请使用专业的中医术语，但解释要清晰易懂。语气要温和、专业。",
      },
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f1eb] to-[#ebe6dd] pb-28">
      <div className="px-4 py-4 flex items-center gap-3 bg-gradient-to-br from-[#8b7355]/95 to-[#6b5d4f]/98 border-b border-[#8b7355]/30 shadow-[0_2px_12px_rgba(44,36,22,0.15)] sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-[#f5f1eb] flex items-center justify-center">
          <Bot className="w-6 h-6 text-[#8b7355]" />
        </div>
        <div>
          <h1 className="text-base font-serif text-[#f5f1eb] font-medium tracking-wide">智能辨证助手</h1>
          <p className="text-xs font-serif text-[#f5f1eb]/80 tracking-wide">AI辅助中医诊断分析</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-[#4a6fa5]/10 border border-[#4a6fa5]/20 rounded-xl p-3 flex items-start gap-2 mb-4">
          <Info className="w-4 h-4 text-[#4a6fa5] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#4a6fa5] leading-relaxed">
            免责声明：本系统的分析结果仅供临床医生参考，不能替代专业医疗诊断。请结合患者实际情况进行辨证论治。
          </p>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(44,36,22,0.1)]",
                msg.role === "user"
                  ? "rounded-br-sm bg-gradient-to-br from-[#4a6fa5]/90 to-[#4a6fa5]/95 border border-[#4a6fa5]/30 text-[#f5f1eb]"
                  : "rounded-bl-sm bg-white/90 border border-[#8b7355]/20 text-[#2c2416]"
              )}
            >
              <div className="text-sm leading-relaxed whitespace-pre-line font-serif tracking-wide">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white/90 border border-[#8b7355]/20 shadow-[0_2px_8px_rgba(44,36,22,0.1)]">
              <Loader2 className="w-5 h-5 text-[#8b7355] animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white/95 border-t border-[#8b7355]/20 shadow-[0_-2px_12px_rgba(44,36,22,0.08)] z-20 flex flex-col">
        <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none border-b border-[#8b7355]/10">
          <div className="flex items-center gap-1 text-[#8b7355] text-xs font-medium mr-1 flex-shrink-0">
            <Sparkles className="w-3 h-3" />
            快捷输入:
          </div>
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#f5f1eb] border border-[#8b7355]/20 text-xs text-[#6b5d4f] hover:bg-[#8b7355]/10 transition-colors"
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
            className="flex-1 px-4 py-3 rounded-full text-sm border-none outline-none bg-[#f5f1eb]/80 font-serif text-[#2c2416] tracking-wide placeholder:text-[#9b8b7e]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#4a6fa5]/90 to-[#4a6fa5]/95 border border-[#4a6fa5]/30 shadow-[0_2px_8px_rgba(74,111,165,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-5 h-5 text-[#f5f1eb] ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
