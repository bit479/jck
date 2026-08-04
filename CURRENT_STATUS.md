# 当前项目交接状态

> 核对日期：2026-07-31  
> 本文根据项目根目录中的实际文件与代码整理，不代表后续规划已经实现。

## 1. 当前技术栈

- HTML5：页面结构、地图页面模板、项目弹窗与双千亿计划弹窗。
- CSS3：深蓝科技风视觉、页面布局、响应式适配、地图节点与连接线动画、弹窗和轮播样式。
- 原生 JavaScript：数据填充、页面切换、公司图片轮播、地图渲染、国家节点、弹窗、全屏控制。
- 本地静态资源：本地图片和本地 SVG 世界地图。
- 无 React、Vue、Node.js 运行环境、数据库、后台系统或第三方前端依赖；网站由浏览器直接打开 `index.html` 运行。

## 2. 当前主要文件和文件夹结构

```text
tbea-global-business/
├─ index.html                         # 全部页面、共用地图模板和两类弹窗结构
├─ css/
│  └─ style.css                       # 全站样式、响应式布局与动画
├─ js/
│  ├─ data.js                         # 网站文字、导航、国家、项目及双千亿计划数据
│  └─ script.js                       # 页面渲染和全部交互逻辑
├─ assets/
│  ├─ maps/
│  │  └─ world-map.svg                # 本地世界地图底图
│  └─ images/
│     ├─ company/                     # 公司轮播图片及占位图
│     ├─ projects/                    # 海外项目国家代表图片
│     └─ double-billion/minerals/     # 双千亿计划矿产图片
├─ PROJECT_SPEC.md                    # 原始完整需求
├─ AGENTS.md                          # 项目开发规则
├─ README.md                          # 使用说明，但部分“当前状态”已经过时
└─ 新建文本文档.txt                   # 当前为空文件
```

当前核心代码规模约为：`index.html` 318 行、`css/style.css` 2176 行、`js/data.js` 729 行、`js/script.js` 1693 行。

## 3. 已完成页面及目前功能

### 3.1 开头导览

- 页面 ID：`guide-page`，首次打开时默认显示。
- 显示中英文系统标题、说明文字和“请选择入口进入系统”提示。
- 使用纯 CSS 绘制深蓝科技背景、光晕、轨道和装饰线，不依赖背景图片或粒子库。
- 四个入口由 `websiteData.guide.entries` 动态生成：公司简介、海外项目建设、海外矿业开发、双千亿计划。
- 点击入口在当前页面内切换，不打开新窗口。

### 3.2 公司简介

- 页面 ID：`company-page`。
- 标题、正文、四项关键信息和轮播图片均读取 `websiteData.companyProfile`。
- 当前已有 4 张本地轮播图片、2 段公司介绍和 4 项关键信息。
- 轮播支持上一张、下一张、圆点选择、当前序号、键盘左右键、鼠标拖动和触摸横向滑动。
- `autoplay: true`，当前自动播放间隔为 `autoplayInterval: 8000` 毫秒。
- 用户手动切换后，本次浏览期间暂停自动轮播；鼠标悬停、页面不可见或系统启用减少动态效果时也会暂停。
- 图片加载失败时显示“公司宣传图片待补充”，不会显示破损图片。

### 3.3 海外项目建设

- 页面 ID：`projects-page`。
- 页面配置：`websiteData.overseasProjectsPage`；国家数据：`websiteData.overseasProjects`。
- 当前显示 8 个国家节点：塔吉克斯坦、吉尔吉斯斯坦、埃塞俄比亚、肯尼亚、赞比亚、苏丹、坦桑尼亚、缅甸。
- 国家节点根据经纬度定位，支持独立标签偏移、鼠标点击、触摸点击、Enter 和空格键打开。
- 从中国业务起点到当前国家绘制弧形连接线。
- 点击国家打开共用项目弹窗，显示国家中英文名、国家成果概览、国家代表图片和项目详情。
- 支持一个国家包含多个项目；多项目时显示项目目录并可切换，切换时只更新详情文字。
- 弹窗支持关闭按钮、点击遮罩和 Esc 键关闭，并将焦点还给原地图节点。

### 3.4 海外矿业开发

- 页面 ID：`mining-page`。
- 页面配置：`websiteData.overseasMiningPage`；国家数据：`websiteData.overseasMining`。
- 当前显示塔吉克斯坦和赞比亚 2 个矿业国家节点。
- 与海外项目建设共用地图模板、经纬度定位、连接线、节点创建和项目弹窗逻辑。
- 使用矿业页面的金色辅助视觉样式。
- 国家节点可通过鼠标、触摸和键盘打开弹窗，弹窗关闭方式与海外项目建设一致。

### 3.5 双千亿计划

- 页面 ID：`future-page`。
- 页面配置：`websiteData.futureOutlookPage`；国家数据：`websiteData.futureOutlook`。
- 当前显示 8 个重点国家：摩洛哥、加纳、布隆迪、赞比亚、坦桑尼亚、埃塞俄比亚、乌兹别克斯坦、吉尔吉斯斯坦。
- 金色节点表示矿产资源开发，蓝色节点表示海外成套项目建设；页面下方有对应图例。
- 点击节点打开独立的双千亿计划弹窗 `future-modal`，显示国家、业务类型和地区总览。
- 成套项目类国家显示能源建设方向，并为“待执行”和“中标在执行”项目列表预留区域。
- 矿业类国家显示矿种卡片、矿产图片和用途说明；图片缺失时自动显示占位区域。
- 当前选中的双千亿计划节点会高亮；关闭按钮、遮罩和 Esc 均可关闭弹窗并恢复节点焦点。

## 4. 顶部导航和页面切换逻辑

- 顶部导航容器 ID：`top-navigation`，按钮由 `websiteData.navigation.sections` 动态创建。
- 导览入口由 `createGuideEntries()` 创建；顶部导航由 `createTopNavigation()` 创建。
- 导览入口和顶部按钮都通过 `data-page-target`（JavaScript 中为 `dataset.pageTarget`）指向页面 ID。
- 核心切换函数是 `showPage(targetPageId)`：它遍历所有 `.page`，更新 `hidden` 和 `is-active`，并更新顶部导航的 `is-active` 与 `aria-current`。
- 导览页显示时隐藏 `site-header`；进入任一内容页后显示顶部导航。
- “返回导览”按钮调用 `showPage("guide-page")`。
- 进入公司简介时启动轮播计时器，离开公司简介时停止计时器。
- 全屏按钮兼容标准 Fullscreen API 和 WebKit 前缀接口，并根据状态切换按钮文字及 `aria-pressed`。

## 5. `js/data.js` 当前主要数据结构

全站数据根对象为 `websiteData`，当前一级字段如下：

- `siteInfo`：系统标题、英文标题、公司中英文名称。
- `navigation`：`sections`、返回导览文字、进入/退出全屏文字。
- `guide`：导览说明和 `entries` 入口数组。
- `companyProfile`：公司简介标题、轮播配置、图片、正文和关键信息。
- `overseasProjectsPage`：海外项目建设页面标题、说明、地图路径和空状态文字。
- `overseasProjects`：海外项目建设国家数组。
- `overseasMiningPage`：海外矿业页面配置。
- `overseasMining`：海外矿业国家数组。
- `futureOutlookPage`：双千亿计划页面配置和图例。
- `futureOutlook`：双千亿计划国家数组。

海外项目国家常用字段：

```text
id, countryName, countryNameEn,
longitude, latitude,
labelOffsetX, labelOffsetY, labelAnchor,
visible, image, overview, projects
```

`projects` 项目常用字段为 `id`、`projectName`、`description`；旧结构的国家级 `projectName`、`description`、`projectDescription` 和项目级 `image` 仍有兼容读取逻辑。

公司简介主要字段：

```text
sectionNumber, title, titleEn,
autoplay, autoplayInterval, imagePlaceholderText,
images[{ src, alt, caption }],
paragraphs[], highlights[{ label, value }]
```

## 6. 世界地图实现方式

- 底图为本地文件 `assets/maps/world-map.svg`，README 记录其来源为 Natural Earth 1:110m Admin 0 Countries，采用等距圆柱投影。
- HTML 中使用 `<img>` 显示底图，再叠加一个 `<svg>` 交互层；两层共同使用 `1000 × 500` 坐标系和 `preserveAspectRatio="xMidYMid meet"`。
- 三个地图页面复用 `map-page-template`，由 `renderMapPage()` 填充，由 `renderAllMapPages()` 统一初始化。
- `projectCoordinates(longitude, latitude)` 把经纬度换算为 SVG 坐标。
- 国家节点由 SVG `<g>`、透明触摸区域、圆环、光点和中英文标签组成。
- `renderMapConnections()` 从脚本内的中国业务起点（经度 `104.1954`、纬度 `35.8617`）向当前页面所有可见国家绘制二次贝塞尔弧线。
- `visible: true` 且经纬度有效的国家才会被渲染。

## 7. 国家节点和弹窗相关函数名称

地图与国家节点：

- `projectCoordinates()`
- `hasValidCountryCoordinates()`
- `calculateMarkerRadius()`
- `renderMapConnections()`
- `createMapNode()`
- `renderMapPage()`
- `renderAllMapPages()`

海外项目建设与海外矿业共用弹窗：

- `openProjectModal()`
- `closeProjectModal()`
- `getCountryProjects()`
- `fillProjectSwitcher()`
- `selectProject()`
- `updateProjectModalImage()`
- `showProjectImagePlaceholder()`

双千亿计划弹窗：

- `openFutureOutlookModal()`
- `closeFutureOutlookModal()`
- `fillFutureProjectList()`
- `createFutureMineralCard()`

`createMapNode()` 内部还有 `openCountryDetails()`，它根据 `interactionType` 分别调用 `openProjectModal()` 或 `openFutureOutlookModal()`。

## 8. 公司简介图片轮播函数名称

- `getCompanyImages()`：读取轮播图片数组。
- `fillCompanyProfile()`：生成图片、正文和关键信息。
- `updateCompanyCarousel()`：更新轨道位置、圆点和计数器。
- `selectCompanyImage()`：切换到指定图片。
- `startCompanyCarousel()`：启动自动轮播。
- `stopCompanyCarousel()`：停止自动轮播。
- `bindCompanyCarouselEvents()`：绑定箭头、圆点、键盘、指针拖动和触摸事件。
- `bindCompanyCarouselEvents()` 内部的 `finishPointerGesture()`：结束拖动/滑动并判断是否切图。

## 9. 双千亿计划字段名称和页面 ID

- 页面 ID：`future-page`。
- 页面配置字段：`futureOutlookPage`。
- 国家数据字段：`futureOutlook`。
- 独立弹窗 ID：`future-modal`。
- 导航和导览入口均以 `targetPageId: "future-page"` 指向该页面。

双千亿计划国家除通用国家字段外，主要使用：

```text
businessType                 # mining 或 turnkey
businessTypeLabel
markerStyle                  # gold 或 blue
category                     # projectConstruction / miningDevelopment
summary
projectConstruction.direction
projectConstruction.pending
projectConstruction.ongoing
miningDevelopment.description
miningDevelopment.minerals
```

每个 `minerals` 元素使用 `name`、`image`、`description`。`pending` 和 `ongoing` 预期为项目对象数组，页面读取其中的 `projectName`。

## 10. 当前已知 Bug、占位内容和未完成事项

### 明确占位或未完成内容

- 顶部公司 LOGO 仍是文字 `TBEA` 占位，没有正式 LOGO 图片。
- 海外项目建设和海外矿业页面说明仍为“此处填写……”占位文案。
- 缅甸国家数据使用 `assets/images/projects/project-placeholder.jpg`，该文件实际不存在；脚本因路径包含 `placeholder` 会主动显示项目图片占位，不会请求该文件。缅甸成果概览仍为占位文字，`projects` 为空。
- 坦桑尼亚有一个项目名称为“项目名称待确认”。
- 海外矿业当前只有塔吉克斯坦和赞比亚两个节点，两国的项目名称、介绍和图片均为待补充内容。
- 双千亿计划各国的 `projectConstruction.pending`、`projectConstruction.ongoing` 当前全部为空；矿业国家的 `miningDevelopment.description` 为空，页面主要显示矿种卡片与国家 `summary`。
- 公司宣传视频区域没有出现在当前 `index.html` 中，`assets/videos/company-introduction.mp4` 也不存在。
- 复杂粒子效果和更复杂动画尚未开发；当前只有 CSS 背景、淡入、节点呼吸、连接线和按压反馈等基础效果。
- `README.md` 的状态说明已经落后于代码：仍写“未来展望当前没有具体国家”“公司简介正式文案和正式图片未开发”等，与当前实际的“双千亿计划”页面和公司轮播数据不一致。

### 当前检查未发现的明显错误

- `js/data.js` 和 `js/script.js` 已通过 JavaScript 静态语法解析。
- `index.html` 当前共 64 个 ID，未发现重复 ID。
- `css/style.css` 的大括号数量匹配。
- 除上述有意使用的 `project-placeholder.jpg` 外，代码中当前引用的公司图片、项目图片、双千亿矿产图片和世界地图文件均存在。
- 由于浏览器安全策略禁止自动检查本地 `file://` 页面，本次没有完成真实浏览器控制台的运行时检查；结论仅覆盖静态语法、DOM ID 和资源引用等明显问题。

## 11. 不能随意重写的文件

- `index.html`：页面 ID、地图模板 ID、弹窗 ID 与 `js/script.js`、`css/style.css` 大量互相引用，不能整体重写或随意改名。
- `css/style.css`：已经包含完整布局、地图、轮播、弹窗、动画和横屏适配规则，不应整文件替换；应针对新增页面追加或局部调整。
- `js/script.js`：包含现有页面切换、轮播、地图、两类弹窗和全屏功能，不应整体重写；新增功能应保持现有函数和 DOM 约定。
- `js/data.js`：是所有国家、项目和页面文字的唯一集中数据源，不应把国家或项目数据分散写入 HTML；现有字段改名会影响渲染逻辑。
- `assets/maps/world-map.svg`：与 `1000 × 500` 坐标系及经纬度换算逻辑配套，不能在未同步调整投影和脚本的情况下替换或重写。
- `assets/images/` 中现有正式图片不应在未确认素材的情况下覆盖。

## 12. 下一步任务

在现有“双千亿计划”之后新增“科技赋能”页面。

本交接文档只记录该任务，当前尚未创建“科技赋能”的 HTML 页面、导航项、数据字段、样式或 JavaScript 逻辑。新对话开始开发前，应先再次阅读 `PROJECT_SPEC.md`、`AGENTS.md` 和本文，并在不破坏现有五个页面的前提下完成该阶段。
