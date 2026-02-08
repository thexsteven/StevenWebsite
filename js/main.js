(() => {
  const badge = document.querySelector(".hero-badge");
  if (!badge) return;

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
})();
