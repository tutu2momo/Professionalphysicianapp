import { User, FileText, Bookmark, Settings, HelpCircle, ChevronRight, Activity } from "lucide-react";

const menuItems = [
  { id: 1, icon: User, title: "个人信息", desc: "查看和编辑个人资料" },
  { id: 2, icon: Activity, title: "执业信息", desc: "医师资质与执业机构" },
  { id: 3, icon: FileText, title: "我的笔记", desc: "临床笔记与学习记录" },
  { id: 4, icon: Bookmark, title: "我的收藏", desc: "收藏的方剂与医案" },
  { id: 5, icon: Settings, title: "设置", desc: "应用设置与偏好" },
  { id: 6, icon: HelpCircle, title: "帮助与反馈", desc: "使用帮助与问题反馈" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1eb] to-[#ebe6dd] pt-6 px-4 pb-24">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
      
      <div className="relative z-10">
        <div className="pt-12 pb-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4a6fa5]/10 to-[#4a6fa5]/20 border border-[#4a6fa5]/20 mb-6 shadow-sm">
          <div className="relative z-10 flex items-center gap-4 px-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#4a6fa5] to-[#5d82b8] shadow-[0_4px_12px_rgba(74,111,165,0.3)]">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg text-[#2c2416] font-medium mb-1 tracking-wide">李医生</h1>
              <p className="text-xs text-[#6b5d4f] mb-2 tracking-wider">辽宁中医医院 · 主治医师</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#a08850] tracking-wider">执业 5 年</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#4a6fa5]/20 text-[#4a6fa5] tracking-wider">传承评分 85</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl p-4 text-center bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8] border border-[#d4af37]/25 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="text-2xl text-[#4a6fa5] font-semibold mb-1">156</div>
            <div className="text-[10px] text-[#6b5d4f] tracking-wider">诊疗记录</div>
          </div>
          <div className="rounded-xl p-4 text-center bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8] border border-[#d4af37]/25 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="text-2xl text-[#4a6fa5] font-semibold mb-1">42</div>
            <div className="text-[10px] text-[#6b5d4f] tracking-wider">学习笔记</div>
          </div>
          <div className="rounded-xl p-4 text-center bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8] border border-[#d4af37]/25 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="text-2xl text-[#4a6fa5] font-semibold mb-1">28</div>
            <div className="text-[10px] text-[#6b5d4f] tracking-wider">收藏内容</div>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-4 flex items-center gap-4 bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8] border border-[#d4af37]/25 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-95 transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#4a6fa5]/10 to-[#4a6fa5]/15 border border-[#4a6fa5]/20">
                <item.icon className="w-5 h-5 text-[#4a6fa5]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-[#2c2416] font-medium mb-0.5 tracking-wide">{item.title}</h3>
                <p className="text-[10px] text-[#6b5d4f] tracking-wider">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9b8b7e]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
