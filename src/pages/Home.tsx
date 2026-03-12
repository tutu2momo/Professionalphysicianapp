import { Link } from "react-router-dom";
import {
  Stethoscope, BookOpen, ChevronRight, Activity, Calendar,
  FlaskConical, Leaf, FileText, ClipboardList,
  GraduationCap, Award, FileSearch, Brain, Library
} from "lucide-react";

const tools = [
  { name: "古籍检索", icon: Library, path: "/classics" },
  { name: "方剂工具箱", icon: FlaskConical, path: "/classics" },
  { name: "中药药典", icon: Leaf, path: "/classics" },
  { name: "临床笔记", icon: FileText, path: "/profile" },
  { name: "诊疗记录", icon: ClipboardList, path: "/profile" },
  { name: "名医经验库", icon: BookOpen, path: "/heritage" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f1eb] pt-12 px-4 pb-24 relative overflow-hidden">
      {/* Subtle background texture/watermark */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://api.iconify.design/pepicons-print/bamboo.svg?color=%238b7355')] opacity-5 pointer-events-none bg-no-repeat bg-contain transform translate-x-10 -translate-y-10" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl text-[#2c2416] font-serif tracking-widest">中医数字传承平台</h1>
          <div className="relative w-10 h-10 rounded-full border border-[#8b7355]/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4a373] text-white text-[10px] flex items-center justify-center font-bold shadow-sm">
              3
            </div>
          </div>
        </div>

        {/* Doctor Card */}
        <div className="mb-6 rounded-2xl p-5 bg-gradient-to-br from-[#e8e2d9]/80 to-[#dfd8ce]/60 border border-[#8b7355]/20 shadow-sm relative overflow-hidden backdrop-blur-sm">
          <div className="absolute right-4 top-4 opacity-10">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.1 0 2-.9 2-2s-.9-2-2-2-2-.9-2-2 .9-2 2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-serif text-[#2c2416] mb-2 tracking-wide">李医生，上午好</h2>
            <p className="text-sm text-[#8b7355] mb-4 tracking-wider font-medium">辽宁中医医院 · 中医内科</p>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#8b7355]/20 via-[#8b7355]/10 to-transparent mb-4" />
            <p className="text-sm text-[#8b7355] italic font-serif tracking-widest">"望闻问切，辨证施治"</p>
          </div>
        </div>

        {/* Two Banners */}
        <div className="space-y-4 mb-8">
          {/* Banner 1: 智能诊疗助手 */}
          <Link
            to="/diagnosis"
            className="flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-[#a68a61] to-[#8b7355] shadow-md active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Stethoscope className="w-6 h-6 text-white/80" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg tracking-wide mb-1">智能诊疗助手</h3>
                <p className="text-white/80 text-xs tracking-wider">协助指导医生帮患者辨证分析</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative">
               <span className="text-[8px] text-white/40 absolute top-1 font-mono">Sealronds</span>
               <Leaf className="w-8 h-8 text-[#d4a373] opacity-80 mt-2" />
            </div>
          </Link>

          {/* Banner 2: 名老中医传承学习 */}
          <Link
            to="/heritage"
            className="flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-[#7a8b99] to-[#5c6f82] shadow-md active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white/80" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg tracking-wide mb-1">名老中医传承学习</h3>
                <p className="text-white/80 text-xs tracking-wider">AI对话学习名医思想与诊疗路径</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative">
               <span className="text-[8px] text-white/40 absolute top-1 font-mono">Sealronds</span>
               <Leaf className="w-8 h-8 text-[#a8b8c8] opacity-80 mt-2" />
            </div>
          </Link>
        </div>

        {/* 专业工具集 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-medium text-[#2c2416] mb-3 tracking-wide">专业工具集</h2>
          <div className="grid grid-cols-3 gap-3">
            {tools.map((tool) => (
              <Link key={tool.name} to={tool.path} className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-[#f4f0ea]/90 border border-[#e8e2d9] shadow-sm active:scale-95 transition-transform backdrop-blur-sm">
                <div className="w-12 h-12 rounded-[14px] bg-[#e8e2d9]/60 flex items-center justify-center mb-2.5 shadow-inner">
                  <tool.icon className="w-6 h-6 text-[#8b7355]/80" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-[#4a4036] font-medium tracking-wider">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 传承学习中心 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-medium text-[#2c2416] mb-3 tracking-wide">传承学习中心</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1 */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#e8e2d9] to-[#dfd8ce] border border-[#8b7355]/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#8b7355]/80 flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-medium text-[#2c2416] tracking-wide">名医传承</h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="text-[11px] text-[#6b5d4f] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#8b7355]/60" /> 医案公开解析
                </li>
                <li className="text-[11px] text-[#6b5d4f] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#8b7355]/60" /> 名医思想框架
                </li>
                <li className="text-[11px] text-[#6b5d4f] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#8b7355]/60" /> 典型医案拆解
                </li>
              </ul>
              <div className="inline-block px-2.5 py-1 rounded-lg bg-[#8b7355]/10 text-[10px] text-[#6b5d4f] border border-[#8b7355]/10">
                多维度检索
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl p-4 bg-gradient-to-br from-[#e1e6eb] to-[#d5dbe2] border border-[#4a6fa5]/10 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#4a6fa5]/80 flex items-center justify-center shadow-sm">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-medium text-[#2c2416] tracking-wide">传承评价</h3>
              </div>
              <div className="bg-white/50 rounded-xl py-2.5 flex flex-col items-center justify-center mb-4 shadow-inner">
                <span className="text-2xl font-semibold text-[#2c2416] leading-none mb-1">85</span>
                <span className="text-[10px] text-[#6b5d4f] tracking-wider">综合评分</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#6b5d4f]">辨证准确度</span>
                  <span className="font-medium text-[#2c2416]">88%</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#6b5d4f]">方药逻辑</span>
                  <span className="font-medium text-[#2c2416]">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 今日内容推荐 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-medium text-[#2c2416] mb-3 tracking-wide">今日内容推荐</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f4f0ea]/90 border border-[#e8e2d9] shadow-sm backdrop-blur-sm">
              <div className="w-10 h-10 rounded-[12px] bg-[#e8e2d9]/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                <FlaskConical className="w-5 h-5 text-[#8b7355]/80" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8b7355] mb-0.5 tracking-wider">今日推荐方剂</div>
                <div className="text-sm font-medium text-[#2c2416] mb-0.5 tracking-wide">半夏白术天麻汤</div>
                <div className="text-[10px] text-[#6b5d4f]">近期病例关联度高</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f4f0ea]/90 border border-[#e8e2d9] shadow-sm backdrop-blur-sm">
              <div className="w-10 h-10 rounded-[12px] bg-[#e8e2d9]/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                <FileSearch className="w-5 h-5 text-[#8b7355]/80" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8b7355] mb-0.5 tracking-wider">你可能需要查看</div>
                <div className="text-sm font-medium text-[#2c2416] mb-0.5 tracking-wide">头痛病案 12 例对比</div>
                <div className="text-[10px] text-[#6b5d4f]">相似症候分析</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f4f0ea]/90 border border-[#e8e2d9] shadow-sm backdrop-blur-sm">
              <div className="w-10 h-10 rounded-[12px] bg-[#e8e2d9]/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Brain className="w-5 h-5 text-[#8b7355]/80" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8b7355] mb-0.5 tracking-wider">名医思维</div>
                <div className="text-sm font-medium text-[#2c2416] mb-0.5 tracking-wide">脾胃虚寒的辨证要点</div>
                <div className="text-[10px] text-[#6b5d4f]">基于您的学习进度</div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近诊疗 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#8b7355] to-[#6b5d4f]" />
            <h2 className="text-[15px] font-medium text-[#2c2416] tracking-wide">最近诊疗</h2>
          </div>
          <button className="text-xs text-[#8b7355] flex items-center">
            全部 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { id: "1", name: "张先生", gender: "男", age: 45, diagnosis: "肝胃不和证", date: "今天 10:30" },
            { id: "2", name: "李女士", gender: "女", age: 32, diagnosis: "气血两虚证", date: "昨天 15:20" },
            { id: "3", name: "王大爷", gender: "男", age: 68, diagnosis: "肾阳虚衰证", date: "昨天 09:15" }
          ].map((record, i) => (
            <Link key={i} to={`/record/${record.id}`} className="bg-white/80 backdrop-blur-sm border border-[#8b7355]/20 rounded-2xl p-4 shadow-sm flex items-center justify-between active:scale-95 transition-transform block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#2c2416]">{record.name}</span>
                    <span className="text-xs text-[#6b5d4f]">{record.gender} {record.age}岁</span>
                  </div>
                  <div className="text-xs text-[#4a6fa5] bg-[#4a6fa5]/10 px-2 py-0.5 rounded-full inline-block">
                    {record.diagnosis}
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#9b8b7e] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {record.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
