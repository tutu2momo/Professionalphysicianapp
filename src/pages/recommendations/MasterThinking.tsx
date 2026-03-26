import { ArrowLeft, Brain, Stethoscope, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MasterThinking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-[#E8F5F0] text-[#2D5A4A] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-[#2D5A4A] tracking-wide">名医思维</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Title Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 text-[#2D5A4A] transform translate-x-4 -translate-y-4">
            <Brain className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#2D5A4A] mb-2 tracking-wide">脾胃虚寒的辨证要点</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">基于您的学习进度</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">温中健脾</span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed">
              脾胃虚寒证是中医临床常见证候之一，多由饮食不节、劳倦过度或久病失养所致。掌握其辨证要点，对于准确施治至关重要。
            </p>
          </div>
        </div>

        {/* Core Pathogenesis */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">核心病机</h3>
          </div>
          <p className="text-sm text-[#666666] leading-relaxed mb-4">
            脾胃阳气虚衰，阴寒内盛，温煦失职，运化无权。
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA]">
              <div className="font-bold text-[#2D5A4A] text-sm mb-1">阳虚失温</div>
              <p className="text-xs text-[#666666]">表现为畏寒肢冷，脘腹冷痛，得温则减。</p>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA]">
              <div className="font-bold text-[#2D5A4A] text-sm mb-1">运化失职</div>
              <p className="text-xs text-[#666666]">表现为食欲不振，食后腹胀，大便溏薄。</p>
            </div>
          </div>
        </div>

        {/* Four Diagnostic Methods */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">四诊要点</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#2D5A4A]">望</span>
              </div>
              <div>
                <h4 className="font-bold text-[#333333] text-sm mb-1">面色萎黄，神疲乏力</h4>
                <p className="text-xs text-[#666666] leading-relaxed">舌质淡胖，边有齿痕，苔白润或滑。</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#2D5A4A]">闻</span>
              </div>
              <div>
                <h4 className="font-bold text-[#333333] text-sm mb-1">语声低微，气短懒言</h4>
                <p className="text-xs text-[#666666] leading-relaxed">偶有肠鸣音亢进，或伴有呃逆、嗳气。</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#2D5A4A]">问</span>
              </div>
              <div>
                <h4 className="font-bold text-[#333333] text-sm mb-1">胃脘隐痛，喜温喜按</h4>
                <p className="text-xs text-[#666666] leading-relaxed">空腹痛甚，得食则缓；泛吐清水，食少便溏。</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#2D5A4A]">切</span>
              </div>
              <div>
                <h4 className="font-bold text-[#333333] text-sm mb-1">脉象沉迟无力</h4>
                <p className="text-xs text-[#666666] leading-relaxed">或见脉弱，提示阳气虚衰，鼓动无力。</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Differential Diagnosis */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">鉴别诊断</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#2D5A4A] text-sm">与脾胃湿热鉴别</h4>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                脾胃虚寒多见喜温喜按、便溏、舌淡苔白；而脾胃湿热多见脘腹胀闷、口苦口臭、便溏不爽、舌红苔黄腻。
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[#2D5A4A] text-sm">与肝胃不和鉴别</h4>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                肝胃不和多见胃脘胀痛连胁、嗳气频作、情绪波动时加重、脉弦；而脾胃虚寒多为隐痛、喜按、脉沉迟。
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Guidance */}
        <div className="bg-gradient-to-br from-[#E8F5F0] to-[#F8F9F5] rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-[#2D5A4A]" />
            <h3 className="text-[15px] font-bold text-[#2D5A4A] tracking-wide">临床指导</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>治法方药：</strong>治宜温中健脾，和胃止痛。代表方剂如理中丸（温中散寒，健胃）、黄芪建中汤（温中补虚，和里缓急）。
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>饮食调护：</strong>宜食温热易消化之品，如生姜、羊肉、山药等；忌食生冷、油腻、辛辣刺激食物。
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>起居调摄：</strong>注意腹部保暖，避免受寒；规律作息，避免过度劳累。
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
