import { Link } from "react-router-dom";
import {
  Stethoscope, BookOpen, ChevronRight, Activity, Calendar,
  FlaskConical, Leaf, FileText, ClipboardList,
  GraduationCap, Award, FileSearch, Brain, Library
} from "lucide-react";

const Swallow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2.005 12.512c2.083-1.89 4.88-2.67 7.64-2.18l-1.86-4.52c-.22-.53.35-1.02.85-.73l5.5 3.18c1.55.9 3.3 1.15 5.03.72.68-.17 1.25.4 1.08 1.08-.43 1.73-.18 3.48.72 5.03l3.18 5.5c.29.5-.2.1.07-.73-.85l-4.52-1.86c.49 2.76-.29 5.56-2.18 7.64-.48.53-1.34.2-1.34-.52v-4.8c0-1.42-.9-2.68-2.27-3.02l-2.4-.6c-1.3-.33-2.68.08-3.5 1.08l-3.3 4.02c-.45.55-1.35.3-1.45-.4l-.6-4.2c-.15-1.05-.88-1.9-1.9-2.2l-4.2-.6c-.7-.1-.95-1-.4-1.45z"/>
  </svg>
);

const Willow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 C 60 40, 40 80, 20 100 C 40 70, 70 30, 50 0 Z" opacity="0.6"/>
    <path d="M60 10 C 70 50, 50 90, 30 110 C 50 80, 80 40, 60 10 Z" opacity="0.4"/>
  </svg>
);

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
    <div className="min-h-screen bg-[#F8F9F5] pt-12 px-4 pb-24 relative overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 mt-4">
          <h1 className="text-3xl text-[#2D5A4A] font-serif tracking-widest mb-2" style={{ fontFamily: 'var(--font-serif)' }}>中医数字传承平台</h1>
          <p className="text-xs text-[#2D5A4A]/70 tracking-[0.2em] font-medium uppercase">TCM Digital Heritage Platform</p>
        </div>

        {/* Doctor Card */}
        <div className="mb-6 rounded-2xl p-5 bg-white/60 border border-[#B8D8C8]/40 shadow-sm relative overflow-hidden backdrop-blur-md">
          <div className="absolute right-4 top-4 opacity-10 text-[#2D5A4A]">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.1 0 2-.9 2-2s-.9-2-2-2-2-.9-2-2 .9-2 2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-[#2D5A4A] mb-2 tracking-wide">李医生，上午好</h2>
            <p className="text-sm text-[#8B6E58] mb-4 tracking-wider font-medium">辽宁中医医院 · 中医内科</p>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#B8D8C8]/50 via-[#B8D8C8]/20 to-transparent mb-4" />
            <p className="text-sm text-[#2D5A4A]/80 italic font-serif tracking-widest">"春和景明，万物生发"</p>
          </div>
        </div>

        {/* Two Banners */}
        <div className="space-y-4 mb-8">
          {/* Banner 1: 智能诊疗助手 */}
          <Link
            to="/diagnosis"
            className="flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-[#2D5A4A] to-[#3A705C] shadow-md active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Stethoscope className="w-6 h-6 text-white/90" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg tracking-wide mb-1">智能诊疗助手</h3>
                <p className="text-white/80 text-xs tracking-wider">协助指导医生帮患者辨证分析</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative">
               <span className="text-[8px] text-white/40 absolute top-1 font-mono">AI</span>
               <Leaf className="w-8 h-8 text-[#E8F5F0] opacity-80 mt-2" />
            </div>
          </Link>

          {/* Banner 2: 名老中医传承学习 */}
          <Link
            to="/heritage"
            className="flex items-center justify-between rounded-2xl p-4 bg-gradient-to-r from-[#B8D8C8] to-[#9CBDB0] shadow-md active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-[#2D5A4A]" />
              </div>
              <div>
                <h3 className="text-[#2D5A4A] font-medium text-lg tracking-wide mb-1">名老中医传承学习</h3>
                <p className="text-[#2D5A4A]/80 text-xs tracking-wider">AI对话学习名医思想与诊疗路径</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white/20 border border-white/20 flex flex-col items-center justify-center overflow-hidden relative">
               <span className="text-[8px] text-[#2D5A4A]/40 absolute top-1 font-mono">Learn</span>
               <Library className="w-8 h-8 text-[#2D5A4A] opacity-70 mt-2" />
            </div>
          </Link>
        </div>

        {/* 专业工具集 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#333333] mb-3 tracking-wide">专业工具集</h2>
          <div className="grid grid-cols-3 gap-3">
            {tools.map((tool) => (
              <Link key={tool.name} to={tool.path} className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-white/70 border border-[#B8D8C8]/40 shadow-sm active:scale-95 transition-transform backdrop-blur-md hover:bg-white/90">
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F5F0] flex items-center justify-center mb-2.5 shadow-inner">
                  <tool.icon className="w-6 h-6 text-[#2D5A4A]" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-[#333333] font-medium tracking-wider">{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 传承学习中心 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#333333] mb-3 tracking-wide">传承学习中心</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1 */}
            <Link to="/heritage" className="rounded-2xl p-4 bg-white/70 border border-[#B8D8C8]/40 shadow-sm relative overflow-hidden backdrop-blur-md block active:scale-95 transition-transform hover:bg-white/90">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#2D5A4A] flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-[#333333] tracking-wide">名医传承</h3>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="text-[11px] text-[#666666] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#B8D8C8]" /> 医案公开解析
                </li>
                <li className="text-[11px] text-[#666666] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#B8D8C8]" /> 名医思想框架
                </li>
                <li className="text-[11px] text-[#666666] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#B8D8C8]" /> 典型医案拆解
                </li>
              </ul>
              <div className="inline-block px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-[10px] text-[#2D5A4A] border border-[#B8D8C8]/30">
                多维度检索
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/heritage/eval" className="rounded-2xl p-4 bg-white/70 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-md block active:scale-95 transition-transform hover:bg-white/90">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#8B6E58] flex items-center justify-center shadow-sm">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-[#333333] tracking-wide">传承评价</h3>
              </div>
              <div className="bg-[#F8F9F5] rounded-xl py-2.5 flex flex-col items-center justify-center mb-4 shadow-inner border border-[#EAEAEA]">
                <span className="text-2xl font-bold text-[#2D5A4A] leading-none mb-1">85</span>
                <span className="text-[10px] text-[#8B6E58] tracking-wider">综合评分</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#666666]">辨证准确度</span>
                  <span className="font-bold text-[#333333]">88%</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[#666666]">方药逻辑</span>
                  <span className="font-bold text-[#333333]">82%</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 今日内容推荐 */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold text-[#333333] mb-3 tracking-wide">今日内容推荐</h2>
          <div className="space-y-3">
            <Link to="/recommendation/prescription" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-md active:scale-95 transition-transform hover:bg-white/90">
              <div className="w-10 h-10 rounded-[12px] bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 shadow-inner">
                <FlaskConical className="w-5 h-5 text-[#2D5A4A]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8B6E58] mb-0.5 tracking-wider">今日推荐方剂</div>
                <div className="text-sm font-bold text-[#333333] mb-0.5 tracking-wide">半夏白术天麻汤</div>
                <div className="text-[10px] text-[#666666]">近期病例关联度高</div>
              </div>
            </Link>
            
            <Link to="/recommendation/cases" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-md active:scale-95 transition-transform hover:bg-white/90">
              <div className="w-10 h-10 rounded-[12px] bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 shadow-inner">
                <FileSearch className="w-5 h-5 text-[#2D5A4A]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8B6E58] mb-0.5 tracking-wider">你可能需要查看</div>
                <div className="text-sm font-bold text-[#333333] mb-0.5 tracking-wide">头痛病案 12 例对比</div>
                <div className="text-[10px] text-[#666666]">相似症候分析</div>
              </div>
            </Link>

            <Link to="/recommendation/thinking" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-md active:scale-95 transition-transform hover:bg-white/90">
              <div className="w-10 h-10 rounded-[12px] bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 shadow-inner">
                <Brain className="w-5 h-5 text-[#2D5A4A]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-[#8B6E58] mb-0.5 tracking-wider">名医思维</div>
                <div className="text-sm font-bold text-[#333333] mb-0.5 tracking-wide">脾胃虚寒的辨证要点</div>
                <div className="text-[10px] text-[#666666]">基于您的学习进度</div>
              </div>
            </Link>
          </div>
        </div>

        {/* 最近诊疗 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-[#2D5A4A]" />
            <h2 className="text-[15px] font-bold text-[#333333] tracking-wide">最近诊疗</h2>
          </div>
          <button className="text-xs text-[#8B6E58] flex items-center">
            全部 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { id: "1", name: "张先生", gender: "男", age: 45, diagnosis: "肝胃不和证", date: "今天 10:30" },
            { id: "2", name: "李女士", gender: "女", age: 32, diagnosis: "气血两虚证", date: "昨天 15:20" },
            { id: "3", name: "王大爷", gender: "男", age: 68, diagnosis: "肾阳虚衰证", date: "昨天 09:15" }
          ].map((record, i) => (
            <Link key={i} to={`/record/${record.id}`} className="bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 rounded-2xl p-4 shadow-sm flex items-center justify-between active:scale-95 transition-transform block hover:bg-white/90">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#333333]">{record.name}</span>
                    <span className="text-xs text-[#666666]">{record.gender} {record.age}岁</span>
                  </div>
                  <div className="text-xs text-[#2D5A4A] bg-[#E8F5F0] px-2 py-0.5 rounded-full inline-block border border-[#B8D8C8]/30">
                    {record.diagnosis}
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#8B6E58] flex items-center gap-1">
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
