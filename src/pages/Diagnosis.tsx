import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Info, Sparkles, ChevronLeft, ClipboardList, Pill, Camera, Video, X, ChevronDown, ArrowRight } from "lucide-react";
import { GoogleGenAI, Chat } from "@google/genai";
import { cn } from "@/src/lib/utils";
import { useNavigate } from "react-router-dom";

let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("GoogleGenAI initialization skipped: API Key missing or invalid.");
}

type DiagnosisData = {
  tcm: string;
  treatmentPrinciple: string;
  prescription: {
    name: string;
    herbs: { name: string; dosage: string }[];
    usage: string;
  };
  advice: string;
  thinkingProcess: string[];
};

type Attachment = {
  type: 'image' | 'video';
  url: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
  diagnosisData?: DiagnosisData;
  thinkingSteps?: string[];
  isThinking?: boolean;
  isThinkingExpanded?: boolean;
};

const mockAttachmentDiagnosis: DiagnosisData = {
  tcm: "脾虚湿盛证",
  treatmentPrinciple: "健脾化湿",
  prescription: {
    name: "参苓白术散加减",
    herbs: [
      { name: "党参", dosage: "15g" },
      { name: "白术", dosage: "15g" },
      { name: "茯苓", dosage: "15g" },
      { name: "山药", dosage: "15g" },
      { name: "薏苡仁", dosage: "20g" },
      { name: "砂仁", dosage: "6g(后下)" },
      { name: "桔梗", dosage: "6g" },
      { name: "甘草", dosage: "6g" }
    ],
    usage: "水煎服，日一剂，早晚温服。"
  },
  advice: "【饮食建议】宜清淡，忌食生冷、油腻、甜腻之品，可多食山药、薏米等健脾化湿之物。\n【作息建议】规律作息，避免熬夜，保证充足睡眠，注意腹部保暖。\n【运动建议】适当增加和缓运动，如快走、太极拳、八段锦，以助脾胃运化，微微出汗即可。\n【复诊建议】服药5剂后复诊，根据大便成形情况及舌苔变化调整处方。",
  thinkingProcess: [
    "【望诊分析】通过您上传的图片观察，面色微黄少华；舌体胖大，边缘可见明显齿痕，舌苔白腻。此乃脾虚湿盛之典型舌象。",
    "【脉诊分析】通过您上传的脉诊视频/动态，结合您的描述，推断脉象多见濡缓或沉细，提示脾胃虚弱，气血生化不足。",
    "【综合辨证】结合您的症状与四诊信息，脾虚失运，水湿内停，泛溢肌肤则面色黄，上泛舌本则舌胖大有齿痕、苔白腻。",
    "【治法确立】证属脾虚湿盛。当以健脾益气、渗湿止泻为基本大法，方选参苓白术散加减。"
  ]
};

const mockDiagnoses: Record<string, DiagnosisData> = {
  "患者男，35岁，IT从业者，长夏就诊。失眠6个月，入睡困难，早醒。伴头晕耳鸣，腰膝酸软，盗汗。舌红少苔，脉细数。": {
    tcm: "心肾不交，阴虚火旺",
    treatmentPrinciple: "滋阴降火，交通心肾",
    prescription: {
      name: "黄连阿胶汤加减",
      herbs: [
        { name: "黄连", dosage: "6g" },
        { name: "黄芩", dosage: "10g" },
        { name: "白芍", dosage: "15g" },
        { name: "阿胶", dosage: "10g" },
        { name: "枸杞子", dosage: "15g" },
        { name: "菊花", dosage: "10g" },
        { name: "浮小麦", dosage: "30g" },
        { name: "煅牡蛎", dosage: "30g" },
        { name: "杜仲", dosage: "15g" },
        { name: "牛膝", dosage: "15g" }
      ],
      usage: "水煎服，日一剂，早晚温服。阿胶烊化，煅牡蛎先煎。先开7剂。"
    },
    advice: "【饮食建议】忌辛辣、烟酒、浓茶咖啡，宜食百合、莲子等清心安神之品。\n【作息建议】规律作息，晚上11点前入睡，睡前温水泡脚，可按揉涌泉穴引火归元。\n【运动建议】适当进行八段锦、瑜伽等柔和运动，避免剧烈运动耗伤阴液。\n【复诊建议】7天后复诊，重点观察睡眠时间是否延长、盗汗是否减少，以便调整用药。",
    thinkingProcess: [
      "【第一步：整体审察】\n│\n├─ 天时：长夏（湿热交蒸）→ 易生烦热，扰动心神\n├─ 地理：南方（湿热）→ 湿热易阻滞气机\n└─ 人：35岁男性，IT从业者（久坐熬夜，耗伤肝肾）→ 素体阴虚火旺，加之工作压力大，心神失养",
      "【第二步：四诊合参，抓主症】\n│\n├─ 望诊：舌红少苔 → 阴虚内热之象\n├─ 闻诊：语声低微，精神疲惫 → 提示正气不足\n├─ 问诊核心：入睡困难、早醒（心神不宁）、头晕耳鸣、腰膝酸软（肾精亏虚）、盗汗（阴虚内热）\n└─ 切诊：脉细数 → 细主阴虚，数主虚热 → 脉症合参，属阴虚火旺",
      "【第三步：病机层次化】\n│\n├─ 病性：阴虚为本，火旺为标\n├─ 病位：心（主神明）、肾（藏精生髓）\n├─ 病势：\n│   ├─ 标本：心肾不交，水火不济 → 滋阴降火，交通心肾\n│   └─ 虚实：正虚（肾阴虚）为主，邪实（心火旺）次之 → 补泻兼施，以补为主\n└─ 病机关键词：心肾不交，阴虚火旺",
      "【第四步：体质与久病演变】\n│\n├─ 体质底色：阴虚质（舌脉+职业+年龄）\n├─ 当前状态：肾水不足，心火偏亢\n└─ 预判演变：\n    ├─ 若再失治：阴损及阳，出现畏寒肢冷等阴阳两虚证\n    ├─ 若过用苦寒：更伤脾胃，变生他病\n    └─ 若久病不愈：精血枯竭，出现早衰之象",
      "【第五步：方证相应】\n│\n├─ 经典条文检索：\n│   ├─ 《伤寒论》：“少阴病，得之二三日以上，心中烦，不得卧，黄连阿胶汤主之。”\n│   └─ 《金匮要略》：“虚劳虚烦不得眠，酸枣仁汤主之。”\n├─ 方证对应：\n│   ├─ 黄连阿胶汤：适用于阴虚火旺，心烦失眠 → 高度契合\n│   └─ 酸枣仁汤：适用于肝血不足，虚烦失眠 → 本例偏于心肾不交，暂不选用\n└─ 加减化裁：\n    ├─ 头晕耳鸣 → 加枸杞子、菊花（滋补肝肾，清利头目）\n    ├─ 盗汗明显 → 加浮小麦、煅牡蛎（固表敛汗）\n    └─ 腰膝酸软 → 加杜仲、牛膝（补益肝肾，强筋健骨）",
      "【第六步：动态方案与医嘱】\n│\n├─ 处方：黄连阿胶汤加减\n│   ├─ 黄连6g，黄芩10g，白芍15g，阿胶10g（烊化）\n│   ├─ 加枸杞子15g，菊花10g（清肝明目）\n│   ├─ 加浮小麦30g，煅牡蛎30g（先煎）（敛汗固涩）\n│   └─ 加杜仲15g，牛膝15g（强健腰膝）\n├─ 剂数：7剂，水煎服\n├─ 复诊时机：7天后\n│   └─ 复诊时重点观察：睡眠时间是否延长、盗汗是否减少、腰酸是否缓解；若心烦减，则减黄连、黄芩，加熟地、山药以填精补髓\n└─ 生活指导：\n    ├─ 忌辛辣、烟酒、浓茶咖啡\n    ├─ 睡前温水泡脚，可按揉涌泉穴\n    └─ 规律作息，避免熬夜，适当进行八段锦等柔和运动",
      "【第七步：奇经络病维度（远期预案）】\n│\n└─ 当前未到启用时机（病程6个月，尚未严重及于奇经）\n    └─ 若半年后仍不愈，出现健忘、神情呆滞 → 考虑督脉空虚，加入鹿角胶、龟板胶、紫河车等血肉有情之品，填精益髓。"
    ]
  },
  "患者女，52岁，北方教师，秋季就诊。咳嗽3个月，咽痒，痰少而黏，夜间及晨起加重。伴口干，心烦，睡眠差，大便偏干。舌红少苔，脉细数。": {
    tcm: "肺阴亏虚，燥热内蕴，风邪留恋",
    treatmentPrinciple: "滋阴润燥，清热祛风",
    prescription: {
      name: "沙参麦冬汤加减",
      herbs: [
        { name: "沙参", dosage: "15g" },
        { name: "麦冬", dosage: "12g" },
        { name: "玉竹", dosage: "10g" },
        { name: "天花粉", dosage: "10g" },
        { name: "桑叶", dosage: "6g" },
        { name: "生甘草", dosage: "6g" },
        { name: "蝉蜕", dosage: "6g" },
        { name: "僵蚕", dosage: "10g" },
        { name: "百合", dosage: "15g" },
        { name: "知母", dosage: "10g" },
        { name: "瓜蒌仁", dosage: "12g" }
      ],
      usage: "水煎服，日一剂，早晚温服。先开5剂。"
    },
    advice: "【饮食建议】忌辛辣、烧烤、温燥之品，可用梨皮、麦冬泡水代茶饮，多食润肺生津之物。\n【作息建议】避免用嗓过度，保持室内空气湿润，保证充足睡眠以养阴。\n【运动建议】可进行散步、慢跑等轻度有氧运动，增强体质，但避免在干燥冷空气中剧烈运动。\n【复诊建议】5天后复诊，观察咽痒、干咳及夜间睡眠改善情况。",
    thinkingProcess: [
      "【第一步：整体审察】\n│\n├─ 天时：秋季（燥气当令）→ 提示燥邪犯肺的可能\n├─ 地理：北方（干燥）→ 燥象更易出现\n└─ 人：52岁女性，教师（用嗓多，阴伤基础）→ 素体肺阴不足，加之外燥引动",
      "【第二步：四诊合参，抓主症】\n│\n├─ 望诊：舌红少苔 → 阴虚内热之象\n├─ 闻诊：咳声清脆、少痰 → 提示燥咳或阴虚咳\n├─ 问诊核心：咽痒（风）、夜间晨起加重（与体位、时间相关，多属阴虚或痰阻）、病程长（3个月，已入慢性）\n└─ 切诊：脉细数 → 细主阴虚，数主虚热 → 脉症一致，排除表证",
      "【第三步：病机层次化】\n│\n├─ 病性：阴虚为本，燥热为标，夹有风邪（咽痒）\n├─ 病位：肺（主气司呼吸，咽喉为肺之门户），兼及肾（久病及肾，金水相生）\n├─ 病势：\n│   ├─ 标本：肺阴虚为本，燥热风邪为标 → 急则治标？缓则治本？\n│   │   └─ 患者病程长，无明显急性感染，应以滋阴润燥为主，佐以祛风清热\n│   └─ 虚实：正虚（阴虚）为主，邪实（燥、风、虚热）次之 → 七分扶正，三分祛邪\n└─ 病机关键词：肺阴亏虚，燥热内蕴，风邪留恋",
      "【第四步：体质与久病演变】\n│\n├─ 体质底色：阴虚质（舌脉+职业+年龄）\n├─ 当前状态：阴虚燥热，风邪未净\n└─ 预判演变：\n    ├─ 若再失治：阴虚加重，可致虚火灼津成痰，或伤及肺络（干咳带血丝）\n    ├─ 若过用辛燥：更伤阴液，咳反加剧\n    └─ 若久病不愈：金不生水，出现腰酸、潮热等肾阴虚证",
      "【第五步：方证相应】\n│\n├─ 经典条文检索：\n│   ├─ 《温病条辨》：“燥伤肺胃阴分，或热或咳者，沙参麦冬汤主之。”\n│   └─ 《医学心悟》：“肺燥咳嗽，干咳无痰，宜清燥救肺汤。”\n├─ 方证对应：\n│   ├─ 沙参麦冬汤：适用于肺胃阴伤，干咳少痰，咽干口渴 → 高度契合\n│   └─ 清燥救肺汤：适用于燥热较重，气阴两伤，咳喘甚者 → 本例热象不重，暂不选用\n└─ 加减化裁：\n    ├─ 咽痒明显 → 加蝉蜕、僵蚕（祛风止痒）\n    ├─ 心烦失眠 → 加百合、知母（清心安神）\n    └─ 大便干 → 加瓜蒌仁、杏仁（润肠降气）",
      "【第六步：动态方案与医嘱】\n│\n├─ 处方：沙参麦冬汤加减\n│   ├─ 沙参15g，麦冬12g，玉竹10g，天花粉10g\n│   ├─ 桑叶6g，生甘草6g\n│   ├─ 加蝉蜕6g，僵蚕10g（祛风利咽）\n│   ├─ 加百合15g，知母10g（清心除烦）\n│   └─ 瓜蒌仁12g（润肠通便）\n├─ 剂数：5剂，水煎服\n├─ 复诊时机：5天后\n│   └─ 复诊时重点观察：咽痒是否减、大便是否通、夜眠是否改善；若燥热减，则减桑叶、蝉蜕，加山药、五味子以益气敛阴\n└─ 生活指导：\n    ├─ 忌辛辣、烧烤、温燥之品\n    ├─ 可用梨皮、麦冬泡水代茶\n    └─ 避免用嗓过度，保证睡眠",
      "【第七步：奇经络病维度（远期预案）】\n│\n└─ 当前未到启用时机（病程3个月，未入络、未及奇经）\n    └─ 若半年后仍不愈，出现潮热盗汗、腰酸耳鸣 → 考虑金水相生法，加入生地、山萸肉、五味子，或改用麦味地黄丸合百合固金汤。"
    ]
  },
  "患者男，40岁，岭南高管，夏季就诊。烧心胀满，舌黄厚腻，脉弦滑数。": {
    tcm: "湿热中阻，肝胃不和证",
    treatmentPrinciple: "辛开苦降，疏肝和胃，清热化湿",
    prescription: {
      name: "半夏泻心汤合四逆散加减",
      herbs: [
        { name: "法半夏", dosage: "12g" },
        { name: "黄芩", dosage: "10g" },
        { name: "黄连", dosage: "3g" },
        { name: "干姜", dosage: "6g" },
        { name: "党参", dosage: "10g" },
        { name: "柴胡", dosage: "12g" },
        { name: "白芍", dosage: "15g" },
        { name: "枳实", dosage: "10g" },
        { name: "炙甘草", dosage: "6g" }
      ],
      usage: "水煎服，日一剂，早晚温服。先开3剂。"
    },
    advice: "【饮食建议】饮食清淡，忌食辛辣肥甘厚味、冰冷之品及酒类，减轻脾胃负担。\n【作息建议】调节情志，缓解工作压力，避免熬夜，保持心情舒畅。\n【运动建议】饭后适度散步，或进行八段锦练习，促进气机升降和胃肠蠕动。\n【复诊建议】3剂后务必复诊，根据烧心胀满及舌苔厚腻消退情况调整用药。",
    thinkingProcess: [
      "【时空】夏季+岭南+高管压力 → 暑湿+肝郁",
      "【四诊】舌黄厚腻+脉弦滑数+烧心胀满 → 湿热中阻+肝胃不和",
      "【病机】本虚标实（脾虚为本，湿热气郁为标）→ 七分祛邪三分扶正",
      "【体质】痰湿质为底 → 用药避免滋腻，以辛开苦降为法",
      "【方证】半夏泻心汤证（心下痞）+四逆散证（脉弦）→ 两方合裁",
      "【动态】3剂后复诊 → 湿热减则减苦寒，增健脾",
      "【预后】远期防入络/入奇经 → 已做预警，暂不启用"
    ]
  },
  "患者男，45岁。胃脘胀痛连及两胁，伴嗳气频繁1个月，加重3天。纳差，口干不欲饮，大便时干时稀，睡眠欠佳。舌质淡红，苔薄白微腻，脉弦细。": {
    tcm: "胃痛（肝胃不和证）",
    treatmentPrinciple: "疏肝理气，和胃止痛",
    prescription: {
      name: "柴胡疏肝散加减",
      herbs: [
        { name: "柴胡", dosage: "10g" },
        { name: "白芍", dosage: "15g" },
        { name: "枳壳", dosage: "10g" },
        { name: "炙甘草", dosage: "6g" },
        { name: "香附", dosage: "10g" },
        { name: "川芎", dosage: "10g" },
        { name: "陈皮", dosage: "10g" },
        { name: "佛手", dosage: "10g" }
      ],
      usage: "水煎服，日一剂，早晚温服。"
    },
    advice: "【饮食建议】饮食宜清淡易消化，忌生冷、辛辣、油腻之品，少食多餐。\n【作息建议】保持心情舒畅，避免情绪激动和生闷气，规律作息，避免熬夜。\n【运动建议】可进行太极拳、散步等舒缓运动，有助于疏肝理气。\n【复诊建议】服药7剂后复诊，观察胃脘胀痛及嗳气缓解情况。",
    thinkingProcess: [
      "初步分析：患者中年男性，主诉胃脘胀痛连及两胁，伴嗳气频繁，病程1个月。病位在胃，与肝密切相关。",
      "舌脉互参：舌质淡红，苔薄白微腻，脉弦细。弦脉主肝病、痛证，提示气机不利。",
      "病机推演：工作压力大导致肝气郁结，肝木克伐脾土，胃失和降，气机阻滞，故见胀痛、嗳气。",
      "治法确立：证属肝胃不和。当以疏肝理气、和胃止痛为基本大法。"
    ]
  },
  "患者女，32岁。平素怕冷，手足不温。近半月来神疲乏力，少气懒言，食欲不振，食后腹胀，大便溏薄。舌淡胖，边有齿痕，苔白滑，脉沉弱。": {
    tcm: "脾虚（脾阳虚证）",
    treatmentPrinciple: "温中健脾，益气和胃",
    prescription: {
      name: "理中丸合四君子汤加减",
      herbs: [
        { name: "党参", dosage: "15g" },
        { name: "白术", dosage: "15g" },
        { name: "干姜", dosage: "10g" },
        { name: "炙甘草", dosage: "6g" },
        { name: "茯苓", dosage: "15g" },
        { name: "陈皮", dosage: "10g" },
        { name: "砂仁", dosage: "6g(后下)" }
      ],
      usage: "水煎服，日一剂，早晚温服。"
    },
    advice: "【饮食建议】饮食宜温热易消化，忌食生冷瓜果、冷饮，可适当食用生姜、大枣等温中之品。\n【作息建议】注意保暖，尤其是腹部及下肢保暖，避免受寒，保证充足睡眠。\n【运动建议】适当进行和缓的运动，如太极拳、八段锦，动则生阳，但不宜大汗淋漓。\n【复诊建议】服药7天后复诊，观察怕冷、乏力及大便成形情况。",
    thinkingProcess: [
      "初步分析：患者青年女性，平素怕冷，神疲乏力，食后腹胀，大便溏薄。病位在脾胃，属虚寒之象。",
      "舌脉互参：舌淡胖，边有齿痕，苔白滑，脉沉弱。此乃典型的脾阳不振、水湿内停之象。",
      "病机推演：脾阳虚衰，温煦失职，故见怕冷、手足不温；健运失司，水湿不化，故见便溏、舌胖大有齿痕。",
      "治法确立：证属脾阳虚证。当以温中健脾、益气和胃为基本大法。"
    ]
  },
  "患者男，60岁。头晕耳鸣，腰膝酸软，失眠多梦，五心烦热，盗汗，口燥咽干。舌红少苔，脉细数。": {
    tcm: "眩晕（肝肾阴虚证）",
    treatmentPrinciple: "滋补肝肾，育阴潜阳",
    prescription: {
      name: "六味地黄丸合杞菊地黄丸加减",
      herbs: [
        { name: "熟地黄", dosage: "15g" },
        { name: "山茱萸", dosage: "12g" },
        { name: "山药", dosage: "15g" },
        { name: "泽泻", dosage: "10g" },
        { name: "牡丹皮", dosage: "10g" },
        { name: "茯苓", dosage: "15g" },
        { name: "枸杞子", dosage: "15g" },
        { name: "菊花", dosage: "10g" }
      ],
      usage: "水煎服，日一剂，早晚温服。"
    },
    advice: "【饮食建议】饮食宜清淡，多食滋阴润燥之品，如百合、银耳、黑芝麻、桑葚等。\n【作息建议】节制房事，避免过度劳累，保持情绪稳定，避免急躁恼怒。\n【运动建议】适合散步、太极拳等轻柔运动，避免剧烈运动和头部剧烈转动。\n【复诊建议】服药14天后复诊，观察头晕耳鸣、失眠及五心烦热改善情况。",
    thinkingProcess: [
      "初步分析：患者老年男性，头晕耳鸣，腰膝酸软，失眠多梦，五心烦热。病位在肝肾，属阴虚内热之象。",
      "舌脉互参：舌红少苔，脉细数。红舌少苔为阴虚之征，细数脉主阴虚内热。",
      "病机推演：年老体衰，肾精亏虚，水不涵木，肝阳上亢，故见头晕耳鸣；阴虚生内热，故见五心烦热、盗汗。",
      "治法确立：证属肝肾阴虚。当以滋补肝肾、育阴潜阳为基本大法。"
    ]
  }
};

const quickReplies = [
  "畏寒肢冷", "食欲不振", "失眠多梦", "舌淡苔白", "脉沉细", "头晕耳鸣", "心悸气短", "大便溏薄"
];

export default function Diagnosis() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好，我是AI中医辅助诊疗助手。请详细描述患者的症状、舌象、脉象以及其他相关信息，我将为您提供辨证分析参考。",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!ai) return;
    try {
      chatRef.current = ai.chats.create({
        model: "gemini-3-pro-preview",
        config: {
          systemInstruction: "你是一个经验丰富的老中医。请根据用户提供的症状、舌象、脉象等信息，进行中医辨证分析。请给出：1. 证型 2. 治法 3. 推荐方剂及加减 4. 疾病养护建议（必须包含：饮食建议、作息建议、运动建议、复诊建议）。请使用专业的中医术语，但解释要清晰易懂。语气要温和、专业。",
        },
      });
    } catch (e) {
      console.error("Failed to create chat:", e);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAttachments(prev => [...prev, { type, url }]);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].url);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: "user", 
      content: input.trim(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input.trim();
    const hasAttachments = attachments.length > 0;
    
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    let mockData = mockDiagnoses[currentInput];
    if (hasAttachments) {
      mockData = mockAttachmentDiagnosis;
    }

    if (mockData) {
      const assistantId = (Date.now() + 1).toString();
      
      setMessages((prev) => [...prev, {
        id: assistantId,
        role: "assistant",
        content: "",
        thinkingSteps: [],
        isThinking: true,
        isThinkingExpanded: true
      }]);

      const steps = mockData.thinkingProcess;
      let currentStep = 0;
      
      const intervalTime = Math.max(500, Math.floor(8000 / steps.length));
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          const stepToAdd = steps[currentStep];
          setMessages((prev) => prev.map(msg => {
            if (msg.id === assistantId) {
              return {
                ...msg,
                thinkingSteps: [...(msg.thinkingSteps || []), stepToAdd]
              };
            }
            return msg;
          }));
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setMessages((prev) => prev.map(msg => {
              if (msg.id === assistantId) {
                return {
                  ...msg,
                  content: "根据您提供的患者信息，我进行了中医辨证分析，以下是诊疗建议：",
                  diagnosisData: mockData,
                  isThinking: false
                };
              }
              return msg;
            }));
            setIsLoading(false);
          }, 500);
        }
      }, intervalTime);
      return;
    }

    if (!chatRef.current) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "抱歉，系统未配置有效的 API Key，无法连接到 AI 服务。如果您在 GitHub Pages 上预览，请在本地环境运行并配置 GEMINI_API_KEY。",
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg.content });
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text || "抱歉，我无法给出分析，请稍后再试。",
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "抱歉，系统遇到了一些问题，请检查网络或稍后再试。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput((prev) => prev + (prev && !prev.endsWith("，") && !prev.endsWith("。") ? "，" : "") + reply);
  };

  const toggleThinking = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isThinkingExpanded: !m.isThinkingExpanded } : m));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5] pb-28 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/bg-qingming.jpg')] bg-cover bg-center opacity-90" />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-[#B8D8C8]/40 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#2D5A4A] active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#E8F5F0] flex items-center justify-center border border-[#B8D8C8]/30">
          <Bot className="w-6 h-6 text-[#2D5A4A]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-[#333333] tracking-wide">智能辨证助手</h1>
          <p className="text-xs text-[#666666] tracking-wide">AI辅助中医诊断分析</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        {/* Disclaimer */}
        <div className="bg-[#E8F5F0]/50 border border-[#B8D8C8]/40 rounded-xl p-3 flex items-start gap-2 mb-4 backdrop-blur-sm">
          <Info className="w-4 h-4 text-[#2D5A4A] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#2D5A4A]/80 leading-relaxed">
            免责声明：本系统的分析结果仅供临床医生参考，不能替代专业医疗诊断。请结合患者实际情况进行辨证论治。
          </p>
        </div>

        {/* Examples */}
        {messages.length === 1 && (
          <div className="mt-6 mb-4">
            <div className="flex items-center gap-2 mb-3 text-[#8B6E58]">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">您可以尝试输入以下典型病例：</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                "患者男，35岁，IT从业者，长夏就诊。失眠6个月，入睡困难，早醒。伴头晕耳鸣，腰膝酸软，盗汗。舌红少苔，脉细数。",
                "患者女，52岁，北方教师，秋季就诊。咳嗽3个月，咽痒，痰少而黏，夜间及晨起加重。伴口干，心烦，睡眠差，大便偏干。舌红少苔，脉细数。",
                "患者男，40岁，岭南高管，夏季就诊。烧心胀满，舌黄厚腻，脉弦滑数。",
                "患者男，45岁。胃脘胀痛连及两胁，伴嗳气频繁1个月，加重3天。纳差，口干不欲饮，大便时干时稀，睡眠欠佳。舌质淡红，苔薄白微腻，脉弦细。"
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(example)}
                  className="text-left p-3 rounded-xl bg-white/60 border border-[#B8D8C8]/30 hover:bg-[#E8F5F0]/80 transition-colors text-sm text-[#666666] leading-relaxed shadow-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                msg.role === "user"
                  ? "rounded-br-sm bg-[#2D5A4A] text-white"
                  : "rounded-bl-sm bg-white/90 border border-[#B8D8C8]/40 text-[#333333] backdrop-blur-sm"
              )}
            >
              {/* Thinking Process */}
              {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                <div className="mb-3 bg-[#F8F9F5] rounded-xl border border-[#EAEAEA] overflow-hidden">
                  <button 
                    onClick={() => toggleThinking(msg.id)}
                    className="w-full flex items-center justify-between p-3 bg-white/50 hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[#8B6E58]">
                      {msg.isThinking ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                      <span className="text-xs font-bold">{msg.isThinking ? "名老中医深度思考中..." : "名老中医思维链 (理法方药)"}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-[#8B6E58] transition-transform", msg.isThinkingExpanded ? "rotate-180" : "")} />
                  </button>
                  
                  {msg.isThinkingExpanded && (
                    <div className="p-3 pt-1">
                      <div className="relative border-l-2 border-[#B8D8C8]/40 ml-2 pl-4 space-y-4 py-2">
                        {msg.thinkingSteps.map((step, idx) => {
                          if (!step) return null;
                          
                          const titleMatch = step.match(/^【(.*?)】/);
                          if (titleMatch) {
                            const title = titleMatch[1];
                            const content = step.replace(/^【.*?】\n?/, '');
                            
                            if (!content.includes('\n') && content.includes('→')) {
                              const parts = content.split('→');
                              return (
                                <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A4A] ring-4 ring-[#F8F9F5]" />
                                  <div className="bg-white rounded-lg p-2.5 shadow-sm border border-[#EAEAEA]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-[10px] font-bold text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{title}</span>
                                      <span className="text-xs text-[#666666] font-medium">{parts[0].trim()}</span>
                                    </div>
                                    <div className="flex items-start gap-1.5 mt-1.5 pt-1.5 border-t border-dashed border-[#EAEAEA]">
                                      <ArrowRight className="w-3.5 h-3.5 text-[#2D5A4A] mt-0.5 flex-shrink-0" />
                                      <span className="text-xs font-bold text-[#2D5A4A]">{parts[1].trim()}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A4A] ring-4 ring-[#F8F9F5]" />
                                  <div className="bg-white rounded-lg p-3 shadow-sm border border-[#EAEAEA]">
                                    <div className="mb-2">
                                      <span className="text-[10px] font-bold text-white bg-[#8B6E58] px-1.5 py-0.5 rounded-sm">{title}</span>
                                    </div>
                                    <div className="text-xs text-[#666666] leading-relaxed whitespace-pre-wrap font-mono">
                                      {content}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          }

                          return (
                            <div key={idx} className="relative transition-opacity duration-500 opacity-100">
                              <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#B8D8C8] ring-4 ring-[#F8F9F5]" />
                              <div className="text-xs text-[#666666] leading-relaxed whitespace-pre-wrap">{step}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Attachments */}
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {msg.attachments.map((att, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                      {att.type === 'image' ? (
                        <img src={att.url} alt="attachment" className="w-full h-full object-cover" />
                      ) : (
                        <video src={att.url} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {msg.content && (
                <div className="text-sm leading-relaxed whitespace-pre-line tracking-wide">
                  {msg.content}
                </div>
              )}
              
              {msg.diagnosisData && (
                <div className="mt-4 space-y-3">
                  {/* 诊断与治法 */}
                  <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-sm border border-[#B8D8C8]/40">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardList className="w-4 h-4 text-[#2D5A4A]" />
                      <h3 className="font-bold text-[#333333] tracking-wide text-sm">诊断与治法</h3>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <span className="text-[#8B6E58] shrink-0 font-medium">中医辨证：</span>
                        <span className="text-[#333333] font-bold">{msg.diagnosisData.tcm}</span>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8D8C8]/40 to-transparent my-1" />
                      <div className="flex gap-2">
                        <span className="text-[#8B6E58] shrink-0 font-medium">治法原则：</span>
                        <span className="text-[#666666]">{msg.diagnosisData.treatmentPrinciple}</span>
                      </div>
                    </div>
                  </div>

                  {/* 处方 */}
                  <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-sm border border-[#B8D8C8]/40">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-[#2D5A4A]" />
                        <h3 className="font-bold text-[#333333] tracking-wide text-sm">推荐方剂</h3>
                      </div>
                      <span className="text-[10px] text-[#2D5A4A] bg-[#E8F5F0] px-2 py-1 rounded-md border border-[#B8D8C8]/30 font-medium">
                        {msg.diagnosisData.prescription.name}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3">
                      {msg.diagnosisData.prescription.herbs.map((herb, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-dashed border-[#B8D8C8]/40 pb-1">
                          <span className="text-[#333333] text-xs font-bold">{herb.name}</span>
                          <span className="text-[#8B6E58] text-[10px]">{herb.dosage}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-[#F8F9F5] p-2 rounded-lg text-[11px] text-[#666666] leading-relaxed border border-[#EAEAEA]">
                      <span className="font-medium text-[#8B6E58]">用法：</span>{msg.diagnosisData.prescription.usage}
                    </div>
                  </div>

                  {/* 医嘱 */}
                  <div className="bg-white/70 backdrop-blur-md rounded-xl p-3 shadow-sm border border-[#B8D8C8]/40">
                    <h3 className="font-bold text-[#333333] mb-1.5 text-xs tracking-wide">疾病养护建议</h3>
                    <p className="text-xs text-[#666666] leading-relaxed whitespace-pre-line">
                      {msg.diagnosisData.advice}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white/90 border border-[#B8D8C8]/40 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#2D5A4A] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-[#666666]">AI 正在辨证思考...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#B8D8C8]/40 z-20 flex flex-col pb-safe">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="flex gap-2 px-4 py-2 overflow-x-auto border-b border-[#EAEAEA]">
            {attachments.map((att, idx) => (
              <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#B8D8C8]/40 flex-shrink-0">
                {att.type === 'image' ? (
                  <img src={att.url} alt="upload" className="w-full h-full object-cover" />
                ) : (
                  <video src={att.url} className="w-full h-full object-cover" />
                )}
                <button
                  onClick={() => removeAttachment(idx)}
                  className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-white hover:bg-black/70"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none border-b border-[#EAEAEA]">
          <div className="flex items-center gap-1 text-[#8B6E58] text-xs font-medium mr-1 flex-shrink-0">
            <Sparkles className="w-3 h-3" />
            快捷输入:
          </div>
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#E8F5F0] border border-[#B8D8C8]/30 text-xs text-[#2D5A4A] hover:bg-[#B8D8C8]/20 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
        <div className="px-4 py-3 flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => handleFileUpload(e, 'image')}
          />
          <input
            type="file"
            accept="video/*"
            capture="environment"
            className="hidden"
            ref={videoInputRef}
            onChange={(e) => handleFileUpload(e, 'video')}
          />
          
          <button
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-[#2D5A4A] hover:bg-[#E8F5F0] rounded-full transition-colors flex-shrink-0"
            title="舌面诊 (拍照)"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={() => videoInputRef.current?.click()}
            className="p-2 text-[#2D5A4A] hover:bg-[#E8F5F0] rounded-full transition-colors flex-shrink-0"
            title="脉诊 (录像)"
          >
            <Video className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入症状或上传四诊影像..."
            className="flex-1 px-4 py-3 rounded-full text-sm border-none outline-none bg-[#F8F9F5] text-[#333333] tracking-wide placeholder:text-[#999999] focus:ring-1 focus:ring-[#B8D8C8]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={(!input.trim() && attachments.length === 0) || isLoading}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#2D5A4A] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-95"
          >
            <Send className="w-5 h-5 text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
