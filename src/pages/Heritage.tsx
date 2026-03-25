import { useState } from "react";
import { Search, BookOpen, UserCircle, ChevronRight, ArrowLeft, Medal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cases = [
  {
    id: 5,
    title: "气阴两虚夹瘀型消渴（糖尿病）深度解析医案",
    doctor: "施老中医",
    date: "2024-04-10",
    syndrome: "气阴两虚，瘀血阻络",
    tags: ["消渴", "玉液汤合生脉散加减"],
    summary: "【患者基本信息】\n患者女，58岁，退休教师，春季就诊。\n\n【既往病史】\n平素喜食甜食及面食，体态偏胖。发现“2型糖尿病”5年，长期口服降糖药，近期血糖控制不佳（空腹8.5mmol/L）。既往有“高血压”病史2年。\n\n【四诊信息】\n主诉：口干多饮伴乏力、双下肢麻木3个月。\n现病史：近3个月来，常觉口干舌燥，饮水多而不解渴，伴神疲乏力，少气懒言，时有心悸。近1个月出现双下肢麻木，如蚁行感，夜间尤甚。查体：面色少华，形体消瘦（近期体重下降3kg）。舌质暗红，边有瘀斑，少苔，脉细涩。\n\n【辨证】气阴两虚，瘀血阻络。\n【治法】益气养阴，活血通络。\n【方药】玉液汤合生脉散加减（生黄芪30g、山药20g、知母15g、天花粉20g、葛根15g、五味子10g、麦冬15g、丹参20g、鸡血藤30g、地龙10g、水蛭3g(研末冲服)）。\n\n【疾病养护建议】\n1. 饮食建议：严格控制碳水化合物摄入，多食粗粮（如燕麦、荞麦）及新鲜蔬菜，忌食辛辣、甜腻、煎炸之品。\n2. 作息建议：规律作息，保证充足睡眠，避免过度劳累耗伤气阴。\n3. 运动建议：每日坚持中等强度有氧运动（如快走、太极拳）40分钟，以微微出汗为度，促进气血运行，改善肢体麻木。\n4. 复诊建议：服药14剂后复诊，期间需每日监测空腹及餐后血糖，并记录肢体麻木缓解情况。\n\n【名医点拨】\n消渴病久，必耗气伤阴。“气为血之帅，阴为血之基”，气阴两虚则无力推动血液运行，且阴虚津亏致血液粘稠，最终必致“久病入络”，形成瘀血阻络之变（即糖尿病周围神经病变）。故本案患者不仅有口干、乏力之气阴两虚象，更有下肢麻木、舌暗有瘀斑之瘀血象。治疗时，在益气养阴（玉液汤合生脉散）的基础上，必须重用活血通络之品（丹参、鸡血藤、地龙、水蛭）。“治风先治血，血行风自灭”，络脉通畅，气血得以濡养四肢，则麻木自除。切忌单纯降糖或单纯养阴，忽视了“瘀”这一核心病理产物。"
  },
  {
    id: 4,
    title: "痰热内扰型不寐（失眠）深度解析医案",
    doctor: "刘老中医",
    date: "2024-03-20",
    syndrome: "痰热内扰，胃气不和",
    tags: ["不寐", "黄连温胆汤加减"],
    summary: "【患者基本信息】\n患者男，45岁，企业高管，秋季就诊。\n\n【既往病史】\n平素工作压力极大，常有应酬，嗜食肥甘厚味及饮酒。既往有“脂肪肝”、“高脂血症”病史3年。近半年来反复出现胃脘胀满，未系统治疗。\n\n【四诊信息】\n主诉：入睡困难伴多梦易醒2个月。\n现病史：近2个月来，每晚需辗转1-2小时方能入睡，且睡中多梦，易惊醒，醒后难以复睡。伴见心烦意乱，胸闷脘痞，口苦泛恶，头重如裹，大便黏滞不爽。查体：形体偏胖，面垢油光。舌质红，苔黄腻而厚，脉滑数。\n\n【辨证】痰热内扰，胃气不和。\n【治法】清热化痰，和胃安神。\n【方药】黄连温胆汤加减（黄连6g、法半夏12g、陈皮10g、茯苓15g、竹茹12g、枳实10g、远志10g、炒酸枣仁20g、生龙骨30g(先煎)、生牡蛎30g(先煎)、炙甘草6g）。\n\n【疾病养护建议】\n1. 饮食建议：清淡饮食，严禁饮酒及辛辣、油腻、甜腻之品，晚餐宜少食，避免增加胃肠负担。\n2. 作息建议：晚上11点前务必卧床，睡前避免思考工作及使用电子产品，可温水泡脚。\n3. 运动建议：每日傍晚进行快走或慢跑等有氧运动30分钟，以微微出汗为度，助脾胃运化，化解痰湿。\n4. 复诊建议：服药7剂后复诊，重点观察睡眠质量、口苦及胃脘胀满改善情况。\n\n【名医点拨】\n本案患者为中年男性，平素嗜食肥甘厚味，脾胃受损，聚湿生痰；加之工作压力大，气机郁滞，郁久化热。痰热互结，上扰心神，故见失眠多梦、心烦；痰热中阻，胃气不和，故见胸闷脘痞、口苦泛恶。治疗切忌单纯使用重镇安神或滋阴安神之品，否则易敛邪留痰。当以“胃不和则卧不安”为切入点，选用黄连温胆汤清热化痰、和胃降逆。痰热一清，胃气一和，则心神自宁。"
  },
  {
    id: 1,
    title: "脾胃虚寒型慢性胃炎医案",
    doctor: "李老中医",
    date: "2023-10-15",
    syndrome: "脾胃虚寒",
    tags: ["胃痛", "理中汤加减"],
    summary: "患者诉反复胃脘隐痛3年，加重1个月。痛势绵绵，喜温喜按，空腹痛甚，得食稍减。伴神疲乏力，四肢倦怠，手足不温，大便溏薄。舌淡胖，边有齿痕，苔白润，脉迟缓。\n\n【辨证】脾胃虚寒证。\n【治法】温中健脾，和胃止痛。\n【方药】理中汤加减（党参15g、白术15g、干姜10g、炙甘草6g、黄芪20g、桂枝10g、白芍15g、延胡索10g）。\n\n【二诊】服药7剂后，胃痛明显减轻，大便转实。效不更方，继服14剂，诸症悉平。"
  },
  {
    id: 2,
    title: "肝阳上亢型高血压医案",
    doctor: "张老中医",
    date: "2023-11-02",
    syndrome: "肝阳上亢",
    tags: ["眩晕", "天麻钩藤饮"],
    summary: "患者头晕目眩半年，加重伴头痛1周。平素性情急躁，遇烦心事则头晕加重。伴面红目赤，口苦咽干，失眠多梦。查血压 160/100 mmHg。舌红苔黄，脉弦数。\n\n【辨证】肝阳上亢证。\n【治法】平肝潜阳，清热安神。\n【方药】天麻钩藤饮加减（天麻10g、钩藤15g(后下)、石决明20g(先煎)、牛膝15g、杜仲15g、黄芩10g、栀子10g、益母草15g、桑寄生15g、夜交藤20g）。\n\n【二诊】服药10剂后，头晕头痛大减，血压降至 135/85 mmHg，睡眠改善。原方去黄芩、栀子，加枸杞子15g、菊花10g，继服巩固。"
  },
  {
    id: 3,
    title: "气阴两虚型失眠医案",
    doctor: "王老中医",
    date: "2023-12-20",
    syndrome: "气阴两虚",
    tags: ["不寐", "生脉散合酸枣仁汤"],
    summary: "患者失眠多梦2年，近1个月加重，彻夜难眠。伴心悸气短，神疲乏力，口干少津，五心烦热。舌红少苔，脉细数无力。\n\n【辨证】气阴两虚，心神失养。\n【治法】益气养阴，宁心安神。\n【方药】生脉散合酸枣仁汤加减（太子参20g、麦冬15g、五味子10g、酸枣仁30g(打碎)、知母10g、茯神15g、川芎10g、甘草6g、夜交藤30g、合欢皮15g）。\n\n【二诊】服药7剂后，夜间能入睡4-5小时，心悸气短减轻。效不更方，继服14剂，睡眠基本恢复正常。"
  },
];

export default function Heritage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);
  const navigate = useNavigate();

  if (selectedCase) {
    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
        <div className="relative z-10">
          <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
          <button 
            onClick={() => setSelectedCase(null)}
            className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold text-[#333333] tracking-wide flex-1">医案详情</h1>
        </div>

        <div className="px-4 py-6 space-y-4">
          <div className="rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br from-[#2D5A4A] to-[#3A705C] shadow-md">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000&auto=format&fit=crop')] bg-cover mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 rounded-full text-xs bg-white/20 text-white tracking-wide backdrop-blur-sm">
                  {selectedCase.doctor}
                </div>
                <div className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 tracking-wide backdrop-blur-sm">
                  {selectedCase.date}
                </div>
              </div>
              <h2 className="text-lg mb-3 font-bold text-white tracking-wide">
                {selectedCase.title}
              </h2>
              <div className="px-3 py-1 rounded-full inline-block text-xs mb-3 bg-[#E8F5F0]/20 text-white tracking-wide backdrop-blur-sm border border-white/10">
                {selectedCase.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCase.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80 tracking-wide backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <h3 className="text-sm mb-3 font-bold text-[#2D5A4A] tracking-wide">医案摘要与分析</h3>
            <p className="text-sm leading-relaxed text-[#333333] tracking-wide whitespace-pre-line">
              {selectedCase.summary}
            </p>
          </div>

          <div className="rounded-2xl p-4 bg-[#E8F5F0]/50 backdrop-blur-md border border-[#B8D8C8]/30 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="w-5 h-5 text-[#8B6E58]" />
              <h3 className="text-sm font-bold text-[#8B6E58] tracking-wide">名医思想传承</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666] tracking-wide mb-4">
              本医案辨证思想来源于名老中医临床经验总结，体现了中医独特的学术思想和诊疗特色，强调辨证求因，审因论治。
            </p>
            <button
              onClick={() => navigate('/heritage/eval', { state: { case: selectedCase } })}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B6E58] to-[#A08570] text-white text-sm font-bold tracking-wider shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <Medal className="w-4 h-4" />
              进入传承评价
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F5] pt-12 px-4 pb-24 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90 fixed" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl text-[#2D5A4A] font-serif tracking-widest mb-2">名医经验库</h1>
          <p className="text-xs text-[#666666] tracking-wider">医案分析与范例检索</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            onClick={() => navigate('/heritage/chat')}
            className="rounded-2xl p-4 relative overflow-hidden bg-gradient-to-br from-[#B8D8C8] to-[#9CBDB0] shadow-md cursor-pointer active:scale-95 transition-transform flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 mb-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#2D5A4A]" />
            </div>
            <h3 className="text-sm text-[#2D5A4A] font-bold mb-1 tracking-wide">AI智能学习</h3>
            <p className="text-[10px] text-[#2D5A4A]/80 tracking-wide leading-tight">输入体质症状<br/>学习名医思路</p>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </div>

          <div 
            onClick={() => navigate('/heritage/eval')}
            className="rounded-2xl p-4 relative overflow-hidden bg-gradient-to-br from-[#E8D8B8] to-[#D8C8A8] shadow-md cursor-pointer active:scale-95 transition-transform flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 mb-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <Medal className="w-5 h-5 text-[#8B6E58]" />
            </div>
            <h3 className="text-sm text-[#8B6E58] font-bold mb-1 tracking-wide">传承评价</h3>
            <p className="text-[10px] text-[#8B6E58]/80 tracking-wide leading-tight">模拟诊疗沟通<br/>比对名医路径</p>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </div>
        </div>

        <div className="mb-6">
          <div className="rounded-full px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm">
            <Search className="w-5 h-5 text-[#2D5A4A]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索医案、名医、证型..."
              className="flex-1 text-sm border-none outline-none bg-transparent text-[#333333] placeholder:text-[#999999] tracking-wide"
            />
          </div>
        </div>

        <div className="space-y-3">
          {cases.filter(c => c.title.includes(searchQuery) || c.doctor.includes(searchQuery) || c.syndrome.includes(searchQuery)).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className="rounded-2xl p-4 bg-white/70 backdrop-blur-md border border-[#B8D8C8]/40 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-white/90"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#333333] mb-1 tracking-wide">{item.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#8B6E58] mb-2">
                    <UserCircle className="w-3 h-3" />
                    <span>{item.doctor} · {item.date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B8D8C8] flex-shrink-0 mt-1" />
              </div>
              <div className="px-3 py-1 rounded-full inline-block text-[10px] bg-[#E8F5F0] text-[#2D5A4A] border border-[#B8D8C8]/30 mb-2 tracking-wider">
                {item.syndrome}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full text-[10px] bg-[#F8F9F5] border border-[#EAEAEA] text-[#666666] tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
