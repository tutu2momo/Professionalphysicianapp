import { useState } from "react";
import { Search, Book, FlaskConical, Leaf, ArrowLeft, Info, Droplets, Activity, FileText } from "lucide-react";
import { cn } from "@/src/lib/utils";

const tabs = [
  { id: "all", name: "全部", icon: Book },
  { id: "classic", name: "经典", icon: Book },
  { id: "formula", name: "方剂", icon: FlaskConical },
  { id: "herb", name: "中药", icon: Leaf },
];

const classics = [
  {
    id: 1,
    title: "黄帝内经",
    subtitle: "素问·灵枢",
    dynasty: "战国",
    category: "医经",
    chapters: 162,
    description: "中医理论基础，阴阳五行、脏腑经络、病因病机",
  },
  {
    id: 2,
    title: "伤寒杂病论",
    subtitle: "伤寒论·金匮要略",
    dynasty: "东汉",
    category: "临床",
    chapters: 112,
    description: "辨证论治体系，六经辨证、方证对应",
  },
];

const formulas = [
  {
    id: 1,
    name: "桂枝汤",
    source: "《伤寒论》",
    category: "解表剂",
    composition: "桂枝（去皮）三两，芍药三两，甘草（炙）二两，生姜（切）三两，大枣（擘）十二枚",
    function: "解肌发表，调和营卫",
    indication: "外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱者。",
    usage: "上五味，咀三味，以水七升，微火煮取三升，去滓，适寒温，服一升。服已须臾，啜热稀粥一升余，以助药力。温覆令一时许，遍身漐漐微似有汗者益佳，不可令如水流漓，病必不除。",
    modern_application: "感冒、流行性感冒、原因不明的低热、产后及病后低热、妊娠恶阻、多形红斑、冻疮、荨麻疹等属营卫不和者。",
    analysis: "本方为治疗外感风寒表虚证之基础方，被后世誉为“群方之祖”。方中桂枝为君，解肌发表，散外感风寒；芍药为臣，敛阴和营，防止桂枝发汗太过。桂芍相配，一散一收，调和营卫。生姜辛温，助桂枝解表；大枣甘平，益气补中，合生姜以和胃气。炙甘草调和诸药。全方配伍，共奏解肌发表、调和营卫之功。"
  },
];

const herbs = [
  {
    id: 1,
    name: "人参",
    category: "补虚药",
    nature: "微温",
    flavor: "甘、微苦",
    meridian: "脾、肺、心",
    function: "大补元气，复脉固脱，补脾益肺，生津养血，安神益智",
  },
];

export default function Classics() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormula, setSelectedFormula] = useState<typeof formulas[0] | null>(null);

  if (selectedFormula) {
    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
        <div className="relative z-10">
          <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
          <button 
            onClick={() => setSelectedFormula(null)}
            className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold text-[#333333] tracking-wide flex-1">方剂详情</h1>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Header Card */}
          <div className="rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#2D5A4A] to-[#3A705C] shadow-md">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000&auto=format&fit=crop')] bg-cover mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs bg-white/20 text-white tracking-wide backdrop-blur-sm">
                  {selectedFormula.source}
                </div>
                <div className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 tracking-wide backdrop-blur-sm">
                  {selectedFormula.category}
                </div>
              </div>
              <h2 className="text-2xl mb-2 font-bold text-white tracking-wide">
                {selectedFormula.name}
              </h2>
              <p className="text-sm text-white/90 tracking-wide">
                {selectedFormula.function}
              </p>
            </div>
          </div>

          {/* Composition */}
          <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-[#2D5A4A]" />
              <h3 className="text-sm font-bold text-[#2D5A4A] tracking-wide">方剂组成</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#333333] tracking-wide">
              {selectedFormula.composition}
            </p>
          </div>

          {/* Indications & Usage */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-[#2D5A4A]" />
                <h3 className="text-sm font-bold text-[#2D5A4A] tracking-wide">主治证候</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#333333] tracking-wide">
                {selectedFormula.indication}
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-4 h-4 text-[#2D5A4A]" />
                <h3 className="text-sm font-bold text-[#2D5A4A] tracking-wide">用法用量</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#333333] tracking-wide text-justify">
                {selectedFormula.usage}
              </p>
            </div>
          </div>

          {/* Modern Application */}
          <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#2D5A4A]" />
              <h3 className="text-sm font-bold text-[#2D5A4A] tracking-wide">现代应用</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#333333] tracking-wide">
              {selectedFormula.modern_application}
            </p>
          </div>

          {/* Analysis */}
          <div className="rounded-2xl p-5 bg-[#E8F5F0]/50 backdrop-blur-md border border-[#B8D8C8]/30 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-[#8B6E58]" />
              <h3 className="text-sm font-bold text-[#8B6E58] tracking-wide">方义分析</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#666666] tracking-wide text-justify">
              {selectedFormula.analysis}
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
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 shadow-sm">
          <div className="px-5 py-4">
            <h1 className="text-[#2D5A4A] text-xl font-bold tracking-wide mb-3">古籍检索</h1>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索经典、方剂、中药..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm border-none bg-[#F8F9F5] text-[#333333] placeholder:text-[#999999] outline-none focus:ring-1 focus:ring-[#B8D8C8]"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                <Search className="text-[#2D5A4A]/60 w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs tracking-wider font-medium",
                  activeTab === tab.id
                    ? "bg-[#2D5A4A] text-white shadow-sm"
                    : "bg-white/60 text-[#666666] border border-[#B8D8C8]/30 hover:bg-white/90"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-32 space-y-6">
          {(activeTab === "all" || activeTab === "classic") && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 rounded-full mr-2 bg-[#2D5A4A]" />
                <h2 className="text-base text-[#333333] font-bold tracking-wide">中医经典</h2>
              </div>
              <div className="space-y-3">
                {classics.map((book) => (
                  <div
                    key={book.id}
                    className="rounded-2xl p-4 flex gap-4 relative overflow-hidden bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm"
                  >
                    <div className="flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base text-[#333333] font-bold mb-0.5 tracking-wide">{book.title}</h3>
                          <p className="text-xs text-[#8B6E58]">{book.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-xl text-[#2D5A4A] bg-[#E8F5F0] border border-[#B8D8C8]/30">{book.dynasty}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-xl text-[#2D5A4A] bg-[#E8F5F0] border border-[#B8D8C8]/30">{book.category}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-xl text-[#666666] bg-[#F8F9F5] border border-[#EAEAEA]">{book.chapters}篇</span>
                      </div>
                      <p className="text-xs text-[#666666] leading-relaxed">{book.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "formula") && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 rounded-full mr-2 bg-[#2D5A4A]" />
                <h2 className="text-base text-[#333333] font-bold tracking-wide">经典方剂</h2>
              </div>
              <div className="space-y-3">
                {formulas.map((formula) => (
                  <div
                    key={formula.id}
                    onClick={() => setSelectedFormula(formula)}
                    className="rounded-2xl p-4 relative overflow-hidden bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm cursor-pointer active:scale-95 transition-transform hover:bg-white/90"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base text-[#333333] font-bold tracking-wide">{formula.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-xl text-[#2D5A4A] bg-[#E8F5F0] border border-[#B8D8C8]/30">{formula.source}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs text-[#666666]">
                        <span className="text-[#8B6E58] font-medium">组成：</span>{formula.composition}
                      </div>
                      <div className="text-xs text-[#666666]">
                        <span className="text-[#8B6E58] font-medium">功用：</span>{formula.function}
                      </div>
                      <div className="text-xs text-[#666666]">
                        <span className="text-[#8B6E58] font-medium">主治：</span>{formula.indication}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "herb") && (
            <div>
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 rounded-full mr-2 bg-[#2D5A4A]" />
                <h2 className="text-base text-[#333333] font-bold tracking-wide">中药药典</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {herbs.map((herb) => (
                  <div
                    key={herb.id}
                    className="rounded-2xl p-3 relative overflow-hidden bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm"
                  >
                    <h3 className="text-sm text-[#333333] font-bold mb-1 tracking-wide">{herb.name}</h3>
                    <div className="space-y-0.5 mb-2">
                      <div className="text-[10px] text-[#666666]">
                        <span className="text-[#8B6E58] font-medium">性味：</span>{herb.nature} · {herb.flavor}
                      </div>
                      <div className="text-[10px] text-[#666666]">
                        <span className="text-[#8B6E58] font-medium">归经：</span>{herb.meridian}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#666666] leading-relaxed line-clamp-2">{herb.function}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
