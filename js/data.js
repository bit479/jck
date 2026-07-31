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
        title: "未来展望",
        targetPageId: "future-page"
      }
    ],
    backGuideText: "返回导览",
    enterFullscreenText: "全屏展示",
    exitFullscreenText: "退出全屏"
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
        title: "未来展望",
        titleEn: "FUTURE OUTLOOK",
        iconText: "瞻",
        targetPageId: "future-page"
      }
    ]
  },

  companyProfile: {
    title: "公司简介",
    titleEn: "COMPANY PROFILE",
    description: "此处填写特变电工进出口公司的发展历程、业务定位、国际化能力及主要业务概况。",
    image: "assets/images/company/company-profile.jpg",
    imagePlaceholderText: "公司宣传图片待补充",
    tags: [
      "国际工程",
      "电力能源",
      "海外矿业",
      "全球服务"
    ]
  },

  overseasProjectsPage: {
    sectionIndex: "02 / GLOBAL PROJECTS",
    title: "海外成套项目建设",
    titleEn: "OVERSEAS TURNKEY PROJECTS",
    description: "此处填写公司海外电力工程、输变电项目及成套项目建设业务概况。",
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
   * 3. 正式图片补充到 image 对应路径后，弹窗会自动显示图片。
   */
  overseasProjects: [
    {
      id: "tajikistan",
      countryName: "塔吉克斯坦",
      countryNameEn: "Tajikistan",
      longitude: 71.2761,
      latitude: 38.861,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      projects: [
        {
          projectName: "杜尚别500kV变电站",
          description: "项目正式介绍待补充",
          image: "assets/images/projects/tajikistan-project.jpg"
        }
      ]
    },
    {
      id: "kyrgyzstan",
      countryName: "吉尔吉斯斯坦",
      countryNameEn: "Kyrgyzstan",
      longitude: 74.7661,
      latitude: 41.2044,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "ethiopia",
      countryName: "埃塞俄比亚",
      countryNameEn: "Ethiopia",
      longitude: 40.4897,
      latitude: 9.145,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "kenya",
      countryName: "肯尼亚",
      countryNameEn: "Kenya",
      longitude: 37.9062,
      latitude: -0.0236,
      labelOffsetX: 14,
      labelOffsetY: 18,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "zambia",
      countryName: "赞比亚",
      countryNameEn: "Zambia",
      longitude: 27.8493,
      latitude: -13.1339,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "sudan",
      countryName: "苏丹",
      countryNameEn: "Sudan",
      longitude: 30.2176,
      latitude: 12.8628,
      labelOffsetX: -14,
      labelOffsetY: -12,
      labelAnchor: "end",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "tanzania",
      countryName: "坦桑尼亚",
      countryNameEn: "Tanzania",
      longitude: 34.8888,
      latitude: -6.369,
      labelOffsetX: 14,
      labelOffsetY: 36,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    },
    {
      id: "myanmar",
      countryName: "缅甸",
      countryNameEn: "Myanmar",
      longitude: 95.956,
      latitude: 21.9162,
      labelOffsetX: 14,
      labelOffsetY: -4,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "项目名称待补充",
          description: "该国家业务成果介绍待补充",
          image: ""
        }
      ]
    }
  ],

  overseasMiningPage: {
    sectionIndex: "03 / GLOBAL MINING",
    title: "海外金矿开发",
    titleEn: "OVERSEAS GOLD MINING DEVELOPMENT",
    description: "此处填写公司海外金矿资源开发、矿山建设及运营管理业务概况。",
    mapImage: "assets/maps/world-map.svg",
    mapAltText: "海外矿业开发世界地图",
    mapAriaLabel: "海外矿业开发国家节点",
    emptyStateText: "海外矿业开发国家资料待补充"
  },

  // 当前矿业页面只显示塔吉克斯坦和赞比亚，不补充未经确认的项目资料。
  overseasMining: [
    {
      id: "tajikistan-mining",
      countryName: "塔吉克斯坦",
      countryNameEn: "Tajikistan",
      longitude: 71.2761,
      latitude: 38.861,
      labelOffsetX: 14,
      labelOffsetY: -4,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "矿业项目名称待补充",
          description: "该国家矿业业务资料待补充。",
          image: ""
        }
      ]
    },
    {
      id: "zambia-mining",
      countryName: "赞比亚",
      countryNameEn: "Zambia",
      longitude: 27.8493,
      latitude: -13.1339,
      labelOffsetX: 14,
      labelOffsetY: -4,
      labelAnchor: "start",
      visible: true,
      projects: [
        {
          projectName: "矿业项目名称待补充",
          description: "该国家矿业业务资料待补充。",
          image: ""
        }
      ]
    }
  ],

  futureOutlookPage: {
    sectionIndex: "04 / FUTURE OUTLOOK",
    title: "未来展望",
    titleEn: "FUTURE OUTLOOK",
    description: "展示公司未来重点区域的项目建设与矿产资源开发布局。",
    mapImage: "assets/maps/world-map.svg",
    mapAltText: "未来展望世界地图",
    mapAriaLabel: "未来展望关注国家节点",
    emptyStateText: "未来关注国家及区域资料待补充"
  },

  /*
   * 未来展望国家/地区数据结构：
   * 1. category 决定该地区包含哪些业务，可填写：
   *    "projectConstruction"（项目建设）和 "miningDevelopment"（矿产资源开发）。
   * 2. 一个地区同时包含两类业务时，将两个值都放入 category 数组。
   * 3. projectConstruction.pending 为待执行项目，
   *    projectConstruction.ongoing 为中标在执行项目。
   * 4. miningDevelopment.minerals 保存矿种名称、图片路径和说明。
   */
  futureOutlook: [
    {
      id: "ethiopia-future",
      countryName: "埃塞俄比亚",
      countryNameEn: "Ethiopia",
      longitude: 40.4897,
      latitude: 9.145,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      category: ["projectConstruction"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [
          {
            projectName: "prime1（lot1-5）",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "两个变电站改造项目",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "地埋电缆项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ],
        ongoing: [
          {
            projectName: "亚吉230kV线路项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ]
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: []
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "uzbekistan-future",
      countryName: "乌兹别克斯坦",
      countryNameEn: "Uzbekistan",
      longitude: 64.5853,
      latitude: 41.3775,
      labelOffsetX: -14,
      labelOffsetY: -14,
      labelAnchor: "end",
      visible: true,
      category: ["projectConstruction"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [
          {
            projectName: "4个220kV变电站改造项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ],
        ongoing: [
          {
            projectName: "19、22、23号水电站改造项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ]
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: []
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "kyrgyzstan-future",
      countryName: "吉尔吉斯斯坦",
      countryNameEn: "Kyrgyzstan",
      longitude: 74.7661,
      latitude: 41.2044,
      labelOffsetX: 14,
      labelOffsetY: -14,
      labelAnchor: "start",
      visible: true,
      category: ["projectConstruction"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [
          {
            projectName: "阿拉套110kV及35kV输变电项目",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "库木托尔110kV输变电项目",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "国调项目",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "导线供货项目",
            description: "该地区未来项目建设介绍待补充"
          },
          {
            projectName: "电表供货项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ],
        ongoing: [
          {
            projectName: "库木托尔220kV输变电项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ]
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: []
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "singapore-future",
      countryName: "新加坡",
      countryNameEn: "Singapore",
      longitude: 103.8198,
      latitude: 1.3521,
      labelOffsetX: 14,
      labelOffsetY: 18,
      labelAnchor: "start",
      visible: true,
      category: ["projectConstruction"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [
          {
            projectName: "新加坡系列项目",
            description: "该地区未来项目建设介绍待补充"
          }
        ],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: []
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "tanzania-future",
      countryName: "坦桑尼亚",
      countryNameEn: "Tanzania",
      longitude: 34.8888,
      latitude: -6.369,
      labelOffsetX: 14,
      labelOffsetY: 18,
      labelAnchor: "start",
      visible: true,
      category: ["miningDevelopment"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: [
          {
            name: "金矿",
            image: "assets/images/minerals/gold-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          }
        ]
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "zambia-future",
      countryName: "赞比亚",
      countryNameEn: "Zambia",
      longitude: 27.8493,
      latitude: -13.1339,
      labelOffsetX: -14,
      labelOffsetY: 18,
      labelAnchor: "end",
      visible: true,
      category: ["miningDevelopment"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: [
          {
            name: "铜金",
            image: "assets/images/minerals/copper-gold-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          }
        ]
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "ghana-future",
      countryName: "加纳",
      countryNameEn: "Ghana",
      longitude: -1.0232,
      latitude: 7.9465,
      labelOffsetX: -14,
      labelOffsetY: -4,
      labelAnchor: "end",
      visible: true,
      category: ["miningDevelopment"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: [
          {
            name: "金",
            image: "assets/images/minerals/gold-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          }
        ]
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "burundi-future",
      countryName: "布隆迪",
      countryNameEn: "Burundi",
      longitude: 29.9189,
      latitude: -3.3731,
      labelOffsetX: -14,
      labelOffsetY: -14,
      labelAnchor: "end",
      visible: true,
      category: ["miningDevelopment"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: [
          {
            name: "镍",
            image: "assets/images/minerals/nickel-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          }
        ]
      },
      summary: "该地区未来业务总览待补充"
    },
    {
      id: "morocco-future",
      countryName: "摩洛哥",
      countryNameEn: "Morocco",
      longitude: -7.0926,
      latitude: 31.7917,
      labelOffsetX: -14,
      labelOffsetY: -4,
      labelAnchor: "end",
      visible: true,
      category: ["miningDevelopment"],
      projectConstruction: {
        description: "该地区未来项目建设介绍待补充",
        pending: [],
        ongoing: []
      },
      miningDevelopment: {
        description: "该地区矿产资源开发介绍待补充",
        minerals: [
          {
            name: "铅锌矿",
            image: "assets/images/minerals/lead-zinc-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          },
          {
            name: "锡矿",
            image: "assets/images/minerals/tin-placeholder.jpg",
            description: "该地区矿产资源开发介绍待补充"
          }
        ]
      },
      summary: "该地区未来业务总览待补充"
    }
  ]
};
