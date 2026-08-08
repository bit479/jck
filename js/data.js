/*
 * 网站可修改内容统一存放在这里。
 * 国家和项目信息均集中在本文件，后续替换内容时无需修改页面结构。
 */
const websiteData = {
  siteInfo: {
    title: "特变电工进出口公司全球业务展示系统",
    titleEn: "TBEA International Business Overview",
    companyName: "特变电工进出口公司",
    companyNameEn: "TBEA International Business"
  },

  navigation: {
    sections: [
      {
        title: "公司简介",
        targetPageId: "company-page"
      },
      {
        title: "海外项目建设",
        targetPageId: "projects-page"
      },
      {
        title: "海外矿业开发",
        targetPageId: "mining-page"
      },
      {
        title: "双千亿计划",
        targetPageId: "future-page"
      },
      {
        title: "科技赋能",
        targetPageId: "tech-page"
      }
    ],
    backGuideText: "返回导览",
    enterFullscreenText: "全屏展示",
    exitFullscreenText: "退出全屏"
  },

  homeHero: {
    companyName: "特变电工进出口公司",
    companyNameEn: "TBEA INTERNATIONAL BUSINESS",
    slogan: "筑电海外，矿越五洲，双轮驱动，布局全球",
    guideLabel: "导览",
    autoplay: true,
    autoplayInterval: 7000,
    autoplayResumeDelay: 12000,
    imagePlaceholder: "assets/images/home-hero/hero-placeholder.jpg",
    imagePlaceholderText: "首页背景图片待补充",
    slides: [
      {
        id: "home-hero-1",
        image: "assets/images/home-hero/hero-01.jpg",
        alt: "海外输电线路建设现场"
      },
      {
        id: "home-hero-2",
        image: "assets/images/home-hero/hero-02.jpg",
        alt: "海外变电站工程建设现场"
      },
      {
        id: "home-hero-3",
        image: "assets/images/home-hero/hero-03.jpg",
        alt: "特变电工海外项目团队"
      },
      {
        id: "home-hero-4",
        image: "assets/images/home-hero/hero-04.jpg",
        alt: "山地电力基础设施项目全景"
      }
    ]
  },

  guide: {
    description: "立足中国，服务全球，持续推进海外工程建设与矿产资源开发。",
    entries: [
      {
        id: "company",
        title: "公司简介",
        titleEn: "COMPANY PROFILE",
        iconText: "企",
        targetPageId: "company-page"
      },
      {
        id: "projects",
        title: "海外项目建设",
        titleEn: "OVERSEAS PROJECTS",
        iconText: "建",
        targetPageId: "projects-page"
      },
      {
        id: "mining",
        title: "海外矿业开发",
        titleEn: "MINING DEVELOPMENT",
        iconText: "矿",
        targetPageId: "mining-page"
      },
      {
        id: "future",
        title: "双千亿计划",
        titleEn: "DOUBLE 100-BILLION PLAN",
        iconText: "双",
        targetPageId: "future-page"
      },
      {
        id: "tech",
        title: "科技赋能",
        titleEn: "TECH EMPOWERMENT",
        iconText: "科",
        targetPageId: "tech-page"
      }
    ]
  },

  companyProfile: {
    sectionNumber: "01 / COMPANY",
    eyebrow: "GLOBAL ENERGY INFRASTRUCTURE",
    headline: {
      line1: "引领全球",
      line2Prefix: "能源建设",
      line2Suffix: "与矿产开发"
    },
    titleEn: "COMPANY PROFILE",
    title: "公司简介",
    paragraphs: [
      "特变电工进出口分公司始建于1997年，是特变电工集团负责全球化经营的核心平台。公司深耕海外市场近三十年，深度融入‘一带一路’建设，坚持国际工程承包与矿产资源开发双轮驱动，专注绿色低碳发展，致力打造全球一流的绿色智慧能源服务商。",
      "公司核心业务涵盖国际工程、跨境贸易物流及海外矿产开发，以输变电EPC总包为核心，同步承接电源、水利、工业市政等工程，提供全流程一站式解决方案；搭建全球化多式联运体系，保障海外供应链高效运转，并持续推进海外矿产资源开发。目前，公司业务覆盖全球70余个国家和地区。"
    ],
    highlightKeywords: [
      "1997年",
      "全球化经营",
      "国际工程承包",
      "矿产资源开发",
      "双轮驱动",
      "70余个国家和地区"
    ],
    achievementsSection: {
      titleEn: "GLOBAL INFLUENCE",
      title: "卓越业绩与荣誉",
      description: "持续深耕全球市场，以国际工程、全球供应链和矿产资源开发能力，服务海外能源基础设施建设。"
    },
    achievements: [
      {
        id: "global-regions",
        value: "70+",
        label: "全球业务覆盖",
        labelEn: "GLOBAL REGIONS",
        description: "70余个国家和地区",
        icon: "globe"
      },
      {
        id: "enr-ranking",
        value: "TOP 20",
        label: "ENR行业排名",
        labelEn: "ENR RANKING",
        description: "连续七年入选中国对外承包企业二十强",
        icon: "trophy"
      },
      {
        id: "experience",
        value: "30yr",
        label: "海外市场经验",
        labelEn: "GLOBAL EXPERIENCE",
        description: "深耕海外市场近三十年",
        icon: "medal"
      },
      {
        id: "project-honors",
        value: "鲁班奖",
        label: "工程品质荣誉",
        labelEn: "PROJECT HONORS",
        description: "多项海外工程斩获鲁班奖",
        icon: "award"
      }
    ]
  },

  techEmpowerment: {
    sectionNumber: "05 / TECH EMPOWERMENT",
    titleEn: "TECH EMPOWERMENT",
    title: "科技赋能",
    description: "围绕全球矿产资源、电力建设需求与海洋采矿趋势，构建交互式可视化平台，为海外市场研究、项目筛选和战略决策提供数据支持。",
    imagePlaceholder: "assets/images/tech-empowerment/platform-placeholder.jpg",
    imagePlaceholderText: "平台图片待补充",
    cards: [
      {
        id: "platform-1",
        title: "全球矿产资源与电力建设需求交互式可视化平台",
        image: "assets/images/tech-empowerment/platform-01.png",
        alt: "全球矿产资源与电力建设需求交互式可视化平台",
        summary: "该平台整合38个国家的矿产资源、输变电建设、新能源潜力及矿电协同评分，通过全球地图、图表和国别对比，展示重点市场、区域机会与潜在风险，为海外项目筛选和战略决策提供数据支持。",
        url: "platforms/mineral-power/index.html",
        buttonText: "进入平台"
      },
      {
        id: "platform-2",
        title: "全球海洋采矿项目可视化平台",
        image: "assets/images/tech-empowerment/platform_02.png",
        alt: "全球海洋采矿项目可视化平台",
        summary: "该网页系统呈现全球海洋采矿项目分布、矿权价值、国家战略及特变电工潜在机会，为高层研判产业趋势和业务布局提供直观依据。",
        url: "platforms/ocean-mining/index.html",
        buttonText: "进入平台"
      }
    ]
  },

  overseasProjectsPage: {
    sectionIndex: "02 / GLOBAL PROJECTS",
    title: "海外成套项目建设",
    titleEn: "OVERSEAS TURNKEY PROJECTS",
    description: "特变电工自1997年起深耕海外电力建设，以输变电和电源成套总承包为核心，业务覆盖苏丹、塔吉克斯坦、吉尔吉斯斯坦、埃塞俄比亚、肯尼亚、赞比亚、坦桑尼亚等国，建成220kV至500kV输变电线路、变电站及热电厂等成套项目。其中500kV杜尚别变电站获中国境外工程建设鲁班奖，公司连续多年入选ENR全球最大250家国际承包商。",
    mapImage: "assets/maps/world-map.svg",
    mapAltText: "海外项目建设世界地图",
    mapAriaLabel: "海外项目建设国家节点",
    emptyStateText: "海外项目建设国家资料待补充"
  },

  /*
   * 海外项目建设国家：
   * 1. longitude 和 latitude 决定节点在地图上的真实位置。
   * 2. labelOffsetX、labelOffsetY 和 labelAnchor 只调整文字标签，
   *    用于避开附近国家，不会改变国家节点的位置。
   * 3. 每个国家只有一张代表图片和一段成果概览。
   * 4. projects 数组可以保存一个或多个项目；每个项目只包含
   *    id、projectName 和 description。
   * 5. 正式图片补充到国家的 image 对应路径后，弹窗会自动显示图片。
   */
  overseasProjects: [
    {
      id: "tajikistan",
      countryName: "塔吉克斯坦",
      countryNameEn: "Tajikistan",
      // 杜尚别坐标：68°46.3695717′E，38°36.5766338′N
      longitude: 68.772826,
      latitude: 38.609611,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      image: "assets/images/projects/tajikistan.jpg",
      overview: "特变电工自2006年进入塔吉克斯坦市场，围绕电力工程总承包持续建设火电、主干输变电和电网升级项目。系列工程补齐冬季电力与集中供热短板，打通跨区域电力调配通道，完善国家电网体系，增强当地能源自主保障能力并支持经济建设。",
      projects: [
        {
          id: "tajikistan-project-1",
          projectName: "杜尚别2*50MW燃煤供热火力发电厂二期工程",
          description: "项目建设杜尚别燃煤供热火力发电设施，补充首都冬季电力和供热能力。工程投运后，缓解长期冬季限电问题并改善集中供暖条件，为居民生活、城市基础设施和当地工业稳定运行提供能源保障。"
        },
        {
          id: "tajikistan-project-2",
          projectName: "杜尚别2*50MW燃煤供热火力发电厂一期工程",
          description: "项目建设杜尚别燃煤供热火力发电设施，提升首都电力供应与集中供热保障能力。工程有助于缓解冬季电力短缺，支持工商业和农业连续生产，并在项目实施和运行过程中培养当地电力运维人员。"
        },
        {
          id: "tajikistan-project-3",
          projectName: "500kV“南-北”输变电工程",
          description: "项目建设连接塔吉克斯坦南北区域的高压输变电通道，服务国家水电资源输送和跨区域电力配置。工程缓解南部冬季用电紧张，提升国家电力系统运行效率，并为能源外送和区域经济发展创造条件。"
        },
        {
          id: "tajikistan-project-4",
          projectName: "塔吉克斯坦政府直辖区500kV高压输变电工程项目",
          description: "项目建设政府直辖区高压主干电网及远程调度设施，打通杜尚别热电厂电力外送通道，连接首都与东北部山区电网。工程改善北部山区供电不足，增强水电、火电跨区域调配和国家电网安全稳定运行能力。"
        },
        {
          id: "tajikistan-project-5",
          projectName: "220kV“罗扎尔-哈德隆”输变电项目",
          description: "项目作为达什季朱姆水电站配套输变电工程，建设南部地区重要电力送出通道，并应用成套输变电技术。工程用于缓解南部供电紧张，支持库布里亚市工业发展，同时增强塔吉克斯坦与周边地区的能源供应联系。"
        }
      ]
    },
    {
      id: "kyrgyzstan",
      countryName: "吉尔吉斯斯坦",
      countryNameEn: "Kyrgyzstan",
      // 达特卡500kV变电站所在地区（贾拉拉巴德州巴扎尔霍尔甘）坐标
      longitude: 72.7459,
      latitude: 41.0376,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      image: "assets/images/projects/kyrgyzstan.jpg",
      overview: "特变电工较早进入吉尔吉斯斯坦能源市场，持续参与国家主干电网、南部电网和首都热电保障工程建设，业务覆盖高压输变电与热电改造。系列项目完善了独立电力网络，改善首都供热供电及南部地区用电条件，为当地工业发展和民生能源保障提供支撑。",
      projects: [
        {
          id: "kyrgyzstan-project-1",
          projectName: "“达特卡-克明”项目",
          description: "项目建设国家级输变电通道，推动吉尔吉斯斯坦形成更加独立的电力网络。工程投运后，可向无电和缺电地区输送电能，改善区域供电条件，为当地经济发展、居民生活和国家能源自主保障提供重要支撑。"
        },
        {
          id: "kyrgyzstan-project-2",
          projectName: "比什凯克热电改造项目",
          description: "项目对比什凯克热电厂实施改造，提升首都核心供热供电设施的保障能力和运行水平。改造完成后，热电厂更好满足当地居民用电和冬季取暖需求，成为中吉能源基础设施合作的重要成果。"
        },
        {
          id: "kyrgyzstan-project-3",
          projectName: "南部电网改善项目",
          description: "项目围绕吉尔吉斯斯坦南部电网开展建设，改善区域电网输配电能力和南部城市用电条件。工程为水电资源输送搭建重要通道，推动电力资源跨区域配置，并为南部地区经济发展和民生用电提供支撑。"
        },
        {
          id: "kyrgyzstan-project-4",
          projectName: "比什凯克热电厂大修项目",
          description: "项目针对比什凯克热电厂事故暴露出的运行稳定问题开展大修，重点恢复并提升首都供热供电设施的运行效率与可靠性。工程旨在降低类似故障再次发生的风险，保障城市居民冬季供暖和日常用电。"
        }
      ]
    },
    {
      id: "ethiopia",
      countryName: "埃塞俄比亚",
      countryNameEn: "Ethiopia",
      // 博莱-莱米工业园（亚的斯亚贝巴）坐标
      longitude: 38.856808,
      latitude: 8.97145,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      image: "assets/images/projects/ethiopia.jpg",
      overview: "特变电工自2009年进入埃塞俄比亚成套工程市场，业务覆盖国家主干输电、工业园配套输变电和铁路供电改造。系列项目完善国家电网体系，提升能源供应和工业园区用电保障能力，为交通、产业发展和当地经济建设提供关键电力基础设施支撑。",
      projects: [
        {
          id: "ethiopia-project-1",
          projectName: "400kV输电线路项目",
          description: "项目建设连接吉贝Ⅲ水电站与亚的斯亚贝巴的400kV主干输电线路，是特变电工在埃塞俄比亚落地的首个大型成套项目。工程承担水电电力送出和首都区域供电任务，增强国家电网输送与能源保障能力。"
        },
        {
          id: "ethiopia-project-2",
          projectName: "一期工业园",
          description: "项目为博莱-莱米和基林托工业园建设配套输变电设施，服务园区生产用电和电力接入需求。工程完善工业园能源基础设施，提高园区供电保障能力，为产业项目落地、企业生产运行和当地工业发展提供支撑。"
        },
        {
          id: "ethiopia-project-3",
          projectName: "其他在建项目",
          description: "资料将Awash-Woldiya铁路供电改造项目与亚吉线路LOT1A项目合并列为其他在建项目。相关工程分别服务铁路供电设施改造和输电线路建设，持续完善当地交通能源配套与电网基础设施。"
        }
      ]
    },
    {
      id: "kenya",
      countryName: "肯尼亚",
      countryNameEn: "Kenya",
      // 内罗毕市中心（CITY CENTRE变电站）坐标
      longitude: 36.8172,
      latitude: -1.2864,
      labelOffsetX: 14,
      labelOffsetY: 18,
      labelAnchor: "start",
      visible: true,
      image: "assets/images/projects/kenya.jpg",
      overview: "特变电工围绕肯尼亚铁路运输配套、首都电网建设和城市能源基础设施开展合作，参与蒙内铁路供货及内罗毕高压电网升级。相关项目完善交通能源配套，增强首都供电区输送能力和供电稳定性，为城市运行、生产效率和经济发展提供支撑。",
      projects: [
        {
          id: "kenya-project-1",
          projectName: "与中铁合作的铁路供货项目",
          description: "项目为连接蒙巴萨与内罗毕的蒙内铁路提供相关设备，服务铁路建设和运输体系运行。蒙内铁路改善肯尼亚港口与首都之间的物流联系，项目通过交通基础设施配套支持当地货运效率提升和经济发展。"
        },
        {
          id: "kenya-project-2",
          projectName: "内罗毕市区220千伏电网升级改造工程",
          description: "项目在内罗毕市区新建220千伏GIS室内CITY CENTRE变电站，并建设由EMBAKASI变电站接入该站的埋地电缆。工程升级首都核心区域电网，增强电力输送能力和供电稳定性，改善城市生产生活用电保障。"
        },
        {
          id: "kenya-project-3",
          projectName: "内罗毕66千伏电网升级改造工程",
          description: "项目建设由CITY CENTRE变电站连接内罗毕多个区域的66千伏埋地线缆，并对相关变电站实施扩建。工程完善城市配电网络，提升不同片区电力输送和接入能力，与220千伏升级工程共同增强首都供电稳定性。"
        }
      ]
    },
    {
      id: "zambia",
      countryName: "赞比亚",
      countryNameEn: "Zambia",
      // Pensulo 330kV变电站（Serenje区）坐标
      longitude: 30.44021,
      latitude: -13.03222,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      image: "assets/images/projects/zambia.jpg",
      overview: "特变电工从设备出口逐步拓展至赞比亚高压输变电和新能源建设，依托多期主干电网、区域改造及光伏项目形成持续合作。系列工程完善北部和东部电网，缓解部分地区缺电，支撑矿业、农业发展，并建设跨境联网接口、优化当地能源结构。",
      projects: [
        {
          id: "zambia-project-1",
          projectName: "2条330kV输变电成套工程",
          description: "项目包含Pensulo-Kasama和Pensulo-Msoro-Chipata两条输电线路，打通赞比亚东部与北部电网，形成国家主干输电网络的重要组成部分。相关通道同时服务东南非电力池跨境联网，增强区域电力互通能力。"
        },
        {
          id: "zambia-project-2",
          projectName: "三期成套项目",
          description: "项目建设Kasama-Nakonde输变电通道，进一步完善赞比亚东北部国家级主干输电走廊。工程改善Muchinga省和北方省长期限电问题，提升区域供电保障能力，并为沿线矿业、农业发展及产业投资提供电力支撑。"
        },
        {
          id: "zambia-project-3",
          projectName: "Mpika地区电力改造项目",
          description: "项目是在前期两条330kV输变电成套工程实施基础上，依托与赞比亚国家电力公司的持续合作推进的后续区域电力改造工程。项目延续公司在当地电网建设领域的合作，为Mpika地区电力基础设施改善提供支持。"
        },
        {
          id: "zambia-project-4",
          projectName: "伊亭皮二期136MW光伏项目",
          description: "项目在赞比亚既有输变电项目合作基础上推进光伏电源建设，进一步拓展当地新能源业务。工程与多期高压输变电项目共同形成电网与新能源协同布局，有助于改善以水电为主的能源结构并提升清洁能源供应能力。"
        },
        {
          id: "zambia-project-5",
          projectName: "其他改造项目",
          description: "资料将Maposo变电站改造、Pensulo变电站改造和Lumwana变电站改造合并列为其他改造项目。相关工程围绕既有变电设施开展升级完善，延续公司与赞比亚国家电力公司的电网建设合作。"
        }
      ]
    },
    {
      id: "sudan",
      countryName: "苏丹",
      countryNameEn: "Sudan",
      // Gaili/Garri电厂（北喀土穆）坐标
      longitude: 32.6969,
      latitude: 16.1195,
      labelOffsetX: -14,
      labelOffsetY: -12,
      labelAnchor: "end",
      visible: true,
      image: "assets/images/projects/sudan.jpg",
      overview: "特变电工多年参与苏丹电力基础设施建设，围绕喀土穆及东部地区持续实施高压输电线路和变电站成套工程。相关项目补齐首都北部与东部区域电网短板，扩大高压输电网络覆盖，增强全国电网互联互通和供电可靠性，为当地电力工业化建设提供支撑。",
      projects: [
        {
          id: "sudan-project-1",
          projectName: "东部输电线路及变电站工程",
          description: "项目采用交钥匙方式开展勘测、设计、设备材料供货、运输和施工等工作，在苏丹东部建设输电线路及配套变电站。工程完善了当地电力基础设施，也进一步深化了特变电工与苏丹国家电力公司的项目合作。"
        },
        {
          id: "sudan-project-2",
          projectName: "220kV输电线路建设工程",
          description: "项目建设连接Gaili与Atbara的重要输电线路，形成苏丹相关城市之间的骨干电力通道。工程服务炼油产业所在地及沿线区域用电需求，完善国家高压输电网络，对提升区域电力输送和保障能力具有重要意义。"
        },
        {
          id: "sudan-project-3",
          projectName: "北卡220kV变电站项目",
          description: "项目建设北卡220kV变电站，用于改善喀土穆和迈达尼省的供电条件，是苏丹国家电网的重要组成部分。工程补强首都周边电网基础设施，提升区域电力接入、输送和供电保障能力。"
        }
      ]
    },
    {
      id: "tanzania",
      countryName: "坦桑尼亚",
      countryNameEn: "Tanzania",
      // 项目分东北电网与坦赞联网等多个标段，无单一地点，定位首都多多马
      longitude: 35.751607,
      latitude: -6.162959,
      labelOffsetX: 14,
      labelOffsetY: 36,
      labelAnchor: "start",
      visible: true,
      image: "assets/images/projects/tanzania.jpg",
      overview: "特变电工围绕坦桑尼亚输变电工程、电网升级和区域互联持续开展合作，项目覆盖国家骨干电网、东北电网及坦桑尼亚—赞比亚联网通道。系列工程提升当地电力输送能力和供电可靠性，推动东非区域能源互联互通，为经济发展和民生改善提供能源保障。",
      projects: [
        {
          id: "tanzania-project-1",
          projectName: "坦桑尼亚-赞比亚联网400kV LOT1-LOT4变电站工程",
          description: "项目为坦桑尼亚—赞比亚区域联网工程配套建设关键变电设施，覆盖多个标段。相关设施用于支撑跨境电力输送，增强联网系统运行稳定性和电力调配能力，为坦桑尼亚与赞比亚之间的电力互联提供保障。"
        },
        {
          id: "tanzania-project-2",
          projectName: "项目名称待确认",
          description: "资料记载该项目用于建设坦桑尼亚东北区域电网的核心变电设施，通过完善区域变电网络和电网结构，提高东北地区电力供应与输送能力，为后续电网扩展和区域经济发展提供基础支撑。"
        },
        {
          id: "tanzania-project-3",
          projectName: "坦桑尼亚东北电网二期项目",
          description: "项目在既有东北电网建设基础上继续完善区域输变电体系，增强电力输送和接入能力，改善东北地区电网结构与供电保障水平。工程为当地新增用电需求、产业发展和区域经济活动提供更稳定的能源支撑。"
        },
        {
          id: "tanzania-project-4",
          projectName: "坦桑尼亚-赞比亚联网400kV线路工程项目",
          description: "项目建设坦桑尼亚与赞比亚之间的跨境输电通道，承担两国电力联网和区域电能交换任务。工程推动东非和南部非洲电力网络互联，提升跨区域电力调配与能源保障能力，为区域经济协同发展提供基础设施支撑。"
        },
        {
          id: "tanzania-project-5",
          projectName: "坦桑尼亚W61 220kV和132kV变电工程项目",
          description: "项目建设220kV和132kV等级变电设施，完善坦桑尼亚相关地区的输变电网络。工程通过增强电力接入、转换和输送能力，提高当地电网运行可靠性与供电保障水平，为区域生产生活用电提供支撑。"
        }
      ]
    },
    {
      id: "myanmar",
      countryName: "缅甸",
      countryNameEn: "Myanmar",
      // 暂无签约项目地点，定位首都内比都
      longitude: 96.0785,
      latitude: 19.7633,
      labelOffsetX: 14,
      labelOffsetY: -4,
      labelAnchor: "start",
      visible: true,
      image: "assets/images/projects/myanmar.jpg",
      overview: "特变电工正积极拓展缅甸电力市场。2025年6月，缅甸驻华大使应邀访问特变电工并举行工作会谈；2025年9月，缅甸代总统敏昂莱访华期间专程参观北京特变电工，双方围绕缅甸水电、太阳能发电项目开发、电气设备制造及矿业开发等方向深入洽谈。目前双方合作仍处于洽谈阶段，具体项目建设成果资料待补充。",
      projects: [
        {
          id: "myanmar-project-1",
          projectName: "缅甸能源合作高层洽谈（2025年9月）",
          description: "缅甸代总统敏昂莱率高级代表团参观北京特变电工，了解公司全球电力与矿业成套建设能力，并就缅甸水电、太阳能发电项目、电气设备制造及矿业合作等方向进行洽谈。"
        },
        {
          id: "myanmar-project-2",
          projectName: "缅甸驻华大使访问交流（2025年6月）",
          description: "缅甸驻华大使应邀赴特变电工考察并举行工作会谈，围绕中缅电力与能源领域合作进行交流，双方表示将继续深化合作对接。"
        }
      ]
    }
  ],

  /*
   * 海外矿业开发使用独立的矿山封面与数据卡片，不再调用公共世界地图页面。
   * 项目文字和指标均依据《特变电工塔吉克斯坦金矿项目汇总》整理。
   */
  overseasMining: {
    sectionNumber: "03 / OVERSEAS MINING",
    titleEn: "OVERSEAS MINING DEVELOPMENT",
    title: "海外矿业开发",
    countryName: "塔吉克斯坦",
    countryNameEn: "Tajikistan",
    heroTitleEn: "TAJIKISTAN GOLD MINING",
    heroTitle: "塔吉克斯坦金矿项目",
    heroImage: "assets/images/mining/tajikistan-gold-mine.jpg",
    heroImageAlt: "塔吉克斯坦金矿矿山全景",
    imagePlaceholderText: "矿山图片待补充",
    overview: "特变电工自2006年进入塔吉克斯坦市场，2012年通过‘以资源换项目’方式取得上库马尔克和东杜奥巴两个矿区金矿采矿权。上库马尔克金矿采用露天开采、堆浸选矿，矿区海拔约3500米；东杜奥巴金矿采用井巷式开采、浮选选矿，海拔约2500米。项目分期建设，自2021年起陆续投产，目前已形成稳定运营能力。",
    summaryCardTitle: "金矿项目成果总览",
    summaryMetrics: [
      {
        label: "累计探明储量",
        value: "约78吨",
        unit: "黄金金属量"
      },
      {
        label: "远景储量",
        value: "超100吨",
        unit: ""
      },
      {
        label: "累计投资金额",
        value: "超过17亿元",
        unit: "人民币"
      },
      {
        label: "当前年产能",
        value: "约2.5—3吨",
        unit: "黄金"
      }
    ],
    focusAreas: [
      "高品位氧化矿开采",
      "原生矿地下开采",
      "生物预氧化选矿",
      "系统性规模化商业开采"
    ],
    projects: [
      {
        id: "upper-kumarg",
        name: "上库马尔克金矿",
        investment: "一期4.18亿元人民币；二期6500万美元",
        description: "上库马尔克金矿分一、二期建设，采用露天开采方式，矿区海拔约3500米、最高处超过4000米，选矿工艺为堆浸。项目采用三段一闭路破碎、堆浸、炭吸附、解吸电解及冶炼工艺，形成从矿石处理到黄金生产的完整工艺体系，是公司塔吉克斯坦金矿业务的重要工程。",
        metrics: [
          { label: "开采方式", value: "露天开采" },
          { label: "矿区海拔", value: "约3500米（最高超4000米）" },
          { label: "选矿方式", value: "堆浸" },
          { label: "矿区面积", value: "15.4平方公里" },
          { label: "金金属量", value: "34.75吨" },
          { label: "平均品位", value: "3.78—3.83g/t" },
          { label: "设计规模", value: "90万吨/年" },
          { label: "一期年产黄金", value: "约1.2吨" },
          { label: "二期预计新增年产", value: "约2.5吨" },
          { label: "静态投资回收期", value: "2.94年" }
        ]
      },
      {
        id: "east-duoba",
        name: "东杜奥巴金矿",
        investment: "12.13亿元人民币",
        description: "东杜奥巴金矿采用井巷式开采方式，矿区海拔约2500米，选矿工艺为浮选。项目建成后将进一步提升公司在塔吉克斯坦的黄金资源开发和规模化生产能力，并对当地矿业开发和经济发展发挥积极作用。",
        metrics: [
          { label: "开采方式", value: "井巷式开采" },
          { label: "矿区海拔", value: "约2500米" },
          { label: "选矿方式", value: "浮选" },
          { label: "探明金金属资源储量", value: "22.62吨" },
          { label: "设计规模", value: "90万吨/年" },
          { label: "年产黄金", value: "约1.5吨" }
        ]
      }
    ],
    mapPanel: {
      title: "塔吉克斯坦矿区示意",
      mapImage: "assets/maps/world-map.svg",
      mapViewBox: [620, 105, 175, 105],
      markerLabel: "金矿项目",
      markerStyle: "gold",
      // 艾尼市坐标（39.40°N，68.54°E），矿区位于艾尼市一带。
      markerCoordinates: [68.54, 39.4],
      approximatePosition: [0.4, 0.34],
      isApproximate: false,
      legend: "金色节点：金矿资源布局",
      note: "矿区位于塔吉克斯坦艾尼市。"
    },
    videoCardTitleEn: "MINE AERIAL VIEW",
    videoCardTitle: "矿区航拍视频",
    videos: [
      {
        id: "mining-point-to-point",
        title: "矿区转点航拍",
        file: "assets/videos/mining-point-to-point.mp4"
      },
      {
        id: "mining-zoom",
        title: "矿区缩放航拍",
        file: "assets/videos/mining-zoom.mp4"
      }
    ]
  },

  futureOutlookPage: {
    sectionIndex: "04 / DOUBLE 100-BILLION PLAN",
    title: "双千亿计划",
    titleEn: "DOUBLE 100-BILLION PLAN",
    description: "面向‘十五五’，公司正加快向‘双千亿’级企业迈进，持续推进海外成套项目建设与矿产资源开发。下方展示公司正在执行及计划实施的重点项目与资源布局。",
    mapImage: "assets/maps/world-map.svg",
    mapAltText: "双千亿计划世界地图",
    mapAriaLabel: "双千亿计划重点国家节点",
    emptyStateText: "双千亿计划重点国家资料待补充",
    legend: [
      {
        markerStyle: "gold",
        label: "金色节点：矿产资源开发"
      },
      {
        markerStyle: "blue",
        label: "蓝色节点：海外成套项目建设"
      }
    ]
  },

  /*
   * 双千亿计划国家/地区数据结构：
   * 1. businessType 控制业务标签，填写 mining 或 turnkey。
   * 2. markerStyle 控制地图节点颜色，填写 gold 或 blue。
   * 3. category 保留原有兼容结构，后续同一国家可同时加入两类业务。
   * 4. projectConstruction.direction 保存能源建设重点方向，不虚构项目列表。
   * 5. miningDevelopment.minerals 保存矿种名称、图片路径和用途说明。
   */
  futureOutlook: [
    {
      id: "morocco-future",
      countryName: "摩洛哥",
      countryNameEn: "Morocco",
      // 铅锌锡资源潜力、无单一项目地点，定位首都拉巴特
      longitude: -6.8326,
      latitude: 34.0132,
      labelOffsetX: -14,
      labelOffsetY: -4,
      labelAnchor: "end",
      visible: true,
      businessType: "mining",
      businessTypeLabel: "矿产资源开发",
      markerStyle: "gold",
      category: ["miningDevelopment"],
      projectConstruction: {
        direction: "",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: [
          {
            name: "铅锌矿",
              image: "assets/images/double-billion/minerals/morocco-lead-zinc.png",
            description: "锌主要用于钢材防腐镀层，可应用于输电铁塔、钢结构、光伏支架和建筑材料；铅主要用于铅酸蓄电池、储能电源及辐射防护。"
          },
          {
            name: "锡矿",
            image: "assets/images/double-billion/minerals/morocco-tin.jpeg",
            description: "锡主要用于电子焊料、线路板及电气元件连接，也可用于金属防护镀层、镀锡包装和光伏焊带等产品。"
          }
        ]
      },
      summary: "摩洛哥地处欧非交汇区域，港口、制造业和矿业配套条件较好，具有连接欧洲、中东和非洲市场的区位优势。当地铅、锌、锡等金属资源具有开发潜力，可关注矿山建设、选矿加工、矿区供电及矿产品贸易协同。"
    },
    {
      id: "ghana-future",
      countryName: "加纳",
      countryNameEn: "Ghana",
      // 黄金主产区（阿散蒂金矿带奥布阿西）坐标
      longitude: -1.6917,
      latitude: 6.1481,
      labelOffsetX: -14,
      labelOffsetY: -4,
      labelAnchor: "end",
      visible: true,
      businessType: "mining",
      businessTypeLabel: "矿产资源开发",
      markerStyle: "gold",
      category: ["miningDevelopment"],
      projectConstruction: {
        direction: "",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: [
          {
            name: "金",
            image: "assets/images/double-billion/minerals/ghana-gold.jpeg",
            description: "黄金主要用于珠宝首饰、投资及储备，也因其导电性和稳定性应用于电子元件、通信设备及精密工业产品。"
          }
        ]
      },
      summary: "加纳是西非重要的黄金生产和出口国，矿业体系相对成熟，港口和道路条件优于周边部分国家。未来可围绕金矿开发、选矿设施、矿区供电、矿山装备和矿产品供应链开展业务协同。加纳同时拥有锰、铝土矿和钻石等资源，黄金仍是其最重要的矿产品之一。"
    },
    {
      id: "burundi-future",
      countryName: "布隆迪",
      countryNameEn: "Burundi",
      // 镍、金、稀土等多矿种资源潜力、无单一项目地点，定位首都基特加
      longitude: 29.925,
      latitude: -3.427,
      labelOffsetX: -14,
      labelOffsetY: -14,
      labelAnchor: "end",
      visible: true,
      businessType: "mining",
      businessTypeLabel: "矿产资源开发",
      markerStyle: "gold",
      category: ["miningDevelopment"],
      projectConstruction: {
        direction: "",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: [
          {
            name: "镍",
            image: "assets/images/double-billion/minerals/burundi-nickel.jpeg",
            description: "镍主要用于不锈钢、耐腐蚀及耐高温合金，也可应用于动力电池、化工设备、发电设施和航空部件。"
          }
        ]
      },
      summary: "布隆迪拥有镍、黄金、稀土等矿产资源，但矿业开发仍受到电力不足、交通不便和基础设施薄弱等因素制约。未来可关注镍矿勘探、矿山成套设备、选矿工程、矿区供电及矿产品贸易。世界银行最新矿业诊断也将镍、稀土和钒列为当地具有开发潜力的资源。"
    },
    {
      id: "zambia-future",
      countryName: "赞比亚",
      countryNameEn: "Zambia",
      // 铜矿资源集中区（铜带省基特韦）坐标
      longitude: 28.2132,
      latitude: -12.8024,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      businessType: "mining",
      businessTypeLabel: "矿产资源开发",
      markerStyle: "gold",
      category: ["miningDevelopment"],
      projectConstruction: {
        direction: "",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: [
          {
            name: "铜矿",
            image: "assets/images/double-billion/minerals/zambia-copper.png",
            description: "主要用于电线电缆、电网设备、变压器、新能源设施和电子制造。"
          },
          {
            name: "黄金",
            image: "assets/images/double-billion/minerals/zambia-gold.jpeg",
            description: "主要用于珠宝、投资储备以及精密电子元件。"
          }
        ]
      },
      summary: "赞比亚矿业经济以铜为核心，铜矿开发、选冶加工和矿区电力保障需求长期存在。未来可围绕铜金资源开发、矿山电网、选矿冶炼设施及矿产品贸易，形成矿业开发与能源建设协同布局。赞比亚是全球重要的铜生产国，铜在当地矿业和出口结构中占据主导地位。"
    },
    {
      id: "tanzania-future",
      countryName: "坦桑尼亚",
      countryNameEn: "Tanzania",
      // 黄金、铜、镍等多矿种、无单一项目地点，定位首都多多马
      longitude: 35.751607,
      latitude: -6.162959,
      labelOffsetX: 14,
      labelOffsetY: 18,
      labelAnchor: "start",
      visible: true,
      businessType: "mining",
      businessTypeLabel: "矿产资源开发",
      markerStyle: "gold",
      category: ["miningDevelopment"],
      projectConstruction: {
        direction: "",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: [
          {
            name: "金",
            image: "assets/images/double-billion/minerals/tanzania-gold.jpeg",
            description: "黄金主要用于珠宝首饰、投资与储备，同时广泛应用于计算机、通信设备、精密连接器及其他高可靠性电子产品。"
          }
        ]
      },
      summary: "坦桑尼亚拥有较好的黄金资源和矿业开发基础，近年来持续推动矿产勘探、加工增值和本地化参与。未来可关注金矿开发、选矿冶炼、矿区供电、矿山装备及相关基础设施建设。坦桑尼亚官方资料将黄金、铜、镍等列为主要金属矿产，并持续推动矿产加工和价值提升。"
    },
    {
      id: "ethiopia-future",
      countryName: "埃塞俄比亚",
      countryNameEn: "Ethiopia",
      // 与海外项目建设一致，博莱-莱米工业园配套输变电所在地
      longitude: 38.856808,
      latitude: 8.97145,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      businessType: "turnkey",
      businessTypeLabel: "海外成套项目建设",
      markerStyle: "blue",
      category: ["projectConstruction"],
      projectConstruction: {
        direction: "输变电扩容、变电站改造、配电升级及离网供电。",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: []
      },
      summary: "埃塞俄比亚电力结构以水电等可再生能源为主，但电网覆盖、输电能力和供电可靠性仍有提升空间。随着工业化、电气化和新能源建设推进，输变电扩容、变电站改造、配电升级及离网供电仍具有市场需求，同时需关注外汇、回款和项目安全风险。"
    },
    {
      id: "uzbekistan-future",
      countryName: "乌兹别克斯坦",
      countryNameEn: "Uzbekistan",
      // 特变电工穆龙套500kV变电站项目所在地（纳沃伊州穆龙套）
      longitude: 64.57778,
      latitude: 41.49667,
      labelOffsetX: -14,
      labelOffsetY: -14,
      labelAnchor: "end",
      visible: true,
      businessType: "turnkey",
      businessTypeLabel: "海外成套项目建设",
      markerStyle: "blue",
      category: ["projectConstruction"],
      projectConstruction: {
        direction: "输电扩容、新能源接入、电网改造、变电站升级、水电现代化及电力系统稳定性提升。",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: []
      },
      summary: "乌兹别克斯坦正推进电力市场改革和能源结构转型，电网改造、变电站升级、水电现代化以及光伏、风电和储能并网需求持续增长。未来市场重点包括输电扩容、新能源接入和电力系统稳定性提升。近年来，该国已持续推进可再生能源项目、输电基础设施升级和电池储能建设。"
    },
    {
      id: "kyrgyzstan-future",
      countryName: "吉尔吉斯斯坦",
      countryNameEn: "Kyrgyzstan",
      // 与海外项目建设一致，达特卡500kV变电站所在地（贾拉拉巴德州巴扎尔霍尔甘）
      longitude: 72.7459,
      latitude: 41.0376,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      businessType: "turnkey",
      businessTypeLabel: "海外成套项目建设",
      markerStyle: "blue",
      category: ["projectConstruction"],
      projectConstruction: {
        direction: "水电开发、主干电网扩容、变电站改造以及中亚区域电力互联。",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "",
        minerals: []
      },
      summary: "吉尔吉斯斯坦水电资源丰富，但受季节性供需矛盾、电网老化和区域输电能力限制，能源安全与供电稳定仍需提升。水电开发、主干电网扩容、变电站改造以及中亚区域电力互联，是较为明确的市场方向。"
    }
  ]
};
