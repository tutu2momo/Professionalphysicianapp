import { ArrowLeft, FlaskConical, Leaf, BookOpen, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrescriptionDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-24 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-[#E8F5F0] text-[#2D5A4A] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-[#2D5A4A] tracking-wide">今日推荐方剂</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Title Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 text-[#2D5A4A] transform translate-x-4 -translate-y-4">
            <FlaskConical className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#2D5A4A] mb-2 tracking-wide">半夏白术天麻汤</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">化痰息风</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E8F5F0] text-xs text-[#2D5A4A] border border-[#B8D8C8]/30 font-medium">健脾祛湿</span>
            </div>
            <p className="text-sm text-[#666666] leading-relaxed">
              出自《医学心悟》，为治风痰眩晕之名方。主治脾胃气虚，痰浊内生，上逆犯扰清空，导致眩晕头痛等症。
            </p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">方剂组成</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "半夏", amount: "9g", role: "君药" },
              { name: "天麻", amount: "9g", role: "君药" },
              { name: "白术", amount: "9g", role: "臣药" },
              { name: "茯苓", amount: "9g", role: "臣药" },
              { name: "橘红", amount: "6g", role: "佐药" },
              { name: "甘草", amount: "3g", role: "使药" },
              { name: "生姜", amount: "1片", role: "引药" },
              { name: "大枣", amount: "2枚", role: "引药" }
            ].map((herb, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9F5] border border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#2D5A4A] text-sm">{herb.name}</span>
                  <span className="text-[10px] text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{herb.role}</span>
                </div>
                <span className="text-xs text-[#666666] font-mono">{herb.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Application */}
        <div className="bg-white rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#8B6E58]" />
            <h3 className="text-[15px] font-bold text-[#333333] tracking-wide">临床应用</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#666666] leading-relaxed">
                <strong className="text-[#333333]">现代医学适应症：</strong>常用于梅尼埃病、高血压、神经性眩晕、脑供血不足等属风痰上扰者。
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-1.5 flex-shrink-0" />
              <p className="text-sm text-[#666666] leading-relaxed">
                <strong className="text-[#333333]">辨证要点：</strong>眩晕，头痛，胸膈痞闷，恶心呕吐，舌苔白腻，脉弦滑。
              </p>
            </li>
          </ul>
        </div>

        {/* Master's Insights */}
        <div className="bg-gradient-to-br from-[#E8F5F0] to-[#F8F9F5] rounded-2xl p-5 border border-[#B8D8C8]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-[#2D5A4A]" />
            <h3 className="text-[15px] font-bold text-[#2D5A4A] tracking-wide">名医心得</h3>
          </div>
          <p className="text-sm text-[#2D5A4A]/90 leading-relaxed italic" style={{ fontFamily: '"SimSun", "STSong", "Songti SC", serif' }}>
            “无痰不作眩，无虚不作眩。”本方以半夏燥湿化痰，降逆止呕；天麻平肝息风，止头眩。二药合用，为治风痰眩晕之要药。临床应用时，若眩晕较甚，可加僵蚕、胆南星以增强化痰息风之效；若气虚明显，可加党参、黄芪以益气健脾。
          </p>
        </div>
      </div>
    </div>
  );
}
