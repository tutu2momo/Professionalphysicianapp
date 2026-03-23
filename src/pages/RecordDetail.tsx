import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, FileText, Activity, Pill, ClipboardList } from "lucide-react";

export default function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for 张先生 (ID: 1)
  const record = {
    name: "张先生",
    gender: "男",
    age: 45,
    date: "2026-03-12 10:30",
    chiefComplaint: "胃脘胀痛连及两胁，伴嗳气频繁1个月，加重3天。",
    history: "患者近1个月来因工作压力大，经常熬夜，出现胃脘部胀满疼痛，痛连两胁，情绪波动时加重。伴有频繁嗳气，食欲不振。3天前因进食生冷食物后症状加重，遂来就诊。",
    fourDiagnostic: {
      wang: "神志清，精神可，面色微黄，形体适中。舌质淡红，苔薄白微腻。",
      wen: "语声略低，时有叹息（善太息），未闻及异常气味。",
      wen_ask: "纳差，食后胃脘胀满尤甚，口干不欲饮，时有口苦，大便时干时稀，排便不爽，睡眠欠佳，夜寐易醒。",
      qie: "脉弦细。"
    },
    diagnosis: {
      tcm: "胃痛（肝胃不和证）",
      wm: "慢性浅表性胃炎"
    },
    treatmentPrinciple: "疏肝理气，和胃止痛。",
    prescription: {
      name: "柴胡疏肝散合左金丸加减",
      herbs: [
        { name: "柴胡", dosage: "10g" },
        { name: "白芍", dosage: "15g" },
        { name: "枳壳", dosage: "10g" },
        { name: "炙甘草", dosage: "6g" },
        { name: "香附", dosage: "10g" },
        { name: "川芎", dosage: "10g" },
        { name: "黄连", dosage: "3g" },
        { name: "吴茱萸", dosage: "2g" },
        { name: "延胡索", dosage: "10g" },
        { name: "郁金", dosage: "10g" }
      ],
      usage: "水煎服，日一剂，早晚温服。共 7 剂。"
    },
    advice: "1. 保持心情舒畅，避免情绪激动；\n2. 饮食宜清淡易消化，忌生冷、辛辣、油腻之品；\n3. 规律作息，避免熬夜。"
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base text-[#333333] font-bold tracking-wide flex-1">诊疗详情</h1>
      </div>

      <div className="p-4 space-y-4 relative z-10">
        {/* Patient Info */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8F5F0] flex items-center justify-center text-[#2D5A4A] border border-[#B8D8C8]/30">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-[#333333]">{record.name}</span>
                  <span className="text-sm text-[#666666]">{record.gender} {record.age}岁</span>
                </div>
                <div className="text-xs text-[#999999]">{record.date}</div>
              </div>
            </div>
            <div className="text-xs text-[#2D5A4A] bg-[#E8F5F0] px-2 py-1 rounded-md border border-[#B8D8C8]/30 font-medium">
              初诊
            </div>
          </div>
        </div>

        {/* 主诉与现病史 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#2D5A4A]" />
            <h3 className="font-bold text-[#333333] tracking-wide">主诉与现病史</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-[#8B6E58] mb-1 tracking-wider font-medium">主诉</div>
              <div className="text-sm text-[#666666] leading-relaxed">{record.chiefComplaint}</div>
            </div>
            <div>
              <div className="text-xs text-[#8B6E58] mb-1 tracking-wider font-medium">现病史</div>
              <div className="text-sm text-[#666666] leading-relaxed text-justify">{record.history}</div>
            </div>
          </div>
        </div>

        {/* 中医四诊 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-[#2D5A4A]" />
            <h3 className="font-bold text-[#333333] tracking-wide">中医四诊</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">【望诊】</span>
              <span className="text-[#666666] text-justify">{record.fourDiagnostic.wang}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">【闻诊】</span>
              <span className="text-[#666666] text-justify">{record.fourDiagnostic.wen}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">【问诊】</span>
              <span className="text-[#666666] text-justify">{record.fourDiagnostic.wen_ask}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">【切诊】</span>
              <span className="text-[#666666] text-justify">{record.fourDiagnostic.qie}</span>
            </div>
          </div>
        </div>

        {/* 诊断与治法 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className="w-4 h-4 text-[#2D5A4A]" />
            <h3 className="font-bold text-[#333333] tracking-wide">诊断与治法</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">中医诊断：</span>
              <span className="text-[#333333] font-bold">{record.diagnosis.tcm}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">西医诊断：</span>
              <span className="text-[#666666]">{record.diagnosis.wm}</span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8D8C8]/40 to-transparent my-2" />
            <div className="flex gap-2">
              <span className="text-[#8B6E58] shrink-0 font-medium">治法原则：</span>
              <span className="text-[#666666]">{record.treatmentPrinciple}</span>
            </div>
          </div>
        </div>

        {/* 处方 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#2D5A4A]" />
              <h3 className="font-bold text-[#333333] tracking-wide">处方</h3>
            </div>
            <span className="text-xs text-[#2D5A4A] bg-[#E8F5F0] px-2 py-1 rounded-md border border-[#B8D8C8]/30 font-medium">
              {record.prescription.name}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-5">
            {record.prescription.herbs.map((herb, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-dashed border-[#B8D8C8]/40 pb-1">
                <span className="text-[#333333] text-sm font-bold">{herb.name}</span>
                <span className="text-[#8B6E58] text-sm">{herb.dosage}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-[#F8F9F5] p-3 rounded-xl text-xs text-[#666666] leading-relaxed border border-[#EAEAEA]">
            <span className="font-medium text-[#8B6E58]">用法：</span>{record.prescription.usage}
          </div>
        </div>

        {/* 医嘱 */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#B8D8C8]/40">
          <h3 className="font-bold text-[#333333] mb-2 text-sm tracking-wide">医嘱</h3>
          <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line">
            {record.advice}
          </p>
        </div>
      </div>
    </div>
  );
}
