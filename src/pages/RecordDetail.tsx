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
    <div className="min-h-screen bg-[#f5f1eb] pb-24 font-serif">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 bg-[#f5f1eb]/90 backdrop-blur-md border-b border-[#8b7355]/10 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8b7355]/10 text-[#8b7355] active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base text-[#2c2416] font-medium tracking-wide flex-1">诊疗详情</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Patient Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg text-[#2c2416]">{record.name}</span>
                  <span className="text-sm text-[#6b5d4f]">{record.gender} {record.age}岁</span>
                </div>
                <div className="text-xs text-[#9b8b7e]">{record.date}</div>
              </div>
            </div>
            <div className="text-xs text-[#8b7355] bg-[#8b7355]/10 px-2 py-1 rounded-md border border-[#8b7355]/20">
              初诊
            </div>
          </div>
        </div>

        {/* 主诉与现病史 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#8b7355]" />
            <h3 className="font-medium text-[#2c2416] tracking-wide">主诉与现病史</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-[#8b7355] mb-1 tracking-wider">主诉</div>
              <div className="text-sm text-[#2c2416] leading-relaxed">{record.chiefComplaint}</div>
            </div>
            <div>
              <div className="text-xs text-[#8b7355] mb-1 tracking-wider">现病史</div>
              <div className="text-sm text-[#2c2416] leading-relaxed text-justify">{record.history}</div>
            </div>
          </div>
        </div>

        {/* 中医四诊 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-[#8b7355]" />
            <h3 className="font-medium text-[#2c2416] tracking-wide">中医四诊</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0 font-medium">【望诊】</span>
              <span className="text-[#2c2416] text-justify">{record.fourDiagnostic.wang}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0 font-medium">【闻诊】</span>
              <span className="text-[#2c2416] text-justify">{record.fourDiagnostic.wen}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0 font-medium">【问诊】</span>
              <span className="text-[#2c2416] text-justify">{record.fourDiagnostic.wen_ask}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0 font-medium">【切诊】</span>
              <span className="text-[#2c2416] text-justify">{record.fourDiagnostic.qie}</span>
            </div>
          </div>
        </div>

        {/* 诊断与治法 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className="w-4 h-4 text-[#8b7355]" />
            <h3 className="font-medium text-[#2c2416] tracking-wide">诊断与治法</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0">中医诊断：</span>
              <span className="text-[#2c2416] font-medium">{record.diagnosis.tcm}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0">西医诊断：</span>
              <span className="text-[#2c2416]">{record.diagnosis.wm}</span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b7355]/20 to-transparent my-2" />
            <div className="flex gap-2">
              <span className="text-[#8b7355] shrink-0">治法原则：</span>
              <span className="text-[#2c2416]">{record.treatmentPrinciple}</span>
            </div>
          </div>
        </div>

        {/* 处方 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#8b7355]" />
              <h3 className="font-medium text-[#2c2416] tracking-wide">处方</h3>
            </div>
            <span className="text-xs text-[#8b7355] bg-[#8b7355]/10 px-2 py-1 rounded-md border border-[#8b7355]/20">
              {record.prescription.name}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-5">
            {record.prescription.herbs.map((herb, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-dashed border-[#8b7355]/30 pb-1">
                <span className="text-[#2c2416] text-sm font-medium">{herb.name}</span>
                <span className="text-[#8b7355] text-sm">{herb.dosage}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-[#f5f1eb] p-3 rounded-xl text-xs text-[#6b5d4f] leading-relaxed border border-[#8b7355]/10">
            <span className="font-medium text-[#8b7355]">用法：</span>{record.prescription.usage}
          </div>
        </div>

        {/* 医嘱 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#8b7355]/20">
          <h3 className="font-medium text-[#2c2416] mb-2 text-sm tracking-wide">医嘱</h3>
          <p className="text-sm text-[#6b5d4f] leading-relaxed whitespace-pre-line">
            {record.advice}
          </p>
        </div>
      </div>
    </div>
  );
}
