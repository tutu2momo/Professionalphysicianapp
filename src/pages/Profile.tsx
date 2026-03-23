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
    <div className="min-h-screen bg-[#F8F9F5] pt-6 px-4 pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      <div className="relative z-10">
        <div className="pt-12 pb-6 relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-[#B8D8C8]/40 mb-6 shadow-sm">
          <div className="relative z-10 flex items-center gap-4 px-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#2D5A4A] to-[#3A705C] shadow-md">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl text-[#333333] font-bold mb-1 tracking-wide">李医生</h1>
              <p className="text-xs text-[#666666] mb-2 tracking-wider">辽宁中医医院 · 主治医师</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8F5F0] text-[#2D5A4A] border border-[#B8D8C8]/30 tracking-wider">执业 5 年</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8F9F5] text-[#8B6E58] border border-[#EAEAEA] tracking-wider">传承评分 85</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-2xl p-4 text-center bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <div className="text-2xl text-[#2D5A4A] font-bold mb-1">156</div>
            <div className="text-[10px] text-[#666666] tracking-wider">诊疗记录</div>
          </div>
          <div className="rounded-2xl p-4 text-center bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <div className="text-2xl text-[#2D5A4A] font-bold mb-1">42</div>
            <div className="text-[10px] text-[#666666] tracking-wider">学习笔记</div>
          </div>
          <div className="rounded-2xl p-4 text-center bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <div className="text-2xl text-[#2D5A4A] font-bold mb-1">28</div>
            <div className="text-[10px] text-[#666666] tracking-wider">收藏内容</div>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4 flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-white/90"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#E8F5F0] border border-[#B8D8C8]/30">
                <item.icon className="w-5 h-5 text-[#2D5A4A]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-[#333333] font-bold mb-0.5 tracking-wide">{item.title}</h3>
                <p className="text-[10px] text-[#666666] tracking-wider">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#B8D8C8]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
