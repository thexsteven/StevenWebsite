(() => {
  const LOVE_KEY = 'QWRlbGluYQ=='; // btoa('Adelina')

  // Already unlocked in this session – nothing to do
  if (sessionStorage.getItem('love_unlocked') === '1') return;

  // Hide page content until auth is confirmed
  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.visibility = '';

    const overlay = document.createElement('div');
    overlay.className = 'love-modal-overlay is-open';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'love-guard-title');
    overlay.innerHTML = `
      <div class="love-modal">
        <span class="love-modal-icon" aria-hidden="true">🔒</span>
        <h2 id="love-guard-title">Private Sektion</h2>
        <p class="love-modal-sub">Diese Seite ist passwortgeschützt.</p>
        <input
          type="password"
          id="love-guard-input"
          class="love-password-input"
          placeholder="Passwort …"
          autocomplete="off"
          aria-label="Passwort für Unsere Geschichte"
        />
        <p class="love-modal-error" id="love-guard-error" role="alert" aria-live="polite"></p>
        <div class="love-modal-actions">
          <button class="btn" id="love-guard-submit">Entsperren</button>
          <button class="btn btn-ghost" id="love-guard-cancel">Zurück</button>
        </div>
        <p class="love-modal-hint">Tipp: L → O → V → E auf der Hauptseite</p>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('love-guard-input');
    const error = document.getElementById('love-guard-error');

    setTimeout(() => input && input.focus(), 120);

    const check = () => {
      if (!input) return;
      if (btoa(input.value) === LOVE_KEY) {
        sessionStorage.setItem('love_unlocked', '1');
        overlay.remove();
      } else {
        input.classList.add('is-error');
        if (error) error.textContent = 'Falsches Passwort – versuch es nochmal.';
        setTimeout(() => input.classList.remove('is-error'), 500);
        input.value = '';
        input.focus();
      }
    };

    const goBack = () => { window.location.href = '../../index.html'; };

    document.getElementById('love-guard-submit')?.addEventListener('click', check);
    document.getElementById('love-guard-cancel')?.addEventListener('click', goBack);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter')  check();
      if (e.key === 'Escape') goBack();
    });
  });
})();
