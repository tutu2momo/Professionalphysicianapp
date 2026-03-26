import { ArrowLeft, FileSearch, Activity, Brain, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CaseComparison() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-[#E8F5F0] text-[#2D5A4A] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-[#2D5A4A] tracking-wide">你可能需要查看</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Title Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 text-[#2D5A4A] transform translate-x-4 -translate-y-4">
            <FileSearch className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#2D5A4A] mb-2 tracking-wide">头痛病案 12 例对比</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">相似症候分析</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">临床经验</span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed">
              基于您近期的诊疗记录，系统为您整理了12例典型头痛病案的对比分析，涵盖外感与内伤两大类，旨在帮助您拓宽辨证思路。
            </p>
          </div>
        </div>

        {/* Symptom Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">核心症候分布</h3>
          </div>
          <div className="space-y-3">
            {[
              { type: "风寒头痛", count: 3, percentage: "25%", color: "bg-[#B8D8C8]" },
              { type: "肝阳上亢", count: 4, percentage: "33%", color: "bg-[#8B6E58]" },
              { type: "痰浊头痛", count: 3, percentage: "25%", color: "bg-[#2D5A4A]" },
              { type: "瘀血头痛", count: 2, percentage: "17%", color: "bg-[#E8F5F0]" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-20 text-xs font-medium text-[#333333]">{stat.type}</div>
                <div className="flex-1 h-2 bg-[#F8F9F5] rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.percentage }} />
                </div>
                <div className="w-8 text-right text-xs text-[#666666]">{stat.count}例</div>
              </div>
            ))}
          </div>
        </div>

        {/* 12 Cases Comparison Grouped */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">12例病案详情对比</h3>
          </div>
          <div className="space-y-8">
            {[
              {
                category: "风寒头痛",
                count: 3,
                markerColor: "bg-[#B8D8C8]",
                cases: [
                  { id: 1, title: "案例 1", tag: "川芎茶调散", complaint: "昨夜受凉后头痛连及项背，恶风畏寒，口不渴。", analysis: "痛势剧烈，遇风寒加重，苔薄白，脉浮紧。治宜疏风散寒止痛。" },
                  { id: 2, title: "案例 2", tag: "吴茱萸汤合方", complaint: "经期不慎吹风，巅顶头痛，伴恶寒发热，四肢不温。", analysis: "寒邪客于厥阴，脉沉紧。治宜温肝散寒，降逆止痛。" },
                  { id: 3, title: "案例 3", tag: "葛根汤加减", complaint: "冬季外出后突发前额痛，鼻塞流清涕，项背强几几。", analysis: "风寒犯阳明与太阳，苔白润。治宜解肌发表，生津舒筋。" },
                ]
              },
              {
                category: "肝阳上亢",
                count: 4,
                markerColor: "bg-[#8B6E58]",
                cases: [
                  { id: 4, title: "案例 4", tag: "天麻钩藤饮", complaint: "头痛眩晕，心烦易怒，面红目赤，口苦咽干。", analysis: "痛势胀裂，情绪激动时加重，脉弦有力。治宜平肝潜阳，息风止痛。" },
                  { id: 5, title: "案例 5", tag: "镇肝熄风汤", complaint: "绝经期偏头痛，伴耳鸣，睡眠差，腰膝酸软。", analysis: "肝肾阴虚，肝阳偏亢，舌红少苔。治宜滋阴潜阳，镇肝息风。" },
                  { id: 6, title: "案例 6", tag: "龙胆泻肝汤", complaint: "工作压力大，突发两侧头痛，口苦咽干，尿黄便秘。", analysis: "肝胆火旺，上扰清窍，脉弦数。治宜清泻肝胆实火。" },
                  { id: 7, title: "案例 7", tag: "丹栀逍遥散", complaint: "长期头晕胀痛，遇烦心事即发，面部烘热，胸胁胀满。", analysis: "气郁化火，肝阳上扰，舌红苔黄。治宜疏肝解郁，清热凉血。" },
                ]
              },
              {
                category: "痰浊头痛",
                count: 3,
                markerColor: "bg-[#2D5A4A]",
                cases: [
                  { id: 8, title: "案例 8", tag: "半夏白术天麻汤", complaint: "头痛昏蒙，胸脘满闷，呕恶痰涎，肢体困重。", analysis: "头痛如裹，伴有消化道症状，舌苔白腻，脉滑。治宜健脾化痰，降逆止痛。" },
                  { id: 9, title: "案例 9", tag: "苍附导痰丸", complaint: "肥胖体质，长期头重如裹，嗜睡，胸闷不舒。", analysis: "脾虚湿盛，痰浊上犯清窍。治宜燥湿化痰，理气开郁。" },
                  { id: 10, title: "案例 10", tag: "羌活胜湿汤", complaint: "阴雨天头痛加重，伴恶心，纳差，周身酸痛。", analysis: "湿浊中阻，清阳不升，外感湿邪。治宜祛风胜湿。" },
                ]
              },
              {
                category: "瘀血头痛",
                count: 2,
                markerColor: "bg-[#9CBDB0]",
                cases: [
                  { id: 11, title: "案例 11", tag: "血府逐瘀汤", complaint: "头痛经久不愈，痛处固定不移，痛如锥刺，夜间加重。", analysis: "痛有定处，舌质紫暗或有瘀斑，脉细涩。治宜活血化瘀，通络止痛。" },
                  { id: 12, title: "案例 12", tag: "通窍活血汤", complaint: "曾有头部外伤史，现遗留局部刺痛，健忘，失眠。", analysis: "跌仆损伤，瘀血阻络，清窍失养。治宜活血通窍。" },
                ]
              }
            ].map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-4">
                {/* Group Header */}
                <div className="flex items-center gap-3 border-b border-[#EAEAEA] pb-2">
                  <div className={`w-1.5 h-4 rounded-full ${group.markerColor}`} />
                  <h4 className="font-bold text-[#333333] text-[15px]">{group.category}</h4>
                  <span className="text-[10px] text-[#8B6E58] bg-[#F8F9F5] px-2 py-0.5 rounded-full border border-[#EAEAEA]">{group.count} 例</span>
                </div>
                
                {/* Cases in Group */}
                <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[7px] before:w-[2px] before:bg-[#F0F0F0]">
                  {group.cases.map(caseItem => (
                    <div key={caseItem.id} className="relative pl-6">
                      <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-white border-2 border-[#EAEAEA] flex items-center justify-center z-10">
                        <div className={`w-2 h-2 rounded-full ${group.markerColor}`} />
                      </div>
                      <div className="p-4 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-[#2D5A4A] text-sm">{caseItem.title}</h5>
                          <span className="text-[10px] text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{caseItem.tag}</span>
                        </div>
                        <p className="text-xs text-[#666666] leading-relaxed mb-2">
                          <strong className="text-[#333333]">主诉：</strong>{caseItem.complaint}
                        </p>
                        <p className="text-xs text-[#666666] leading-relaxed">
                          <strong className="text-[#333333]">辨证关键：</strong>{caseItem.analysis}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Points */}
        <div className="bg-gradient-to-br from-[#E8F5F0] to-[#F8F9F5] rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-[#2D5A4A]" />
            <h3 className="text-[15px] font-bold text-[#2D5A4A] tracking-wide">诊疗要点总结</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>辨外感内伤：</strong>外感头痛多起病急，痛势剧烈，伴表证；内伤头痛多起病缓，痛势绵绵，伴脏腑虚损证候。
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>辨疼痛部位：</strong>太阳头痛在后枕，阳明头痛在前额，少阳头痛在两侧，厥阴头痛在巅顶。
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#2D5A4A]/90 leading-relaxed">
                <strong>辨疼痛性质：</strong>胀痛多属肝阳，重痛多属痰湿，刺痛多属瘀血，隐痛多属气血亏虚。
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
