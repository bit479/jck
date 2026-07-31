/*
 * 网站可修改内容统一存放在这里。
 * 国家和项目信息均集中在本文件，后续替换内容时无需修改页面结构。
 */
const websiteData = {
  siteInfo: {
    title: "特变电工进出口公司全球业务展示系统",
    titleEn: "TBEA International Business Overview",
    companyName: "特变电工进出口公司",
    companyNameEn: "TBEA International Business",
  },

  navigation: {
    sections: [
      {
        title: "公司简介",
        targetPageId: "company-page",
      },
      {
        title: "海外项目建设",
        targetPageId: "projects-page",
      },
      {
        title: "海外矿业开发",
        targetPageId: "mining-page",
      },
      {
        title: "未来展望",
        targetPageId: "future-page",
      },
    ],
    backGuideText: "返回导览",
    enterFullscreenText: "全屏展示",
    exitFullscreenText: "退出全屏",
  },

  guide: {
    description: "立足中国，服务全球，持续推进海外工程建设与矿产资源开发。",
    entries: [
      {
        id: "company",
        title: "公司简介",
        titleEn: "COMPANY PROFILE",
        iconText: "企",
        targetPageId: "company-page",
      },
      {
        id: "projects",
        title: "海外项目建设",
        titleEn: "OVERSEAS PROJECTS",
        iconText: "建",
        targetPageId: "projects-page",
      },
      {
        id: "mining",
        title: "海外矿业开发",
        titleEn: "MINING DEVELOPMENT",
        iconText: "矿",
        targetPageId: "mining-page",
      },
      {
        id: "future",
        title: "未来展望",
        titleEn: "FUTURE OUTLOOK",
        iconText: "瞻",
        targetPageId: "future-page",
      },
    ],
  },

  companyProfile: {
    title: "公司简介",
    titleEn: "COMPANY PROFILE",
    description:
      "此处填写特变电工进出口公司的发展历程、业务定位、国际化能力及主要业务概况。",
    image: "assets/images/company/company-profile.jpg",
    imagePlaceholderText: "公司宣传图片待补充",
    tags: ["国际工程", "电力能源", "海外矿业", "全球服务"],
  },

  overseasProjectsPage: {
    sectionIndex: "02 / GLOBAL PROJECTS",
    title: "海外成套项目建设",
    titleEn: "OVERSEAS TURNKEY PROJECTS",
    description: "此处填写公司海外电力工程、输变电项目及成套项目建设业务概况。",
    mapImage: "assets/maps/world-map.svg",
    mapAltText: "海外项目建设世界地图",
    mapAriaLabel: "海外项目建设国家节点",
    emptyStateText: "海外项目建设国家资料待补充",
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
          image: "assets/images/projects/tajikistan-project.jpg",
        },
      ],
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
          image: "",
        },
      ],
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
          image: "",
        },
      ],
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
          image: "",
        },
      ],
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
          image: "",
        },
      ],
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
          image: "",
        },
      ],
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
          image: "",
        },
  