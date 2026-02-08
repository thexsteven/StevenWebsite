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
})();
