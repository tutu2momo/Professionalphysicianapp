import { useState } from "react";
import { Search, BookOpen, UserCircle, ChevronRight, ArrowLeft, Medal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cases = [
  {
    id: 1,
    title: "脾胃虚寒型慢性胃炎医案",
    doctor: "李老中医",
    date: "2023-10-15",
    syndrome: "脾胃虚寒",
    tags: ["胃痛", "理中汤加减"],
    summary: "患者诉反复胃脘隐痛3年，加重1个月。痛势绵绵，喜温喜按，空腹痛甚，得食稍减。伴神疲乏力，四肢倦怠，手足不温，大便溏薄。舌淡胖，边有齿痕，苔白润，脉迟缓。\n\n【辨证】脾胃虚寒证。\n【治法】温中健脾，和胃止痛。\n【方药】理中汤加减（党参15g、白术15g、干姜10g、炙甘草6g、黄芪20g、桂枝10g、白芍15g、延胡索10g）。\n\n【二诊】服药7剂后，胃痛明显减轻，大便转实。效不更方，继服14剂，诸症悉平。"
  },
  {
    id: 2,
    title: "肝阳上亢型高血压医案",
    doctor: "张老中医",
    date: "2023-11-02",
    syndrome: "肝阳上亢",
    tags: ["眩晕", "天麻钩藤饮"],
    summary: "患者头晕目眩半年，加重伴头痛1周。平素性情急躁，遇烦心事则头晕加重。伴面红目赤，口苦咽干，失眠多梦。查血压 160/100 mmHg。舌红苔黄，脉弦数。\n\n【辨证】肝阳上亢证。\n【治法】平肝潜阳，清热安神。\n【方药】天麻钩藤饮加减（天麻10g、钩藤15g(后下)、石决明20g(先煎)、牛膝15g、杜仲15g、黄芩10g、栀子10g、益母草15g、桑寄生15g、夜交藤20g）。\n\n【二诊】服药10剂后，头晕头痛大减，血压降至 135/85 mmHg，睡眠改善。原方去黄芩、栀子，加枸杞子15g、菊花10g，继服巩固。"
  },
  {
    id: 3,
    title: "气阴两虚型失眠医案",
    doctor: "王老中医",
    date: "2023-12-20",
    syndrome: "气阴两虚",
    tags: ["不寐", "生脉散合酸枣仁汤"],
    summary: "患者失眠多梦2年，近1个月加重，彻夜难眠。伴心悸气短，神疲乏力，口干少津，五心烦热。舌红少苔，脉细数无力。\n\n【辨证】气阴两虚，心神失养。\n【治法】益气养阴，宁心安神。\n【方药】生脉散合酸枣仁汤加减（太子参20g、麦冬15g、五味子10g、酸枣仁30g(打碎)、知母10g、茯神15g、川芎10g、甘草6g、夜交藤30g、合欢皮15g）。\n\n【二诊】服药7剂后，夜间能入睡4-5小时，心悸气短减轻。效不更方，继服14剂，睡眠基本恢复正常。"
  },
];

export default function Heritage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);
  const navigate = useNavigate();

  if (selectedCase) {
    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
        <div className="relative z-10">
          <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
          <button 
            onClick={() => setSelectedCase(null)}
            className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold text-[#333333] tracking-wide flex-1">医案详情</h1>
        </div>

        <div className="px-4 py-6 space-y-4">
          <div className="rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#2D5A4A] to-[#3A705C] shadow-md">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000&auto=format&fit=crop')] bg-cover mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs bg-white/20 text-white tracking-wide backdrop-blur-sm">
                  {selectedCase.doctor}
                </div>
                <div className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 tracking-wide backdrop-blur-sm">
                  {selectedCase.date}
                </div>
              </div>
              <h2 className="text-lg mb-3 font-bold text-white tracking-wide">
                {selectedCase.title}
              </h2>
              <div className="px-3 py-1 rounded-full inline-block text-xs mb-3 bg-[#E8F5F0]/20 text-white tracking-wide backdrop-blur-sm border border-white/10">
                {selectedCase.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCase.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80 tracking-wide backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <h3 className="text-sm mb-3 font-bold text-[#2D5A4A] tracking-wide">医案摘要与分析</h3>
            <p className="text-sm leading-relaxed text-[#333333] tracking-wide whitespace-pre-line">
              {selectedCase.summary}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-[#E8F5F0]/50 backdrop-blur-md border border-[#B8D8C8]/30 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-[#8B6E58]" />
              <h3 className="text-sm font-bold text-[#8B6E58] tracking-wide">名医思想传承</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666] tracking-wide">
              本医案辨证思想来源于名老中医临床经验总结，体现了中医独特的学术思想和诊疗特色，强调辨证求因，审因论治。
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F5] pt-12 px-4 pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl text-[#2D5A4A] font-serif tracking-widest mb-2">名医经验库</h1>
          <p className="text-xs text-[#666666] tracking-wider">医案分析与范例检索</p>
        </div>

        <div 
          onClick={() => navigate('/heritage/chat')}
          className="rounded-2xl p-5 mb-6 relative overflow-hidden bg-gradient-to-r from-[#B8D8C8] to-[#9CBDB0] shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#2D5A4A]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base text-[#2D5A4A] font-bold mb-1 tracking-wide">AI智能学习</h3>
              <p className="text-xs text-[#2D5A4A]/80 tracking-wide">输入体质症状，学习名医诊疗思路</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#2D5A4A]/70" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        <div className="mb-6">
          <div className="rounded-full px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <Search className="w-5 h-5 text-[#2D5A4A]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索医案、名医、证型..."
              className="flex-1 text-sm border-none outline-none bg-transparent text-[#333333] placeholder:text-[#999999] tracking-wide"
            />
          </div>
        </div>

        <div className="space-y-3">
          {cases.filter(c => c.title.includes(searchQuery) || c.doctor.includes(searchQuery) || c.syndrome.includes(searchQuery)).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="rounded-2xl p-4 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-white/90"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#333333] mb-1 tracking-wide">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#8B6E58] mb-2">
                    <UserCircle className="w-3 h-3" />
                    <span>{item.doctor} · {item.date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B8D8C8] flex-shrink-0 mt-1" />
              </div>
              <div className="px-3 py-1 rounded-full inline-block text-[10px] bg-[#E8F5F0] text-[#2D5A4A] border border-[#B8D8C8]/30 mb-2 tracking-wider">
                {item.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-[10px] bg-[#F8F9F5] border border-[#EAEAEA] text-[#666666] tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
