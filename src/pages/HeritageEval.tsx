import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, ChevronDown, Bot, User, Mic, MicOff, ArrowRight, BookOpen, Library, X } from "lucide-react";
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
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const [excerptModal, setExcerptModal] = useState<{isOpen: boolean, book: string, title: string, content: string}>({
    isOpen: false,
    book: '',
    title: '',
    content: ''
  });

  const getPatientInfo = () => {
    if (caseData) {
      if (caseData.summary.includes('【患者基本信息】')) {
        const match = caseData.summary.match(/([\s\S]*?)【辨证】/);
        if (match) return match[1].trim();
      }
      const parts = caseData.summary.split('\n');
      const basicInfo = parts[0];
      // Extract everything before 【治法】 or 【名医点拨】 as four diagnostic info
      let fourDiag = parts.length > 1 ? parts[1] : "暂无详细四诊信息";
      if (fourDiag.startsWith("【")) fourDiag = basicInfo; // fallback
      return `【患者基本信息】\n${basicInfo}\n\n【既往病史】\n平素体质特征及既往相关病史（请根据基本信息推断）。\n\n【四诊信息】\n${fourDiag}`;
    }
    return "【患者基本信息】\n患者男，45岁，企业高管，秋季就诊。\n\n【既往病史】\n平素工作压力极大，常有应酬，嗜食肥甘厚味及饮酒。既往有“脂肪肝”、“高脂血症”病史3年。近半年来反复出现胃脘胀满，未系统治疗。\n\n【四诊信息】\n主诉：入睡困难伴多梦易醒2个月。\n现病史：近2个月来，每晚需辗转1-2小时方能入睡，且睡中多梦，易惊醒，醒后难以复睡。伴见心烦意乱，胸闷脘痞，口苦泛恶，头重如裹，大便黏滞不爽。查体：形体偏胖，面垢油光。舌质红，苔黄腻而厚，脉滑数。";
  };

  const initialPatientInfo = getPatientInfo();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `欢迎进入传承评价模式。请您仔细阅读以下患者信息，并从以下四个维度给出您的完整诊疗方案：\n1. 病史分析\n2. 四诊询问落脚点\n3. 诊疗详情（辨证、治法、方药）\n4. 疾病养护建议\n\n${initialPatientInfo}`,
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
      `【第一步：整体审察】\n患者基本情况与时空背景分析 → 锁定体质与发病诱因`,
      `【第二步：四诊合参，抓主症】\n结合舌脉与主诉 → 明确核心病理要素`,
      `【第三步：病机层次化】\n病位与病性分析 → 确立“${caseData.syndrome}”之核心病机`,
      `【第四步：方证相应 (理法方药)】\n治法：${caseData.summary.match(/【治法】(.*?)\n/)?.[1] || "对症治疗"}\n选方：${caseData.tags[1]} → 随症加减，精准施治`,
      `【第五步：提取用户诊疗方案】\n提取用户的病史分析、四诊落脚点、诊疗详情及养护建议。`,
      `【第六步：多维度思维比对】\n1. 病史与四诊比对：评估用户是否抓住了名医关注的核心病机与体征。\n2. 诊疗详情比对：对比辨证准确度、治法契合度及方药相似度。\n3. 养护建议比对：评估生活调摄建议的全面性与针对性。`,
      "【第七步：综合评分与建议生成】\n病史与四诊分析：85%\n诊疗详情契合度：80%\n养护建议完善度：90%\n综合评分：85分"
    ] : [
      "【第一步：整体审察】\n│\n├─ 天时：秋季（燥气当令，易伤阴津）\n├─ 地理：城市（快节奏）\n└─ 人：45岁男性，高管（压力大，应酬多）→ 脾胃受损，气机郁滞",
      "【第二步：四诊合参，抓主症】\n│\n├─ 望诊：形体偏胖，面垢油光，舌红苔黄腻厚 → 痰热内蕴之象\n├─ 问诊核心：入睡困难，多梦易醒（神不守舍）；胸闷脘痞，口苦泛恶（胃气不和）\n└─ 切诊：脉滑数 → 滑主痰湿，数主热 → 脉症合参，属痰热内扰",
      "【第三步：病机层次化】\n│\n├─ 病性：痰热为标，脾胃虚弱为本\n├─ 病位：胃（主受纳腐熟）、心（主神明）\n├─ 病势：脾失健运 → 聚湿生痰 → 郁久化热 → 痰热上扰心神\n└─ 病机关键词：痰热内扰，胃气不和",
      "【第四步：方证相应 (理法方药)】\n│\n├─ 治法：清热化痰，和胃安神\n├─ 选方：黄连温胆汤加减\n└─ 加减化裁：\n    ├─ 痰热重 → 重用黄连清心胃之火\n    └─ 神志不宁 → 加生龙骨、生牡蛎重镇安神",
      "【第五步：提取用户诊疗方案】\n提取用户的病史分析、四诊落脚点、诊疗详情及养护建议。",
      "【第六步：多维度思维比对】\n1. 病史与四诊比对：用户关注了痰热，但对“胃脘胀满”导致的胃气不和分析不足。\n2. 诊疗详情比对：辨证大方向正确，方药选用了温胆汤类，但遗漏了清热之黄连及重镇安神之品。\n3. 养护建议比对：用户给出了饮食建议，但缺乏针对失眠的作息及运动调护建议。",
      "【第七步：综合评分与建议生成】\n病史与四诊分析：80%\n诊疗详情契合度：85%\n养护建议完善度：75%\n综合评分：82分"
    ];

    const doctorTipMatch = caseData?.summary.match(/【名医点拨】\n?([\s\S]*)$/);
    const doctorTip = doctorTipMatch ? doctorTipMatch[1].trim() : "中医辨证需四诊合参，注重整体观念与辨证论治的结合。";

    const finalContent = caseData ? 
      `【评价结果】\n您的整体诊疗思路具有较好的临床参考价值。在病史分析和四诊落脚点上，基本契合名老中医（${caseData.doctor}）的思路。辨证为“${caseData.syndrome}”，选方“${caseData.tags[1]}”方向正确。\n\n【名医点拨】\n${doctorTip}\n\n【养护建议补充】\n在您给出的养护建议基础上，名医通常还会强调针对该证型的特定情志疏导或顺时养生建议。继续努力！` :
      "【评价结果】\n您的辨证大方向是正确的，抓住了“痰热内扰”的核心病机，选用的温胆汤类方剂也非常对症。但在病史分析和四诊落脚点上，对“胃不和则卧不安”的挖掘不够深入。\n\n【名医点拨】\n名老中医在诊疗时，除了关注“舌黄厚腻”的痰热象，还特别注意到了患者“嗜食肥甘厚味、胃脘胀满”的病史，从而敏锐地捕捉到了“胃气不和”的兼夹证。因此，在温胆汤的基础上，重用黄连清热，并加生龙骨、生牡蛎重镇安神，切忌单纯使用滋阴安神之品以免敛邪留痰。\n\n【养护建议补充】\n除了饮食清淡外，针对此类患者，睡前避免思考工作（调神）和傍晚适度运动（助运化痰）同样是治疗的关键一环。继续努力！";

    const finalScore = caseData ? 85 : 82;

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
                  <div className="bg-[#F8F9F5] rounded-xl border border-[#EAEAEA] overflow-hidden shadow-sm">
                    <button 
                      onClick={() => toggleThinking(msg.id)}
                      className="w-full flex items-center justify-between p-3 bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-[#8B6E58]">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold">{msg.isThinking ? "名老中医深度思考与比对中..." : "名医思维链及多维度比对"}</span>
                      </div>
                      <ChevronDown className={cn("w-4 h-4 text-[#8B6E58] transition-transform", msg.isThinkingExpanded ? "rotate-180" : "")} />
                    </button>
                    
                    {msg.isThinkingExpanded && (
                      <div className="p-3 pt-1">
                        <div className="relative border-l-2 border-[#B8D8C8]/40 ml-2 pl-4 space-y-4 py-2">
                          {msg.thinkingSteps.map((step, idx) => {
                            if (!step) return null;
                            
                            const titleMatch = step.match(/^【(.*?)】/);
                            if (titleMatch) {
                              const title = titleMatch[1];
                              const content = step.replace(/^【.*?】\n?/, '');
                              
                              if (!content.includes('\n') && content.includes('→')) {
                                const parts = content.split('→');
                                return (
                                  <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A4A] ring-4 ring-[#F8F9F5]" />
                                    <div className="bg-white rounded-lg p-2.5 shadow-sm border border-[#EAEAEA]">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{title}</span>
                                        <span className="text-xs text-[#666666] font-medium">{parts[0].trim()}</span>
                                      </div>
                                      <div className="flex items-start gap-1.5 mt-1.5 pt-1.5 border-t border-dashed border-[#EAEAEA]">
                                        <ArrowRight className="w-3.5 h-3.5 text-[#2D5A4A] mt-0.5 flex-shrink-0" />
                                        <span className="text-xs font-bold text-[#2D5A4A]">{parts[1].trim()}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A4A] ring-4 ring-[#F8F9F5]" />
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-[#EAEAEA]">
                                      <div className="mb-2">
                                        <span className="text-[10px] font-bold text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{title}</span>
                                      </div>
                                      <div className="text-xs text-[#666666] leading-relaxed whitespace-pre-wrap font-mono">
                                        {content}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            }

                            return (
                              <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#B8D8C8] ring-4 ring-[#F8F9F5]" />
                                <div className="text-xs text-[#666666] leading-relaxed whitespace-pre-wrap">{step}</div>
                              </div>
                            );
                          })}
                        </div>
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
                    <div className="text-[15px] leading-relaxed tracking-wide text-justify whitespace-pre-line mb-4">
                      {msg.content}
                    </div>

                    {msg.score !== undefined && (
                      <div className="bg-[#F8F9F5] rounded-xl p-4 border border-[#EAEAEA] mt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-[#8B6E58]" />
                          <h4 className="font-bold text-[#333333] text-sm">知识欠缺与学习建议</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3 border border-[#B8D8C8]/30">
                            <h5 className="font-bold text-[#2D5A4A] text-xs mb-1">胃气不和的辨证深度不足</h5>
                            <p className="text-xs text-[#666666] mb-3">建议加强对《脾胃论》中关于脾胃虚弱与湿热互结的理解，特别是温胆汤类方剂的加减应用。</p>
                            <button 
                              onClick={() => setExcerptModal({
                                isOpen: true,
                                book: "《脾胃论》",
                                title: "脾胃虚弱与湿热互结之机理",
                                content: "夫脾胃虚，则湿土之气溜于脐下，苦寒之药，正助其湿。…… 凡胃气不和，多由饮食不节，寒温失所，或劳倦伤脾。脾失健运，则水谷不化，聚湿生痰，郁久化热，而成湿热互结之候。治当以辛开苦降，和胃化湿，切忌纯用苦寒，以免更伤脾土。\n\n【名医解析】\n此段论述了脾胃虚弱后，水湿停聚化热的病理过程。在临床中，遇到舌苔黄厚腻但伴有脾胃虚弱症状（如脘腹胀满、食欲不振）的患者，不能仅见“热”而用大量苦寒清热之药（如黄芩、黄连），必须佐以辛温化湿、健脾和胃之品（如半夏、陈皮、生姜），即所谓“辛开苦降”。温胆汤正是体现了这一治疗思想的经典方剂。"
                              })}
                              className="w-full py-2 bg-[#E8F5F0] text-[#2D5A4A] text-xs font-bold rounded-md border border-[#B8D8C8]/30 flex items-center justify-center gap-1 hover:bg-[#D1E8DE] transition-colors"
                            >
                              <Library className="w-3.5 h-3.5" /> 点击阅读指导用书：《脾胃论》
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
                `【病史分析】患者既往可能有相关病史，体质偏弱。\n【四诊落脚点】重点关注舌脉变化及主诉症状。\n【诊疗详情】辨证为${caseData.syndrome}，治法：${caseData.summary.match(/【治法】(.*?)\n/)?.[1] || "对症治疗"}。方用${caseData.tags[1]}。\n【养护建议】饮食清淡，规律作息，避免劳累，定期复诊。`,
                `【病史分析】结合时令与地域特点，患者易受外邪侵袭。\n【四诊落脚点】舌象提示湿热/虚寒，脉象提示气血运行状态。\n【诊疗详情】考虑为${caseData.syndrome}的变证，建议使用${caseData.tags[1]}加减。\n【养护建议】注意保暖/防暑，适当运动，保持心情舒畅。`
              ] : [
                "【病史分析】患者平素嗜食肥甘，且有脂肪肝史，脾胃受损，易生痰湿。\n【四诊落脚点】失眠伴胸闷口苦，舌黄腻脉滑数，落脚于痰热扰心及胃失和降。\n【诊疗详情】辨证：痰热内扰，胃气不和。治法：清热化痰，和胃安神。方药：黄连温胆汤加减。\n【养护建议】饮食清淡忌酒腻；晚11点前入睡；傍晚适度运动助运化；7剂后复诊。",
                "【病史分析】既往高管压力大，近期失眠多梦，考虑心神失养或邪气内扰。\n【四诊落脚点】重点关注入睡困难及舌苔黄腻，判断为实证失眠。\n【诊疗详情】辨证：痰热扰心。治法：清热化痰安神。方药：温胆汤合酸枣仁汤加减。\n【养护建议】睡前泡脚，避免熬夜；少食多餐，忌食生冷；保持心情舒畅。"
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

      {/* Excerpt Modal */}
      {excerptModal.isOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#F8F9F5] w-full max-w-sm rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh] border border-[#B8D8C8]/40">
            <div className="px-4 py-3 bg-white border-b border-[#B8D8C8]/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4 text-[#2D5A4A]" />
                <h3 className="font-bold text-[#333333] text-sm">{excerptModal.book} 选段</h3>
              </div>
              <button 
                onClick={() => setExcerptModal({...excerptModal, isOpen: false})} 
                className="p-1 text-[#999999] hover:text-[#333333] transition-colors rounded-full hover:bg-[#F8F9F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto scrollbar-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center bg-fixed">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-[#B8D8C8]/30 shadow-sm">
                <h4 className="font-bold text-[#2D5A4A] mb-4 text-center text-[15px]">{excerptModal.title}</h4>
                <div className="text-[13px] text-[#333333] leading-loose text-justify whitespace-pre-line font-serif">
                  {excerptModal.content}
                </div>
              </div>
            </div>
            <div className="p-3 bg-white border-t border-[#B8D8C8]/40 shrink-0">
              <button 
                onClick={() => setExcerptModal({...excerptModal, isOpen: false})} 
                className="w-full py-2.5 bg-[#2D5A4A] text-white text-sm font-bold rounded-xl shadow-sm active:scale-95 transition-transform hover:bg-[#3A705C]"
              >
                我已了解
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
