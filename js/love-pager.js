(() => {
  const CHAPTERS = [
    { id: 'prolog',     label: 'Prolog',      file: 'prolog.html' },
    { id: 'kapitel-01', label: 'Kapitel 01',  file: 'kapitel-01.html' },
    { id: 'kapitel-02', label: 'Kapitel 02',  file: 'kapitel-02.html' },
    { id: 'kapitel-03', label: 'Kapitel 03',  file: 'kapitel-03.html' },
    { id: 'kapitel-04', label: 'Kapitel 04',  file: 'kapitel-04.html' },
    { id: 'epilog',     label: 'Epilog',      file: 'epilog.html' },
  ];
  const DIR_KEY = 'love_page_dir';
  const TRANSITION_MS = 320;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chapter-content');
    if (!container) return;
    const current = container.dataset.chapterFile;
    const idx = CHAPTERS.findIndex((c) => c.id === current);
    if (idx < 0) return;

    const prev = CHAPTERS[idx - 1] || null;
    const next = CHAPTERS[idx + 1] || null;

    const enterDir = sessionStorage.getItem(DIR_KEY);
    if (enterDir && !reduceMotion) {
      sessionStorage.removeItem(DIR_KEY);
      document.body.classList.add(enterDir === 'next' ? 'page-enter-next' : 'page-enter-prev');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.classList.add('page-enter-active');
        });
      });
      setTimeout(() => {
        document.body.classList.remove('page-enter-next', 'page-enter-prev', 'page-enter-active');
      }, TRANSITION_MS + 60);
    }

    const navigate = (href, direction) => {
      if (reduceMotion) {
        window.location.href = href;
        return;
      }
      sessionStorage.setItem(DIR_KEY, direction);
      document.body.classList.add(direction === 'next' ? 'page-leave-next' : 'page-leave-prev');
      setTimeout(() => { window.location.href = href; }, TRANSITION_MS);
    };

    const mountPager = () => {
      if (document.querySelector('.story-pager')) return;

      const pager = document.createElement('nav');
      pager.className = 'story-pager';
      pager.setAttribute('aria-label', 'Kapitelnavigation');

      const prevHtml = prev
        ? `<a class="story-pager-link story-pager-prev" href="${prev.file}" data-dir="prev" rel="prev">
             <span class="story-pager-arrow" aria-hidden="true">←</span>
             <span class="story-pager-meta">
               <span class="story-pager-hint">Zurück</span>
               <span class="story-pager-label">${escapeHtml(prev.label)}</span>
             </span>
           </a>`
        : `<span class="story-pager-placeholder" aria-hidden="true"></span>`;

      const nextHtml = next
        ? `<a class="story-pager-link story-pager-next" href="${next.file}" data-dir="next" rel="next">
             <span class="story-pager-meta">
               <span class="story-pager-hint">Weiter</span>
               <span class="story-pager-label">${escapeHtml(next.label)}</span>
             </span>
             <span class="story-pager-arrow" aria-hidden="true">→</span>
           </a>`
        : `<span class="story-pager-placeholder" aria-hidden="true"></span>`;

      pager.innerHTML = `
        ${prevHtml}
        <span class="story-pager-progress" aria-label="Seite ${idx + 1} von ${CHAPTERS.length}">${idx + 1} / ${CHAPTERS.length}</span>
        ${nextHtml}
      `;

      const host = container.closest('.story-detail') || container.parentElement;
      host.appendChild(pager);

      pager.querySelectorAll('a[data-dir]').forEach((link) => {
        link.addEventListener('click', (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          navigate(link.getAttribute('href'), link.dataset.dir);
        });
      });
    };

    document.addEventListener('keydown', (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (document.querySelector('.love-modal-overlay.is-open')) return;
      if (e.key === 'ArrowRight' && next) { e.preventDefault(); navigate(next.file, 'next'); }
      else if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); navigate(prev.file, 'prev'); }
    });

    if (container.classList.contains('is-loaded')) {
      mountPager();
    } else {
      const obs = new MutationObserver(() => {
        if (container.classList.contains('is-loaded')) {
          obs.disconnect();
          mountPager();
        }
      });
      obs.observe(container, { attributes: true, attributeFilter: ['class'] });
    }
  });
})();
