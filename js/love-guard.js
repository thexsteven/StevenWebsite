(() => {
  const SESSION_KEY = 'love_key';
  const ENC_BASE = '../../encrypted/';

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('chapter-content');
    if (!container) return;
    const file = container.dataset.chapterFile;
    if (!file) return;
    const url = ENC_BASE + file + '.enc';

    const tryDecrypt = async (pw) => window.LoveCrypto.fetchAndDecrypt(pw, url);

    const renderHtml = (html) => {
      container.innerHTML = html;
      container.classList.add('is-loaded');
    };

    const sessionPw = sessionStorage.getItem(SESSION_KEY);
    if (sessionPw) {
      try {
        const html = await tryDecrypt(sessionPw);
        renderHtml(html);
        return;
      } catch (_) {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }

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
          aria-label="Passwort"
        />
        <p class="love-modal-error" id="love-guard-error" role="alert" aria-live="polite"></p>
        <div class="love-modal-actions">
          <button class="btn" id="love-guard-submit" type="button">Entsperren</button>
          <button class="btn btn-ghost" id="love-guard-cancel" type="button">Zurück</button>
        </div>
        <p class="love-modal-hint">Tipp: L → O → V → E auf der Hauptseite</p>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById('love-guard-input');
    const error = document.getElementById('love-guard-error');
    const submit = document.getElementById('love-guard-submit');
    const cancel = document.getElementById('love-guard-cancel');

    setTimeout(() => input && input.focus(), 120);

    const setBusy = (busy) => {
      if (!submit) return;
      submit.disabled = busy;
      submit.textContent = busy ? 'Prüfe …' : 'Entsperren';
    };

    const showError = (msg) => {
      if (!input) return;
      input.classList.add('is-error');
      if (error) error.textContent = msg;
      setTimeout(() => input.classList.remove('is-error'), 500);
      input.value = '';
      input.focus();
    };

    const check = async () => {
      if (!input || !input.value) return;
      const pw = input.value;
      setBusy(true);
      try {
        const html = await tryDecrypt(pw);
        sessionStorage.setItem(SESSION_KEY, pw);
        overlay.remove();
        renderHtml(html);
      } catch (_) {
        showError('Falsches Passwort – versuch es nochmal.');
      } finally {
        setBusy(false);
      }
    };

    const goBack = () => { window.location.href = '../../index.html'; };

    submit && submit.addEventListener('click', check);
    cancel && cancel.addEventListener('click', goBack);
    input && input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') check();
      if (e.key === 'Escape') goBack();
    });
  });
})();
