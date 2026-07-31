/*
 * 网站主程序。
 * 三个地图栏目共用一套渲染逻辑，栏目文字和国家节点统一读取 data.js。
 * 不包含业务连接线或复杂动画。
 */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // 如果基础数据未成功加载，保留 HTML 中的占位文字，避免页面报错。
  if (typeof websiteData === "undefined") {
    console.warn("网站基础数据未加载，当前显示页面默认文字。");
    return;
  }

  const guideTitle = document.getElementById("guide-title");
  const guideTitleEn = document.getElementById("guide-title-en");
  const guideSubtitle = document.getElementById("guide-subtitle");
  const guideEntries = document.getElementById("guide-entries");
  const siteHeader = document.getElementById("site-header");
  const topNavigation = document.getElementById("top-navigation");
  const backGuideButton = document.getElementById("back-guide-button");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const mapPageTemplate = document.getElementById("map-page-template");
  const projectModal = document.getElementById("project-modal");
  const projectModalClose = document.getElementById("project-modal-close");
  const projectModalCountry = document.getElementById("project-modal-country");
  const projectModalCountryEn = document.getElementById("project-modal-country-en");
  const projectModalProjectName = document.getElementById("project-modal-project-name");
  const projectModalDescription = document.getElementById("project-modal-description");
  const projectModalImage = document.getElementById("project-modal-image");
  const projectModalImagePlaceholder = document.getElementById(
    "project-modal-image-placeholder"
  );
  const futureModal = document.getElementById("future-modal");
  const futureModalClose = document.getElementById("future-modal-close");
  const futureModalCountry = document.getElementById("future-modal-country");
  const futureModalCountryEn = document.getElementById(
    "future-modal-country-en"
  );
  const futureModalSummary = document.getElementById("future-modal-summary");
  const futureProjectSection = document.getElementById(
    "future-project-section"
  );
  const futureProjectDescription = document.getElementById(
    "future-project-description"
  );
  const futurePendingBlock = document.getElementById("future-pending-block");
  const futurePendingList = document.getElementById("future-pending-list");
  const futureOngoingBlock = document.getElementById("future-ongoing-block");
  const futureOngoingList = document.getElementById("future-ongoing-list");
  const futureMiningSection = document.getElementById(
    "future-mining-section"
  );
  const futureMiningDescription = document.getElementById(
    "future-mining-description"
  );
  const futureMinerals = document.getElementById("future-minerals");
  const pages = document.querySelectorAll(".page");
  let lastFocusedElement = null;
  let selectedFutureNode = null;

  /*
   * 中国业务起点仅用于绘制地图连接线，不属于可修改的国家项目数据，
   * 因此不改变 js/data.js 的现有数据结构。
   */
  const chinaBusinessOrigin = {
    longitude: 104.1954,
    latitude: 35.8617
  };

  if (guideTitle && websiteData.siteInfo && websiteData.siteInfo.title) {
    guideTitle.textContent = websiteData.siteInfo.title;
  }

  if (guideTitleEn && websiteData.siteInfo && websiteData.siteInfo.titleEn) {
    guideTitleEn.textContent = websiteData.siteInfo.titleEn;
  }

  if (guideSubtitle && websiteData.guide && websiteData.guide.description) {
    guideSubtitle.textContent = websiteData.guide.description;
  }

  /**
   * 填充公司名称和公司简介占位内容。
   */
  function fillCompanyProfile() {
    const brandName = document.getElementById("brand-name");
    const brandNameEn = document.getElementById("brand-name-en");
    const companyTitle = document.getElementById("company-title");
    const companyTitleEn = document.getElementById("company-title-en");
    const companyDescription = document.getElementById("company-description");
    const companyTags = document.getElementById("company-tags");
    const imagePlaceholderText = document.getElementById("company-image-placeholder-text");
    const profile = websiteData.companyProfile;

    if (brandName) {
      brandName.textContent = websiteData.siteInfo.companyName;
    }

    if (brandNameEn) {
      brandNameEn.textContent = websiteData.siteInfo.companyNameEn;
    }

    if (!profile) {
      return;
    }

    if (companyTitle) {
      companyTitle.textContent = profile.title;
    }

    if (companyTitleEn) {
      companyTitleEn.textContent = profile.titleEn;
    }

    if (companyDescription) {
      companyDescription.textContent = profile.description;
    }

    if (imagePlaceholderText) {
      imagePlaceholderText.textContent = profile.imagePlaceholderText;
    }

    if (companyTags && Array.isArray(profile.tags)) {
      profile.tags.forEach(function (tagText) {
        const tag = document.createElement("span");
        tag.className = "company-tag";
        tag.textContent = tagText;
        companyTags.appendChild(tag);
      });
    }
  }

  /**
   * 将经纬度转换为等距圆柱投影中的 SVG 坐标。
   * 底图和节点统一使用 1000×500 画布，缩放时不会发生相对位移。
   * @param {number} longitude 经度，范围 -180 到 180
   * @param {number} latitude 纬度，范围 -90 到 90
   * @returns {{x: number, y: number}}
   */
  function projectCoordinates(longitude, latitude) {
    return {
      x: ((longitude + 180) / 360) * 1000,
      y: ((90 - latitude) / 180) * 500
    };
  }

  /**
   * 检查国家是否包含可用于地图定位的经纬度。
   * @param {object} country 国家数据
   * @returns {boolean}
   */
  function hasValidCountryCoordinates(country) {
    return (
      Number.isFinite(country.longitude) &&
      Number.isFinite(country.latitude) &&
      country.longitude >= -180 &&
      country.longitude <= 180 &&
      country.latitude >= -90 &&
      country.latitude <= 90
    );
  }

  /**
   * 相邻国家距离较近时自动缩小圆环，避免节点圆环完全覆盖。
   * 节点中心位置仍严格使用各自的经纬度计算。
   * @param {object} country 当前国家
   * @param {object[]} countries 当前页面显示的全部国家
   * @returns {number}
   */
  function calculateMarkerRadius(country, countries) {
    const currentCoordinates = projectCoordinates(
      country.longitude,
      country.latitude
    );
    let nearestDistance = Infinity;

    countries.forEach(function (otherCountry) {
      if (otherCountry.id === country.id) {
        return;
      }

      const otherCoordinates = projectCoordinates(
        otherCountry.longitude,
        otherCountry.latitude
      );
      const distance = Math.hypot(
        currentCoordinates.x - otherCoordinates.x,
        currentCoordinates.y - otherCoordinates.y
      );

      nearestDistance = Math.min(nearestDistance, distance);
    });

    if (!Number.isFinite(nearestDistance)) {
      return 10;
    }

    return Math.max(5, Math.min(10, nearestDistance / 2 - 1));
  }

  /**
   * 从中国业务起点向当前栏目中的国家绘制弧形连接线。
   * 连接线不参与点击；动画完全由 CSS 控制。
   * @param {SVGGElement} connectionGroup SVG 连接线容器
   * @param {object[]} countries 当前页面显示的国家
   */
  function renderMapConnections(connectionGroup, countries) {
    if (!connectionGroup || countries.length === 0) {
      return;
    }

    const svgNamespace = "http://www.w3.org/2000/svg";
    const origin = projectCoordinates(
      chinaBusinessOrigin.longitude,
      chinaBusinessOrigin.latitude
    );

    countries.forEach(function (country, index) {
      const target = projectCoordinates(country.longitude, country.latitude);
      const distance = Math.hypot(target.x - origin.x, target.y - origin.y);
      const curveHeight = Math.min(82, Math.max(24, distance * 0.24));
      const controlX = (origin.x + target.x) / 2;
      const controlY = Math.min(origin.y, target.y) - curveHeight;
      const basePath = document.createElementNS(svgNamespace, "path");
      const path = document.createElementNS(svgNamespace, "path");
      const pathData =
        "M " +
          origin.x +
          " " +
          origin.y +
          " Q " +
          controlX +
          " " +
          controlY +
          " " +
          target.x +
          " " +
          target.y;

      basePath.classList.add("map-connection-base");
      basePath.setAttribute("d", pathData);

      path.classList.add("map-connection");
      path.setAttribute("d", pathData);
      path.setAttribute("pathLength", "100");
      path.style.setProperty("--connection-delay", -index * 0.12 + "s");
      connectionGroup.append(basePath, path);
    });

    const originGroup = document.createElementNS(svgNamespace, "g");
    const originTitle = document.createElementNS(svgNamespace, "title");
    const originRing = document.createElementNS(svgNamespace, "circle");
    const originDot = document.createElementNS(svgNamespace, "circle");

    originGroup.classList.add("map-origin");
    originTitle.textContent = "中国业务起点";

    originRing.classList.add("map-origin__ring");
    originRing.setAttribute("cx", origin.x);
    originRing.setAttribute("cy", origin.y);
    originRing.setAttribute("r", "8");

    originDot.classList.add("map-origin__dot");
    originDot.setAttribute("cx", origin.x);
    originDot.setAttribute("cy", origin.y);
    originDot.setAttribute("r", "3");

    originGroup.append(originTitle, originRing, originDot);
    connectionGroup.appendChild(originGroup);
  }

  /**
   * 项目图片缺失时隐藏破损图片，显示明确占位文字。
   */
  function showProjectImagePlaceholder() {
    if (projectModalImage) {
      projectModalImage.hidden = true;
      projectModalImage.removeAttribute("src");
    }

    if (projectModalImagePlaceholder) {
      projectModalImagePlaceholder.hidden = false;
    }
  }

  /**
   * 关闭项目介绍弹窗，并将焦点还给此前点击的地图节点。
   */
  function closeProjectModal() {
    if (!projectModal || projectModal.hidden) {
      return;
    }

    projectModal.hidden = true;
    showProjectImagePlaceholder();

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  /**
   * 使用 data.js 中的国家和首个项目数据填充弹窗。
   * @param {object} country 国家数据
   */
  function openProjectModal(country) {
    if (!projectModal) {
      return;
    }

    const project =
      Array.isArray(country.projects) && country.projects.length > 0
        ? country.projects[0]
        : null;

    lastFocusedElement = document.activeElement;

    if (projectModalCountry) {
      projectModalCountry.textContent = country.countryName || "国家名称待补充";
    }

    if (projectModalCountryEn) {
      projectModalCountryEn.textContent =
        country.countryNameEn || "COUNTRY NAME TO BE ADDED";
    }

    if (projectModalProjectName) {
      projectModalProjectName.textContent =
        (project && project.projectName) || "项目名称待补充";
    }

    if (projectModalDescription) {
      projectModalDescription.textContent =
        (project && project.description) || "该国家业务成果介绍待补充";
    }

    showProjectImagePlaceholder();

    if (project && project.image && projectModalImage) {
      projectModalImage.alt =
        (country.countryName || "该国家") + "项目图片";
      projectModalImagePlaceholder.hidden = true;
      projectModalImage.hidden = false;
      projectModalImage.src = project.image;
    }

    projectModal.hidden = false;

    if (projectModalClose) {
      projectModalClose.focus();
    }
  }

  /**
   * 将项目名称数组写入未来展望弹窗。
   * @param {HTMLElement} listElement 列表容器
   * @param {object[]} projects 项目数组
   * @returns {boolean} 是否写入了项目
   */
  function fillFutureProjectList(listElement, projects) {
    if (!listElement) {
      return false;
    }

    listElement.replaceChildren();

    if (!Array.isArray(projects) || projects.length === 0) {
      return false;
    }

    projects.forEach(function (project) {
      const item = document.createElement("li");
      item.textContent = project.projectName || "项目名称待补充";
      listElement.appendChild(item);
    });

    return true;
  }

  /**
   * 创建一个矿种卡片；图片缺失时显示正式占位区域。
   * @param {object} mineral 矿种数据
   * @param {string} countryName 国家中文名称
   * @returns {HTMLElement}
   */
  function createFutureMineralCard(mineral, countryName) {
    const card = document.createElement("article");
    const media = document.createElement("div");
    const image = document.createElement("img");
    const imagePlaceholder = document.createElement("div");
    const copy = document.createElement("div");
    const name = document.createElement("h4");
    const description = document.createElement("p");

    card.className = "future-mineral-card";
    media.className = "future-mineral-card__media";

    image.className = "future-mineral-card__image";
    image.alt = countryName + (mineral.name || "矿种") + "图片";
    image.draggable = false;

    imagePlaceholder.className = "future-mineral-card__placeholder";
    imagePlaceholder.textContent = "矿种图片待补充";
    imagePlaceholder.hidden = true;

    function showMineralImagePlaceholder() {
      image.hidden = true;
      image.removeAttribute("src");
      imagePlaceholder.hidden = false;
    }

    image.addEventListener("error", showMineralImagePlaceholder);

    /*
     * data.js 中带有 placeholder 的路径代表图片尚未提供。
     * 此时直接显示占位区域，避免浏览器请求不存在的文件。
     */
    const usesPlaceholderImage =
      !mineral.image || /(^|[\\/])[^\\/]*placeholder/i.test(mineral.image);

    if (usesPlaceholderImage) {
      showMineralImagePlaceholder();
    } else {
      image.src = mineral.image;
    }

    copy.className = "future-mineral-card__copy";
    name.textContent = mineral.name || "矿种名称待补充";
    description.textContent =
      mineral.description || "该地区矿产资源开发介绍待补充";

    copy.append(name, description);
    media.append(image, imagePlaceholder);
    card.append(media, copy);

    return card;
  }

  /**
   * 关闭未来展望弹窗并清除节点选中状态。
   */
  function closeFutureOutlookModal() {
    if (!futureModal || futureModal.hidden) {
      return;
    }

    futureModal.hidden = true;

    if (selectedFutureNode) {
      selectedFutureNode.classList.remove("is-selected");
      selectedFutureNode = null;
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  /**
   * 根据 futureOutlook 数据填充地区总览、项目建设和矿产资源内容。
   * @param {object} country 未来展望国家数据
   * @param {SVGGElement} nodeGroup 当前点击的地图节点
   */
  function openFutureOutlookModal(country, nodeGroup) {
    if (!futureModal) {
      return;
    }

    const categories = Array.isArray(country.category)
      ? country.category
      : [];
    const hasProjectConstruction = categories.includes(
      "projectConstruction"
    );
    const hasMiningDevelopment = categories.includes("miningDevelopment");

    if (selectedFutureNode) {
      selectedFutureNode.classList.remove("is-selected");
    }

    selectedFutureNode = nodeGroup;
    selectedFutureNode.classList.add("is-selected");
    lastFocusedElement = nodeGroup;

    if (futureModalCountry) {
      futureModalCountry.textContent =
        country.countryName || "地区名称待补充";
    }

    if (futureModalCountryEn) {
      futureModalCountryEn.textContent =
        country.countryNameEn || "REGION NAME TO BE ADDED";
    }

    if (futureModalSummary) {
      futureModalSummary.textContent =
        country.summary || "该地区未来业务总览待补充";
    }

    if (futureProjectSection) {
      futureProjectSection.hidden = !hasProjectConstruction;
    }

    if (hasProjectConstruction) {
      const projectData = country.projectConstruction || {};
      const hasPendingProjects = fillFutureProjectList(
        futurePendingList,
        projectData.pending
      );
      const hasOngoingProjects = fillFutureProjectList(
        futureOngoingList,
        projectData.ongoing
      );

      if (futureProjectDescription) {
        futureProjectDescription.textContent =
          projectData.description ||
          "该地区未来项目建设介绍待补充";
      }

      if (futurePendingBlock) {
        futurePendingBlock.hidden = !hasPendingProjects;
      }

      if (futureOngoingBlock) {
        futureOngoingBlock.hidden = !hasOngoingProjects;
      }
    } else {
      fillFutureProjectList(futurePendingList, []);
      fillFutureProjectList(futureOngoingList, []);
    }

    if (futureMiningSection) {
      futureMiningSection.hidden = !hasMiningDevelopment;
    }

    if (hasMiningDevelopment) {
      const miningData = country.miningDevelopment || {};
      const minerals = Array.isArray(miningData.minerals)
        ? miningData.minerals
        : [];

      if (futureMiningDescription) {
        futureMiningDescription.textContent =
          miningData.description ||
          "该地区矿产资源开发介绍待补充";
      }

      if (futureMinerals) {
        futureMinerals.replaceChildren();

        if (minerals.length > 0) {
          minerals.forEach(function (mineral) {
            futureMinerals.appendChild(
              createFutureMineralCard(mineral, country.countryName)
            );
          });
        } else {
          const placeholder = document.createElement("p");
          placeholder.className = "future-modal__description";
          placeholder.textContent =
            "该地区矿产资源信息及图片资料待后续补充";
          futureMinerals.appendChild(placeholder);
        }
      }
    } else if (futureMinerals) {
      futureMinerals.replaceChildren();
    }

    futureModal.hidden = false;

    if (futureModalClose) {
      futureModalClose.focus();
    }
  }

  /**
   * 创建单个可触摸、可键盘操作的 SVG 国家节点。
   * @param {object} country 国家数据
   * @param {number} markerRadius 根据邻近节点距离计算出的圆环半径
   * @param {string} interactionType 节点点击后使用的弹窗类型
   */
  function createMapNode(country, markerRadius, interactionType) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const coordinates = projectCoordinates(country.longitude, country.latitude);
    const labelOffsetX = Number.isFinite(country.labelOffsetX)
      ? country.labelOffsetX
      : 16;
    const labelOffsetY = Number.isFinite(country.labelOffsetY)
      ? country.labelOffsetY
      : -3;
    const labelAnchor = country.labelAnchor === "end" ? "end" : "start";
    const labelX = coordinates.x + labelOffsetX;
    const labelY = coordinates.y + labelOffsetY;
    const hitAreaWidth = 128;
    const group = document.createElementNS(svgNamespace, "g");
    const title = document.createElementNS(svgNamespace, "title");
    const hitArea = document.createElementNS(svgNamespace, "rect");
    const ring = document.createElementNS(svgNamespace, "circle");
    const dot = document.createElementNS(svgNamespace, "circle");
    const label = document.createElementNS(svgNamespace, "text");
    const labelEn = document.createElementNS(svgNamespace, "tspan");

    group.classList.add("map-node");
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute(
      "aria-label",
      interactionType === "future"
        ? "查看" + country.countryName + "未来展望"
        : "查看" + country.countryName + "项目介绍"
    );
    group.dataset.countryId = country.id;

    title.textContent = country.countryName + " / " + country.countryNameEn;

    hitArea.classList.add("map-node__hit-area");
    /*
     * 透明触摸区域跟随文字标签，避免相邻国家的大点击区域互相覆盖。
     * 光点本身仍保持可点击，节点位置始终使用经纬度计算结果。
     */
    hitArea.setAttribute(
      "x",
      labelAnchor === "end" ? labelX - hitAreaWidth + 8 : labelX - 8
    );
    hitArea.setAttribute("y", labelY - 18);
    hitArea.setAttribute("width", hitAreaWidth);
    hitArea.setAttribute("height", "48");
    hitArea.setAttribute("rx", "8");

    ring.classList.add("map-node__ring");
    ring.setAttribute("cx", coordinates.x);
    ring.setAttribute("cy", coordinates.y);
    ring.setAttribute("r", markerRadius);

    dot.classList.add("map-node__dot");
    dot.setAttribute("cx", coordinates.x);
    dot.setAttribute("cy", coordinates.y);
    dot.setAttribute("r", Math.min(4, Math.max(3, markerRadius - 2)));

    label.classList.add("map-node__label");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);
    label.setAttribute("text-anchor", labelAnchor);
    label.textContent = country.countryName;

    labelEn.classList.add("map-node__label-en");
    labelEn.setAttribute("x", labelX);
    labelEn.setAttribute("dy", "13");
    labelEn.textContent = country.countryNameEn;
    label.appendChild(labelEn);

    group.append(title, hitArea, ring, dot, label);

    function openCountryDetails() {
      if (interactionType === "future") {
        openFutureOutlookModal(country, group);
      } else {
        openProjectModal(country);
      }
    }

    group.addEventListener("click", openCountryDetails);

    group.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCountryDetails();
      }
    });

    return group;
  }

  /**
   * 使用同一份 HTML 模板和渲染流程创建一个地图栏目。
   * @param {object} configuration 栏目页面、文字和国家数组配置
   */
  function renderMapPage(configuration) {
    const page = document.getElementById(configuration.pageId);
    const pageData = configuration.pageData;
    const countries = configuration.countries;

    if (!page || !mapPageTemplate || !pageData) {
      return;
    }

    const mapContent = mapPageTemplate.content.cloneNode(true);
    const sectionIndex = mapContent.querySelector("[data-map-section-index]");
    const titleEn = mapContent.querySelector("[data-map-title-en]");
    const title = mapContent.querySelector("[data-map-title]");
    const description = mapContent.querySelector("[data-map-description]");
    const mapImage = mapContent.querySelector("[data-map-image]");
    const mapOverlay = mapContent.querySelector("[data-map-overlay]");
    const mapConnections = mapContent.querySelector("[data-map-connections]");
    const mapNodes = mapContent.querySelector("[data-map-nodes]");
    const mapLoadError = mapContent.querySelector("[data-map-load-error]");
    const mapEmptyState = mapContent.querySelector("[data-map-empty-state]");
    const titleId = configuration.pageId.replace("-page", "-title");

    if (sectionIndex) {
      sectionIndex.textContent = pageData.sectionIndex;
    }

    if (titleEn) {
      titleEn.textContent = pageData.titleEn;
    }

    if (title) {
      title.id = titleId;
      title.textContent = pageData.title;
    }

    if (description) {
      description.textContent = pageData.description;
    }

    if (mapOverlay) {
      mapOverlay.setAttribute("aria-label", pageData.mapAriaLabel);
    }

    if (mapLoadError) {
      mapLoadError.textContent =
        "世界地图文件加载失败，请检查 " + pageData.mapImage + "。";
    }

    if (mapImage) {
      mapImage.src = pageData.mapImage;
      mapImage.alt = pageData.mapAltText;
      mapImage.addEventListener("error", function () {
        if (mapLoadError) {
          mapLoadError.hidden = false;
        }
      });
    }

    const visibleCountries = Array.isArray(countries)
      ? countries.filter(function (country) {
          return country.visible && hasValidCountryCoordinates(country);
        })
      : [];

    renderMapConnections(mapConnections, visibleCountries);

    if (mapNodes) {
      visibleCountries.forEach(function (country) {
        const markerRadius = calculateMarkerRadius(
          country,
          visibleCountries
        );
        mapNodes.appendChild(
          createMapNode(
            country,
            markerRadius,
            configuration.interactionType || "project"
          )
        );
      });
    }

    if (mapEmptyState && visibleCountries.length === 0) {
      mapEmptyState.textContent = pageData.emptyStateText;
      mapEmptyState.hidden = false;
    }

    page.replaceChildren(mapContent);
  }

  /**
   * 三个栏目只在这里指定不同的数据源，共用 renderMapPage。
   */
  function renderAllMapPages() {
    const mapConfigurations = [
      {
        pageId: "projects-page",
        pageData: websiteData.overseasProjectsPage,
        countries: websiteData.overseasProjects
      },
      {
        pageId: "mining-page",
        pageData: websiteData.overseasMiningPage,
        countries: websiteData.overseasMining
      },
      {
        pageId: "future-page",
        pageData: websiteData.futureOutlookPage,
        countries: websiteData.futureOutlook,
        interactionType: "future"
      }
    ];

    mapConfigurations.forEach(renderMapPage);
  }

  /**
   * 只显示指定页面，其余页面全部隐藏。
   * @param {string} targetPageId 目标页面的 HTML id
   */
  function showPage(targetPageId) {
    const targetPage = document.getElementById(targetPageId);

    if (!targetPage) {
      console.warn("未找到目标页面：" + targetPageId);
      return;
    }

    pages.forEach(function (page) {
      const isTargetPage = page.id === targetPageId;
      page.hidden = !isTargetPage;
      page.classList.toggle("is-active", isTargetPage);
    });

    // 内容页面显示顶部导航，返回导览后隐藏顶部导航。
    if (siteHeader) {
      siteHeader.hidden = targetPageId === "guide-page";
    }

    // 当前栏目的导航按钮显示高亮状态。
    if (topNavigation) {
      topNavigation.querySelectorAll(".nav-button").forEach(function (button) {
        const isActive = button.dataset.pageTarget === targetPageId;
        button.classList.toggle("is-active", isActive);

        if (isActive) {
          button.setAttribute("aria-current", "page");
        } else {
          button.removeAttribute("aria-current");
        }
      });
    }

    // 将键盘焦点移到目标容器，方便键盘和辅助设备使用。
    if (typeof targetPage.focus === "function") {
      targetPage.focus({ preventScroll: true });
    }
  }

  /**
   * 根据 data.js 创建顶部的四个栏目按钮。
   */
  function createTopNavigation() {
    const sections = websiteData.navigation && websiteData.navigation.sections;

    if (!topNavigation || !Array.isArray(sections)) {
      return;
    }

    sections.forEach(function (section) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "nav-button";
      button.dataset.pageTarget = section.targetPageId;
      button.textContent = section.title;
      topNavigation.appendChild(button);
    });
  }

  /**
   * 根据 data.js 中的数据创建四个大型入口按钮。
   */
  function createGuideEntries() {
    const entries = websiteData.guide && websiteData.guide.entries;

    if (!guideEntries || !Array.isArray(entries)) {
      return;
    }

    entries.forEach(function (entry) {
      const button = document.createElement("button");
      const icon = document.createElement("span");
      const text = document.createElement("span");
      const title = document.createElement("span");
      const titleEn = document.createElement("span");

      button.type = "button";
      button.className = "guide-entry";
      button.dataset.pageTarget = entry.targetPageId;
      button.setAttribute("aria-label", "进入" + entry.title);

      icon.className = "guide-entry__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = entry.iconText;

      text.className = "guide-entry__text";
      title.className = "guide-entry__title";
      title.textContent = entry.title;
      titleEn.className = "guide-entry__title-en";
      titleEn.textContent = entry.titleEn;

      text.append(title, titleEn);
      button.append(icon, text);
      guideEntries.appendChild(button);
    });
  }

  fillCompanyProfile();
  renderAllMapPages();
  createGuideEntries();
  createTopNavigation();

  // 使用事件委托统一处理四个入口，兼容鼠标和触摸点击。
  if (guideEntries) {
    guideEntries.addEventListener("click", function (event) {
      const entryButton = event.target.closest(".guide-entry");

      if (!entryButton || !guideEntries.contains(entryButton)) {
        return;
      }

      showPage(entryButton.dataset.pageTarget);
    });
  }

  // 顶部四个栏目按钮统一切换页面。
  if (topNavigation) {
    topNavigation.addEventListener("click", function (event) {
      const navButton = event.target.closest(".nav-button");

      if (!navButton || !topNavigation.contains(navButton)) {
        return;
      }

      showPage(navButton.dataset.pageTarget);
    });
  }

  if (backGuideButton) {
    backGuideButton.textContent = websiteData.navigation.backGuideText;
    backGuideButton.addEventListener("click", function () {
      showPage("guide-page");
    });
  }

  if (projectModalImage) {
    projectModalImage.addEventListener("error", showProjectImagePlaceholder);
  }

  if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", function (event) {
      // 只有直接点击遮罩时关闭，点击弹窗内容不会误关闭。
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  if (futureModalClose) {
    futureModalClose.addEventListener("click", closeFutureOutlookModal);
  }

  if (futureModal) {
    futureModal.addEventListener("click", function (event) {
      if (event.target === futureModal) {
        closeFutureOutlookModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (futureModal && !futureModal.hidden) {
      closeFutureOutlookModal();
    } else if (projectModal && !projectModal.hidden) {
      closeProjectModal();
    }
  });

  /**
   * 根据当前全屏状态更新按钮文字和无障碍状态。
   */
  function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function updateFullscreenButton() {
    if (!fullscreenButton) {
      return;
    }

    const isFullscreen = Boolean(getFullscreenElement());
    fullscreenButton.textContent = isFullscreen
      ? websiteData.navigation.exitFullscreenText
      : websiteData.navigation.enterFullscreenText;
    fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", async function () {
      try {
        const requestFullscreen =
          document.documentElement.requestFullscreen ||
          document.documentElement.webkitRequestFullscreen;
        const exitFullscreen =
          document.exitFullscreen ||
          document.webkitExitFullscreen;

        if (!getFullscreenElement() && requestFullscreen) {
          await requestFullscreen.call(document.documentElement);
        } else if (getFullscreenElement() && exitFullscreen) {
          await exitFullscreen.call(document);
        } else {
          console.warn("当前浏览器不支持网页全屏功能。");
        }
      } catch (error) {
        console.warn("无法切换全屏状态：", error);
      }

      updateFullscreenButton();
    });
  }

  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  updateFullscreenButton();
});
