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
      <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-[#ebe6dd] pb-24">
        <div className="px-4 py-4 flex items-center gap-3 bg-gradient-to-br from-[#8b7355]/95 to-[#6b5d4f]/98 border-b border-[#8b7355]/30 shadow-[0_2px_12px_rgba(44,36,22,0.15)] sticky top-0 z-10">
          <button 
            onClick={() => setSelectedCase(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-[#f5f1eb]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-serif text-[#f5f1eb] font-medium tracking-wide flex-1">医案详情</h1>
        </div>

        <div className="px-4 py-6 space-y-4">
          <div className="rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#8b7355]/85 to-[#6b5d4f]/90 border border-[#8b7355]/30 shadow-[0_6px_20px_rgba(44,36,22,0.15)]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop')] bg-cover mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs bg-white/25 text-[#f5f1eb] font-serif tracking-wide">
                  {selectedCase.doctor}
                </div>
                <div className="px-3 py-1 rounded-full text-xs bg-white/20 text-[#f5f1eb] font-serif tracking-wide">
                  {selectedCase.date}
                </div>
              </div>
              <h2 className="text-lg mb-3 font-serif text-[#f5f1eb] font-medium tracking-wide">
                {selectedCase.title}
              </h2>
              <div className="px-3 py-1 rounded-full inline-block text-xs mb-3 bg-[#4a6fa5]/30 text-[#f5f1eb] font-serif tracking-wide">
                {selectedCase.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCase.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/15 text-[#f5f1eb]/90 font-serif tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white/90 border border-[#8b7355]/20 shadow-[0_3px_12px_rgba(44,36,22,0.08)]">
            <h3 className="text-sm mb-3 font-serif text-[#6b5d4f] font-medium tracking-wide">医案摘要与分析</h3>
            <p className="text-sm leading-relaxed font-serif text-[#2c2416] tracking-wide whitespace-pre-line">
              {selectedCase.summary}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-gradient-to-br from-[#4a6fa5]/10 to-[#4a6fa5]/15 border border-[#4a6fa5]/20 shadow-[0_2px_8px_rgba(74,111,165,0.1)]">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-[#4a6fa5]" />
              <h3 className="text-sm font-serif text-[#4a6fa5] font-medium tracking-wide">名医思想传承</h3>
            </div>
            <p className="text-xs leading-relaxed font-serif text-[#2c2416] tracking-wide">
              本医案辨证思想来源于名老中医临床经验总结，体现了中医独特的学术思想和诊疗特色，强调辨证求因，审因论治。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-[#ebe6dd] pt-12 px-4 pb-24">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-xl text-[#2c2416] font-medium tracking-wide mb-2">名医经验库</h1>
          <p className="text-xs text-[#6b5d4f] tracking-wider">医案分析与范例检索</p>
        </div>

        <div 
          onClick={() => navigate('/diagnosis')}
          className="rounded-2xl p-5 mb-6 relative overflow-hidden bg-gradient-to-br from-[#4a6fa5]/90 to-[#3a5a85]/95 border border-[#4a6fa5]/30 shadow-lg cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#f5f1eb]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base text-[#f5f1eb] font-medium mb-1 tracking-wide">AI智能学习</h3>
              <p className="text-xs text-[#f5f1eb]/80 tracking-wide">输入体质症状，学习名医诊疗思路</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#f5f1eb]/70" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="mb-6">
          <div className="rounded-full px-4 py-3 flex items-center gap-3 bg-white/90 border border-[#8b7355]/20 shadow-[0_2px_8px_rgba(44,36,22,0.08)]">
            <Search className="w-5 h-5 text-[#6b5d4f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索医案、名医、证型..."
              className="flex-1 text-sm border-none outline-none bg-transparent font-serif text-[#2c2416] placeholder:text-[#9b8b7e]"
            />
          </div>
        </div>

        <div className="space-y-3">
          {cases.filter(c => c.title.includes(searchQuery) || c.doctor.includes(searchQuery) || c.syndrome.includes(searchQuery)).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="rounded-2xl p-4 bg-white/90 border border-[#8b7355]/20 shadow-[0_3px_12px_rgba(44,36,22,0.08)] active:scale-95 transition-transform cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#2c2416] mb-1 tracking-wide">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#6b5d4f] mb-2">
                    <UserCircle className="w-3 h-3" />
                    <span>{item.doctor} · {item.date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9b8b7e] flex-shrink-0 mt-1" />
              </div>
              <div className="px-3 py-1 rounded-full inline-block text-[10px] bg-[#4a6fa5]/15 text-[#4a6fa5] mb-2 tracking-wider">
                {item.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-[10px] bg-[#8b7355]/10 text-[#6b5d4f] tracking-wider"
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
