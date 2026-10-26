export const catalogDate = '2026-10-26';
export const categories = [
  {
    "id": "games",
    "code": "01",
    "color": "#af5d49",
    "zh": "游戏与玩法",
    "en": "Games & Play",
    "description": {
      "zh": "从一个操作循环，长成可玩的作品。",
      "en": "From a simple loop to a playable experience."
    }
  },
  {
    "id": "ai",
    "code": "02",
    "color": "#47786c",
    "zh": "AI 与自动化",
    "en": "AI & Automation",
    "description": {
      "zh": "把模型、工具、证据与反馈串起来。",
      "en": "Connect models, tools, evidence, and feedback."
    }
  },
  {
    "id": "interactive",
    "code": "03",
    "color": "#51728f",
    "zh": "互动与空间",
    "en": "Interaction & Space",
    "description": {
      "zh": "让模拟、三维与数据变成可探索的界面。",
      "en": "Explore simulation, 3D, and data through interaction."
    }
  },
  {
    "id": "office",
    "code": "04",
    "color": "#a07a39",
    "zh": "金融与办公",
    "en": "Finance & Office",
    "description": {
      "zh": "把重复材料工作，做成清晰的流程。",
      "en": "Turn recurring document work into clear workflows."
    }
  },
  {
    "id": "knowledge",
    "code": "05",
    "color": "#7a6795",
    "zh": "知识与学习",
    "en": "Knowledge & Learning",
    "description": {
      "zh": "为想法、上下文与学习建立长期档案。",
      "en": "Build lasting records of ideas, context, and learning."
    }
  },
  {
    "id": "creative",
    "code": "06",
    "color": "#8c6868",
    "zh": "视觉与内容",
    "en": "Visuals & Content",
    "description": {
      "zh": "用一致的表达，把主题做成系列。",
      "en": "Give a subject a consistent visual and editorial voice."
    }
  }
] as const;
export const stages = {
  "published": {
    "zh": "公开展示",
    "en": "Public showcase"
  },
  "delivered": {
    "zh": "已有交付",
    "en": "Delivered"
  },
  "prototype": {
    "zh": "开发原型",
    "en": "Prototype"
  },
  "exploring": {
    "zh": "方案探索",
    "en": "Exploring"
  }
} as const;
export const projects = [
  {
    "slug": "alphaos",
    "category": "ai",
    "stage": "prototype",
    "started": "2026-07",
    "stack": [
      "React",
      "TypeScript",
      "Cloudflare D1",
      "Multi-Agent",
      "RAG"
    ],
    "zh": {
      "name": "WYX · 智能投研工作台",
      "summary": "从 AlphaOS 演进而来的基金研究与组合决策原型，把证据、一页纸研究、投委会讨论和投资记忆连在一起。",
      "problem": "研究材料分散、观点难以复核，需要一条从事实到决策的可追溯路径。",
      "flow": [
        "收集研究证据",
        "生成基金/公司一页纸",
        "多角色交叉讨论",
        "留存决策与复盘"
      ],
      "features": [
        "基金、公司与行业研究联动",
        "内部资料检索与来源分层",
        "多 Agent 投委会、组合与宏观视图"
      ],
      "status": "已有前后端、数据库与演示部署记录；后续更名 WYX。大陆访问与正式机构数据接入仍需完善。"
    },
    "en": {
      "name": "WYX · Research Workspace",
      "summary": "A fund-research and portfolio-decision prototype, evolved from AlphaOS, connecting evidence, research briefs, committee discussion, and investment memory.",
      "problem": "Scattered evidence and hard-to-audit opinions call for a traceable path from facts to decisions.",
      "flow": [
        "Gather evidence",
        "Build research briefs",
        "Debate across roles",
        "Record decisions and reviews"
      ],
      "features": [
        "Linked fund, company, and industry research",
        "Internal-document retrieval with source separation",
        "Multi-agent committee, portfolio, and macro views"
      ],
      "status": "Frontend, backend, database, and demo deployments exist. Later renamed WYX; mainland connectivity and institutional data integration remain work in progress."
    }
  },
  {
    "slug": "deepdesk",
    "category": "ai",
    "stage": "prototype",
    "started": "2026-07",
    "stack": [
      "LangChain",
      "DeepSeek",
      "Python",
      "Tool Calling"
    ],
    "zh": {
      "name": "DeepDesk · 本地 Agent 工作台",
      "summary": "用熟悉的聊天工作台组织模型对话、工具调用、动作确认和执行反馈。",
      "problem": "把一次聊天变成能看懂、能控制、能追踪的本地任务。",
      "flow": [
        "输入自然语言",
        "模型选择工具",
        "确认待执行动作",
        "查看结果与记录"
      ],
      "features": [
        "流式对话、模型切换与历史导出",
        "工作目录内的受控文件工具",
        "浏览器快照、执行反馈与审计记录"
      ],
      "status": "本地可运行原型；远程消息通道保留适配接口，使用时需自行配置。"
    },
    "en": {
      "name": "DeepDesk · Local Agent Desk",
      "summary": "A chat workspace for model conversations, tool calls, action approval, and execution feedback.",
      "problem": "Turn a conversation into a local task that is understandable, controllable, and traceable.",
      "flow": [
        "Describe a task",
        "Choose a tool",
        "Review the action",
        "Inspect results and logs"
      ],
      "features": [
        "Streaming chat, model switching, and history export",
        "Scoped local file tools",
        "Browser snapshots and execution audit logs"
      ],
      "status": "A runnable local prototype. Remote messaging adapters require separate configuration."
    }
  },
  {
    "slug": "openclaw-agent",
    "category": "ai",
    "stage": "prototype",
    "started": "2026-06",
    "stack": [
      "Python",
      "LangChain",
      "ReAct",
      "Telegram"
    ],
    "zh": {
      "name": "本地 ReAct 自动化 Agent",
      "summary": "从学习型原型开始，让自然语言经过工具循环完成文件检索、备注写入和网页摘要。",
      "problem": "理解 Agent 如何在观察、推理、调用工具和反馈之间循环。",
      "flow": [
        "发送任务",
        "读取环境",
        "调用文件/网页工具",
        "反馈并继续"
      ],
      "features": [
        "命令行、网页和 HTTP 入口",
        "Telegram 与 WhatsApp 通道适配",
        "限定工作目录和有限工具集"
      ],
      "status": "已有本地实现与教学材料。是独立学习项目，非 OpenClaw 官方项目。"
    },
    "en": {
      "name": "Local ReAct Automation Agent",
      "summary": "A learning prototype that uses a tool loop for file search, note writing, and webpage summaries.",
      "problem": "Make the observe, reason, act, and feedback loop concrete.",
      "flow": [
        "Send a task",
        "Observe context",
        "Call file/web tools",
        "Return feedback"
      ],
      "features": [
        "CLI, web, and HTTP entry points",
        "Telegram and WhatsApp adapters",
        "Scoped workspace and a limited tool set"
      ],
      "status": "Local implementation and teaching material exist. An independent learning project, not an official OpenClaw project."
    }
  },
  {
    "slug": "one-sentence-ledger",
    "category": "ai",
    "stage": "delivered",
    "started": "2026-06",
    "stack": [
      "Android",
      "NLP",
      "Personal finance"
    ],
    "zh": {
      "name": "一句账 · 自然语言记账",
      "summary": "从一句消费描述提取时间、金额与类别，逐步做成 Android 原生体验包。",
      "problem": "减少记账时反复点选和填写表单的成本。",
      "flow": [
        "说一句消费",
        "解析结构化记录",
        "确认与保存",
        "查看本机简报"
      ],
      "features": [
        "自然语言消费录入",
        "本地记账、简报和加密导出",
        "Android 原生安装包与体验流程"
      ],
      "status": "已产出 Android 体验 APK；本地功能与线上 AI/云备份分开，后两者的生产连接尚待完善。"
    },
    "en": {
      "name": "One-sentence Ledger",
      "summary": "A natural-language expense tracker that grew into a native Android test build.",
      "problem": "Reduce the forms and repeated taps involved in recording expenses.",
      "flow": [
        "Describe an expense",
        "Parse the record",
        "Confirm and save",
        "Read a local brief"
      ],
      "features": [
        "Natural-language expense entry",
        "Local records, summaries, and encrypted export",
        "Native Android APK and testing workflow"
      ],
      "status": "An Android test APK was delivered. Production connectivity for cloud backup and online AI summaries remains separate from local features."
    }
  },
  {
    "slug": "forum-rag",
    "category": "ai",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "Python",
      "JSON",
      "RAG",
      "Data pipeline"
    ],
    "zh": {
      "name": "论坛语料与本地检索库",
      "summary": "把分页帖子整理成可追溯、可增量更新的本地语料，并提供按主题浏览和精简导出。",
      "problem": "长帖、多页回复和版本变化让资料难以检索与维护。",
      "flow": [
        "分页读取",
        "清洗与去重",
        "校验后合并",
        "本地浏览/导出"
      ],
      "features": [
        "按主题保留来源和楼层结构",
        "失败保留旧版、增量刷新与历史归档",
        "轻量浏览页和紧凑文字 JSON"
      ],
      "status": "已有语料处理流程与本地浏览版本。展示工程方法，原始语料作为私人研究资料保存。"
    },
    "en": {
      "name": "Forum Corpus & Local Retrieval",
      "summary": "A traceable local corpus pipeline for paginated threads, incremental updates, topic browsing, and compact exports.",
      "problem": "Long threads, multiple reply pages, and changing versions are difficult to search and maintain.",
      "flow": [
        "Read pages",
        "Clean and deduplicate",
        "Validate and merge",
        "Browse or export"
      ],
      "features": [
        "Source and post structure retained per thread",
        "Incremental refresh with old-version protection",
        "Lightweight browser and compact text JSON"
      ],
      "status": "The pipeline and local browser exist. This case study describes the engineering; source material remains a private research corpus."
    }
  },
  {
    "slug": "what-just-happened",
    "category": "ai",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Agent Skills",
      "Python",
      "Git",
      "Markdown"
    ],
    "zh": {
      "name": "What Just Happened?",
      "summary": "把刚完成的 AI 编程任务变成一节能读懂的微课：改了什么、为什么这样改、如何验证。",
      "problem": "用 AI 做出软件后，还需要理解软件究竟如何工作。",
      "flow": [
        "收集改动证据",
        "还原运行流程",
        "讲解关键概念",
        "生成学习报告"
      ],
      "features": [
        "Git 改动与项目证据采集器",
        "初学者友好的 Markdown 报告模板",
        "跨 Agent 集成说明与真实示例"
      ],
      "status": "技能目录、采集脚本、模板和示例已存在；自动触发仍属于后续方向。"
    },
    "en": {
      "name": "What Just Happened?",
      "summary": "Turns an AI coding task into a readable micro-lesson: what changed, why it works, and how it was checked.",
      "problem": "Finishing software with AI should also lead to understanding it.",
      "flow": [
        "Collect change evidence",
        "Trace runtime behavior",
        "Explain key concepts",
        "Write a learning report"
      ],
      "features": [
        "Git and project evidence collector",
        "Beginner-friendly Markdown report templates",
        "Agent integration notes and real-diff examples"
      ],
      "status": "The skill, collector, templates, and examples exist. Automatic triggering remains a future extension."
    }
  },
  {
    "slug": "job-lottery",
    "category": "games",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "WeChat",
      "JavaScript",
      "Canvas"
    ],
    "zh": {
      "name": "投了个寂寞",
      "summary": "把投简历、碰运气、职业成长和离职风险做成手账风微信小游戏。",
      "problem": "用轻量循环表达求职中的随机性与反馈落差。",
      "flow": [
        "完善简历",
        "选择岗位",
        "投递并结算",
        "积累职业记录"
      ],
      "features": [
        "岗位概率与简历成长逻辑",
        "职业历史、每日次数与状态迁移",
        "微信小游戏迁移及手账式界面"
      ],
      "status": "已有小游戏源码和多轮界面迭代；当前平台审核与最新真机状态未重测。"
    },
    "en": {
      "name": "Application Lottery",
      "summary": "A journal-style WeChat game about applications, chance, career growth, and job-loss risk.",
      "problem": "Express the randomness and uneven feedback of job hunting through a compact loop.",
      "flow": [
        "Build a résumé",
        "Choose a job",
        "Apply and resolve",
        "Grow a career history"
      ],
      "features": [
        "Application probabilities and résumé progression",
        "Career history and daily-attempt logic",
        "WeChat mini-game migration and journal UI"
      ],
      "status": "Source and several UI iterations exist; current platform review and device behavior have not been rechecked."
    }
  },
  {
    "slug": "chain-explosion",
    "category": "games",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Canvas",
      "WeChat",
      "Unity",
      "H5"
    ],
    "zh": {
      "name": "炸了个飞船 · 连锁引爆",
      "summary": "选择一个引爆点，看密集飞船逐次连爆；从微信版延展到 Web、Unity 和小工具版本。",
      "problem": "用有限操作制造容易理解、又有策略空间的连锁反应。",
      "flow": [
        "观察飞船分布",
        "选择引爆点",
        "触发同类连锁",
        "结算与挑战下一关"
      ],
      "features": [
        "有限引爆次数和不同功能船",
        "连锁计分、关卡门槛与反馈动效",
        "微信、Web 与其他运行时的适配探索"
      ],
      "status": "已有多端工程和小工具交付包；各平台正式发行状态分别记录。"
    },
    "en": {
      "name": "Chain Explosion",
      "summary": "Pick one detonation point and watch ships cascade through a chain reaction, across WeChat, web, Unity, and mini-tool experiments.",
      "problem": "Create an immediately understandable reaction with room for strategy.",
      "flow": [
        "Read the formation",
        "Pick a detonation point",
        "Trigger a chain",
        "Score and advance"
      ],
      "features": [
        "Limited detonations and special ships",
        "Chain scoring, stage targets, and effects",
        "Cross-runtime adaptation experiments"
      ],
      "status": "Multiple runtime projects and mini-tool packages exist. Formal release status differs by platform."
    }
  },
  {
    "slug": "claw-club",
    "category": "games",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Canvas",
      "JavaScript",
      "Roguelite"
    ],
    "zh": {
      "name": "抓爆了 · 肉鸽抓娃娃",
      "summary": "复古抓娃娃机里的一爪连锁：抓球计分、选择符文、闯过十关。",
      "problem": "让抓取位置、球的组合和局内升级共同形成策略。",
      "flow": [
        "瞄准球堆",
        "出爪并连锁",
        "结算基础分与倍率",
        "选符文继续闯关"
      ],
      "features": [
        "十关挑战与八类符文",
        "抓取预览与实际判定一致",
        "移动端、键盘操作及离线交付包"
      ],
      "status": "已有可直接打开的重制版与小工具 ZIP；平台容器仍需单独验收。"
    },
    "en": {
      "name": "Claw Club",
      "summary": "A retro claw-machine roguelite: grab orbs, trigger combos, choose runes, and clear ten stages.",
      "problem": "Combine position, orb composition, and run upgrades into a readable strategy.",
      "flow": [
        "Aim at the pile",
        "Grab and trigger combos",
        "Resolve points and multipliers",
        "Choose a rune"
      ],
      "features": [
        "Ten stages and eight rune types",
        "Matching grab preview and hit logic",
        "Touch, keyboard, and offline packaging"
      ],
      "status": "A directly runnable remake and mini-tool ZIP exist; host-platform validation remains separate."
    },
    "image": "claw-club.png"
  },
  {
    "slug": "starfall-quarry",
    "category": "games",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "Unity",
      "C#",
      "JavaScript",
      "Pixel art"
    ],
    "zh": {
      "name": "星屑矿场",
      "summary": "像素矿洞中的增量循环：打碎晶体、购买设备、升级效率，再用星核重开。",
      "problem": "让手动操作、自动产出和永久成长形成可读的反馈。",
      "flow": [
        "打碎晶体",
        "购置采矿设备",
        "提升效率",
        "重开换取永久成长"
      ],
      "features": [
        "Unity Windows 版与独立小工具实现",
        "设备动画、升级、任务与成就",
        "保留永久进度的重开系统"
      ],
      "status": "已有 Windows 成品、Unity 源码和 JavaScript 小工具包；各版本存档独立。"
    },
    "en": {
      "name": "Starfall Quarry",
      "summary": "A pixel mining loop: break crystals, buy equipment, improve output, and restart for permanent growth.",
      "problem": "Make manual action, automation, and long-term progression reinforce each other.",
      "flow": [
        "Break crystals",
        "Buy mining equipment",
        "Upgrade efficiency",
        "Restart for permanent growth"
      ],
      "features": [
        "Unity Windows build and independent mini-tool version",
        "Equipment animation, upgrades, tasks, and achievements",
        "Prestige progression"
      ],
      "status": "Windows, Unity-source, and JavaScript mini-tool packages exist, with separate save files."
    }
  },
  {
    "slug": "zero-echo",
    "category": "games",
    "stage": "delivered",
    "started": "2026-10",
    "stack": [
      "Canvas",
      "Web Audio",
      "JavaScript"
    ],
    "zh": {
      "name": "零号回声 · ZERO / ECHO",
      "summary": "操控探针采集数据、编译协议，并在六章网络中用选择塑造 AI 的倾向。",
      "problem": "把主动增量玩法与有结果的叙事选择连接起来。",
      "flow": [
        "潜入与采集",
        "编译协议",
        "重配模块与做出选择",
        "进入章节终局"
      ],
      "features": [
        "六章、三十轮主动潜入",
        "连线技能树、模块与三种倾向结局",
        "离线存档、导入导出与原创合成音频"
      ],
      "status": "V2 本地浏览器版已交付，保留旧存档兼容；对外发行平台待确定。"
    },
    "en": {
      "name": "ZERO / ECHO",
      "summary": "Pilot a probe, collect data, compile protocols, and shape an AI through choices across six network districts.",
      "problem": "Connect active incremental play with narrative decisions that have mechanical consequences.",
      "flow": [
        "Dive and collect",
        "Compile protocols",
        "Reconfigure and choose",
        "Resolve a chapter"
      ],
      "features": [
        "Six chapters and thirty active runs",
        "Skill tree, modules, and three ending paths",
        "Offline saves, import/export, and synthesized audio"
      ],
      "status": "V2 exists as a local browser release with legacy-save support. The public distribution platform is undecided."
    },
    "image": "zero-echo.png"
  },
  {
    "slug": "flower-atelier",
    "category": "games",
    "stage": "delivered",
    "started": "2026-10",
    "stack": [
      "Three.js",
      "WebGL",
      "JavaScript"
    ],
    "zh": {
      "name": "花间裁梦",
      "summary": "在三维裁缝工作室里选布、改剪、排料、剪布、缝纫和装饰，最终完成自己的裙子。",
      "problem": "让服装设计的选择真实影响纸样、操作轮廓与立体成衣。",
      "flow": [
        "选布与改剪",
        "摆纸样和裁剪",
        "送布缝纫",
        "装饰、交付或上架"
      ],
      "features": [
        "分片面料与可编辑纸样",
        "固定机针送布、饰品编辑与撤销",
        "顾客订单、设计本与成衣橱窗"
      ],
      "status": "已有 v0.6 浏览器原型与离线入口；预览图展示开发过程中的版本。"
    },
    "en": {
      "name": "Flower Atelier",
      "summary": "Choose fabric, reshape patterns, cut, sew, and decorate a dress in a 3D tailoring studio.",
      "problem": "Let design choices change the actual pattern, interaction outline, and finished garment.",
      "flow": [
        "Choose and reshape",
        "Place patterns and cut",
        "Feed fabric through the needle",
        "Decorate and deliver"
      ],
      "features": [
        "Per-panel fabric and editable patterns",
        "Fixed-needle sewing, decoration, and undo",
        "Orders, design notebook, and a shop window"
      ],
      "status": "A v0.6 browser prototype and offline entry exist. The preview captures an earlier development iteration."
    },
    "image": "flower-atelier.jpg"
  },
  {
    "slug": "haystack",
    "category": "games",
    "stage": "delivered",
    "started": "2026-10",
    "stack": [
      "Three.js",
      "WebGL",
      "Touch controls"
    ],
    "zh": {
      "name": "大海捞针",
      "summary": "第一人称翻草寻宝：捡杂物、出售、升级工具，最终从草堆里找到那根针。",
      "problem": "用可操作的寻物过程连接收集、背包、商店和工具成长。",
      "flow": [
        "翻动草堆",
        "拾取与出售",
        "升级工具",
        "找到针并结算"
      ],
      "features": [
        "可移除草堆、五类工具和自动筛草机",
        "背包、商店、冷却与本地存档",
        "手机浮动摇杆与双手触控适配"
      ],
      "status": "v1.5.0 离线包已存在；平台模拟器与 Android/iOS 宿主验收待确认。"
    },
    "en": {
      "name": "Needle in a Haystack",
      "summary": "Search a first-person hayfield, collect and sell finds, upgrade tools, and uncover a hidden needle.",
      "problem": "Connect tactile searching with inventory, a shop, and tool progression.",
      "flow": [
        "Search the hay",
        "Collect and sell",
        "Upgrade tools",
        "Find the needle"
      ],
      "features": [
        "Removable hay, five tools, and an automated sifter",
        "Inventory, shop, cooldowns, and saves",
        "Mobile joystick and two-hand touch controls"
      ],
      "status": "A v1.5.0 offline package exists; platform simulator and mobile-host validation remain unconfirmed."
    }
  },
  {
    "slug": "roach-simulator",
    "category": "games",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "Three.js",
      "WebGL",
      "Offline packaging"
    ],
    "zh": {
      "name": "蟑螂模拟器 · 中文适配",
      "summary": "把指定参考游戏适配为中文离线小工具，涵盖互动道具、标本观察与第二阶段生存。",
      "problem": "将多页 WebGL 体验整理成单页离线包，并保留原交互结构。",
      "flow": [
        "选择道具",
        "与场景互动",
        "观察标本",
        "进入生存阶段"
      ],
      "features": [
        "道具与诱饵、标本操作",
        "生存、产卵、世代与本地排行",
        "本地资源、离线打包和逻辑校验"
      ],
      "status": "已有中文适配包。参考项目许可未明确，因此此处仅介绍适配工作，不分发游戏资源。"
    },
    "en": {
      "name": "Roach Simulator · Chinese Adaptation",
      "summary": "A Chinese offline adaptation of a selected reference game, covering tools, specimen inspection, and a survival phase.",
      "problem": "Consolidate a multi-page WebGL experience into one offline package while preserving interactions.",
      "flow": [
        "Choose a tool",
        "Interact with the scene",
        "Inspect a specimen",
        "Enter survival mode"
      ],
      "features": [
        "Tools, bait, and specimen controls",
        "Survival, generations, and local rankings",
        "Local assets, offline packaging, and logic checks"
      ],
      "status": "An adaptation package exists. The reference license is unclear, so this page describes the work without distributing game assets."
    }
  },
  {
    "slug": "ip-please",
    "category": "games",
    "stage": "delivered",
    "started": "2026-10",
    "stack": [
      "JavaScript",
      "Mobile UI",
      "Mini-tool"
    ],
    "zh": {
      "name": "请出示你的 IP · 竖屏适配",
      "summary": "将开源证件检查游戏适配到手机竖屏，把文字比对、盖章和教程变成手指可操作的流程。",
      "problem": "桌面式证件桌面在小屏幕上难读、难点、难学。",
      "flow": [
        "阅读当日规则",
        "比对证件信息",
        "询问与判断",
        "盖章并归还"
      ],
      "features": [
        "可读的 DOM 文本和固定操作栏",
        "跨证件比对、原剧情与事件保留",
        "按真实操作推进的新手教程"
      ],
      "status": "已有手机竖屏教程 v3 上传包；平台发布与真机验收状态待确认。"
    },
    "en": {
      "name": "IP, PLEASE · Portrait Adaptation",
      "summary": "A portrait mobile adaptation of an open-source document-inspection game, with readable comparisons, stamps, and action-led tutorials.",
      "problem": "A desktop document desk is difficult to read, touch, and learn on a small screen.",
      "flow": [
        "Read today's rules",
        "Compare document fields",
        "Question and decide",
        "Stamp and return"
      ],
      "features": [
        "Readable DOM text and a fixed action bar",
        "Cross-document checks with story and events retained",
        "Tutorials that progress through real actions"
      ],
      "status": "A portrait tutorial-v3 upload package exists; platform release and device acceptance are unconfirmed."
    }
  },
  {
    "slug": "wealth-year",
    "category": "games",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "JavaScript",
      "PWA",
      "Game economy"
    ],
    "zh": {
      "name": "一年之约 · 财富消耗挑战",
      "summary": "在三百六十五个游戏日里管理生活、社交与收购，尝试花掉巨额虚构财富。",
      "problem": "把抽象财富变成可选择、可比较、受时间约束的消费和资产。",
      "flow": [
        "分配每日时间",
        "生活与社交支出",
        "筹备收购与签约",
        "生成年度战报"
      ],
      "features": [
        "生活、朋友圈与收购三条路径",
        "项目筹备、时间限制和资产收藏",
        "自动存档、离线缓存与 PNG 战报"
      ],
      "status": "已有 RC4 本地候选版本与玩法检查记录；尚未把候选版描述为平台正式发行。"
    },
    "en": {
      "name": "A Year to Spend",
      "summary": "Manage everyday life, social spending, and acquisitions across 365 game days to spend a vast fictional fortune.",
      "problem": "Turn abstract wealth into tangible choices constrained by time.",
      "flow": [
        "Allocate the day",
        "Spend on life and friends",
        "Prepare and sign acquisitions",
        "Build a yearly report"
      ],
      "features": [
        "Life, friends, and acquisition paths",
        "Project preparation, deadlines, and collections",
        "Local saves, offline cache, and PNG reports"
      ],
      "status": "An RC4 local release candidate and gameplay checks exist; a platform launch is not assumed."
    }
  },
  {
    "slug": "little-universe",
    "category": "interactive",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "React",
      "Canvas",
      "Verlet"
    ],
    "zh": {
      "name": "小小宇宙 · 宇宙画室",
      "summary": "在手绘星球沙盒中放置、发射和合并星体，再把自己的星系做成明信片。",
      "problem": "让引力模拟既可探索，也能产出有个人表达的画面。",
      "flow": [
        "放置星球",
        "调整质量与引力",
        "发射并观察轨迹",
        "制作星系明信片"
      ],
      "features": [
        "手绘星体、三套预设与碰撞合并",
        "画布缩放平移、轨迹和速度控制",
        "本地存档与 1080×1440 明信片"
      ],
      "status": "v2 本地版与小红书离线 ZIP 已交付；文档记录尚未上传发布。"
    },
    "en": {
      "name": "Little Universe · Cosmic Studio",
      "summary": "Place, launch, and merge hand-painted planets, then turn a personal galaxy into a postcard.",
      "problem": "Make gravity exploration produce an expressive visual artifact.",
      "flow": [
        "Place planets",
        "Tune mass and gravity",
        "Launch and follow trajectories",
        "Create a postcard"
      ],
      "features": [
        "Hand-painted planets, presets, and collision merging",
        "Pan, zoom, trails, and speed controls",
        "Local saves and 1080×1440 postcards"
      ],
      "status": "A v2 local build and offline mini-tool ZIP were delivered; documentation records no platform publication yet."
    }
  },
  {
    "slug": "van-gogh-studio",
    "category": "interactive",
    "stage": "delivered",
    "started": "2026-10",
    "stack": [
      "Three.js",
      "GLB",
      "Procedural art"
    ],
    "zh": {
      "name": "梵高生成器 · 三维油画画室",
      "summary": "让星夜小镇、向日葵与麦田成为可轻触、可编辑、可导出的三维油画场景。",
      "problem": "把观看一幅画变成调整构图、探索材质和保存作品的体验。",
      "flow": [
        "选择油画场景",
        "轻触产生联动",
        "编辑物体与天空",
        "导出画面或场景"
      ],
      "features": [
        "三组程序化场景与植物联动",
        "撤销、复制、天气和中文参数",
        "PNG、GLB 与可继续编辑的 JSON"
      ],
      "status": "已有本地三维工作室与导出能力；GLB 为静态模型，动态天空与风动不随模型导出。"
    },
    "en": {
      "name": "Van Gogh Studio",
      "summary": "Turn a starry village, sunflowers, and wheatfields into touchable, editable 3D oil-painting scenes.",
      "problem": "Transform viewing a painting into composing, exploring materials, and saving a scene.",
      "flow": [
        "Choose a scene",
        "Touch to set it in motion",
        "Edit objects and sky",
        "Export an image or scene"
      ],
      "features": [
        "Three procedural scenes and linked plant responses",
        "Undo, duplication, weather, and Chinese controls",
        "PNG, GLB, and editable JSON export"
      ],
      "status": "The local studio and exports exist. GLB is static and does not include the procedural sky or wind effects."
    }
  },
  {
    "slug": "tactile-studio",
    "category": "interactive",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "Three.js",
      "Raycasting",
      "Instancing"
    ],
    "zh": {
      "name": "触物 · 石膏挖古玩",
      "summary": "从凿石、剥皮、拆盒到清理旧毯，用逐层清理和揭晓收藏构成三维解压体验。",
      "problem": "让进度来自真实处理的表面单元，而非一段预设动画。",
      "flow": [
        "选择场景与工具",
        "逐层清理",
        "观察进度",
        "揭晓并收藏"
      ],
      "features": [
        "六类三维解压场景",
        "独立阻力、碎屑、旋转与声音",
        "古玩揭晓与本地保存；后续小工具适配"
      ],
      "status": "已有本地原型及石膏场景 v3.3.0 包；平台和手机表现尚待单独确认。"
    },
    "en": {
      "name": "Tactile Studio",
      "summary": "Excavate plaster, peel surfaces, open packages, and clean a rug in a layered 3D relaxation experience.",
      "problem": "Make progress depend on the surface units actually processed.",
      "flow": [
        "Pick a scene and tool",
        "Clear layers",
        "Watch progress",
        "Reveal and collect"
      ],
      "features": [
        "Six tactile 3D scenes",
        "Per-unit resistance, debris, rotation, and sound",
        "Reveals, local saves, and a later mini-tool adaptation"
      ],
      "status": "A local prototype and v3.3.0 excavation package exist; platform and phone behavior need separate confirmation."
    }
  },
  {
    "slug": "people-counter",
    "category": "interactive",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "TypeScript",
      "Statistics",
      "Visualization"
    ],
    "zh": {
      "name": "人海答案",
      "summary": "调节年龄、城市、学历等条件，看人口漏斗如何变化，并理解估算区间与数据口径。",
      "problem": "把多条件人口估算从一个孤立数字变成可解释的筛选过程。",
      "flow": [
        "选择参照人群",
        "逐项调整条件",
        "观察人数与区间",
        "查看数据与方法"
      ],
      "features": [
        "理想型与自测两种模式",
        "实时聚合结果、条件贡献与区间",
        "网页、微信与小工具版本探索"
      ],
      "status": "已有网页演示和 v2.0 离线包；v2 网页发布曾受阻，模型结果是估计而非真实人口普查。"
    },
    "en": {
      "name": "People Counter",
      "summary": "Adjust age, city, education, and other conditions to see a population funnel and its uncertainty.",
      "problem": "Make multi-condition estimates explainable rather than presenting a single isolated number.",
      "flow": [
        "Choose a reference group",
        "Adjust conditions",
        "Read estimates and intervals",
        "Inspect sources and methods"
      ],
      "features": [
        "Target-profile and self-comparison modes",
        "Aggregate estimates and interval explanations",
        "Web, WeChat, and mini-tool experiments"
      ],
      "status": "A web demo and v2.0 offline package exist. The v2 web release was blocked; results are modeled estimates, not a census."
    }
  },
  {
    "slug": "hong-kong-pixel-map",
    "category": "interactive",
    "stage": "prototype",
    "started": "2026-08",
    "stack": [
      "GIS",
      "Blender",
      "3D Tiles",
      "Pixel art"
    ],
    "zh": {
      "name": "港岛等距像素地图",
      "summary": "将官方地形、建筑和航拍数据接入固定投影渲染与瓦片浏览管线。",
      "problem": "城市像素图要既有风格，也有空间依据、比例和可拼接的边界。",
      "flow": [
        "获取地形与建筑",
        "固定相机渲染",
        "分块像素化",
        "检查接缝并浏览"
      ],
      "features": [
        "官方数据来源与文件追踪",
        "正交投影、重叠瓦片和样例浏览器",
        "接缝、颜色与细节检查流程"
      ],
      "status": "已做中环—金钟—湾仔样例与生产管线；全香港岛覆盖和最终视觉验收仍未完成。"
    },
    "en": {
      "name": "Hong Kong Isometric Pixel Map",
      "summary": "A fixed-projection rendering and tile-viewing pipeline built from official terrain, buildings, and aerial imagery.",
      "problem": "A stylized city map also needs spatial grounding, proportion, and seams that fit.",
      "flow": [
        "Acquire terrain and buildings",
        "Render a fixed camera",
        "Create pixel tiles",
        "Review seams and browse"
      ],
      "features": [
        "Documented official data provenance",
        "Orthographic projection and overlapping tiles",
        "Seam, color, and detail review workflow"
      ],
      "status": "A Central–Admiralty–Wan Chai sample and pipeline exist. Full-island coverage and final visual acceptance remain unfinished."
    }
  },
  {
    "slug": "frontend-collection",
    "category": "interactive",
    "stage": "published",
    "started": "2026-07",
    "stack": [
      "Astro",
      "Creative coding",
      "UI"
    ],
    "zh": {
      "name": "有趣前端收藏",
      "summary": "把值得停下来观察的界面整理成可体验的重构与设计笔记。",
      "problem": "把一次视觉灵感变成能复用的布局、交互和实现经验。",
      "flow": [
        "观察参考界面",
        "提炼设计语言",
        "实现互动样例",
        "记录可迁移经验"
      ],
      "features": [
        "独立收藏总览与案例入口",
        "暗色界面及动效实验",
        "设计说明与中英文页面"
      ],
      "status": "已在本博客公开展示，保留原有收藏与案例入口。"
    },
    "en": {
      "name": "Frontend Collection",
      "summary": "Runnable reinterpretations and design notes about interfaces worth stopping to inspect.",
      "problem": "Turn a visual reference into reusable layout, interaction, and implementation knowledge.",
      "flow": [
        "Study an interface",
        "Extract its design language",
        "Build an interactive example",
        "Document reusable ideas"
      ],
      "features": [
        "Collection overview and case pages",
        "Dark-interface and motion experiments",
        "Bilingual design notes"
      ],
      "status": "Publicly displayed on this blog, retaining the existing collection and case pages."
    },
    "existing": true
  },
  {
    "slug": "bill-review",
    "category": "office",
    "stage": "delivered",
    "started": "2026-06",
    "stack": [
      "OCR",
      "Python",
      "Agent Skills",
      "Excel"
    ],
    "zh": {
      "name": "银承贸易背景审查 Skill",
      "summary": "把混杂的合同、发票和交付凭据整理成材料清单、一致性检查与证据化报告。",
      "problem": "重复核对材料时，容易丢失页码、金额口径和文件之间的对应关系。",
      "flow": [
        "盘点材料",
        "提取字段与页码",
        "交叉核对",
        "输出报告与台账"
      ],
      "features": [
        "分类与编号重命名方案",
        "买卖方、金额、数量和期限核对",
        "风险清单、Word 报告与 Excel 发票台账"
      ],
      "status": "已有可复用技能、核对清单与批次输出。展示流程与方法，不公开客户材料。"
    },
    "en": {
      "name": "Trade-document Review Skill",
      "summary": "Organizes contracts, invoices, and delivery evidence into an inventory, consistency checks, and an evidence-linked report.",
      "problem": "Repeated document reviews can lose track of pages, amount definitions, and cross-file relationships.",
      "flow": [
        "Inventory materials",
        "Extract fields and pages",
        "Cross-check evidence",
        "Export reports and ledgers"
      ],
      "features": [
        "Classification and numbered rename plans",
        "Party, amount, quantity, and validity checks",
        "Risk lists, Word reports, and Excel ledgers"
      ],
      "status": "A reusable skill, checklist, and batch outputs exist. The case study shares the method without customer documents."
    }
  },
  {
    "slug": "invoice-ledger",
    "category": "office",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "PDF",
      "OCR",
      "Excel",
      "Python"
    ],
    "zh": {
      "name": "发票整理与四列台账",
      "summary": "将多文件夹发票提取为统一表格，同时整理编号、排序和可阅读的合并 PDF。",
      "problem": "减少重复录入，方便从表格回看原始发票。",
      "flow": [
        "读取发票",
        "提取编号日期金额",
        "校验和排序",
        "输出 Excel / PDF"
      ],
      "features": [
        "多批次文件处理",
        "发票四列台账与金额核对",
        "合并 PDF 和来源追踪"
      ],
      "status": "已在多个批次中产出文档；公开页面仅说明工作流。"
    },
    "en": {
      "name": "Invoice Ledger Pipeline",
      "summary": "Extracts invoices from multiple folders into a consistent ledger and an ordered, readable PDF.",
      "problem": "Reduce retyping and keep the path back from spreadsheet rows to source invoices.",
      "flow": [
        "Read invoices",
        "Extract identifiers and amounts",
        "Validate and sort",
        "Export Excel and PDF"
      ],
      "features": [
        "Batch processing across folders",
        "Four-column ledger and amount checks",
        "Merged PDF with source tracking"
      ],
      "status": "Document outputs exist for several batches; only the workflow is presented publicly."
    }
  },
  {
    "slug": "bank-product-kit",
    "category": "office",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Word",
      "PDF",
      "Presentation",
      "Visual design"
    ],
    "zh": {
      "name": "银行产品四件套",
      "summary": "将产品资料转为详细手册、一页简介、微课幻灯片和视频脚本。",
      "problem": "同一产品面向不同场景时，需要共享事实、改变表达形式。",
      "flow": [
        "核对产品与来源",
        "建立统一信息框架",
        "制作四类内容",
        "检查并迭代"
      ],
      "features": [
        "银承、资本市场与代理推介等内容",
        "Word、图像式 PDF 与演示材料",
        "按用户反馈反复调整讲解和视觉"
      ],
      "status": "已形成多组交付，部分资本市场视觉稿仍在返工。这里展示制作方法与产物类型。"
    },
    "en": {
      "name": "Bank Product Content Kit",
      "summary": "Transforms product material into a handbook, one-page introduction, micro-course slides, and video script.",
      "problem": "Keep facts consistent while changing the format for different communication settings.",
      "flow": [
        "Verify product sources",
        "Build a common outline",
        "Create four formats",
        "Review and iterate"
      ],
      "features": [
        "Bill, capital-market, and referral-product material",
        "Word, visual PDFs, and presentations",
        "Repeated content and visual revisions"
      ],
      "status": "Several sets were delivered; some capital-market visuals remain under revision. This page describes the production method and output types."
    }
  },
  {
    "slug": "financial-reports",
    "category": "office",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "Excel",
      "PDF",
      "Financial analysis"
    ],
    "zh": {
      "name": "三年一期财务整理",
      "summary": "把不同期财务资料整理成可对照的报表与分析文档，保留数据来源。",
      "problem": "跨年份材料格式不同、口径容易混淆，需要统一结构后再解读。",
      "flow": [
        "读取各期资料",
        "统一科目口径",
        "建立对照表",
        "形成分析报告"
      ],
      "features": [
        "三年一期财务结构化",
        "核心科目与变动对比",
        "可回溯的分析输出"
      ],
      "status": "已有文档交付记录；客户名称、原始数字和经营资料不进入公开展示。"
    },
    "en": {
      "name": "Multi-period Financial Reports",
      "summary": "Structures financial material from three years and an interim period into comparable tables and analysis.",
      "problem": "Different formats and reporting definitions must be aligned before interpretation.",
      "flow": [
        "Read each period",
        "Align account definitions",
        "Build comparison tables",
        "Write the report"
      ],
      "features": [
        "Multi-period financial structuring",
        "Key-account and change comparisons",
        "Traceable analysis outputs"
      ],
      "status": "Document delivery is recorded. Customer names, figures, and operating information are excluded from this public case study."
    }
  },
  {
    "slug": "contract-comparison",
    "category": "office",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "Document diff",
      "Word",
      "PDF"
    ],
    "zh": {
      "name": "合同差异核对",
      "summary": "按条款比较版本差异，把修改位置、影响和原文依据放到同一张核对清单中。",
      "problem": "长合同逐字比对费时，重要变化需要能定位、能复核。",
      "flow": [
        "提取两个版本",
        "对齐条款",
        "标出变化",
        "输出差异清单"
      ],
      "features": [
        "版本与条款级对照",
        "重点文字和金额变化定位",
        "面向复核的结构化结果"
      ],
      "status": "已有具体文档处理记录；只公开方法，不公开合同正文。"
    },
    "en": {
      "name": "Contract Comparison",
      "summary": "Compares contract versions by clause, placing changed text, location, and implications into one review list.",
      "problem": "Long contracts are slow to compare, and material edits need precise evidence.",
      "flow": [
        "Extract both versions",
        "Align clauses",
        "Identify changes",
        "Write a comparison list"
      ],
      "features": [
        "Version and clause-level comparison",
        "Text and amount-change location",
        "Structured output for human review"
      ],
      "status": "Document-processing records exist. The method is public; contract text is not."
    }
  },
  {
    "slug": "kylin-toolbox",
    "category": "office",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "Python",
      "Tkinter",
      "Offline"
    ],
    "zh": {
      "name": "银河麒麟离线办公工具箱",
      "summary": "给低配置、不能联网的工作机准备一个轻量图形界面，集中常用文件和文本工具。",
      "problem": "把终端里的实用功能变成不依赖云端的日常操作。",
      "flow": [
        "打开工具箱",
        "选择文件/文本",
        "执行本地处理",
        "查看或导出结果"
      ],
      "features": [
        "目录管理、搜索和批量重命名",
        "文件清单、文本清理与金额大写",
        "系统状态与无网络依赖的源码包"
      ],
      "status": "Python/Tkinter 源码包已交付；尚未在实际银河麒麟 V10 SP1 目标机完成验收。"
    },
    "en": {
      "name": "Kylin Offline Office Toolbox",
      "summary": "A lightweight GUI that brings file and text utilities to a low-resource, disconnected workstation.",
      "problem": "Make practical terminal-style utilities accessible without a cloud service.",
      "flow": [
        "Open the toolbox",
        "Choose files or text",
        "Process locally",
        "Inspect or export"
      ],
      "features": [
        "Folder management, search, and batch renaming",
        "File inventories, text cleanup, and amount conversion",
        "System status and an offline source package"
      ],
      "status": "The Python/Tkinter source package was delivered. Acceptance on the actual Kylin V10 SP1 workstation remains pending."
    }
  },
  {
    "slug": "trip-ledger",
    "category": "office",
    "stage": "delivered",
    "started": "2026-08",
    "stack": [
      "TypeScript",
      "Budgeting",
      "Visualization"
    ],
    "zh": {
      "name": "出发账本 · 旅行预算",
      "summary": "用人数、天数、机票、住宿和餐饮假设比较旅行预算，并允许手动填写最新价格。",
      "problem": "旅行攻略的报价会变，预算应当能看清假设并随时重算。",
      "flow": [
        "选择天数与人数",
        "填入行程价格",
        "调整生活档位",
        "比较预算和机动金"
      ],
      "features": [
        "七天/八天与不同档位比较",
        "手填机票、酒店和机动金",
        "签证资料和来源入口"
      ],
      "status": "已有网页交付记录。价格资料属于当时快照，使用时应填写自己的最新报价。"
    },
    "en": {
      "name": "Departure Ledger · Trip Budget",
      "summary": "Compare a trip budget using travelers, duration, flights, accommodation, and meals, with editable prices.",
      "problem": "Travel prices change; a budget should expose its assumptions and be easy to recalculate.",
      "flow": [
        "Choose duration and travelers",
        "Enter prices",
        "Adjust comfort levels",
        "Compare budgets and reserves"
      ],
      "features": [
        "Seven/eight-day and comfort-level comparisons",
        "Editable flights, hotels, and contingency",
        "Visa information and source references"
      ],
      "status": "A web delivery is recorded. Price information is a historical snapshot; current quotes should be entered for a new trip."
    }
  },
  {
    "slug": "personal-blog",
    "category": "knowledge",
    "stage": "published",
    "started": "2026-06",
    "stack": [
      "Astro",
      "Markdown",
      "Cloudflare Pages"
    ],
    "zh": {
      "name": "Ryanyx · 双语个人博客",
      "summary": "把文章、投研、项目、简历和 AI 新闻沉淀成自己可以持续维护的公开档案。",
      "problem": "让项目经历与长期写作拥有稳定入口和完整上下文。",
      "flow": [
        "整理内容",
        "中英文配对",
        "构建页面",
        "发布与持续迭代"
      ],
      "features": [
        "中文原文与完整英文对应页",
        "文章、投研、项目和简历导航",
        "主题切换、点赞与编辑记录工具"
      ],
      "status": "持续公开运行，本次更新将项目记录集中为可筛选、可追溯的目录。"
    },
    "en": {
      "name": "Ryanyx · Bilingual Blog",
      "summary": "A maintained public home for writing, research, projects, a résumé, and AI news.",
      "problem": "Give long-term writing and project work stable entry points and context.",
      "flow": [
        "Organize content",
        "Pair languages",
        "Build pages",
        "Publish and iterate"
      ],
      "features": [
        "Chinese originals and complete English counterparts",
        "Writing, research, project, and résumé navigation",
        "Themes, likes, and editing-record tools"
      ],
      "status": "Public and continuously maintained. This update brings project records into one searchable catalog."
    }
  },
  {
    "slug": "second-brain",
    "category": "knowledge",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Obsidian",
      "Graph",
      "Timeline",
      "Astro"
    ],
    "zh": {
      "name": "第二大脑 · 思想星系与时间长河",
      "summary": "将 Obsidian 笔记组织成关系图与时间视图，并尝试自动推断隐藏关联。",
      "problem": "同时看见一条想法与其他内容的关系，以及它出现的时间。",
      "flow": [
        "读取获准笔记",
        "计算主题关联",
        "生成思想星系",
        "沿时间回看记录"
      ],
      "features": [
        "思想星系与时间长河双视图",
        "隐藏关联、附近的想法与稳定链接",
        "同步增删和显式发布范围"
      ],
      "status": "已有实现；个人笔记后来按隐私要求从公开站点撤下。本项目页仅介绍系统设计。"
    },
    "en": {
      "name": "Second Brain · Galaxy & Time River",
      "summary": "Organizes Obsidian notes as a relationship graph and a time-based view, with inferred hidden connections.",
      "problem": "See both how an idea connects to others and when it appeared.",
      "flow": [
        "Read approved notes",
        "Infer connections",
        "Build the idea galaxy",
        "Explore the timeline"
      ],
      "features": [
        "Galaxy and time-river views",
        "Hidden associations, related notes, and stable URLs",
        "Add/delete synchronization and explicit publication scope"
      ],
      "status": "Implemented. Personal notes were later removed from the public site for privacy; this page describes only the system design."
    }
  },
  {
    "slug": "portable-memory",
    "category": "knowledge",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "Markdown",
      "JSONL",
      "Node.js",
      "Local archive"
    ],
    "zh": {
      "name": "AI 回忆存储 · 跨设备上下文档案",
      "summary": "把可读取的 AI 对话整理成主题索引、任务状态和离线检索工具，换电脑后继续工作。",
      "problem": "长对话分散在不同任务里，迁移时容易丢掉决策与纠错。",
      "flow": [
        "整理可见对话",
        "按主题建索引",
        "保存状态与来源",
        "离线读取和增量更新"
      ],
      "features": [
        "主题摘要与原文分层",
        "跨批次检索、脱敏覆盖与迁移包",
        "保留日期、来源和不确定性"
      ],
      "status": "已有九月档案和十月增量更新。个人对话档案保持本地，本页只介绍方法。"
    },
    "en": {
      "name": "Portable AI Memory",
      "summary": "Turns accessible AI conversations into a topic index, task-state archive, and offline reading tool for changing devices.",
      "problem": "Decisions and corrections are easily lost when long discussions are scattered across tasks.",
      "flow": [
        "Collect accessible conversations",
        "Index topics",
        "Preserve state and sources",
        "Read offline and update"
      ],
      "features": [
        "Separate topic summaries and source text",
        "Cross-batch search, redaction, and migration packages",
        "Dated evidence and uncertainty retained"
      ],
      "status": "September and October archive batches exist. Personal conversations stay local; only the method is described here."
    }
  },
  {
    "slug": "ai-learning",
    "category": "knowledge",
    "stage": "prototype",
    "started": "2026-08",
    "stack": [
      "Machine learning",
      "Python",
      "Interactive lessons"
    ],
    "zh": {
      "name": "从零到 AI 工程 · 可视化学习",
      "summary": "围绕机器学习基础建立个人学习进度，用推导、数值例子、代码和互动实验逐步理解。",
      "problem": "让教程真正连接数学直觉、模型训练和工程实现。",
      "flow": [
        "确认知识起点",
        "推导与数值演示",
        "运行代码和实验",
        "回答问题并更新进度"
      ],
      "features": [
        "机器学习基础与线性回归课程",
        "可视化讲解和综合练习",
        "本地学习档案与复习队列"
      ],
      "status": "已有学习档案与课程互动记录，仍在持续学习，未将规划中的全部课程视为完成。"
    },
    "en": {
      "name": "AI Engineering · Visual Learning",
      "summary": "A personal learning path that connects derivations, numerical examples, code, and interactive experiments.",
      "problem": "Connect mathematical intuition to model training and engineering practice.",
      "flow": [
        "Set a starting point",
        "Derive and visualize",
        "Run code and experiments",
        "Review and track progress"
      ],
      "features": [
        "Machine-learning and linear-regression lessons",
        "Visual explanations and integrated exercises",
        "Local learning log and review queue"
      ],
      "status": "Learning records and interactive lessons exist. The wider curriculum remains an ongoing plan."
    }
  },
  {
    "slug": "bonsai-risk",
    "category": "knowledge",
    "stage": "prototype",
    "started": "2026-08",
    "stack": [
      "OCaml",
      "Bonsai",
      "JavaScript"
    ],
    "zh": {
      "name": "Bonsai · 增量风控图样品",
      "summary": "通过行情、敞口、盈亏和依赖图，直观看出交互状态如何触发局部重算。",
      "problem": "把增量计算从抽象概念变成看得到的状态传播。",
      "flow": [
        "改变行情",
        "更新派生指标",
        "观察告警",
        "查看重算依赖"
      ],
      "features": [
        "实时风控面板与依赖图",
        "零依赖浏览预览",
        "对应的 OCaml/Bonsai 实现示例"
      ],
      "status": "已有预览页和 OCaml 示例；便捷预览本身用 JavaScript，不冒充 Bonsai 编译产物。"
    },
    "en": {
      "name": "Bonsai · Incremental Risk Graph",
      "summary": "A small risk panel uses prices, exposure, P&L, and a dependency graph to show partial recomputation.",
      "problem": "Make incremental computation visible as state propagates.",
      "flow": [
        "Change a price",
        "Update derived metrics",
        "Inspect alerts",
        "Follow recomputation"
      ],
      "features": [
        "Interactive risk panel and dependency graph",
        "Dependency-free browser preview",
        "Corresponding OCaml/Bonsai example"
      ],
      "status": "A browser preview and OCaml example exist. The convenient preview uses JavaScript rather than a compiled Bonsai build."
    }
  },
  {
    "slug": "zhihu-exporter",
    "category": "knowledge",
    "stage": "delivered",
    "started": "2026-07",
    "stack": [
      "Chrome Extension",
      "Markdown",
      "JSON"
    ],
    "zh": {
      "name": "知乎回答导出器",
      "summary": "把自己在页面上可见的回答导出为便于阅读的 Markdown 和可处理的 JSON。",
      "problem": "给平台写作保留一份能导入个人知识库的本地副本。",
      "flow": [
        "打开自己的回答页",
        "收集可见链接",
        "读取正文",
        "下载 Markdown / JSON"
      ],
      "features": [
        "本地 Chrome 扩展",
        "按回答保存正文、链接与时间",
        "保留失败列表与读取范围"
      ],
      "status": "已有扩展源码和使用说明；遵循页面可见范围，结构变化时需维护选择器。"
    },
    "en": {
      "name": "Zhihu Answer Exporter",
      "summary": "Exports the user's page-visible answers as readable Markdown and structured JSON.",
      "problem": "Keep a portable local copy of writing for a personal knowledge base.",
      "flow": [
        "Open your answer page",
        "Collect visible links",
        "Read answer text",
        "Download Markdown and JSON"
      ],
      "features": [
        "Local Chrome extension",
        "Answer text, links, and timestamps",
        "Failure list and explicit reading scope"
      ],
      "status": "Extension source and instructions exist. It reads only visible material; selectors may need maintenance as the site changes."
    }
  },
  {
    "slug": "ai-news",
    "category": "ai",
    "stage": "published",
    "started": "2026-07",
    "stack": [
      "RSS",
      "Node.js",
      "GitHub Actions",
      "Bilingual"
    ],
    "zh": {
      "name": "每日 AI 新闻精选",
      "summary": "把来源发现、时效筛选、重要性排序和双语摘要接成博客更新流程。",
      "problem": "新闻很多，需要保留来源和发布时间，再筛成少量值得看的内容。",
      "flow": [
        "收集候选新闻",
        "筛选时效与重复",
        "生成双语摘要",
        "发布博客资讯"
      ],
      "features": [
        "来源链接、时间与去重",
        "重要性筛选及中英文内容",
        "定时更新与失败重试记录"
      ],
      "status": "博客中已有公开资讯页和持续更新提交；单次历史运行不代表未来任务永不失败。"
    },
    "en": {
      "name": "Daily AI News",
      "summary": "A blog-update workflow for discovering sources, filtering recent stories, ranking them, and writing bilingual summaries.",
      "problem": "Retain source and date information while reducing a large feed to a few useful stories.",
      "flow": [
        "Discover candidates",
        "Filter recency and duplicates",
        "Write bilingual summaries",
        "Publish the feed"
      ],
      "features": [
        "Sources, dates, and deduplication",
        "Ranking with Chinese and English summaries",
        "Scheduled updates and retry records"
      ],
      "status": "The blog has a public feed and recurring update commits. Past runs do not imply every future run will succeed."
    }
  },
  {
    "slug": "white-tower",
    "category": "creative",
    "stage": "delivered",
    "started": "2026-06",
    "stack": [
      "Worldbuilding",
      "Image direction",
      "Video"
    ],
    "zh": {
      "name": "白塔观测局",
      "summary": "围绕异星遗址和失落基础设施，搭建可持续扩展的影像档案世界观。",
      "problem": "让 AI 图像系列拥有一致的角色、构图和叙事语言。",
      "flow": [
        "设定世界与视觉规则",
        "设计一期主题",
        "生成分镜图像",
        "配乐与轮播剪辑"
      ],
      "features": [
        "账号定位、世界观与视觉圣经",
        "六图轮播和图像提示词模板",
        "多主题素材与剪辑发布规范"
      ],
      "status": "已有创作档案、图像系列与流程材料；平台发布和传播效果不作未经核实的承诺。"
    },
    "en": {
      "name": "White Tower Observatory",
      "summary": "An expandable visual archive of abandoned off-world facilities and lost infrastructure.",
      "problem": "Give an AI image series consistent characters, composition, and narrative language.",
      "flow": [
        "Define the world and visual rules",
        "Plan an episode",
        "Create image sequences",
        "Score and edit"
      ],
      "features": [
        "Worldbuilding and visual direction documents",
        "Six-image carousel and prompt templates",
        "Multiple themes and editing guidelines"
      ],
      "status": "Creative documents, image series, and production materials exist. Platform publication and reach are not assumed."
    }
  },
  {
    "slug": "xingfulong-posters",
    "category": "creative",
    "stage": "prototype",
    "started": "2026-10",
    "stack": [
      "Image direction",
      "Prompt design",
      "Poster series"
    ],
    "zh": {
      "name": "兴福龙 · 城市旅行海报",
      "summary": "围绕同一个品牌角色设计城市旅行系列，统一角色比例、场景地标和版面表达。",
      "problem": "连续作品需要辨识度一致，又能体现不同城市的气质。",
      "flow": [
        "锁定角色设定",
        "研究城市地标",
        "编排海报提示词",
        "比较并修订画面"
      ],
      "features": [
        "多城市系列与提示词档案",
        "角色一致性和底部文字修订",
        "参赛图片与表情创意探索"
      ],
      "status": "已有多城作品与反复修订记录；统一终稿验收和实际投稿结果未确认。"
    },
    "en": {
      "name": "Xingfulong · City Travel Posters",
      "summary": "A travel-poster series built around one brand character, with consistent proportions, landmarks, and composition.",
      "problem": "Maintain a recognizable character while giving each city a distinct identity.",
      "flow": [
        "Lock character direction",
        "Study city landmarks",
        "Compose poster prompts",
        "Review and revise"
      ],
      "features": [
        "Multi-city images and prompt records",
        "Character consistency and typography revisions",
        "Competition-image and sticker concepts"
      ],
      "status": "Several city images and revision records exist. Final-series acceptance and submission outcomes are unconfirmed."
    }
  },
  {
    "slug": "business-model-map",
    "category": "creative",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "Financial research",
      "Information design",
      "Templates"
    ],
    "zh": {
      "name": "企业赚钱图",
      "summary": "把一家上市公司的业务、客户、收入来源和成本逻辑整理成易读的商业模式图。",
      "problem": "公司介绍往往信息多但关系弱，需要看清钱从哪里来、流向哪里。",
      "flow": [
        "查找公开资料",
        "拆解业务链",
        "组织资金与价值关系",
        "输出图解模板"
      ],
      "features": [
        "以公开公司为例拆解盈利模式",
        "图解式信息层级与视觉表达",
        "便于下一家公司复用的制作包"
      ],
      "status": "已有企业样例和复用包；示例数据应按各自资料日期理解。"
    },
    "en": {
      "name": "Business Model Maps",
      "summary": "Diagrams a listed company's products, customers, revenue streams, and cost logic.",
      "problem": "Make it clear where value is created and how money flows.",
      "flow": [
        "Read public sources",
        "Break down the business",
        "Map value and money",
        "Export a reusable diagram"
      ],
      "features": [
        "Public-company business-model examples",
        "Visual information hierarchy",
        "A reusable production package"
      ],
      "status": "Company examples and a reusable package exist. Each example belongs to its source date."
    }
  },
  {
    "slug": "cue-player",
    "category": "creative",
    "stage": "delivered",
    "started": "2026-09",
    "stack": [
      "HTML",
      "Audio",
      "CSV",
      "Offline"
    ],
    "zh": {
      "name": "空格对词播放器",
      "summary": "按一次空格只播放下一句配音，用于拍摄时对词，并导出实际播放时间表。",
      "problem": "拍摄需要人工控制节奏，而不是从头到尾自动播完。",
      "flow": [
        "准备分句音频",
        "空格播放下一句",
        "重播或停止",
        "导出播放时间表"
      ],
      "features": [
        "逐句控制、长按防连发与重播",
        "音量、语速和独立音频文件",
        "含中断与重播的 CSV 时间记录"
      ],
      "status": "已有离线播放器与多套音色版本；时间表是相对播放记录，不是相机时间码。"
    },
    "en": {
      "name": "Spacebar Cue Player",
      "summary": "Play exactly one next voice line with each spacebar press, then export the actual cue timeline.",
      "problem": "Filming needs human-controlled pacing rather than continuous autoplay.",
      "flow": [
        "Prepare voice cues",
        "Press space for the next line",
        "Repeat or stop",
        "Export the cue timeline"
      ],
      "features": [
        "Line-by-line control and repeat protection",
        "Volume, speed, and separate audio files",
        "CSV timing with interruptions and replays"
      ],
      "status": "Offline players and multiple voice variants exist. The timeline records relative playback, not camera timecode."
    }
  },
  {
    "slug": "content-workflow",
    "category": "creative",
    "stage": "prototype",
    "started": "2026-06",
    "stack": [
      "Python",
      "Brief templates",
      "Media pipeline"
    ],
    "zh": {
      "name": "AI 内容制作工作流",
      "summary": "把主题、母版 Brief、提示词和素材整理连成可复用的创作步骤。",
      "problem": "内容创作中大量机械操作会挤占选题和判断的时间。",
      "flow": [
        "填写母版 Brief",
        "生成制作清单",
        "组织提示词和素材",
        "检查交付内容"
      ],
      "features": [
        "主题与视觉约束模板",
        "图像素材命名与归档",
        "可复用制作脚本与流程文档"
      ],
      "status": "已有第一版本地流程与材料；部分视频生成环节仍需独立工具和人工选择。"
    },
    "en": {
      "name": "AI Content Production Workflow",
      "summary": "Reusable steps connecting a topic, master brief, prompts, and asset organization.",
      "problem": "Reduce repetitive production tasks so more attention goes to editorial choices.",
      "flow": [
        "Fill the master brief",
        "Build a production checklist",
        "Organize prompts and assets",
        "Review the deliverable"
      ],
      "features": [
        "Topic and visual-constraint templates",
        "Image naming and archiving",
        "Reusable scripts and production notes"
      ],
      "status": "A first local workflow and materials exist. Some video-generation stages still require separate tools and editorial choices."
    }
  },
  {
    "slug": "scanforge",
    "category": "interactive",
    "stage": "prototype",
    "started": "2026-07",
    "stack": [
      "Swift",
      "ARKit",
      "LiDAR",
      "OBJ"
    ],
    "zh": {
      "name": "ScanForge · LiDAR 扫描原型",
      "summary": "从房间扫描、实时网格预览到本地保存和 OBJ 导出的一条 iOS 原型流程。",
      "problem": "让空间扫描的采集、观察和导出有一个完整入口。",
      "flow": [
        "启动 LiDAR 扫描",
        "预览实时网格",
        "保存扫描项目",
        "导出 OBJ 模型"
      ],
      "features": [
        "ARKit 网格重建与面数统计",
        "本地项目、重命名和删除",
        "OBJ 导出与系统分享"
      ],
      "status": "已有 Xcode 工程；真实扫描需要兼容 LiDAR 设备，未把代码交付当作真机验收。"
    },
    "en": {
      "name": "ScanForge · LiDAR Prototype",
      "summary": "An iOS prototype spanning room scanning, live mesh preview, local storage, and OBJ export.",
      "problem": "Provide a complete capture-to-export path for a spatial scan.",
      "flow": [
        "Start LiDAR capture",
        "Preview the mesh",
        "Save a project",
        "Export OBJ"
      ],
      "features": [
        "ARKit mesh reconstruction and statistics",
        "Local projects, rename, and delete",
        "OBJ export and system sharing"
      ],
      "status": "An Xcode project exists. Actual scanning requires compatible LiDAR hardware; code delivery is not device acceptance."
    }
  },
  {
    "slug": "watch-recorder",
    "category": "knowledge",
    "stage": "exploring",
    "started": "2026-10",
    "stack": [
      "watchOS",
      "iOS",
      "On-device AI"
    ],
    "zh": {
      "name": "手表录音 → 本地知识归档",
      "summary": "围绕手表长录音、手机接收、本地转写、分类与总结规划自用工具。",
      "problem": "随手捕捉的信息需要变成可回顾的知识，同时离线保存。",
      "flow": [
        "手表录音",
        "传到手机",
        "设备本地转写",
        "分类与总结"
      ],
      "features": [
        "明确独立运行与本地处理需求",
        "手机与手表协作流程",
        "原生开发环境和验证路径梳理"
      ],
      "status": "目前为需求和方案阶段；原生构建、签名与设备验证仍待条件具备后推进。"
    },
    "en": {
      "name": "Watch Recording → Local Knowledge",
      "summary": "A planned personal tool for watch recordings, phone transfer, on-device transcription, categorization, and summaries.",
      "problem": "Turn captured audio into reviewable knowledge stored locally.",
      "flow": [
        "Record on the watch",
        "Transfer to the phone",
        "Transcribe on-device",
        "Categorize and summarize"
      ],
      "features": [
        "Independent runtime and local-processing requirements",
        "Phone/watch workflow",
        "Native build and verification plan"
      ],
      "status": "Currently a requirements and design project. Native builds, signing, and device verification remain ahead."
    }
  },
  {
    "slug": "conversation-game",
    "category": "games",
    "stage": "exploring",
    "started": "2026-10",
    "stack": [
      "Game design",
      "LLM",
      "Dialogue"
    ],
    "zh": {
      "name": "自由话术游戏 · 创意探索",
      "summary": "从消消乐和祖玛讨论转向自由对话玩法，研究如何让话术影响角色反应与关卡目标。",
      "problem": "让玩家自己组织语言，而非只在固定选项中点击。",
      "flow": [
        "设定角色与目标",
        "玩家自由表达",
        "角色响应与状态变化",
        "解锁后续情境"
      ],
      "features": [
        "自由话术玩法方向清单",
        "角色目标和反馈循环",
        "适合轻量平台的场景构思"
      ],
      "status": "用户已放弃祖玛方向，目前停在新玩法创意清单，尚未选题开发。"
    },
    "en": {
      "name": "Free-form Dialogue Game · Concepts",
      "summary": "An exploration of dialogue mechanics in which a player's own wording influences characters and objectives.",
      "problem": "Let players form their own language rather than only choose from fixed options.",
      "flow": [
        "Set a character and goal",
        "Speak freely",
        "Resolve a response",
        "Unlock the next situation"
      ],
      "features": [
        "Free-form dialogue concepts",
        "Character objectives and feedback loops",
        "Light-platform scenario ideas"
      ],
      "status": "The Zuma direction was dropped. The work currently ends at a concept shortlist, before project selection or development."
    }
  }
];
export type Project = (typeof projects)[number];
export type Lang = 'zh' | 'en';
export const projectHref = (project: Project, lang: Lang) => `${lang === 'en' ? '/en' : ''}/projects/${project.slug}/`;

