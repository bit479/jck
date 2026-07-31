/* * 网站主程序。 * 三个地图栏目共用一套渲染逻辑，栏目文字和国家节点统一读取 data.js。 * 不包含业务连接线或复杂动画。 */
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
  const projectModalCountryEn = document.getElementById(
    "project-modal-country-en"
  );
  const projectModalProjectName = document.getElementById(
    "project-modal-project-name"
  );
  const projectModalDescription = document.getElementById(
    "project-modal-description"
  );
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
  const futureMiningSection = document.getElementById("future-mining-section");
  const futureMiningDescription = document.getElementById(
    "future-mining-description"
  );
  const futureMinerals = document.getElementById("future-minerals");
  const pages = document.querySelectorAll(".page");
  let lastFocusedElement = null;
  let selectedFutureNode = null;

  /* * 中国业务起点仅用于绘制地图连接线，不属于可修改的国家项目数据， * 因此不改变 js/data.js 的现有数据结构。 */
  const chinaBusinessOrigin = {
    longitude: 104.1954,
    latitude: 35.8617,
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

  /** * 填充公司名称和公司简介占位内容。 */
  function fillCompanyProfile() {
    const brandName = document.getElementById("brand-name");
    const brandNameEn = document.getElementById("brand-name-en");
    const companyTitle = document.getElementById("company-title");
    const companyTitleEn = document.getElementById("company-title-en");
    const companyDescription = document.getElementById("company-description");
    const companyTags = document.getElementById("company-tags");
    const imagePlaceholderText = document.getElementById(
      "company-image-placeholder-text"
    );
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

  /** * 将经纬度转换为等距圆柱投影中的 SVG 坐标。 * 底图和节点统一使用 1000×500 画布，缩放时不会发生相对位移。 * @pa