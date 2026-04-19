(() => {
  /* =========================================
	 Story Video Loader
	 Lädt Videos automatisch wenn data-video gesetzt ist
	 ========================================= */
  const setupStoryVideos = () => {
    const videoContainers = document.querySelectorAll(".story-video");

    videoContainers.forEach((container) => {
      const videoSrc = container.dataset.video;
      const video = container.querySelector("video");
      const placeholder = container.querySelector(".story-video-placeholder");

      if (videoSrc && video && placeholder) {
        // Video-Quelle setzen
        video.querySelector("source").src = videoSrc;
        video.load();

        // Video-Event-Listener
        video.addEventListener("loadeddata", () => {
          // Video geladen - Placeholder ausblenden
          placeholder.style.display = "none";
          video.style.display = "block";
        });

        video.addEventListener("error", () => {
          // Video konnte nicht geladen werden
          console.log("Video konnte nicht geladen werden:", videoSrc);
          // Placeholder bleibt sichtbar
        });

        // Auch prüfen ob Video nicht gefunden wurde
        video.addEventListener("emptied", () => {
          if (video.error) {
            placeholder.style.display = "flex";
            placeholder.querySelector(".video-sublabel").textContent =
              "Video nicht gefunden: " + videoSrc;
          }
        });
      }
    });
  };

  setupStoryVideos();

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

  /* =========================================
   Love Story – Keyboard-Sequenz + Passwort
   Shortcut: tippe L → O → V → E (außerhalb von Eingabefeldern)
   Passwort wird ueber AES-GCM-Decrypt eines Probe-Payloads validiert.
   Zum Aendern: LOVE_PW=NeuesPasswort npm run encrypt-love
   ========================================= */

  const LOVE_SESSION_KEY = 'love_key';
  const LOVE_PROBE_URL = 'encrypted/prolog.enc';
  const LOVE_SEQUENCE = ['l', 'o', 'v', 'e'];
  const loveBuffer = [];

  const loveOverlay = document.getElementById('love-modal');
  const loveSection = document.getElementById('love-story');
  const loveInput  = document.getElementById('love-password');
  const loveError  = document.getElementById('love-modal-error');
  const loveSubmit = document.getElementById('love-submit');
  const loveCancel = document.getElementById('love-cancel');

  const openLoveModal = () => {
    if (!loveOverlay) return;
    loveOverlay.classList.add('is-open');
    loveOverlay.removeAttribute('aria-hidden');
    setTimeout(() => loveInput && loveInput.focus(), 320);
  };

  const closeLoveModal = () => {
    loveOverlay && loveOverlay.classList.remove('is-open');
    loveOverlay && loveOverlay.setAttribute('aria-hidden', 'true');
    if (loveInput)  { loveInput.value = ''; loveInput.classList.remove('is-error'); }
    if (loveError)  { loveError.textContent = ''; }
    if (loveSubmit) { loveSubmit.disabled = false; loveSubmit.textContent = 'Entsperren'; }
  };

  const unlockLoveStory = () => {
    closeLoveModal();
    if (!loveSection) return;
    loveSection.classList.add('is-unlocked');
    loveSection.removeAttribute('aria-hidden');
    setTimeout(() => {
      loveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const setLoveBusy = (busy) => {
    if (!loveSubmit) return;
    loveSubmit.disabled = busy;
    loveSubmit.textContent = busy ? 'Prüfe …' : 'Entsperren';
  };

  const checkLovePassword = async () => {
    if (!loveInput || !loveInput.value) return;
    const pw = loveInput.value;
    setLoveBusy(true);
    try {
      await window.LoveCrypto.fetchAndDecrypt(pw, LOVE_PROBE_URL);
      sessionStorage.setItem(LOVE_SESSION_KEY, pw);
      unlockLoveStory();
    } catch (_) {
      loveInput.classList.add('is-error');
      if (loveError) loveError.textContent = 'Falsches Passwort – versuch es nochmal.';
      setTimeout(() => loveInput.classList.remove('is-error'), 500);
      loveInput.value = '';
      loveInput.focus();
    } finally {
      setLoveBusy(false);
    }
  };

  // Sequenz-Detektor (außerhalb von Eingabefeldern)
  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.repeat) return;
    const key = e.key.toLowerCase();
    if (key.length !== 1) return;

    loveBuffer.push(key);
    if (loveBuffer.length > LOVE_SEQUENCE.length) loveBuffer.shift();

    if (LOVE_SEQUENCE.every((v, i) => v === loveBuffer[i])) {
      loveBuffer.length = 0;
      openLoveModal();
    }
  });

  // Mobile-Trigger: 4x kurz hintereinander auf das Logo tippen
  const loveLogo = document.querySelector('.site-nav .logo');
  if (loveLogo) {
    let logoTaps = 0;
    let logoTapTimer = null;
    loveLogo.addEventListener('click', (e) => {
      logoTaps += 1;
      if (logoTapTimer) clearTimeout(logoTapTimer);
      if (logoTaps >= 4) {
        e.preventDefault();
        logoTaps = 0;
        openLoveModal();
        return;
      }
      logoTapTimer = setTimeout(() => { logoTaps = 0; }, 600);
    });
  }

  loveSubmit && loveSubmit.addEventListener('click', checkLovePassword);
  loveCancel && loveCancel.addEventListener('click', closeLoveModal);

  loveInput && loveInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')  checkLovePassword();
    if (e.key === 'Escape') closeLoveModal();
  });

  loveOverlay && loveOverlay.addEventListener('click', (e) => {
    if (e.target === loveOverlay) closeLoveModal();
  });

  // Auto-unlock if already authenticated in this session
  if (sessionStorage.getItem(LOVE_SESSION_KEY) && loveSection) {
    loveSection.classList.add('is-unlocked');
    loveSection.removeAttribute('aria-hidden');
    if (window.location.hash === '#love-story') {
      setTimeout(() => loveSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }
  }

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
