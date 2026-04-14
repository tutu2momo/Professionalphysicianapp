import { ArrowLeft, FileText, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyNotes() {
  const navigate = useNavigate();

  const notes = [
    { id: 1, title: "关于桂枝汤加减的临床思考", date: "2026-03-25", preview: "桂枝汤作为群方之祖，在临床应用中不仅限于外感风寒表虚证。近日治一例营卫不和之自汗症，重用白芍..." },
    { id: 2, title: "顽固性失眠病案复盘", date: "2026-03-20", preview: "患者女，52岁，失眠半年余。辨证为心肾不交，予交泰丸合酸枣仁汤加减，效不佳。后细问其情志，改用柴胡加龙骨牡蛎汤..." },
    { id: 3, title: "《脾胃论》读书笔记", date: "2026-03-15", preview: "李东垣强调“内伤脾胃，百病由生”。在现代人多坐少动、饮食不节的背景下，升阳益胃之法尤为重要..." },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">我的笔记</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索笔记..." 
            className="w-full bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A4A]/30"
          />
          <Search className="w-4 h-4 text-[#999999] absolute left-3.5 top-3" />
        </div>

        <div className="space-y-3">
          {notes.map(note => (
            <div key={note.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40 active:scale-95 transition-transform cursor-pointer">
              <h3 className="font-bold text-[#333333] mb-2 text-sm">{note.title}</h3>
              <p className="text-xs text-[#666666] line-clamp-2 mb-3 leading-relaxed">{note.preview}</p>
              <div className="flex items-center gap-2 text-[#999999] text-[10px]">
                <Clock className="w-3 h-3" />
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
