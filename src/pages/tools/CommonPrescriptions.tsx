import { useState } from "react";
import { ArrowLeft, Search, FlaskConical, Filter, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";

const categories = ["全部", "解表剂", "清热剂", "和解剂", "理气剂", "理血剂", "补益剂"];

const prescriptions = [
  {
    id: 1,
    name: "桂枝汤",
    category: "解表剂",
    source: "《伤寒论》",
    composition: "桂枝三两（去皮）、芍药三两、甘草二两（炙）、生姜三两（切）、大枣十二枚（擘）",
    efficacy: "解肌发表，调和营卫",
    indications: "外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱者。",
    usage: "上五味，细切三味，以水七升，微火煮取三升，去滓，适寒温，服一升。服已须臾，啜热稀粥一升余，以助药力。"
  },
  {
    id: 2,
    name: "银翘散",
    category: "解表剂",
    source: "《温病条辨》",
    composition: "连翘一两、银花一两、苦桔梗六钱、薄荷六钱、竹叶四钱、生甘草五钱、芥穗四钱、淡豆豉五钱、牛蒡子六钱",
    efficacy: "辛凉透表，清热解毒",
    indications: "温病初起。发热无汗，或有汗不畅，微恶风寒，头痛口渴，咳嗽咽痛，舌尖红，苔薄白或薄黄，脉浮数。",
    usage: "上杵为散。每服六钱，鲜苇根汤煎，香气大出，即取服，勿过煮。"
  },
  {
    id: 3,
    name: "小柴胡汤",
    category: "和解剂",
    source: "《伤寒论》",
    composition: "柴胡半斤、黄芩三两、人参三两、半夏半升（洗）、甘草（炙）、生姜（切）各三两、大枣十二枚（擘）",
    efficacy: "和解少阳",
    indications: "伤寒少阳证。往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦，咽干，目眩，舌苔薄白，脉弦者。",
    usage: "上七味，以水一斗二升，煮取六升，去滓，再煎取三升，温服一升，日三服。"
  },
  {
    id: 4,
    name: "逍遥散",
    category: "和解剂",
    source: "《太平惠民和剂局方》",
    composition: "柴胡、当归、白芍、白术、茯苓各一两、甘草半两",
    efficacy: "疏肝解郁，养血健脾",
    indications: "肝郁血虚脾弱证。两胁作痛，头痛目眩，口燥咽干，神疲食少，或月经不调，乳房胀痛，脉弦而虚者。",
    usage: "上为粗末。每服二钱，水一大盏，烧生姜一块切破，薄荷少许，同煎至七分，去滓热服，不拘时候。"
  },
  {
    id: 5,
    name: "四君子汤",
    category: "补益剂",
    source: "《太平惠民和剂局方》",
    composition: "人参（去芦）、白术、茯苓（去皮）、甘草（炙）各等分",
    efficacy: "益气健脾",
    indications: "脾胃气虚证。面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。",
    usage: "上为细末。每服二钱，水一盏，煎至七分，通口服，不拘时候；入盐少许，白汤点亦得。"
  }
];

export default function CommonPrescriptions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.indications.includes(searchQuery);
    const matchesCategory = activeCategory === "全部" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9F5] font-sans pb-safe">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 shadow-sm sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform shrink-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-[#333333] font-bold text-[17px] tracking-wide">常用药方</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#999999]" />
          </div>
          <input
            type="text"
            placeholder="搜索方剂名称、主治症状..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#EAEAEA] rounded-xl py-2.5 pl-9 pr-4 text-[15px] text-[#333333] placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-[#B8D8C8] shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto scrollbar-none gap-2 pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                activeCategory === category
                  ? "bg-[#2D5A4A] text-white border-[#2D5A4A]"
                  : "bg-white text-[#666666] border-[#EAEAEA] hover:bg-[#F8F9F5]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Prescription List */}
        <div className="space-y-3">
          {filteredPrescriptions.map((prescription) => (
            <div 
              key={prescription.id} 
              className="bg-white rounded-2xl border border-[#B8D8C8]/40 shadow-sm overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer active:bg-[#F8F9F5] transition-colors"
                onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#333333] tracking-wide">{prescription.name}</h3>
                    <span className="px-2 py-0.5 bg-[#E8F5F0] text-[#2D5A4A] text-[10px] rounded-md border border-[#B8D8C8]/30">
                      {prescription.category}
                    </span>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-[#999999] transition-transform",
                    expandedId === prescription.id && "rotate-90"
                  )} />
                </div>
                <p className="text-sm text-[#666666] line-clamp-1">{prescription.efficacy}</p>
              </div>

              {/* Expanded Content */}
              {expandedId === prescription.id && (
                <div className="px-4 pb-4 pt-2 border-t border-[#EAEAEA] bg-[#F8F9F5]/50 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-[#8B6E58] mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> 出处
                    </div>
                    <div className="text-sm text-[#333333]">{prescription.source}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#8B6E58] mb-1 flex items-center gap-1">
                      <FlaskConical className="w-3.5 h-3.5" /> 组成
                    </div>
                    <div className="text-sm text-[#333333] leading-relaxed">{prescription.composition}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#8B6E58] mb-1">主治</div>
                    <div className="text-sm text-[#333333] leading-relaxed">{prescription.indications}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#8B6E58] mb-1">用法</div>
                    <div className="text-sm text-[#333333] leading-relaxed">{prescription.usage}</div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <FlaskConical className="w-12 h-12 text-[#B8D8C8] mx-auto mb-3 opacity-50" />
              <p className="text-[#666666] text-sm">未找到相关方剂</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
