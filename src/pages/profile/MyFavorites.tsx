import { ArrowLeft, Bookmark, FileText, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyFavorites() {
  const navigate = useNavigate();

  const favorites = [
    { id: 1, type: "prescription", title: "半夏白术天麻汤", tag: "化痰息风", icon: FlaskConical },
    { id: 2, type: "case", title: "风寒头痛典型病案", tag: "病案解析", icon: FileText },
    { id: 3, type: "article", title: "脾胃虚弱的辨证思路", tag: "名医思维", icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">我的收藏</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          <button className="px-4 py-1.5 rounded-full bg-[#2D5A4A] text-white text-xs font-medium whitespace-nowrap">全部</button>
          <button className="px-4 py-1.5 rounded-full bg-white/70 border border-[#B8D8C8]/40 text-[#666666] text-xs font-medium whitespace-nowrap">方剂</button>
          <button className="px-4 py-1.5 rounded-full bg-white/70 border border-[#B8D8C8]/40 text-[#666666] text-xs font-medium whitespace-nowrap">病案</button>
          <button className="px-4 py-1.5 rounded-full bg-white/70 border border-[#B8D8C8]/40 text-[#666666] text-xs font-medium whitespace-nowrap">文章</button>
        </div>

        <div className="space-y-3">
          {favorites.map(fav => (
            <div key={fav.id} className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40 flex items-center gap-4 active:scale-95 transition-transform cursor-pointer">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#E8F5F0] border border-[#B8D8C8]/30">
                <fav.icon className="w-5 h-5 text-[#2D5A4A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-[#333333] font-bold mb-1">{fav.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F8F9F5] text-[#8B6E58] border border-[#EAEAEA]">{fav.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
