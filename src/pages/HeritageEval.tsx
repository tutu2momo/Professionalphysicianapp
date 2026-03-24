import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, ChevronDown, Bot, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
  thinkingSteps?: string[];
  isThinkingExpanded?: boolean;
  score?: number;
};

export default function HeritageEval() {
  const navigate = useNavigate();
  const location = useLocation();
  const caseData = location.state?.case;
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const initialPatientInfo = caseData 
    ? `患者信息：${caseData.summary.split('\n')[0]}` 
    : "患者男，40岁，岭南高管，夏季就诊。烧心胀满，舌黄厚腻，脉弦滑数。";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `欢迎进入传承评价模式。请您根据以下患者基本信息，给出您的辨证思路、治法和方药：\n\n${initialPatientInfo}`,
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleThinking = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isThinkingExpanded: !m.isThinkingExpanded } : m));
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: "assistant",
      content: "",
      isThinking: true,
      thinkingSteps: [],
      isThinkingExpanded: true
    }]);

    const steps = caseData ? [
      `【第一步：提取用户辨证要点】\n用户提到：${inputValue.substring(0, 30)}...`,
      `【第二步：提取名老中医辨证要点】\n名老中医思路：${caseData.syndrome}。\n治法：${caseData.summary.match(/【治法】(.*?)\n/)?.[1] || "暂无"}\n方药：${caseData.tags[1]}。`,
      `【第三步：思维链路比对】\n1. 病机比对：用户辨证与名医（${caseData.doctor}）的“${caseData.syndrome}”进行比对。\n2. 治法比对：比对用户治法与名医治法。\n3. 方药比对：比对用户方药与名医选方（${caseData.tags[1]}）。`,
      "【第四步：综合评分与建议生成】\n辨证准确度：80%\n治法契合度：75%\n方药相似度：85%\n综合评分：80分"
    ] : [
      "【第一步：提取用户辨证要点】\n用户提到：湿热中阻，半夏泻心汤。",
      "【第二步：提取名老中医辨证要点】\n名老中医思路：夏季+岭南+高管压力 → 暑湿+肝郁；舌黄厚腻+脉弦滑数+烧心胀满 → 湿热中阻+肝胃不和。\n治法：辛开苦降，疏肝和胃，清热化湿。\n方药：半夏泻心汤合四逆散加减。",
      "【第三步：思维链路比对】\n1. 病机比对：用户抓住了“湿热中阻”，但遗漏了“肝胃不和”（脉弦、高管压力）。\n2. 治法比对：用户未明确提出治法，但方药提示了辛开苦降。\n3. 方药比对：用户选用了半夏泻心汤，方向正确，但未合用四逆散以疏肝理气。",
      "【第四步：综合评分与建议生成】\n辨证准确度：70%\n治法契合度：60%\n方药相似度：75%\n综合评分：85分"
    ];

    const finalContent = caseData ? 
      `【评价结果】\n您的辨证思路具有一定的合理性。名老中医（${caseData.doctor}）的最终辨证为“${caseData.syndrome}”，选方为“${caseData.tags[1]}”。\n\n【名医点拨】\n${caseData.summary.split('\n\n')[1] || ""}\n\n继续努力！中医辨证需要四诊合参，整体审察。` :
      "【评价结果】\n您的辨证大方向是正确的，抓住了“湿热中阻”的核心病机，选用的半夏泻心汤也非常对症。\n\n【名医点拨】\n名老中医在诊疗时，除了关注“舌黄厚腻”的湿热象，还特别注意到了患者“岭南高管、夏季就诊”的时空背景，以及“脉弦”的体征，从而敏锐地捕捉到了“肝胃不和”的兼夹证。因此，名老中医在半夏泻心汤的基础上，合用了四逆散来疏肝理气。\n\n继续努力！中医辨证需要四诊合参，整体审察。";

    const finalScore = caseData ? 80 : 85;

    let currentStep = 0;
    const intervalTime = Math.max(500, Math.floor(6000 / steps.length));
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const stepToAdd = steps[currentStep];
        setMessages((prev) => prev.map(msg => {
          if (msg.id === assistantId) {
            return {
              ...msg,
              thinkingSteps: [...(msg.thinkingSteps || []), stepToAdd]
            };
          }
          return msg;
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setMessages((prev) => prev.map(msg => {
            if (msg.id === assistantId) {
              return {
                ...msg,
                content: finalContent,
                isThinking: false,
                score: finalScore
              };
            }
            return msg;
          }));
          setIsLoading(false);
        }, 500);
      }
    }, intervalTime);
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
        
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B8D8C8]/40 shrink-0 bg-[#E8F5F0] flex items-center justify-center">
          <Bot className="w-6 h-6 text-[#2D5A4A]" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-[#333333] font-bold text-[15px] tracking-wide leading-tight mb-0.5">传承评价</h1>
          <span className="text-[#666666] text-[11px] tracking-wider leading-tight">模拟诊疗与思维比对</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto pb-20 scrollbar-none relative z-10">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex mb-6", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("flex gap-3 max-w-[85%]", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[#E8F5F0] border border-[#B8D8C8]/30">
                {msg.role === "user" ? <User className="w-5 h-5 text-[#2D5A4A]" /> : <Bot className="w-5 h-5 text-[#2D5A4A]" />}
              </div>
              
              <div className="flex flex-col gap-2">
                {/* Thinking Process */}
                {(msg.thinkingSteps && msg.thinkingSteps.length > 0) && (
                  <div className="bg-white/60 backdrop-blur-sm border border-[#B8D8C8]/30 rounded-2xl p-3 shadow-sm">
                    <button 
                      onClick={() => toggleThinking(msg.id)}
                      className="flex items-center gap-2 text-[#8B6E58] mb-2 w-full"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold">{msg.isThinking ? "思维链路比对中..." : "名医思维比对路径"}</span>
                      <ChevronDown className={cn("w-4 h-4 ml-auto transition-transform", msg.isThinkingExpanded ? "rotate-180" : "")} />
                    </button>
                    
                    {msg.isThinkingExpanded && (
                      <div className="space-y-2 mt-3">
                        {msg.thinkingSteps.map((step, idx) => {
                          const isTitle = step.startsWith("【");
                          const titleMatch = step.match(/^【(.*?)】/);
                          const title = titleMatch ? titleMatch[1] : "";
                          const content = step.replace(/^【.*?】\n?/, "");
                          
                          return (
                            <div key={idx} className="text-[13px] text-[#666666] leading-relaxed bg-white/50 p-2 rounded-lg border border-[#B8D8C8]/20">
                              {isTitle && <div className="font-bold text-[#2D5A4A] mb-1">{title}</div>}
                              <div className="whitespace-pre-line font-mono text-xs">{content}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Main Content */}
                {msg.content && (
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-[#2D5A4A] text-white"
                        : "rounded-tl-sm bg-white/90 border border-[#B8D8C8]/40 text-[#333333] backdrop-blur-sm"
                    )}
                  >
                    {msg.score !== undefined && (
                      <div className="mb-4 flex flex-col items-center justify-center py-4 border-b border-[#B8D8C8]/30">
                        <div className="text-xs text-[#8B6E58] mb-1 font-bold tracking-wider">综合评分</div>
                        <div className="text-4xl font-serif text-[#2D5A4A] flex items-baseline gap-1">
                          {msg.score}<span className="text-sm text-[#666666]">分</span>
                        </div>
                      </div>
                    )}
                    <div className="text-[15px] leading-relaxed tracking-wide text-justify whitespace-pre-line">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Examples */}
        {messages.length === 1 && (
          <div className="mt-6 mb-4 ml-11">
            <div className="flex items-center gap-2 mb-3 text-[#8B6E58]">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">您可以这样回答：</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {(caseData ? [
                `我认为是${caseData.syndrome}，应该用${caseData.tags[1]}。`,
                "患者症状比较复杂，可能是脾胃虚弱兼有湿热，建议用平胃散加减。",
                `辨证为${caseData.syndrome}。治法：${caseData.summary.match(/【治法】(.*?)\n/)?.[1] || "对症治疗"}。方用${caseData.tags[1]}。`
              ] : [
                "我认为是湿热中阻，应该用半夏泻心汤。",
                "患者舌黄厚腻，脉弦滑数，应该是肝胆湿热，建议用龙胆泻肝汤。",
                "辨证为湿热中阻兼肝胃不和。治法：辛开苦降，疏肝和胃。方用半夏泻心汤合四逆散。"
              ]).map((example, idx) => (
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
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-[#B8D8C8]/40 p-3 pb-safe shadow-sm z-50">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex-1 bg-[#F8F9F5] rounded-full px-4 py-2.5 border border-[#EAEAEA] focus-within:ring-1 focus-within:ring-[#B8D8C8] transition-shadow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="输入您的辨证思路和处方..."
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
