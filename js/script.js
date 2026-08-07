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
  const homeGuideLabel = document.getElementById("home-guide-label");
  const homeHeroCarousel = document.getElementById("home-hero-carousel");
  const homeHeroTrack = document.getElementById("home-hero-track");
  const homeHeroEmpty = document.getElementById("home-hero-empty");
  const homeHeroPlaceholderText = document.getElementById("home-hero-placeholder-text");
  const homeHeroPrev = document.getElementById("home-hero-prev");
  const homeHeroNext = document.getElementById("home-hero-next");
  const homeHeroDots = document.getElementById("home-hero-dots");
  const siteHeader = document.getElementById("site-header");
  const topNavigation = document.getElementById("top-navigation");
  const backGuideButton = document.getElementById("back-guide-button");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const companySectionNumber = document.getElementById("company-section-number");
  const companyEyebrow = document.getElementById("company-eyebrow");
  const companyHeadlineLine1 = document.getElementById("company-headline-line1");
  const companyHeadlinePrefix = document.getElementById("company-headline-prefix");
  const companyHeadlineSuffix = document.getElementById("company-headline-suffix");
  const companyTitle = document.getElementById("company-title");
  const companyTitleEn = document.getElementById("company-title-en");
  const companyParagraphs = document.getElementById("company-paragraphs");
  const companyAchievementsTitleEn = document.getElementById("company-achievements-title-en");
  const companyAchievementsTitle = document.getElementById("company-achievements-title");
  const companyAchievementsDescription = document.getElementById("company-achievements-description");
  const companyAchievementCards = document.getElementById("company-achievement-cards");
  const techPage = document.getElementById("tech-page");
  const techSectionNumber = document.getElementById("tech-section-number");
  const techTitle = document.getElementById("tech-title");
  const techTitleEn = document.getElementById("tech-title-en");
  const techDescription = document.getElementById("tech-description");
  const techCarousel = document.getElementById("tech-carousel");
  const techCarouselViewport = document.getElementById("tech-carousel-viewport");
  const techCarouselStage = document.getElementById("tech-carousel-stage");
  const techCarouselPrev = document.getElementById("tech-carousel-prev");
  const techCarouselNext = document.getElementById("tech-carousel-next");
  const techCarouselDots = document.getElementById("tech-carousel-dots");
  const miningPage = document.getElementById("mining-page");
  const miningSectionNumber = document.getElementById("mining-section-number");
  const miningTitleEn = document.getElementById("mining-title-en");
  const miningTitle = document.getElementById("mining-title");
  const miningCountryTitleEn = document.getElementById("mining-country-title-en");
  const miningCountryTitle = document.getElementById("mining-country-title");
  const miningOverview = document.getElementById("mining-overview");
  const miningHeroImage = document.getElementById("mining-hero-image");
  const miningHeroPlaceholder = document.getElementById(
    "mining-hero-placeholder"
  );
  const miningCarousel = document.getElementById("mining-carousel");
  const miningCarouselViewport = document.getElementById(
    "mining-carousel-viewport"
  );
  const miningCarouselStage = document.getElementById("mining-carousel-stage");
  const miningCarouselPrev = document.getElementById("mining-carousel-prev");
  const miningCarouselNext = document.getElementById("mining-carousel-next");
  const miningCarouselDots = document.getElementById("mining-carousel-dots");
  const mapPageTemplate = document.getElementById("map-page-template");
  const projectModal = document.getElementById("project-modal");
  const projectModalClose = document.getElementById("project-modal-close");
  const projectModalCountry = document.getElementById("project-modal-country");
  const projectModalCountryEn = document.getElementById("project-modal-country-en");
  const projectModalOverviewSection = document.getElementById(
    "project-modal-overview-section"
  );
  const projectModalOverview = document.getElementById(
    "project-modal-overview"
  );
  const projectModalProjectCount = document.getElementById(
    "project-modal-project-count"
  );
  const projectModalWorkspace = document.getElementById(
    "project-modal-workspace"
  );
  const projectModalProjectSwitcher = document.getElementById(
    "project-modal-project-switcher"
  );
  const projectModalDetailsContent = document.getElementById(
    "project-modal-details-content"
  );
  const projectModalEmpty = document.getElementById("project-modal-empty");
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
  const futureModalBusinessType = document.getElementById(
    "future-modal-business-type"
  );
  const futureModalSummary = document.getElementById("future-modal-summary");
  const futureFocusAreas = document.getElementById("future-focus-areas");
  const futureBusinessTabs = document.getElementById("future-business-tabs");
  const futureProjectSection = document.getElementById(
    "future-project-section"
  );
  const futureProjectStatusTabs = document.getElementById(
    "future-project-status-tabs"
  );
  const futureProjectList = document.getElementById("future-project-list");
  const futureProjectDetailTitle = document.getElementById(
    "future-project-detail-title"
  );
  const futureProjectDescription = document.getElementById(
    "future-project-description"
  );
  const futureMiningSection = document.getElementById(
    "future-mining-section"
  );
  const futureMiningDescription = document.getElementById(
    "future-mining-description"
  );
  const futureMineralTabs = document.getElementById("future-mineral-tabs");
  const futureMineralMedia = document.getElementById("future-mineral-media");
  const futureMineralImage = document.getElementById("future-mineral-image");
  const futureMineralPlaceholder = document.getElementById(
    "future-mineral-placeholder"
  );
  const futureMineralImageName = document.getElementById(
    "future-mineral-image-name"
  );
  const futureMineralCopy = document.getElementById("future-mineral-copy");
  const futureMineralName = document.getElementById("future-mineral-name");
  const futureMineralDescription = document.getElementById(
    "future-mineral-description"
  );
  const futureMineralAnalysisBlock = document.getElementById(
    "future-mineral-analysis-block"
  );
  const futureMineralAnalysis = document.getElementById(
    "future-mineral-analysis"
  );
  const futureImageLightbox = document.getElementById(
    "future-image-lightbox"
  );
  const futureImageLightboxClose = document.getElementById(
    "future-image-lightbox-close"
  );
  const futureImageLightboxImage = document.getElementById(
    "future-image-lightbox-image"
  );
  const futureImageLightboxCaption = document.getElementById(
    "future-image-lightbox-caption"
  );
  const pages = document.querySelectorAll(".page");
  let lastFocusedElement = null;
  let selectedFutureNode = null;
  let activeFutureCountry = null;
  let activeFutureBusiness = "mining";
  let activeFutureMineralIndex = 0;
  let activeFutureProjectStatus = "";
  let activeFutureProjectIndex = 0;
  let homeHeroIndex = 0;
  let homeHeroTimer = null;
  let homeHeroResumeTimer = null;
  let homeHeroPointerActive = false;
  let homeHeroPointerId = null;
  let homeHeroPointerStartX = 0;
  let homeHeroPointerStartY = 0;
  let homeHeroPointerCurrentX = 0;
  let homeHeroPointerCurrentY = 0;
  let techCarouselIndex = 0;
  let techCarouselAnimating = false;
  let techPointerActive = false;
  let techPointerId = null;
  let techPointerStartX = 0;
  let techPointerStartY = 0;
  let techPointerCurrentX = 0;
  let techPointerCurrentY = 0;
  let techSuppressCardClick = false;
  let miningCarouselIndex = 0;
  let miningCarouselAnimating = false;
  let miningCarouselTransitionTimer = null;
  let miningPointerActive = false;
  let miningPointerId = null;
  let miningPointerStartX = 0;
  let miningPointerStartY = 0;
  let miningPointerCurrentX = 0;
  let miningPointerCurrentY = 0;
  let miningSuppressCardClick = false;
  let projectModalCloseTimer = null;
  const globeViewers = [];
  const reducedMotionPreference = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  /*
   * 中国业务起点仅用于绘制地图连接线，不属于可修改的国家项目数据，
   * 因此不改变 js/data.js 的现有数据结构。
   */
  const chinaBusinessOrigin = {
    longitude: 104.1954,
    latitude: 35.8617
  };

  if (guideTitle && websiteData.homeHero && websiteData.homeHero.companyName) {
    guideTitle.textContent = websiteData.homeHero.companyName;
  }

  if (guideTitleEn && websiteData.homeHero && websiteData.homeHero.companyNameEn) {
    guideTitleEn.textContent = websiteData.homeHero.companyNameEn;
  }

  if (guideSubtitle && websiteData.homeHero && websiteData.homeHero.slogan) {
    guideSubtitle.textContent = websiteData.homeHero.slogan;
  }

  if (homeGuideLabel && websiteData.homeHero && websiteData.homeHero.guideLabel) {
    homeGuideLabel.textContent = websiteData.homeHero.guideLabel;
  }

  /** 返回首页背景图片数组。 */
  function getHomeHeroSlides() {
    const homeHero = websiteData.homeHero;

    return homeHero && Array.isArray(homeHero.slides) ? homeHero.slides : [];
  }

  /** 更新首页背景、圆点和无障碍状态。 */
  function updateHomeHeroCarousel() {
    const slides = getHomeHeroSlides();

    if (!homeHeroTrack || slides.length === 0) {
      return;
    }

    homeHeroIndex = ((homeHeroIndex % slides.length) + slides.length) % slides.length;
    homeHeroTrack.style.transform = "translateX(-" + homeHeroIndex * 100 + "%)";

    homeHeroTrack.querySelectorAll(".home-hero-carousel__slide").forEach(
      function (slide, index) {
        slide.setAttribute("aria-hidden", index === homeHeroIndex ? "false" : "true");
      }
    );

    if (homeHeroDots) {
      homeHeroDots.querySelectorAll(".home-hero-carousel__dot").forEach(
        function (dot, index) {
          const isActive = index === homeHeroIndex;
          dot.classList.toggle("is-active", isActive);

          if (isActive) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        }
      );
    }

    if (homeHeroCarousel) {
      homeHeroCarousel.setAttribute(
        "aria-label",
        "首页背景图片轮播，当前第" + (homeHeroIndex + 1) + "张，共" + slides.length + "张"
      );
    }
  }

  function stopHomeHeroCarousel() {
    if (homeHeroTimer !== null) {
      window.clearInterval(homeHeroTimer);
      homeHeroTimer = null;
    }
  }

  function clearHomeHeroResumeTimer() {
    if (homeHeroResumeTimer !== null) {
      window.clearTimeout(homeHeroResumeTimer);
      homeHeroResumeTimer = null;
    }
  }

  /** 仅在导览页可见、允许自动播放且未开启减少动态效果时启动。 */
  function startHomeHeroCarousel() {
    const homeHero = websiteData.homeHero;
    const slides = getHomeHeroSlides();
    const guidePage = document.getElementById("guide-page");
    const isGuidePageActive =
      guidePage && !guidePage.hidden && guidePage.classList.contains("is-active");
    const interval = Math.max(3000, Number(homeHero && homeHero.autoplayInterval) || 7000);

    stopHomeHeroCarousel();

    if (
      !homeHero ||
      homeHero.autoplay !== true ||
      slides.length <= 1 ||
      document.hidden ||
      !isGuidePageActive ||
      (reducedMotionPreference && reducedMotionPreference.matches)
    ) {
      return;
    }

    homeHeroTimer = window.setInterval(function () {
      homeHeroIndex = (homeHeroIndex + 1) % slides.length;
      updateHomeHeroCarousel();
    }, interval);
  }

  /** 手动操作后暂停一段时间，避免自动播放立即抢走当前画面。 */
  function pauseHomeHeroAfterInteraction() {
    const homeHero = websiteData.homeHero;
    const resumeDelay = Math.max(
      5000,
      Number(homeHero && homeHero.autoplayResumeDelay) || 12000
    );

    stopHomeHeroCarousel();
    clearHomeHeroResumeTimer();

    if (!homeHero || homeHero.autoplay !== true) {
      return;
    }

    homeHeroResumeTimer = window.setTimeout(function () {
      homeHeroResumeTimer = null;
      startHomeHeroCarousel();
    }, resumeDelay);
  }

  function selectHomeHeroSlide(nextIndex, isManual) {
    const slides = getHomeHeroSlides();

    if (slides.length === 0) {
      return;
    }

    homeHeroIndex = ((nextIndex % slides.length) + slides.length) % slides.length;
    updateHomeHeroCarousel();

    if (isManual) {
      pauseHomeHeroAfterInteraction();
    }
  }

  /** 根据 data.js 创建首页背景图片与指示点。 */
  function fillHomeHero() {
    const homeHero = websiteData.homeHero || {};
    const slides = getHomeHeroSlides();
    const hasMultipleSlides = slides.length > 1;

    if (!homeHeroTrack || !homeHeroDots) {
      return;
    }

    homeHeroIndex = 0;
    homeHeroTrack.replaceChildren();
    homeHeroDots.replaceChildren();
    homeHeroTrack.hidden = slides.length === 0;
    homeHeroEmpty.hidden = slides.length > 0;
    homeHeroPrev.hidden = !hasMultipleSlides;
    homeHeroNext.hidden = !hasMultipleSlides;
    homeHeroDots.hidden = !hasMultipleSlides;

    if (homeHeroPlaceholderText) {
      homeHeroPlaceholderText.textContent =
        homeHero.imagePlaceholderText || "首页背景图片待补充";
    }

    slides.forEach(function (slideData, index) {
      const slide = document.createElement("figure");
      const image = document.createElement("img");
      const placeholder = document.createElement("div");
      const placeholderLabel = document.createElement("strong");
      const dot = document.createElement("button");

      slide.className = "home-hero-carousel__slide";
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      image.className = "home-hero-carousel__image";
      image.src = slideData.image || homeHero.imagePlaceholder || "";
      image.alt = slideData.alt || "首页背景图片";
      image.draggable = false;

      placeholder.className = "home-hero-carousel__image-placeholder";
      placeholder.hidden = true;
      placeholderLabel.textContent = homeHero.imagePlaceholderText || "首页背景图片待补充";
      placeholder.appendChild(placeholderLabel);

      image.addEventListener("error", function () {
        const fallbackPath = homeHero.imagePlaceholder;
        const hasTriedFallback = image.dataset.fallbackAttempted === "true";

        if (fallbackPath && !hasTriedFallback && image.src.indexOf(fallbackPath) === -1) {
          image.dataset.fallbackAttempted = "true";
          image.src = fallbackPath;
          return;
        }

        image.hidden = true;
        placeholder.hidden = false;
      });

      dot.type = "button";
      dot.className = "home-hero-carousel__dot";
      dot.dataset.slideIndex = String(index);
      dot.setAttribute("aria-label", "显示第" + (index + 1) + "张首页背景图片");
      dot.appendChild(document.createElement("span"));

      slide.append(image, placeholder);
      homeHeroTrack.appendChild(slide);
      homeHeroDots.appendChild(dot);
    });

    updateHomeHeroCarousel();
  }

  /** 绑定箭头、圆点、键盘、鼠标拖动和触摸滑动。 */
  function bindHomeHeroEvents() {
    if (!homeHeroCarousel || !homeHeroTrack) {
      return;
    }

    if (homeHeroPrev) {
      homeHeroPrev.addEventListener("click", function () {
        selectHomeHeroSlide(homeHeroIndex - 1, true);
      });
    }

    if (homeHeroNext) {
      homeHeroNext.addEventListener("click", function () {
        selectHomeHeroSlide(homeHeroIndex + 1, true);
      });
    }

    if (homeHeroDots) {
      homeHeroDots.addEventListener("click", function (event) {
        const dot = event.target.closest(".home-hero-carousel__dot");

        if (!dot || !homeHeroDots.contains(dot)) {
          return;
        }

        selectHomeHeroSlide(Number(dot.dataset.slideIndex), true);
      });
    }

    homeHeroCarousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectHomeHeroSlide(homeHeroIndex - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        selectHomeHeroSlide(homeHeroIndex + 1, true);
      }
    });

    homeHeroCarousel.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    homeHeroCarousel.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      homeHeroPointerActive = true;
      homeHeroPointerId = event.pointerId;
      homeHeroPointerStartX = event.clientX;
      homeHeroPointerStartY = event.clientY;
      homeHeroPointerCurrentX = event.clientX;
      homeHeroPointerCurrentY = event.clientY;
      homeHeroCarousel.classList.add("is-dragging");
      stopHomeHeroCarousel();

      if (typeof homeHeroCarousel.setPointerCapture === "function") {
        homeHeroCarousel.setPointerCapture(event.pointerId);
      }
    });

    homeHeroCarousel.addEventListener("pointermove", function (event) {
      if (!homeHeroPointerActive || event.pointerId !== homeHeroPointerId) {
        return;
      }

      homeHeroPointerCurrentX = event.clientX;
      homeHeroPointerCurrentY = event.clientY;

      const distanceX = homeHeroPointerCurrentX - homeHeroPointerStartX;
      const distanceY = homeHeroPointerCurrentY - homeHeroPointerStartY;

      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        event.preventDefault();
        homeHeroTrack.style.transition = "none";
        homeHeroTrack.style.transform =
          "translateX(calc(-" + homeHeroIndex * 100 + "% + " + distanceX + "px))";
      }
    });

    const finishHomeHeroGesture = function (event) {
      if (!homeHeroPointerActive || event.pointerId !== homeHeroPointerId) {
        return;
      }

      const distanceX = homeHeroPointerCurrentX - homeHeroPointerStartX;
      const distanceY = homeHeroPointerCurrentY - homeHeroPointerStartY;
      const isHorizontalSwipe = Math.abs(distanceX) >= 54 && Math.abs(distanceX) > Math.abs(distanceY);

      homeHeroPointerActive = false;
      homeHeroPointerId = null;
      homeHeroCarousel.classList.remove("is-dragging");
      homeHeroTrack.style.removeProperty("transition");

      if (isHorizontalSwipe) {
        selectHomeHeroSlide(distanceX < 0 ? homeHeroIndex + 1 : homeHeroIndex - 1, true);
      } else {
        updateHomeHeroCarousel();
        pauseHomeHeroAfterInteraction();
      }
    };

    homeHeroCarousel.addEventListener("pointerup", finishHomeHeroGesture);
    homeHeroCarousel.addEventListener("pointercancel", finishHomeHeroGesture);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopHomeHeroCarousel();
      } else {
        startHomeHeroCarousel();
      }
    });

    if (reducedMotionPreference) {
      const handleHomeMotionPreference = function () {
        if (reducedMotionPreference.matches) {
          stopHomeHeroCarousel();
        } else {
          startHomeHeroCarousel();
        }
      };

      if (typeof reducedMotionPreference.addEventListener === "function") {
        reducedMotionPreference.addEventListener("change", handleHomeMotionPreference);
      } else if (typeof reducedMotionPreference.addListener === "function") {
        reducedMotionPreference.addListener(handleHomeMotionPreference);
      }
    }
  }

  /** 将正文中的指定关键词包装为高亮文字，不使用 HTML 字符串拼接。 */
  function appendCompanyParagraphText(paragraph, paragraphText, keywords) {
    const validKeywords = keywords
      .filter(function (keyword) {
        return typeof keyword === "string" && keyword.length > 0;
      })
      .sort(function (firstKeyword, secondKeyword) {
        return secondKeyword.length - firstKeyword.length;
      });

    if (validKeywords.length === 0) {
      paragraph.textContent = paragraphText;
      return;
    }

    const escapedKeywords = validKeywords.map(function (keyword) {
      return keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    const keywordPattern = new RegExp("(" + escapedKeywords.join("|") + ")", "g");
    const keywordSet = new Set(validKeywords);

    paragraphText.split(keywordPattern).forEach(function (textPart) {
      if (!textPart) {
        return;
      }

      if (keywordSet.has(textPart)) {
        const highlight = document.createElement("strong");
        highlight.className = "company-description__highlight";
        highlight.textContent = textPart;
        paragraph.appendChild(highlight);
      } else {
        paragraph.appendChild(document.createTextNode(textPart));
      }
    });
  }

  /** 创建业绩卡片顶部的内联线性图标。 */
  function createCompanyAchievementIcon(iconName) {
    const icon = document.createElement("span");
    const iconPaths = {
      globe: '<circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.2 3.5 8.5S14.3 18.2 12 20.5M12 3.5C9.7 5.8 8.5 8.7 8.5 12s1.2 6.2 3.5 8.5"></path>',
      trophy: '<path d="M8 4h8v4.5a4 4 0 0 1-8 0V4Z"></path><path d="M8 6H5.5v1.5A3.5 3.5 0 0 0 9 11M16 6h2.5v1.5A3.5 3.5 0 0 1 15 11M12 12.5V17M8.5 20h7M10 17h4"></path>',
      medal: '<circle cx="12" cy="14" r="5.5"></circle><path d="m9 3 3 5 3-5M8 3l2.3 5.5M16 3l-2.3 5.5M12 11.5l.8 1.6 1.7.2-1.2 1.2.3 1.8-1.6-.9-1.6.9.3-1.8-1.2-1.2 1.7-.2.8-1.6Z"></path>',
      award: '<path d="M12 3 14 5l2.8-.2.2 2.8 2 2-2 2 .2 2.8-2.8-.2-2 2-2-2-2.8.2.2-2.8-2-2 2-2-.2-2.8 2.8.2 2-2Z"></path><circle cx="12" cy="9.6" r="2.5"></circle><path d="m9.5 15.5-1 5 3.5-2 3.5 2-1-5"></path>'
    };
    const svgBody = iconPaths[iconName] || iconPaths.award;

    icon.className = "company-achievement-card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
      svgBody +
      "</svg>";
    return icon;
  }

  /** 根据 data.js 创建企业定位、公司正文和业绩荣誉卡片。 */
  function fillCompanyProfile() {
    const brandName = document.getElementById("brand-name");
    const brandNameEn = document.getElementById("brand-name-en");
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

    const headline = profile.headline || {};
    const achievementsSection = profile.achievementsSection || {};
    const paragraphs = Array.isArray(profile.paragraphs) ? profile.paragraphs : [];
    const keywords = Array.isArray(profile.highlightKeywords)
      ? profile.highlightKeywords
      : [];
    const achievements = Array.isArray(profile.achievements)
      ? profile.achievements
      : [];

    if (companySectionNumber) {
      companySectionNumber.textContent = profile.sectionNumber || "01 / COMPANY";
    }

    if (companyEyebrow) {
      companyEyebrow.textContent = profile.eyebrow || "GLOBAL ENERGY INFRASTRUCTURE";
    }

    if (companyHeadlineLine1) {
      companyHeadlineLine1.textContent = headline.line1 || "引领全球";
    }

    if (companyHeadlinePrefix) {
      companyHeadlinePrefix.textContent = headline.line2Prefix || "能源建设";
    }

    if (companyHeadlineSuffix) {
      companyHeadlineSuffix.textContent = headline.line2Suffix || "与矿产开发";
    }

    if (companyTitle) {
      companyTitle.textContent = profile.title || "公司简介";
    }

    if (companyTitleEn) {
      companyTitleEn.textContent = profile.titleEn || "COMPANY PROFILE";
    }

    if (companyParagraphs) {
      companyParagraphs.replaceChildren();

      paragraphs.forEach(function (paragraphText) {
        const paragraph = document.createElement("p");
        paragraph.className = "company-description";
        appendCompanyParagraphText(paragraph, paragraphText, keywords);
        companyParagraphs.appendChild(paragraph);
      });
    }

    if (companyAchievementsTitleEn) {
      companyAchievementsTitleEn.textContent =
        achievementsSection.titleEn || "GLOBAL INFLUENCE";
    }

    if (companyAchievementsTitle) {
      companyAchievementsTitle.textContent =
        achievementsSection.title || "卓越业绩与荣誉";
    }

    if (companyAchievementsDescription) {
      companyAchievementsDescription.textContent =
        achievementsSection.description || "业绩与荣誉说明待补充";
    }

    if (companyAchievementCards) {
      companyAchievementCards.replaceChildren();

      achievements.forEach(function (achievement, index) {
        const card = document.createElement("article");
        const value = document.createElement("strong");
        const label = document.createElement("h4");
        const labelEn = document.createElement("p");
        const description = document.createElement("p");

        card.className = "company-achievement-card";
        card.dataset.achievementId = achievement.id || "achievement-" + (index + 1);
        card.style.setProperty("--achievement-order", String(index));
        value.className = "company-achievement-card__value";
        value.textContent = achievement.value || "待补充";
        label.className = "company-achievement-card__label";
        label.textContent = achievement.label || "业绩荣誉";
        labelEn.className = "company-achievement-card__label-en";
        labelEn.textContent = achievement.labelEn || "ACHIEVEMENT";
        description.className = "company-achievement-card__description";
        description.textContent = achievement.description || "说明待补充";

        card.append(
          createCompanyAchievementIcon(achievement.icon),
          value,
          label,
          labelEn,
          description
        );
        companyAchievementCards.appendChild(card);
      });
    }
  }

  /** 返回科技赋能平台卡片数组。 */
  function getTechCards() {
    const techData = websiteData.techEmpowerment;

    return techData && Array.isArray(techData.cards) ? techData.cards : [];
  }

  /** 将任意序号转换为卡片数组中的有效循环序号。 */
  function getWrappedTechIndex(index, cardCount) {
    return ((index % cardCount) + cardCount) % cardCount;
  }

  /**
   * 为平台卡片加载数据图片；原图缺失时依次回退到占位图和文字占位框。
   */
  function updateTechCardImage(cardElement, cardData) {
    const techData = websiteData.techEmpowerment || {};
    const image = cardElement.querySelector(".tech-platform-card__image");
    const placeholder = cardElement.querySelector(
      ".tech-platform-card__image-placeholder"
    );
    const fallbackPath = techData.imagePlaceholder || "";

    if (!image || !placeholder) {
      return;
    }

    placeholder.textContent =
      techData.imagePlaceholderText || "平台图片待补充";
    placeholder.hidden = false;
    image.hidden = true;
    image.alt = cardData.alt || cardData.title || "科技平台预览图";
    image.dataset.usingFallback = "false";

    function showTextPlaceholder() {
      image.hidden = true;
      image.removeAttribute("src");
      placeholder.hidden = false;
    }

    image.onload = function () {
      image.hidden = false;
      placeholder.hidden = true;
    };

    image.onerror = function () {
      if (
        image.dataset.usingFallback !== "true" &&
        fallbackPath &&
        fallbackPath !== cardData.image
      ) {
        image.dataset.usingFallback = "true";
        image.src = fallbackPath;
        return;
      }

      showTextPlaceholder();
    };

    if (cardData.image) {
      image.src = cardData.image;
    } else if (fallbackPath) {
      image.dataset.usingFallback = "true";
      image.src = fallbackPath;
    } else {
      showTextPlaceholder();
    }
  }

  /** 创建一个由轮播复用的平台卡片视觉槽位。 */
  function createTechCarouselCard(slotName) {
    const card = document.createElement("article");
    const media = document.createElement("div");
    const image = document.createElement("img");
    const imagePlaceholder = document.createElement("div");
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const summary = document.createElement("p");
    const enterButton = document.createElement("button");

    card.className =
      "tech-platform-card tech-platform-card--" + slotName;
    card.dataset.techSlot = slotName;

    media.className = "tech-platform-card__media";
    image.className = "tech-platform-card__image";
    image.draggable = false;
    image.hidden = true;
    imagePlaceholder.className = "tech-platform-card__image-placeholder";
    imagePlaceholder.hidden = false;

    copy.className = "tech-platform-card__copy";
    title.className = "tech-platform-card__title";
    summary.className = "tech-platform-card__summary";
    enterButton.type = "button";
    enterButton.className = "tech-platform-card__enter";
    enterButton.hidden = true;

    media.append(image, imagePlaceholder);
    copy.append(title, summary, enterButton);
    card.append(media, copy);

    return card;
  }

  /** 使用指定平台数据更新一个左、中或右侧卡片槽位。 */
  function fillTechCarouselCard(cardElement, cardData, cardIndex) {
    if (!cardElement || !cardData) {
      return;
    }

    const title = cardElement.querySelector(".tech-platform-card__title");
    const summary = cardElement.querySelector(".tech-platform-card__summary");
    const enterButton = cardElement.querySelector(".tech-platform-card__enter");

    cardElement.dataset.cardIndex = String(cardIndex);
    cardElement.dataset.cardId = cardData.id || "";

    if (title) {
      title.textContent = cardData.title || "平台名称待补充";
    }

    if (summary) {
      summary.textContent = cardData.summary || "平台简介待补充";
    }

    if (enterButton) {
      const platformUrl = typeof cardData.url === "string" ? cardData.url.trim() : "";
      enterButton.hidden = platformUrl.length === 0;
      enterButton.textContent = (cardData.buttonText || "进入平台") + " →";
      enterButton.setAttribute(
        "aria-label",
        (cardData.buttonText || "进入平台") + "：" + (cardData.title || "科技平台")
      );

      if (platformUrl) {
        enterButton.dataset.platformUrl = platformUrl;
      } else {
        delete enterButton.dataset.platformUrl;
      }
    }

    updateTechCardImage(cardElement, cardData);
  }

  /** 更新当前主卡片、左右景深预览和指示点状态。 */
  function updateTechCarousel() {
    const cards = getTechCards();
    const cardCount = cards.length;

    if (!techCarouselStage) {
      return;
    }

    if (cardCount === 0) {
      techCarouselStage.replaceChildren();
      const emptyState = document.createElement("p");
      emptyState.className = "tech-carousel__empty";
      emptyState.textContent = "科技赋能平台资料待补充";
      techCarouselStage.appendChild(emptyState);
      return;
    }

    techCarouselIndex = getWrappedTechIndex(techCarouselIndex, cardCount);

    const previousIndex = getWrappedTechIndex(
      techCarouselIndex - 1,
      cardCount
    );
    const nextIndex = getWrappedTechIndex(techCarouselIndex + 1, cardCount);
    const previousCard = techCarouselStage.querySelector(
      '[data-tech-slot="previous"]'
    );
    const currentCard = techCarouselStage.querySelector(
      '[data-tech-slot="current"]'
    );
    const nextCard = techCarouselStage.querySelector(
      '[data-tech-slot="next"]'
    );

    fillTechCarouselCard(previousCard, cards[previousIndex], previousIndex);
    fillTechCarouselCard(currentCard, cards[techCarouselIndex], techCarouselIndex);
    fillTechCarouselCard(nextCard, cards[nextIndex], nextIndex);

    if (previousCard) {
      previousCard.hidden = cardCount <= 1;
      previousCard.setAttribute("aria-hidden", "true");
    }

    if (currentCard) {
      currentCard.hidden = false;
      currentCard.setAttribute("aria-hidden", "false");
    }

    if (nextCard) {
      nextCard.hidden = cardCount <= 1;
      nextCard.setAttribute("aria-hidden", "true");
    }

    if (techCarouselViewport) {
      techCarouselViewport.setAttribute(
        "aria-label",
        "当前平台：" + (cards[techCarouselIndex].title || "平台名称待补充")
      );
    }

    if (techCarouselDots) {
      techCarouselDots.querySelectorAll(".tech-carousel__dot").forEach(
        function (dot, index) {
          const isActive = index === techCarouselIndex;
          dot.classList.toggle("is-active", isActive);

          if (isActive) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        }
      );
    }
  }

  /**
   * 平滑切换到指定平台。direction 为 1 时向右侧下一张移动，为 -1 时反向。
   */
  function selectTechCard(nextIndex, direction) {
    const cards = getTechCards();

    if (cards.length <= 1 || techCarouselAnimating || !techCarouselStage) {
      return;
    }

    const targetIndex = getWrappedTechIndex(nextIndex, cards.length);

    if (targetIndex === techCarouselIndex) {
      return;
    }

    let moveDirection = direction;

    if (moveDirection !== 1 && moveDirection !== -1) {
      const forwardDistance = getWrappedTechIndex(
        targetIndex - techCarouselIndex,
        cards.length
      );
      const backwardDistance = getWrappedTechIndex(
        techCarouselIndex - targetIndex,
        cards.length
      );
      moveDirection = forwardDistance <= backwardDistance ? 1 : -1;
    }

    if (reducedMotionPreference && reducedMotionPreference.matches) {
      techCarouselIndex = targetIndex;
      updateTechCarousel();
      return;
    }

    techCarouselAnimating = true;
    techCarouselStage.classList.add(
      moveDirection === 1 ? "is-sliding-next" : "is-sliding-previous"
    );

    window.setTimeout(function () {
      techCarouselStage.classList.add("is-resetting");
      techCarouselStage.classList.remove(
        "is-sliding-next",
        "is-sliding-previous"
      );
      techCarouselIndex = targetIndex;
      updateTechCarousel();
      void techCarouselStage.offsetWidth;
      techCarouselStage.classList.remove("is-resetting");
      techCarouselAnimating = false;
    }, 360);
  }

  /** 根据 data.js 填充科技赋能标题、卡片和指示点。 */
  function fillTechEmpowerment() {
    const techData = websiteData.techEmpowerment;

    if (!techData || !techPage || !techCarouselStage || !techCarouselDots) {
      return;
    }

    if (techSectionNumber) {
      techSectionNumber.textContent =
        techData.sectionNumber || "05 / TECH EMPOWERMENT";
    }

    if (techTitleEn) {
      techTitleEn.textContent = techData.titleEn || "TECH EMPOWERMENT";
    }

    if (techTitle) {
      techTitle.textContent = techData.title || "科技赋能";
    }

    if (techDescription) {
      techDescription.textContent =
        techData.description || "科技赋能页面内容待补充。";
    }

    const cards = getTechCards();
    techCarouselIndex = 0;
    techCarouselStage.replaceChildren(
      createTechCarouselCard("previous"),
      createTechCarouselCard("current"),
      createTechCarouselCard("next")
    );
    techCarouselDots.replaceChildren();

    cards.forEach(function (cardData, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "tech-carousel__dot";
      dot.dataset.carouselIndex = String(index);
      dot.setAttribute(
        "aria-label",
        "显示平台：" + (cardData.title || String(index + 1))
      );
      techCarouselDots.appendChild(dot);
    });

    const hasMultipleCards = cards.length > 1;
    techCarouselPrev.hidden = !hasMultipleCards;
    techCarouselNext.hidden = !hasMultipleCards;
    techCarouselDots.hidden = cards.length === 0;
    updateTechCarousel();
  }

  /** 绑定科技赋能轮播的箭头、指示点、键盘、鼠标拖动和触摸滑动。 */
  function bindTechCarouselEvents() {
    if (!techCarousel || !techCarouselViewport || !techCarouselStage) {
      return;
    }

    if (techCarouselPrev) {
      techCarouselPrev.addEventListener("click", function () {
        selectTechCard(techCarouselIndex - 1, -1);
      });
    }

    if (techCarouselNext) {
      techCarouselNext.addEventListener("click", function () {
        selectTechCard(techCarouselIndex + 1, 1);
      });
    }

    if (techCarouselDots) {
      techCarouselDots.addEventListener("click", function (event) {
        const dot = event.target.closest(".tech-carousel__dot");

        if (!dot || !techCarouselDots.contains(dot)) {
          return;
        }

        selectTechCard(Number(dot.dataset.carouselIndex));
      });
    }

    techCarouselStage.addEventListener("click", function (event) {
      const enterButton = event.target.closest(".tech-platform-card__enter");

      if (enterButton && techCarouselStage.contains(enterButton)) {
        event.stopPropagation();

        if (!techSuppressCardClick && enterButton.dataset.platformUrl) {
          openTechPlatform(enterButton.dataset.platformUrl);
        }
        return;
      }

      if (techSuppressCardClick) {
        return;
      }

      const card = event.target.closest(".tech-platform-card");

      if (!card || !techCarouselStage.contains(card)) {
        return;
      }

      if (card.dataset.techSlot === "previous") {
        selectTechCard(techCarouselIndex - 1, -1);
      }

      if (card.dataset.techSlot === "next") {
        selectTechCard(techCarouselIndex + 1, 1);
      }
    });

    // 按钮的指针事件不继续冒泡到轮播视口，避免按下时启动拖动判断。
    techCarouselStage.addEventListener("pointerdown", function (event) {
      if (event.target.closest(".tech-platform-card__enter")) {
        event.stopPropagation();
      }
    });

    techCarouselViewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectTechCard(techCarouselIndex - 1, -1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectTechCard(techCarouselIndex + 1, 1);
      }
    });

    techCarouselViewport.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    techCarouselViewport.addEventListener("pointerdown", function (event) {
      if (
        getTechCards().length <= 1 ||
        event.target.closest("button") ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      techPointerActive = true;
      techPointerId = event.pointerId;
      techPointerStartX = event.clientX;
      techPointerStartY = event.clientY;
      techPointerCurrentX = event.clientX;
      techPointerCurrentY = event.clientY;
      techCarouselViewport.classList.add("is-dragging");

      if (typeof techCarouselViewport.setPointerCapture === "function") {
        techCarouselViewport.setPointerCapture(event.pointerId);
      }
    });

    techCarouselViewport.addEventListener("pointermove", function (event) {
      if (!techPointerActive || event.pointerId !== techPointerId) {
        return;
      }

      techPointerCurrentX = event.clientX;
      techPointerCurrentY = event.clientY;

      const distanceX = Math.abs(techPointerCurrentX - techPointerStartX);
      const distanceY = Math.abs(techPointerCurrentY - techPointerStartY);

      if (distanceX > 12 && distanceX > distanceY) {
        event.preventDefault();
      }
    });

    function finishTechPointerGesture(event) {
      if (!techPointerActive || event.pointerId !== techPointerId) {
        return;
      }

      const distanceX = techPointerCurrentX - techPointerStartX;
      const distanceY = techPointerCurrentY - techPointerStartY;
      const isHorizontalSwipe =
        Math.abs(distanceX) >= 54 &&
        Math.abs(distanceX) > Math.abs(distanceY) * 1.25;

      techPointerActive = false;
      techPointerId = null;
      techCarouselViewport.classList.remove("is-dragging");

      if (isHorizontalSwipe) {
        techSuppressCardClick = true;
        selectTechCard(
          distanceX < 0 ? techCarouselIndex + 1 : techCarouselIndex - 1,
          distanceX < 0 ? 1 : -1
        );
        window.setTimeout(function () {
          techSuppressCardClick = false;
        }, 0);
      }
    }

    techCarouselViewport.addEventListener(
      "pointerup",
      finishTechPointerGesture
    );
    techCarouselViewport.addEventListener(
      "pointercancel",
      finishTechPointerGesture
    );
  }

  /**
   * 在当前页面内用全屏遮罩加载科技平台。
   * 平台页面通过 iframe 加载，不离开当前文档，
   * 因此网站处于全屏展示状态时不会因跳转被浏览器取消全屏。
   */
  function openTechPlatform(platformUrl) {
    if (!platformUrl) {
      return;
    }

    let resolvedUrl;
    try {
      resolvedUrl = new URL(platformUrl, window.location.href).href;
    } catch (error) {
      resolvedUrl = platformUrl;
    }

    const overlay = document.createElement("div");
    const bar = document.createElement("div");
    const backButton = document.createElement("button");
    const frame = document.createElement("iframe");

    overlay.className = "tech-platform-overlay";
    bar.className = "tech-platform-overlay__bar";
    backButton.className = "tech-platform-overlay__close";
    backButton.type = "button";
    backButton.textContent = "← 返回";
    backButton.setAttribute("aria-label", "关闭平台并返回");

    frame.className = "tech-platform-overlay__frame";
    frame.src = resolvedUrl;
    frame.title = "科技平台";
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("allow", "fullscreen");

    function closeOverlay() {
      overlay.remove();
      document.body.classList.remove("has-open-tech-platform");
      document.removeEventListener("keydown", onOverlayKeydown);
      backButton.removeEventListener("click", closeOverlay);
    }

    function onOverlayKeydown(event) {
      if (event.key === "Escape") {
        closeOverlay();
      }
    }

    backButton.addEventListener("click", closeOverlay);
    document.addEventListener("keydown", onOverlayKeydown);
    bar.appendChild(backButton);
    overlay.append(bar, frame);
    document.body.appendChild(overlay);
    document.body.classList.add("has-open-tech-platform");
  }

  /** 将海外矿业数据整理为“总览 + 项目 + 局部地图”的轮播顺序。 */
  function getMiningCards() {
    const miningData = websiteData.overseasMining;

    if (!miningData || Array.isArray(miningData)) {
      return [];
    }

    const cards = [
      {
        id: "mining-summary",
        type: "summary",
        title: miningData.summaryCardTitle || "金矿项目成果总览",
        metrics: Array.isArray(miningData.summaryMetrics)
          ? miningData.summaryMetrics
          : [],
        focusAreas: Array.isArray(miningData.focusAreas)
          ? miningData.focusAreas
          : []
      }
    ];

    if (Array.isArray(miningData.projects)) {
      miningData.projects.forEach(function (project) {
        cards.push({
          id: project.id || "mining-project-" + cards.length,
          type: "project",
          project: project
        });
      });
    }

    if (miningData.mapPanel) {
      cards.push({
        id: "mining-map",
        type: "map",
        mapPanel: miningData.mapPanel
      });
    }

    if (Array.isArray(miningData.videos) && miningData.videos.length > 0) {
      cards.push({
        id: "mining-video",
        type: "video",
        title: miningData.videoCardTitle || "矿区航拍视频",
        videos: miningData.videos
      });
    }

    return cards;
  }

  /** 确保矿业轮播索引循环衔接。 */
  function getWrappedMiningIndex(index, cardCount) {
    return ((index % cardCount) + cardCount) % cardCount;
  }

  /** 创建矿业卡片共用的标题区域。 */
  function createMiningCardHeader(eyebrowText, titleText) {
    const header = document.createElement("header");
    const eyebrow = document.createElement("p");
    const title = document.createElement("h3");

    header.className = "mining-data-card__header";
    eyebrow.className = "mining-data-card__eyebrow";
    eyebrow.textContent = eyebrowText;
    title.className = "mining-data-card__title";
    title.textContent = titleText;
    header.append(eyebrow, title);
    return header;
  }

  /** 创建标签化指标列表，指标数量完全由 data.js 决定。 */
  function createMiningMetrics(metrics, className) {
    const list = document.createElement("div");
    list.className = className;

    metrics.forEach(function (metric) {
      const item = document.createElement("div");
      const label = document.createElement("p");
      const value = document.createElement("strong");
      const unit = document.createElement("span");

      item.className = "mining-metric";
      label.className = "mining-metric__label";
      label.textContent = metric.label || "指标名称待补充";
      value.className = "mining-metric__value";
      value.textContent = metric.value || "待补充";
      unit.className = "mining-metric__unit";
      unit.textContent = metric.unit || "";
      unit.hidden = !metric.unit;
      item.append(label, value, unit);
      list.appendChild(item);
    });

    return list;
  }

  /** 渲染金矿成果总览卡片。 */
  function createMiningSummaryContent(cardData) {
    const fragment = document.createDocumentFragment();
    const focus = document.createElement("section");
    const focusLabel = document.createElement("p");
    const focusList = document.createElement("ul");

    fragment.append(
      createMiningCardHeader("GOLD MINING OVERVIEW", cardData.title),
      createMiningMetrics(cardData.metrics, "mining-summary-metrics")
    );

    focus.className = "mining-focus";
    focusLabel.className = "mining-focus__label";
    focusLabel.textContent = "重点领域";
    focusList.className = "mining-focus__list";

    cardData.focusAreas.forEach(function (area) {
      const item = document.createElement("li");
      item.textContent = area;
      focusList.appendChild(item);
    });

    focus.append(focusLabel, focusList);
    fragment.appendChild(focus);
    return fragment;
  }

  /** 渲染单个金矿项目数据卡片。 */
  function createMiningProjectContent(project) {
    const fragment = document.createDocumentFragment();
    const investment = document.createElement("p");
    const description = document.createElement("p");
    const metrics = Array.isArray(project.metrics) ? project.metrics : [];

    fragment.append(
      createMiningCardHeader(
        "TAJIKISTAN GOLD MINING PROJECT",
        project.name || "项目名称待补充"
      )
    );

    investment.className = "mining-project-investment";
    investment.textContent = "项目投资 · " + (project.investment || "待补充");
    description.className = "mining-project-description";
    description.textContent = project.description || "项目介绍待补充。";
    fragment.append(
      investment,
      description,
      createMiningMetrics(metrics, "mining-project-metrics")
    );
    return fragment;
  }

  /**
   * 渲染塔吉克斯坦局部地图卡片。
   * 底图继续使用真实世界国界 SVG；无正式矿区坐标时只显示数据中的示意位置。
   */
  function createMiningMapContent(mapPanel) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const fragment = document.createDocumentFragment();
    const mapWrap = document.createElement("div");
    const mapSvg = document.createElementNS(svgNamespace, "svg");
    const mapImage = document.createElementNS(svgNamespace, "image");
    const marker = document.createElementNS(svgNamespace, "g");
    const markerRing = document.createElementNS(svgNamespace, "circle");
    const markerDot = document.createElementNS(svgNamespace, "circle");
    const markerText = document.createElementNS(svgNamespace, "text");
    const fallback = document.createElement("p");
    const legend = document.createElement("p");
    const note = document.createElement("p");
    const viewBox =
      Array.isArray(mapPanel.mapViewBox) && mapPanel.mapViewBox.length === 4
        ? mapPanel.mapViewBox.map(Number)
        : [620, 105, 175, 105];
    const approximatePosition =
      Array.isArray(mapPanel.approximatePosition) &&
      mapPanel.approximatePosition.length === 2
        ? mapPanel.approximatePosition.map(Number)
        : [0.5, 0.52];
    const hasExactCoordinates =
      Array.isArray(mapPanel.markerCoordinates) &&
      mapPanel.markerCoordinates.length === 2 &&
      Number.isFinite(Number(mapPanel.markerCoordinates[0])) &&
      Number.isFinite(Number(mapPanel.markerCoordinates[1]));
    let markerCoordinates;

    if (hasExactCoordinates) {
      markerCoordinates = projectCoordinates(
        Number(mapPanel.markerCoordinates[0]),
        Number(mapPanel.markerCoordinates[1])
      );
    } else {
      markerCoordinates = {
        x: viewBox[0] + viewBox[2] * approximatePosition[0],
        y: viewBox[1] + viewBox[3] * approximatePosition[1]
      };
    }

    fragment.append(
      createMiningCardHeader(
        "REGIONAL RESOURCE VIEW",
        mapPanel.title || "塔吉克斯坦矿区示意"
      )
    );

    mapWrap.className = "mining-local-map";
    mapSvg.classList.add("mining-local-map__svg");
    mapSvg.setAttribute("viewBox", viewBox.join(" "));
    mapSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    mapSvg.setAttribute(
      "aria-label",
      (mapPanel.title || "塔吉克斯坦矿区示意") +
        (mapPanel.isApproximate ? "，矿区位置为示意" : "")
    );
    mapSvg.setAttribute("role", "img");

    mapImage.setAttribute("x", "0");
    mapImage.setAttribute("y", "0");
    mapImage.setAttribute("width", "1000");
    mapImage.setAttribute("height", "500");
    mapImage.setAttribute("preserveAspectRatio", "xMidYMid meet");
    mapImage.setAttribute("href", mapPanel.mapImage || "");

    marker.classList.add("mining-local-map__marker");
    marker.setAttribute(
      "transform",
      "translate(" + markerCoordinates.x + " " + markerCoordinates.y + ")"
    );
    markerRing.classList.add("mining-local-map__marker-ring");
    markerRing.setAttribute("r", "4.4");
    markerDot.classList.add("mining-local-map__marker-dot");
    markerDot.setAttribute("r", "1.8");
    markerText.classList.add("mining-local-map__marker-label");
    markerText.setAttribute("x", "7");
    markerText.setAttribute("y", "2");
    markerText.textContent = mapPanel.markerLabel || "金矿项目";
    marker.append(markerRing, markerDot, markerText);
    mapSvg.append(mapImage, marker);

    fallback.className = "mining-local-map__fallback";
    fallback.textContent = "塔吉克斯坦地图待补充";
    fallback.hidden = true;
    mapImage.addEventListener("error", function () {
      mapSvg.hidden = true;
      fallback.hidden = false;
    });

    legend.className = "mining-local-map__legend";
    legend.textContent = mapPanel.legend || "金色节点：金矿资源布局";
    note.className = "mining-local-map__note";
    note.textContent =
      mapPanel.note || "矿区位置为示意，具体位置以正式资料为准。";
    mapWrap.append(mapSvg, fallback, legend, note);
    fragment.appendChild(mapWrap);
    return fragment;
  }

  /**
   * 渲染矿区航拍视频卡片，并把视频包装成可交互播放器。
   * 支持点击播放/暂停、拖动进度条跳转和键盘控制；
   * 单个视频加载失败时显示占位文字，不影响其余视频。
   */
  function createMiningVideoContent(videos) {
    const fragment = document.createDocumentFragment();
    const list = document.createElement("div");

    fragment.append(
      createMiningCardHeader(
        "MINE AERIAL VIEW",
        websiteData.overseasMining.videoCardTitle || "矿区航拍视频"
      )
    );

    list.className = "mining-video-list";

    videos.forEach(function (videoData, index) {
      const item = document.createElement("figure");
      const shell = document.createElement("div");
      const video = document.createElement("video");
      const playButton = document.createElement("button");
      const bar = document.createElement("div");
      const toggleButton = document.createElement("button");
      const progress = document.createElement("div");
      const progressFill = document.createElement("span");
      const timeLabel = document.createElement("span");
      const caption = document.createElement("figcaption");
      const placeholder = document.createElement("p");
      const videoTitle = videoData.title || ("矿区航拍视频" + (index + 1));

      item.className = "mining-video-item";
      shell.className = "mining-video-shell";

      video.className = "mining-video-item__player";
      video.preload = "metadata";
      video.playsInline = true;
      video.src = videoData.file || "";
      video.setAttribute("aria-label", videoTitle);

      playButton.className = "mining-video-item__play";
      playButton.type = "button";
      playButton.setAttribute("aria-label", "播放" + videoTitle);
      playButton.innerHTML = '<span aria-hidden="true">▶</span>';

      bar.className = "mining-video-item__bar";
      toggleButton.className = "mining-video-item__toggle";
      toggleButton.type = "button";
      toggleButton.setAttribute("aria-label", "播放视频");
      toggleButton.innerHTML = '<span aria-hidden="true">▶</span>';

      progress.className = "mining-video-item__progress";
      progress.setAttribute("role", "slider");
      progress.setAttribute("aria-label", "视频播放进度");
      progress.setAttribute("aria-valuemin", "0");
      progress.setAttribute("aria-valuemax", "0");
      progress.setAttribute("aria-valuenow", "0");
      progress.tabIndex = 0;
      progressFill.className = "mining-video-item__progress-fill";
      progress.appendChild(progressFill);

      timeLabel.className = "mining-video-item__time";
      timeLabel.textContent = "0:00 / 0:00";

      bar.append(toggleButton, progress, timeLabel);
      shell.append(video, playButton, bar);

      placeholder.className = "mining-video-item__placeholder";
      placeholder.textContent = videoTitle + "视频待补充";
      placeholder.hidden = true;

      video.addEventListener("error", function () {
        video.hidden = true;
        playButton.hidden = true;
        bar.hidden = true;
        placeholder.hidden = false;
      });

      caption.className = "mining-video-item__caption";
      caption.textContent = videoTitle;

      item.append(shell, placeholder, caption);
      list.appendChild(item);

      bindMiningVideoPlayer(
        video,
        shell,
        playButton,
        toggleButton,
        progress,
        progressFill,
        timeLabel
      );
    });

    fragment.appendChild(list);
    return fragment;
  }

  /** 绑定交互式视频播放器的播放、进度与键盘控制。 */
  function bindMiningVideoPlayer(
    video,
    shell,
    playButton,
    toggleButton,
    progress,
    progressFill,
    timeLabel
  ) {
    let dragging = false;

    function formatVideoTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
      }
      const total = Math.floor(seconds);
      const minutes = Math.floor(total / 60);
      const remainder = total % 60;
      return minutes + ":" + (remainder < 10 ? "0" : "") + remainder;
    }

    function updateProgress() {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const current = Number.isFinite(video.currentTime)
        ? video.currentTime
        : 0;
      const ratio = duration > 0 ? current / duration : 0;
      progressFill.style.width = (ratio * 100).toFixed(2) + "%";
      timeLabel.textContent =
        formatVideoTime(current) + " / " + formatVideoTime(duration);
      progress.setAttribute("aria-valuemax", String(Math.round(duration)));
      progress.setAttribute("aria-valuenow", String(Math.round(current)));
    }

    function playVideo() {
      if (typeof video.play === "function") {
        video.play().catch(function () {
          // 加载失败或浏览器限制时保持暂停，由占位状态提示。
        });
      }
    }

    function togglePlay() {
      if (video.paused || video.ended) {
        playVideo();
      } else {
        video.pause();
      }
    }

    function updatePlayingState() {
      const playing = !video.paused && !video.ended;
      playButton.hidden = playing;
      toggleButton.innerHTML = playing
        ? '<span aria-hidden="true">❚❚</span>'
        : '<span aria-hidden="true">▶</span>';
      toggleButton.setAttribute(
        "aria-label",
        playing ? "暂停视频" : "播放视频"
      );
    }

    function seekToClientX(clientX) {
      const rect = progress.getBoundingClientRect();
      if (rect.width <= 0) {
        return;
      }
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width)
      );
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = ratio * video.duration;
        updateProgress();
      }
    }

    playButton.addEventListener("click", playVideo);
    toggleButton.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);

    video.addEventListener("play", updatePlayingState);
    video.addEventListener("pause", updatePlayingState);
    video.addEventListener("ended", updatePlayingState);
    video.addEventListener("loadedmetadata", updateProgress);
    video.addEventListener("timeupdate", updateProgress);

    // 阻止视频区域内的指针事件冒泡到轮播，避免拖动冲突。
    shell.addEventListener("pointerdown", function (event) {
      event.stopPropagation();
    });

    progress.addEventListener("pointerdown", function (event) {
      dragging = true;
      if (typeof progress.setPointerCapture === "function") {
        progress.setPointerCapture(event.pointerId);
      }
      seekToClientX(event.clientX);
      event.preventDefault();
    });

    progress.addEventListener("pointermove", function (event) {
      if (dragging) {
        seekToClientX(event.clientX);
      }
    });

    function finishSeek(event) {
      if (dragging) {
        dragging = false;
        seekToClientX(event.clientX);
      }
    }

    progress.addEventListener("pointerup", finishSeek);
    progress.addEventListener("pointercancel", function () {
      dragging = false;
    });

    progress.addEventListener("keydown", function (event) {
      const step = 5;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - step);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (Number.isFinite(video.duration)) {
          video.currentTime = Math.min(
            video.duration,
            video.currentTime + step
          );
        }
      } else if (event.key === "Home") {
        event.preventDefault();
        video.currentTime = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        if (Number.isFinite(video.duration)) {
          video.currentTime = video.duration;
        }
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        togglePlay();
      }
    });

    updatePlayingState();
    updateProgress();
  }

  /** 创建一个由矿业轮播复用的左、中、右视觉槽位。 */
  function createMiningCarouselCard(slotName) {
    const card = document.createElement("article");
    const body = document.createElement("div");

    card.className = "mining-data-card mining-data-card--" + slotName;
    card.dataset.miningSlot = slotName;
    body.className = "mining-data-card__body";
    card.appendChild(body);
    return card;
  }

  /** 使用对应类型的数据填充一个矿业轮播槽位。 */
  function fillMiningCarouselCard(cardElement, cardData, cardIndex) {
    if (!cardElement || !cardData) {
      return;
    }

    const body = cardElement.querySelector(".mining-data-card__body");
    cardElement.dataset.cardIndex = String(cardIndex);
    cardElement.dataset.cardId = cardData.id || "";
    cardElement.classList.toggle(
      "mining-data-card--map",
      cardData.type === "map"
    );

    if (!body) {
      return;
    }

    body.replaceChildren();

    if (cardData.type === "summary") {
      body.appendChild(createMiningSummaryContent(cardData));
    } else if (cardData.type === "project") {
      body.appendChild(createMiningProjectContent(cardData.project || {}));
    } else if (cardData.type === "map") {
      body.appendChild(createMiningMapContent(cardData.mapPanel || {}));
    } else if (cardData.type === "video") {
      body.appendChild(createMiningVideoContent(cardData.videos || []));
    }
  }

  /** 更新矿业轮播主卡片、相邻预览和指示点。 */
  function updateMiningCarousel() {
    const cards = getMiningCards();
    const cardCount = cards.length;

    if (!miningCarouselStage) {
      return;
    }

    if (cardCount === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "mining-carousel__empty";
      emptyState.textContent = "海外矿业开发资料待补充";
      miningCarouselStage.replaceChildren(emptyState);
      return;
    }

    miningCarouselIndex = getWrappedMiningIndex(
      miningCarouselIndex,
      cardCount
    );

    const previousIndex = getWrappedMiningIndex(
      miningCarouselIndex - 1,
      cardCount
    );
    const nextIndex = getWrappedMiningIndex(
      miningCarouselIndex + 1,
      cardCount
    );
    const previousCard = miningCarouselStage.querySelector(
      '[data-mining-slot="previous"]'
    );
    const currentCard = miningCarouselStage.querySelector(
      '[data-mining-slot="current"]'
    );
    const nextCard = miningCarouselStage.querySelector(
      '[data-mining-slot="next"]'
    );

    fillMiningCarouselCard(previousCard, cards[previousIndex], previousIndex);
    fillMiningCarouselCard(
      currentCard,
      cards[miningCarouselIndex],
      miningCarouselIndex
    );
    fillMiningCarouselCard(nextCard, cards[nextIndex], nextIndex);

    if (previousCard) {
      previousCard.hidden = cardCount <= 1;
      previousCard.setAttribute("aria-hidden", "true");
    }
    if (currentCard) {
      currentCard.hidden = false;
      currentCard.setAttribute("aria-hidden", "false");
    }
    if (nextCard) {
      nextCard.hidden = cardCount <= 1;
      nextCard.setAttribute("aria-hidden", "true");
    }

    if (miningCarouselViewport) {
      const activeCard = cards[miningCarouselIndex];
      const activeTitle =
        activeCard.type === "project"
          ? activeCard.project.name
          : activeCard.type === "map"
            ? activeCard.mapPanel.title
            : activeCard.title;
      miningCarouselViewport.setAttribute(
        "aria-label",
        "当前矿业卡片：" + (activeTitle || "内容待补充")
      );
    }

    if (miningCarouselDots) {
      miningCarouselDots
        .querySelectorAll(".mining-carousel__dot")
        .forEach(function (dot, index) {
          const isActive = index === miningCarouselIndex;
          dot.classList.toggle("is-active", isActive);
          if (isActive) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
    }
  }

  /** 循环切换到指定矿业卡片。 */
  function selectMiningCard(nextIndex, direction) {
    const cards = getMiningCards();

    if (
      cards.length <= 1 ||
      miningCarouselAnimating ||
      !miningCarouselStage
    ) {
      return;
    }

    const targetIndex = getWrappedMiningIndex(nextIndex, cards.length);
    if (targetIndex === miningCarouselIndex) {
      return;
    }

    let moveDirection = direction;
    if (moveDirection !== 1 && moveDirection !== -1) {
      const forwardDistance = getWrappedMiningIndex(
        targetIndex - miningCarouselIndex,
        cards.length
      );
      const backwardDistance = getWrappedMiningIndex(
        miningCarouselIndex - targetIndex,
        cards.length
      );
      moveDirection = forwardDistance <= backwardDistance ? 1 : -1;
    }

    if (reducedMotionPreference && reducedMotionPreference.matches) {
      miningCarouselIndex = targetIndex;
      updateMiningCarousel();
      return;
    }

    miningCarouselAnimating = true;
    miningCarouselStage.classList.add(
      moveDirection === 1 ? "is-sliding-next" : "is-sliding-previous"
    );
    miningCarouselTransitionTimer = window.setTimeout(function () {
      miningCarouselStage.classList.add("is-resetting");
      miningCarouselStage.classList.remove(
        "is-sliding-next",
        "is-sliding-previous"
      );
      miningCarouselIndex = targetIndex;
      updateMiningCarousel();
      void miningCarouselStage.offsetWidth;
      miningCarouselStage.classList.remove("is-resetting");
      miningCarouselAnimating = false;
      miningCarouselTransitionTimer = null;
    }, 320);
  }

  /** 离开矿业页面时清理尚未完成的拖动与切换状态。 */
  function stopMiningCarouselMotion() {
    if (miningCarouselTransitionTimer) {
      window.clearTimeout(miningCarouselTransitionTimer);
      miningCarouselTransitionTimer = null;
    }

    miningCarouselAnimating = false;
    miningPointerActive = false;
    miningPointerId = null;
    miningSuppressCardClick = false;

    if (miningCarouselViewport) {
      miningCarouselViewport.classList.remove("is-dragging");
    }
    if (miningCarouselStage) {
      miningCarouselStage.classList.remove(
        "is-sliding-next",
        "is-sliding-previous",
        "is-resetting"
      );
      updateMiningCarousel();
    }
  }

  /** 填充矿业页面封面、卡片槽位和指示点。 */
  function fillMiningShowcase() {
    const miningData = websiteData.overseasMining;

    if (
      !miningData ||
      Array.isArray(miningData) ||
      !miningPage ||
      !miningCarouselStage ||
      !miningCarouselDots
    ) {
      return;
    }

    if (miningSectionNumber) {
      miningSectionNumber.textContent =
        miningData.sectionNumber || "03 / OVERSEAS MINING";
    }
    if (miningTitleEn) {
      miningTitleEn.textContent =
        miningData.titleEn || "OVERSEAS MINING DEVELOPMENT";
    }
    if (miningTitle) {
      miningTitle.textContent = miningData.title || "海外矿业开发";
    }
    if (miningCountryTitleEn) {
      miningCountryTitleEn.textContent =
        miningData.heroTitleEn || "TAJIKISTAN GOLD MINING";
    }
    if (miningCountryTitle) {
      miningCountryTitle.textContent =
        miningData.heroTitle || "塔吉克斯坦金矿项目";
    }
    if (miningOverview) {
      miningOverview.textContent =
        miningData.overview || "塔吉克斯坦金矿项目业务概览待补充。";
    }

    if (miningHeroPlaceholder) {
      miningHeroPlaceholder.textContent =
        miningData.imagePlaceholderText || "矿山图片待补充";
      miningHeroPlaceholder.hidden = false;
    }

    if (miningHeroImage) {
      miningHeroImage.hidden = true;
      miningHeroImage.alt = miningData.heroImageAlt || "塔吉克斯坦金矿矿山全景";
      miningHeroImage.onload = function () {
        miningHeroImage.hidden = false;
        if (miningHeroPlaceholder) {
          miningHeroPlaceholder.hidden = true;
        }
      };
      miningHeroImage.onerror = function () {
        miningHeroImage.hidden = true;
        miningHeroImage.removeAttribute("src");
        if (miningHeroPlaceholder) {
          miningHeroPlaceholder.hidden = false;
        }
      };

      if (miningData.heroImage) {
        miningHeroImage.src = miningData.heroImage;
      }
    }

    const cards = getMiningCards();
    miningCarouselIndex = 0;
    miningCarouselStage.replaceChildren(
      createMiningCarouselCard("previous"),
      createMiningCarouselCard("current"),
      createMiningCarouselCard("next")
    );
    miningCarouselDots.replaceChildren();

    cards.forEach(function (cardData, index) {
      const dot = document.createElement("button");
      const dotTitle =
        cardData.type === "project"
          ? cardData.project.name
          : cardData.type === "map"
            ? cardData.mapPanel.title
            : cardData.title;
      dot.type = "button";
      dot.className = "mining-carousel__dot";
      dot.dataset.carouselIndex = String(index);
      dot.setAttribute(
        "aria-label",
        "显示矿业卡片：" + (dotTitle || String(index + 1))
      );
      miningCarouselDots.appendChild(dot);
    });

    const hasMultipleCards = cards.length > 1;
    if (miningCarouselPrev) {
      miningCarouselPrev.hidden = !hasMultipleCards;
    }
    if (miningCarouselNext) {
      miningCarouselNext.hidden = !hasMultipleCards;
    }
    miningCarouselDots.hidden = cards.length === 0;
    updateMiningCarousel();
  }

  /** 绑定矿业轮播箭头、指示点、键盘和指针滑动。 */
  function bindMiningCarouselEvents() {
    if (
      !miningCarousel ||
      !miningCarouselViewport ||
      !miningCarouselStage
    ) {
      return;
    }

    if (miningCarouselPrev) {
      miningCarouselPrev.addEventListener("click", function () {
        selectMiningCard(miningCarouselIndex - 1, -1);
      });
    }
    if (miningCarouselNext) {
      miningCarouselNext.addEventListener("click", function () {
        selectMiningCard(miningCarouselIndex + 1, 1);
      });
    }
    if (miningCarouselDots) {
      miningCarouselDots.addEventListener("click", function (event) {
        const dot = event.target.closest(".mining-carousel__dot");
        if (!dot || !miningCarouselDots.contains(dot)) {
          return;
        }
        selectMiningCard(Number(dot.dataset.carouselIndex));
      });
    }

    miningCarouselStage.addEventListener("click", function (event) {
      if (miningSuppressCardClick) {
        return;
      }

      const card = event.target.closest(".mining-data-card");
      if (!card || !miningCarouselStage.contains(card)) {
        return;
      }
      if (card.dataset.miningSlot === "previous") {
        selectMiningCard(miningCarouselIndex - 1, -1);
      }
      if (card.dataset.miningSlot === "next") {
        selectMiningCard(miningCarouselIndex + 1, 1);
      }
    });

    miningCarouselViewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectMiningCard(miningCarouselIndex - 1, -1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        selectMiningCard(miningCarouselIndex + 1, 1);
      }
    });

    miningCarouselViewport.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    miningCarouselViewport.addEventListener("pointerdown", function (event) {
      if (
        getMiningCards().length <= 1 ||
        event.target.closest("button") ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      miningPointerActive = true;
      miningPointerId = event.pointerId;
      miningPointerStartX = event.clientX;
      miningPointerStartY = event.clientY;
      miningPointerCurrentX = event.clientX;
      miningPointerCurrentY = event.clientY;
      miningCarouselViewport.classList.add("is-dragging");

      if (typeof miningCarouselViewport.setPointerCapture === "function") {
        miningCarouselViewport.setPointerCapture(event.pointerId);
      }
    });

    miningCarouselViewport.addEventListener("pointermove", function (event) {
      if (!miningPointerActive || event.pointerId !== miningPointerId) {
        return;
      }

      miningPointerCurrentX = event.clientX;
      miningPointerCurrentY = event.clientY;
      const distanceX = Math.abs(miningPointerCurrentX - miningPointerStartX);
      const distanceY = Math.abs(miningPointerCurrentY - miningPointerStartY);
      if (distanceX > 12 && distanceX > distanceY) {
        event.preventDefault();
      }
    });

    function finishMiningPointerGesture(event) {
      if (!miningPointerActive || event.pointerId !== miningPointerId) {
        return;
      }

      const distanceX = miningPointerCurrentX - miningPointerStartX;
      const distanceY = miningPointerCurrentY - miningPointerStartY;
      const isHorizontalSwipe =
        Math.abs(distanceX) >= 54 &&
        Math.abs(distanceX) > Math.abs(distanceY) * 1.25;

      miningPointerActive = false;
      miningPointerId = null;
      miningCarouselViewport.classList.remove("is-dragging");

      if (isHorizontalSwipe) {
        miningSuppressCardClick = true;
        selectMiningCard(
          distanceX < 0 ? miningCarouselIndex + 1 : miningCarouselIndex - 1,
          distanceX < 0 ? 1 : -1
        );
        window.setTimeout(function () {
          miningSuppressCardClick = false;
        }, 0);
      }
    }

    miningCarouselViewport.addEventListener(
      "pointerup",
      finishMiningPointerGesture
    );
    miningCarouselViewport.addEventListener(
      "pointercancel",
      finishMiningPointerGesture
    );
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
   * 完成项目弹窗关闭，并将焦点还给此前点击的地图节点。
   */
  function finishCloseProjectModal() {
    if (!projectModal) {
      return;
    }

    if (projectModalCloseTimer) {
      window.clearTimeout(projectModalCloseTimer);
      projectModalCloseTimer = null;
    }

    projectModal.hidden = true;
    projectModal.classList.remove("project-modal--turnkey", "is-closing");
    document.body.classList.remove("has-open-project-modal");
    showProjectImagePlaceholder();

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  /**
   * 关闭项目介绍弹窗；成套项目弹窗先播放一次快速淡出。
   */
  function closeProjectModal() {
    if (
      !projectModal ||
      projectModal.hidden ||
      projectModal.classList.contains("is-closing")
    ) {
      return;
    }

    const shouldAnimate =
      projectModal.classList.contains("project-modal--turnkey") &&
      !(reducedMotionPreference && reducedMotionPreference.matches);

    if (!shouldAnimate) {
      finishCloseProjectModal();
      return;
    }

    projectModal.classList.add("is-closing");
    projectModalCloseTimer = window.setTimeout(
      finishCloseProjectModal,
      180
    );
  }

  /**
   * 更新弹窗中的国家代表图片。
   * 新结构优先读取 country.image；旧结构仍可回退读取 project.image，
   * 以免海外矿业等现有数据失效。
   * @param {object} country 国家数据
   * @param {object|null} project 当前项目
   */
  function updateProjectModalImage(country, project) {
    const imagePath =
      country.image || (project && project.image) || "";
    const usesPlaceholderImage =
      !imagePath || /(^|[\\/])[^\\/]*placeholder/i.test(imagePath);

    showProjectImagePlaceholder();

    if (usesPlaceholderImage || !projectModalImage) {
      return;
    }

    projectModalImage.alt =
      (country.countryName || "该国家") + "代表图片";
    projectModalImagePlaceholder.hidden = true;
    projectModalImage.hidden = false;
    projectModalImage.src = imagePath;
  }

  /**
   * 统一取得国家的项目数组。
   * 新数据直接读取 country.projects；旧数据若把单个项目字段放在国家层级，
   * 则临时转换为只有一项的数组，避免旧内容立即失效。
   * @param {object} country 国家数据
   * @returns {object[]}
   */
  function getCountryProjects(country) {
    if (Array.isArray(country.projects)) {
      return country.projects;
    }

    const legacyDescription =
      country.description || country.projectDescription || "";
    const hasLegacyProject =
      Boolean(country.projectName) || Boolean(legacyDescription);

    if (!hasLegacyProject) {
      return [];
    }

    return [
      {
        id: (country.id || "country") + "-project-1",
        projectName: country.projectName || "项目名称待补充",
        description: legacyDescription || "该项目正式介绍待补充。",
        image: country.image || ""
      }
    ];
  }

  /**
   * 显示某个项目的名称与介绍，并同步项目切换按钮状态。
   * @param {object|null} project 当前项目
   * @param {number} selectedIndex 当前项目序号
   */
  function selectProject(project, selectedIndex) {
    const hasProject = Boolean(project);

    if (projectModalDetailsContent) {
      projectModalDetailsContent.hidden = !hasProject;
    }

    if (projectModalEmpty) {
      projectModalEmpty.hidden = hasProject;
    }

    if (projectModalProjectName) {
      projectModalProjectName.textContent =
        hasProject ? project.projectName || "项目名称待补充" : "";
    }

    if (projectModalDescription) {
      projectModalDescription.textContent =
        hasProject
          ? project.description || "该项目正式介绍待补充。"
          : "";
    }

    if (projectModalProjectSwitcher) {
      projectModalProjectSwitcher
        .querySelectorAll("button")
        .forEach(function (button, index) {
          const isSelected = index === selectedIndex;
          button.classList.toggle("is-active", isSelected);
          button.setAttribute("aria-pressed", String(isSelected));
        });
    }

    /*
     * 重新添加轻微淡入类，使每次切换项目时仅更新详情文字。
     * 用户开启“减少动态效果”后，CSS 会自动关闭该动画。
     */
    if (
      hasProject &&
      projectModalDetailsContent &&
      projectModal.classList.contains("project-modal--turnkey")
    ) {
      projectModalDetailsContent.classList.remove("is-changing");
      void projectModalDetailsContent.offsetWidth;
      projectModalDetailsContent.classList.add("is-changing");
    }
  }

  /**
   * 根据 projects 数组创建项目切换按钮。
   * 只有一个项目时继续隐藏切换区域。
   * @param {object} country 国家数据
   * @param {object[]} projects 项目数组
   */
  function fillProjectSwitcher(country, projects) {
    if (!projectModalProjectSwitcher) {
      return;
    }

    const isTurnkeyProject =
      projectModal.classList.contains("project-modal--turnkey");

    projectModalProjectSwitcher.replaceChildren();
    projectModalProjectSwitcher.hidden = projects.length <= 1;

    if (projectModalWorkspace) {
      projectModalWorkspace.classList.toggle(
        "project-modal__workspace--single",
        projects.length <= 1
      );
    }

    if (projects.length <= 1) {
      return;
    }

    projects.forEach(function (project, index) {
      const button = document.createElement("button");
      const number = document.createElement("span");
      const name = document.createElement("span");

      button.type = "button";
      button.className = isTurnkeyProject
        ? "project-modal__project-button"
        : "nav-button";
      button.setAttribute("aria-pressed", String(index === 0));
      button.setAttribute(
        "aria-label",
        "项目" +
          String(index + 1).padStart(2, "0") +
          "：" +
          (project.projectName || "项目名称待补充")
      );

      number.className = "project-modal__project-number";
      number.textContent = String(index + 1).padStart(2, "0");

      name.className = "project-modal__project-button-name";
      name.textContent = project.projectName || "项目名称待补充";

      if (isTurnkeyProject) {
        button.append(number, name);
      } else {
        button.textContent = project.projectName || "项目名称待补充";
      }

      button.addEventListener("click", function () {
        if (!isTurnkeyProject) {
          updateProjectModalImage(country, project);
        }

        selectProject(project, index);
      });

      projectModalProjectSwitcher.appendChild(button);
    });
  }

  /**
   * 使用 data.js 中的国家和项目数组填充弹窗。
   * @param {object} country 国家数据
   */
  function openProjectModal(country) {
    if (!projectModal) {
      return;
    }

    if (projectModalCloseTimer) {
      window.clearTimeout(projectModalCloseTimer);
      projectModalCloseTimer = null;
    }
    projectModal.classList.remove("is-closing");

    const projects = getCountryProjects(country);
    const project = projects.length > 0 ? projects[0] : null;
    const isOverseasProjectCountry =
      Array.isArray(websiteData.overseasProjects) &&
      websiteData.overseasProjects.includes(country);

    lastFocusedElement = document.activeElement;
    projectModal.classList.toggle(
      "project-modal--turnkey",
      isOverseasProjectCountry
    );

    if (projectModalCountry) {
      projectModalCountry.textContent = country.countryName || "国家名称待补充";
    }

    if (projectModalCountryEn) {
      projectModalCountryEn.textContent =
        country.countryNameEn || "COUNTRY NAME TO BE ADDED";
    }

    if (projectModalOverviewSection) {
      projectModalOverviewSection.hidden = !isOverseasProjectCountry;
    }

    if (projectModalOverview && isOverseasProjectCountry) {
      projectModalOverview.textContent =
        country.overview || "该国家项目建设成果概览待补充。";
    }

    if (projectModalProjectCount) {
      projectModalProjectCount.hidden =
        !isOverseasProjectCountry || projects.length === 0;
      projectModalProjectCount.textContent =
        "共" + projects.length + "个重点项目";
    }

    fillProjectSwitcher(country, projects);

    /*
     * 海外成套项目图片属于国家，仅在打开弹窗时更新一次；
     * 后续项目切换只更新右侧详情。旧栏目继续兼容项目级图片。
     */
    updateProjectModalImage(country, project);
    selectProject(project, 0);

    projectModal.hidden = false;
    document.body.classList.add("has-open-project-modal");

    if (projectModalClose) {
      projectModalClose.focus();
    }
  }

  function getFutureMinerals(country) {
    const miningData = country && country.miningDevelopment;
    return miningData && Array.isArray(miningData.minerals)
      ? miningData.minerals
      : [];
  }

  function getFutureProjectStatuses(country) {
    const projectData = (country && country.projectConstruction) || {};
    return [
      { id: "pending", label: "待执行", projects: projectData.pending },
      { id: "ongoing", label: "中标在执行", projects: projectData.ongoing }
    ].filter(function (status) {
      return Array.isArray(status.projects) && status.projects.length > 0;
    });
  }

  function getFutureProjectName(project) {
    if (typeof project === "string") {
      return project;
    }

    return project.projectName || project.name || project.title || "项目名称待补充";
  }

  function getFutureProjectDescription(project) {
    if (!project || typeof project === "string") {
      return "项目详细介绍待补充";
    }

    return (
      project.description ||
      project.projectDescription ||
      project.overview ||
      "项目详细介绍待补充"
    );
  }

  function createFutureTab(label, value, isActive, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.value = value;
    button.textContent = label;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    return button;
  }

  function renderFutureMineral(mineralIndex) {
    const minerals = getFutureMinerals(activeFutureCountry);
    if (!minerals.length) {
      return;
    }

    activeFutureMineralIndex = Math.max(
      0,
      Math.min(Number(mineralIndex) || 0, minerals.length - 1)
    );
    const mineral = minerals[activeFutureMineralIndex];
    const mineralName = mineral.name || "矿种名称待补充";
    const usesPlaceholderImage =
      !mineral.image || /(^|[\\/])[^\\/]*placeholder/i.test(mineral.image);

    if (futureMineralTabs) {
      futureMineralTabs.replaceChildren();
      minerals.forEach(function (item, index) {
        const tab = createFutureTab(
          item.name || "矿种" + (index + 1),
          String(index),
          index === activeFutureMineralIndex,
          "future-choice-tab future-mineral-tab"
        );
        tab.dataset.mineralIndex = String(index);
        futureMineralTabs.appendChild(tab);
      });
      futureMineralTabs.hidden = minerals.length < 2;
    }

    if (futureMineralName) {
      futureMineralName.textContent = mineralName;
    }
    if (futureMineralImageName) {
      futureMineralImageName.textContent = mineralName;
    }
    if (futureMineralDescription) {
      futureMineralDescription.textContent =
        mineral.description || "该矿种的进一步勘探及开发资料待补充。";
    }
    if (futureMineralAnalysis) {
      futureMineralAnalysis.textContent = mineral.analysis || "";
    }
    if (futureMineralAnalysisBlock) {
      futureMineralAnalysisBlock.hidden = !mineral.analysis;
    }
    if (futureMineralMedia) {
      futureMineralMedia.disabled = usesPlaceholderImage;
      futureMineralMedia.setAttribute(
        "aria-label",
        usesPlaceholderImage ? mineralName + "图片待补充" : "放大查看" + mineralName + "图片"
      );
    }

    if (futureMineralImage && futureMineralPlaceholder) {
      futureMineralImage.onload = function () {
        futureMineralImage.hidden = false;
        futureMineralPlaceholder.hidden = true;
        if (futureMineralMedia) {
          futureMineralMedia.disabled = false;
        }
      };
      futureMineralImage.onerror = function () {
        futureMineralImage.hidden = true;
        futureMineralImage.removeAttribute("src");
        futureMineralPlaceholder.hidden = false;
        if (futureMineralMedia) {
          futureMineralMedia.disabled = true;
        }
      };

      futureMineralImage.hidden = true;
      futureMineralPlaceholder.hidden = false;
      futureMineralImage.alt =
        (activeFutureCountry.countryName || "地区") + mineralName + "图片";

      if (usesPlaceholderImage) {
        futureMineralImage.removeAttribute("src");
      } else {
        futureMineralImage.src = mineral.image;
      }
    }

    if (futureMineralCopy) {
      futureMineralCopy.classList.remove("is-refreshing");
      void futureMineralCopy.offsetWidth;
      futureMineralCopy.classList.add("is-refreshing");
    }
  }

  function renderFutureProjectStatus(statusId, projectIndex) {
    const statuses = getFutureProjectStatuses(activeFutureCountry);
    const projectData = activeFutureCountry.projectConstruction || {};

    if (!statuses.length) {
      activeFutureProjectStatus = "";
      activeFutureProjectIndex = 0;
      if (futureProjectStatusTabs) {
        futureProjectStatusTabs.replaceChildren();
        futureProjectStatusTabs.hidden = true;
      }
      if (futureProjectList) {
        futureProjectList.replaceChildren();
        futureProjectList.hidden = true;
      }
      if (futureProjectDetailTitle) {
        futureProjectDetailTitle.textContent = "建设方向";
      }
      if (futureProjectDescription) {
        futureProjectDescription.textContent =
          projectData.direction || projectData.description || "项目详细介绍待补充";
      }
      return;
    }

    const activeStatus =
      statuses.find(function (status) {
        return status.id === statusId;
      }) || statuses[0];
    activeFutureProjectStatus = activeStatus.id;
    activeFutureProjectIndex = Math.max(
      0,
      Math.min(Number(projectIndex) || 0, activeStatus.projects.length - 1)
    );

    if (futureProjectStatusTabs) {
      futureProjectStatusTabs.replaceChildren();
      statuses.forEach(function (status) {
        const tab = createFutureTab(
          status.label,
          status.id,
          status.id === activeFutureProjectStatus,
          "future-choice-tab future-project-status-tab"
        );
        tab.dataset.projectStatus = status.id;
        futureProjectStatusTabs.appendChild(tab);
      });
      futureProjectStatusTabs.hidden = false;
    }

    if (futureProjectList) {
      futureProjectList.replaceChildren();
      futureProjectList.hidden = false;
      activeStatus.projects.forEach(function (project, index) {
        const button = document.createElement("button");
        const number = document.createElement("span");
        const name = document.createElement("span");
        button.type = "button";
        button.className = "future-project-item";
        button.dataset.projectIndex = String(index);
        button.classList.toggle("is-active", index === activeFutureProjectIndex);
        button.setAttribute("aria-pressed", String(index === activeFutureProjectIndex));
        number.textContent = String(index + 1).padStart(2, "0");
        name.textContent = getFutureProjectName(project);
        button.append(number, name);
        futureProjectList.appendChild(button);
      });
    }

    const selectedProject = activeStatus.projects[activeFutureProjectIndex];
    if (futureProjectDetailTitle) {
      futureProjectDetailTitle.textContent = getFutureProjectName(selectedProject);
    }
    if (futureProjectDescription) {
      futureProjectDescription.textContent = getFutureProjectDescription(selectedProject);
      const detail = futureProjectDescription.closest(".future-project-detail");
      if (detail) {
        detail.classList.remove("is-refreshing");
        void detail.offsetWidth;
        detail.classList.add("is-refreshing");
      }
    }
  }

  function selectFutureBusiness(businessType) {
    activeFutureBusiness = businessType === "project" ? "project" : "mining";
    if (futureMiningSection) {
      futureMiningSection.hidden = activeFutureBusiness !== "mining";
    }
    if (futureProjectSection) {
      futureProjectSection.hidden = activeFutureBusiness !== "project";
    }
    if (futureBusinessTabs) {
      futureBusinessTabs.querySelectorAll("button").forEach(function (button) {
        const isActive = button.dataset.businessType === activeFutureBusiness;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }
  }

  function openFutureImageLightbox() {
    if (
      !futureImageLightbox ||
      !futureImageLightboxImage ||
      !futureMineralImage ||
      futureMineralImage.hidden ||
      !futureMineralImage.currentSrc
    ) {
      return;
    }

    futureImageLightboxImage.src = futureMineralImage.currentSrc;
    futureImageLightboxImage.alt = futureMineralImage.alt;
    if (futureImageLightboxCaption) {
      futureImageLightboxCaption.textContent = futureMineralName
        ? futureMineralName.textContent
        : "矿产图片";
    }
    futureImageLightbox.hidden = false;
    document.body.classList.add("has-open-future-lightbox");
    if (futureImageLightboxClose) {
      futureImageLightboxClose.focus();
    }
  }

  function closeFutureImageLightbox() {
    if (!futureImageLightbox || futureImageLightbox.hidden) {
      return;
    }
    futureImageLightbox.hidden = true;
    document.body.classList.remove("has-open-future-lightbox");
    if (futureImageLightboxImage) {
      futureImageLightboxImage.removeAttribute("src");
    }
    if (futureMineralMedia) {
      futureMineralMedia.focus();
    }
  }

  /**
   * 关闭未来展望弹窗并清除节点选中状态。
   */
  function closeFutureOutlookModal() {
    if (!futureModal || futureModal.hidden) {
      return;
    }

    closeFutureImageLightbox();
    futureModal.hidden = true;
    document.body.classList.remove("has-open-future-modal");
    activeFutureCountry = null;

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
    const hasProjectConstruction =
      country.businessType === "turnkey" ||
      categories.includes("projectConstruction");
    const hasMiningDevelopment =
      country.businessType === "mining" ||
      categories.includes("miningDevelopment");

    if (selectedFutureNode) {
      selectedFutureNode.classList.remove("is-selected");
    }

    selectedFutureNode = nodeGroup;
    if (selectedFutureNode) {
      selectedFutureNode.classList.add("is-selected");
    }
    lastFocusedElement = nodeGroup;
    activeFutureCountry = country;
    activeFutureMineralIndex = 0;
    activeFutureProjectIndex = 0;
    activeFutureProjectStatus = "";

    if (futureModalCountry) {
      futureModalCountry.textContent =
        country.countryName || "地区名称待补充";
    }

    if (futureModalCountryEn) {
      futureModalCountryEn.textContent =
        country.countryNameEn || "REGION NAME TO BE ADDED";
    }

    if (futureModalBusinessType) {
      const defaultBusinessLabel =
        hasProjectConstruction && hasMiningDevelopment
          ? "海外成套项目建设 / 矿产资源开发"
          : hasMiningDevelopment
            ? "矿产资源开发"
            : "海外成套项目建设";

      futureModalBusinessType.textContent =
        country.businessTypeLabel || defaultBusinessLabel;
      futureModalBusinessType.classList.toggle(
        "future-modal__business-type--gold",
        country.markerStyle === "gold"
      );
      futureModalBusinessType.classList.toggle(
        "future-modal__business-type--blue",
        country.markerStyle !== "gold"
      );
    }

    if (futureModalSummary) {
      futureModalSummary.textContent =
        country.summary || "该地区未来业务总览待补充";
    }

    const focusAreas = Array.isArray(country.focusAreas)
      ? country.focusAreas
      : [];
    if (futureFocusAreas) {
      futureFocusAreas.replaceChildren();
      focusAreas.forEach(function (area) {
        const chip = document.createElement("span");
        chip.textContent = area;
        futureFocusAreas.appendChild(chip);
      });
      futureFocusAreas.hidden = focusAreas.length === 0;
    }

    if (futureMiningDescription) {
      const miningData = country.miningDevelopment || {};
      futureMiningDescription.textContent = miningData.description || "";
      futureMiningDescription.hidden = !miningData.description;
    }

    if (hasMiningDevelopment && getFutureMinerals(country).length) {
      renderFutureMineral(0);
    }
    if (hasProjectConstruction) {
      renderFutureProjectStatus("", 0);
    }

    if (futureBusinessTabs) {
      futureBusinessTabs.replaceChildren();
      if (hasMiningDevelopment && hasProjectConstruction) {
        const miningTab = createFutureTab(
          "矿产资源",
          "mining",
          true,
          "future-choice-tab future-business-tab future-business-tab--mining"
        );
        const projectTab = createFutureTab(
          "项目建设",
          "project",
          false,
          "future-choice-tab future-business-tab future-business-tab--project"
        );
        miningTab.dataset.businessType = "mining";
        projectTab.dataset.businessType = "project";
        futureBusinessTabs.append(miningTab, projectTab);
        futureBusinessTabs.hidden = false;
      } else {
        futureBusinessTabs.hidden = true;
      }
    }

    selectFutureBusiness(hasMiningDevelopment ? "mining" : "project");

    futureModal.hidden = false;
    document.body.classList.add("has-open-future-modal");

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
    if (interactionType === "future") {
      group.classList.add(
        country.markerStyle === "gold"
          ? "map-node--gold"
          : "map-node--blue"
      );
    }
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute(
      "aria-label",
      interactionType === "future"
        ? "查看" + country.countryName + "双千亿计划介绍"
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
    const mapLegend = mapContent.querySelector("[data-map-legend]");
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

    if (mapLegend && Array.isArray(pageData.legend) && pageData.legend.length > 0) {
      mapLegend.replaceChildren();

      pageData.legend.forEach(function (legendItem) {
        const item = document.createElement("span");
        const marker = document.createElement("span");
        const label = document.createElement("span");

        item.className = "map-legend__item";
        marker.className =
          "map-legend__marker map-legend__marker--" +
          (legendItem.markerStyle === "gold" ? "gold" : "blue");
        marker.setAttribute("aria-hidden", "true");
        label.textContent = legendItem.label;
        item.append(marker, label);
        mapLegend.appendChild(item);
      });

      mapLegend.hidden = false;
    }

    const visibleCountries = Array.isArray(countries)
      ? countries.filter(function (country) {
          return country.visible && hasValidCountryCoordinates(country);
        })
      : [];

    // 优先使用 3D 地球；Cesium 未加载（如离线）时回退到原 SVG 平面地图。
    const globeRendered =
      visibleCountries.length > 0 &&
      renderGlobeMap(mapContent, configuration, visibleCountries);

    if (!globeRendered) {
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
    }

    if (mapEmptyState && visibleCountries.length === 0) {
      mapEmptyState.textContent = pageData.emptyStateText;
      mapEmptyState.hidden = false;
    }

    page.replaceChildren(mapContent);
  }

  /**
   * 创建 3D 地球（Cesium）并添加国家节点。
   * 使用高分辨率卫星影像；点击国家后镜头飞到该国，卫星影像保持清晰。
   * @returns {boolean} 是否成功创建地球
   */
  function renderGlobeMap(mapContent, configuration, countries) {
    if (!window.Cesium || !Array.isArray(countries)) {
      return false;
    }

    const stage = mapContent.querySelector(".world-map-stage");
    const mapImage = mapContent.querySelector("[data-map-image]");
    const mapOverlay = mapContent.querySelector("[data-map-overlay]");

    if (!stage) {
      return false;
    }

    const Cesium = window.Cesium;
    const interactionType = configuration.interactionType || "project";
    const isFuture = interactionType === "future";
    let globeEl = null;
    let viewer = null;

    try {
      globeEl = document.createElement("div");
      globeEl.className = "world-map-globe";

      /* 影像分层（从下到上）：
       * 1. EOX 全球卫星影像：免费、覆盖全球，作为最终兜底；
       * 2. Esri 全球影像：清晰度较高（最高 z=19）；
       * 3. 谷歌高清卫星影像（国内可用镜像）：主底图，最清晰（最高 z=20）。
       * 上层瓦片加载失败时，Cesium 自动显示下一层，避免地球变灰。 */
      var fallbackProvider = new Cesium.UrlTemplateImageryProvider({
        url: "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
        maximumLevel: 16,
        credit: new Cesium.Credit(
          "Sentinel-2 cloudless by EOX — CC BY 4.0"
        )
      });
      var esriProvider = new Cesium.UrlTemplateImageryProvider({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maximumLevel: 19,
        credit: new Cesium.Credit(
          "Esri, Maxar, Earthstar Geographics, and the GIS User Community"
        )
      });
      var googleProvider = new Cesium.UrlTemplateImageryProvider({
        url: "https://gac-geo.googlecnapps.club/maps/vt?lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}",
        maximumLevel: 20,
        credit: new Cesium.Credit(
          "Google 卫星影像"
        )
      });
      viewer = new Cesium.Viewer(globeEl, {
        baseLayer: new Cesium.ImageryLayer(fallbackProvider),
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false
      });
      viewer.imageryLayers.addImageryProvider(esriProvider);
      viewer.imageryLayers.addImageryProvider(googleProvider);

      viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString(
        "#b7d2e8"
      );
      /* 最小缩放距离：原为 12 万米（120 公里），导致放大到一定程度后无法继续放大；
       * 调小后允许镜头贴近地面。影像最高约 z=19，距离再近画面会变模糊，属数据限制。 */
      viewer.scene.screenSpaceCameraController.minimumZoomDistance =
        500;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance =
        50000000;
      globeEl.__globeViewer = viewer;
    } catch (error) {
      console.warn("3D 地球创建失败，回退到平面地图：", error);
      return false;
    }

    // 地球创建成功后再替换平面地图 DOM。
    if (mapImage) {
      mapImage.remove();
    }
    if (mapOverlay) {
      mapOverlay.remove();
    }
    stage.classList.add("world-map-stage--globe");
    stage.appendChild(globeEl);

    // 初始视角：亚洲及周边。
    try {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(75, 18, 28000000),
        duration: 0
      });
    } catch (error) {
      // 初始视角失败不影响节点渲染。
    }

    const entityMap = {};
    const goldColor = Cesium.Color.fromCssColorString("#e8b43a");
    const blueColor = Cesium.Color.fromCssColorString("#3f8cff");
    const labelBg = Cesium.Color.fromCssColorString("#0a1f3d").withAlpha(
      0.6
    );

    countries.forEach(function (country) {
      const id = "node-" + country.id;
      const color =
        isFuture && country.markerStyle === "blue"
          ? blueColor
          : goldColor;

      try {
        viewer.entities.add({
          id: id,
          position: Cesium.Cartesian3.fromDegrees(
            country.longitude,
            country.latitude,
            0
          ),
          point: {
            pixelSize: 12,
            color: color,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          },
          label: {
            text: country.countryName,
            font: "600 14px 'Microsoft YaHei', Arial, sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.fromCssColorString("#0a1f3d"),
            outlineWidth: 4,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -24),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            showBackground: true,
            backgroundColor: labelBg,
            backgroundPadding: new Cesium.Cartesian2(8, 6)
          }
        });
        entityMap[id] = {
          country: country,
          interactionType: interactionType
        };
      } catch (error) {
        console.warn("国家节点创建失败：" + country.countryName, error);
      }
    });

    const clickHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );
    clickHandler.setInputAction(function (click) {
      let picked = null;
      try {
        picked = viewer.scene.pick(click.position);
      } catch (error) {
        return;
      }
      if (!picked || !picked.id) {
        return;
      }
      const info = entityMap[picked.id.id];
      if (!info) {
        return;
      }
      flyGlobeToCountry(viewer, info.country);
      if (info.interactionType === "future") {
        openFutureOutlookModal(info.country, null);
      } else {
        openProjectModal(info.country);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    globeViewers.push(viewer);

    const page = document.getElementById(configuration.pageId);
    if (page && !page.hidden && typeof viewer.resize === "function") {
      viewer.resize();
    }
    return true;
  }

  /** 将 3D 地球镜头飞到指定国家，卫星影像在该层级保持清晰。 */
  function flyGlobeToCountry(viewer, country) {
    if (!viewer || !country) {
      return;
    }
    try {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          country.longitude,
          country.latitude,
          2200000
        ),
        duration: 1.6
      });
    } catch (error) {
      console.warn("镜头飞行失败：", error);
    }
  }

  /** 海外项目建设与双千亿计划继续共用公共地图渲染。 */
  function renderAllMapPages() {
    const mapConfigurations = [
      {
        pageId: "projects-page",
        pageData: websiteData.overseasProjectsPage,
        countries: websiteData.overseasProjects
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

    // 3D 地球所在的页面从隐藏变为显示后，画布尺寸需要重新计算。
    globeViewers.forEach(function (viewer) {
      if (viewer && typeof viewer.resize === "function") {
        viewer.resize();
      }
    });

    // 科技赋能页面使用固定 hash，确保从独立平台直接返回时能恢复该栏目。
    if (window.history && typeof window.history.replaceState === "function") {
      try {
        if (targetPageId === "tech-page") {
          if (window.location.hash !== "#tech-empowerment") {
            window.history.replaceState(null, "", "#tech-empowerment");
          }
        } else if (window.location.hash === "#tech-empowerment") {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      } catch (error) {
        // 部分 file:// 环境限制 History API；hash 本身仍可作为安全回退。
        window.location.hash = targetPageId === "tech-page" ? "tech-empowerment" : "";
      }
    }

    // 所有页面共用同一套导航；导览页使用透明叠加样式并隐藏“返回导览”。
    if (siteHeader) {
      siteHeader.hidden = false;
      siteHeader.classList.toggle("site-header--guide", targetPageId === "guide-page");
    }

    if (backGuideButton) {
      backGuideButton.hidden = targetPageId === "guide-page";
    }

    // 首页轮播仅在导览页可见时运行，离开页面后停止并清理恢复计时器。
    if (targetPageId === "guide-page") {
      startHomeHeroCarousel();
    } else {
      stopHomeHeroCarousel();
      clearHomeHeroResumeTimer();
    }

    // 矿业页面不自动轮播；离开时只清理尚未完成的拖动和切换计时器。
    if (targetPageId !== "mining-page") {
      stopMiningCarouselMotion();
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
   * 根据 data.js 创建顶部栏目按钮。
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
   * 根据 data.js 中的数据创建导览入口按钮。
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

  fillHomeHero();
  bindHomeHeroEvents();
  fillCompanyProfile();
  fillTechEmpowerment();
  bindTechCarouselEvents();
  fillMiningShowcase();
  bindMiningCarouselEvents();
  renderAllMapPages();
  createGuideEntries();
  createTopNavigation();
  showPage(
    window.location.hash === "#tech-empowerment" ? "tech-page" : "guide-page"
  );

  window.addEventListener("hashchange", function () {
    if (window.location.hash === "#tech-empowerment") {
      showPage("tech-page");
    }
  });

  // 使用事件委托统一处理导览入口，兼容鼠标和触摸点击。
  if (guideEntries) {
    guideEntries.addEventListener("click", function (event) {
      const entryButton = event.target.closest(".guide-entry");

      if (!entryButton || !guideEntries.contains(entryButton)) {
        return;
      }

      showPage(entryButton.dataset.pageTarget);
    });
  }

  // 顶部栏目按钮统一切换页面。
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

  if (futureBusinessTabs) {
    futureBusinessTabs.addEventListener("click", function (event) {
      const tab = event.target.closest(".future-business-tab");
      if (tab && futureBusinessTabs.contains(tab)) {
        selectFutureBusiness(tab.dataset.businessType);
      }
    });
  }

  if (futureMineralTabs) {
    futureMineralTabs.addEventListener("click", function (event) {
      const tab = event.target.closest(".future-mineral-tab");
      if (tab && futureMineralTabs.contains(tab)) {
        renderFutureMineral(Number(tab.dataset.mineralIndex));
      }
    });
  }

  if (futureProjectStatusTabs) {
    futureProjectStatusTabs.addEventListener("click", function (event) {
      const tab = event.target.closest(".future-project-status-tab");
      if (tab && futureProjectStatusTabs.contains(tab)) {
        renderFutureProjectStatus(tab.dataset.projectStatus, 0);
      }
    });
  }

  if (futureProjectList) {
    futureProjectList.addEventListener("click", function (event) {
      const item = event.target.closest(".future-project-item");
      if (item && futureProjectList.contains(item)) {
        renderFutureProjectStatus(
          activeFutureProjectStatus,
          Number(item.dataset.projectIndex)
        );
      }
    });
  }

  if (futureMineralMedia) {
    futureMineralMedia.addEventListener("click", openFutureImageLightbox);
  }

  if (futureImageLightboxClose) {
    futureImageLightboxClose.addEventListener("click", closeFutureImageLightbox);
  }

  if (futureImageLightbox) {
    futureImageLightbox.addEventListener("click", function (event) {
      if (event.target === futureImageLightbox) {
        closeFutureImageLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    if (futureImageLightbox && !futureImageLightbox.hidden) {
      closeFutureImageLightbox();
    } else if (futureModal && !futureModal.hidden) {
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
