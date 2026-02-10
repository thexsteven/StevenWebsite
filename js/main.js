(() => {
  const badge = document.querySelector(".hero-badge");
  if (badge) {
    const secret = ["h", "i"]; // Tastenkombi: H + I
    const buffer = [];

    const revealBadge = () => {
      badge.classList.remove("is-hidden");
      badge.classList.add("is-visible");
    };

    document.addEventListener("keydown", (event) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (key.length !== 1) return;

      buffer.push(key);
      if (buffer.length > secret.length) {
        buffer.shift();
      }

      const matched = secret.every((value, index) => value === buffer[index]);
      if (matched) {
        revealBadge();
      }
    });
  }

  const sections = Array.from(document.querySelectorAll("main section"));
  sections.forEach((section) => section.classList.add("reveal"));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion && sections.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("is-visible"));
  }

  /* =========================================
	 Timeline Animation mit IntersectionObserver
	 ========================================= */

  const setupTimelineAnimation = () => {
    const timeline = document.querySelector(".timeline");
    if (!timeline) return;

    const items = timeline.querySelectorAll(".timeline-item");
    if (!items.length) return;

    // Reduced Motion Check
    if (prefersReducedMotion) {
      // Alle Items sofort sichtbar machen
      items.forEach((item) => item.classList.add("is-visible"));
      timeline.classList.add("is-active");
      return;
    }

    const updateTimelineLine = () => {
      let filledCount = 0;
      let totalHeight = 0;
      let filledHeight = 0;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        totalHeight +=
          rect.height + parseInt(getComputedStyle(timeline).gap) || 0;

        if (item.classList.contains("is-visible")) {
          filledCount = index + 1;
          filledHeight = 0;

          // Berechne wie weit das aktuelle Item bereits sichtbar ist
          const itemMiddle =
            rect.top + rect.height / 2 - timeline.getBoundingClientRect().top;
          if (rect.top < window.innerHeight / 2) {
            filledHeight = Math.max(0, itemMiddle);
          } else {
            filledHeight = totalHeight;
          }
        }
      });

      // Linien-Höhe in Prozent setzen
      const percentage =
        totalHeight > 0 ? (filledHeight / totalHeight) * 100 : 0;
      timeline.style.setProperty("--filled", `${Math.min(100, percentage)}%`);

      //Timeline aktivieren wenn erstes Item sichtbar
      if (filledCount > 0) {
        timeline.classList.add("is-active");
      }
    };

    // IntersectionObserver für einzelne Items
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            updateTimelineLine();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    items.forEach((item) => itemObserver.observe(item));

    // Scroll-Event für flüssige Linien-Animation
    window.addEventListener("scroll", updateTimelineLine, { passive: true });
    window.addEventListener("resize", updateTimelineLine);
    updateTimelineLine(); // Initiale Berechnung
  };

  // Timeline-Setup ausführen
  if (!prefersReducedMotion) {
    setupTimelineAnimation();
  } else {
    // Falls reduced motion, alle Items direkt sichtbar machen
    document.querySelectorAll(".timeline-item").forEach((item) => {
      item.classList.add("is-visible");
    });
    const timeline = document.querySelector(".timeline");
    if (timeline) timeline.classList.add("is-active");
  }

  const navLinks = Array.from(
    document.querySelectorAll('.site-nav a[href^="#"]'),
  );
  const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;
    let currentSection = navTargets[0];

    navTargets.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section;
      }
    });

    navLinks.forEach((link) => {
      const isActive =
        currentSection && link.getAttribute("href") === `#${currentSection.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if (navLinks.length && navTargets.length) {
    window.addEventListener("scroll", setActiveLink, { passive: true });
    window.addEventListener("load", setActiveLink);
    window.addEventListener("resize", setActiveLink);
    setActiveLink();
  }

  // Skills: Auto-Loop-Scroller (kontinuierlich nach rechts)
  const skillsSection = document.querySelector(".skills .section-body");
  const skillsTrack = document.querySelector(".skills-track");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (skillsSection && skillsTrack && !reduceMotion) {
    // 1) Karten duplizieren, damit ein nahtloser Loop entsteht
    const originalCards = Array.from(skillsTrack.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      skillsTrack.appendChild(clone);
    });

    // 2) Konstantes, sanftes Scrollen über requestAnimationFrame
    let scrollPosition = 0;
    const speed = 0.4; // px pro Frame (klein = ruhiger)
    const loopPoint = skillsTrack.scrollWidth / 2;
    let isPaused = false;

    // Pause scrolling when hovering over skill cards
    skillsTrack.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    skillsTrack.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    const step = () => {
      if (!isPaused) {
        scrollPosition += speed;
        if (scrollPosition >= loopPoint) {
          scrollPosition = 0;
        }
        skillsSection.scrollLeft = scrollPosition;
      }
      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }
})();
