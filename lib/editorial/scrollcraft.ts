type Engine = { mount: (root: HTMLElement) => unknown; instances: unknown[] };

declare global {
  interface Window { ScrollCraft?: Engine }
}

// The supplied engine has no destroy API. Scope its resources without editing it.
export function mountScrollcraft(source: string, root: HTMLElement) {
  let active = true;
  const frames = new Set<number>();
  const timers = new Set<number>();
  const observers: IntersectionObserver[] = [];
  const removeListeners: (() => void)[] = [];
  const controller = new AbortController();
  const urls: string[] = [];
  const requestFrame = (callback: FrameRequestCallback) => {
    if (!active) return 0;
    const id = requestAnimationFrame((time) => {
      frames.delete(id);
      if (active) callback(time);
    });
    frames.add(id);
    return id;
  };
  const listen = (type: string, callback: EventListener, options?: AddEventListenerOptions) => {
    window.addEventListener(type, callback, options);
    removeListeners.push(() => window.removeEventListener(type, callback, options));
  };
  class ScopedObserver extends IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      super((entries, observer) => { if (active) callback(entries, observer); }, options);
      observers.push(this);
    }
  }
  const timeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(() => { timers.delete(id); if (active) callback(); }, delay);
    timers.add(id);
    return id;
  };
  const scopedURL = { createObjectURL: (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    urls.push(url);
    return url;
  } };
  const run = new Function('window', 'addEventListener', 'requestAnimationFrame',
    'IntersectionObserver', 'setTimeout', 'fetch', 'URL', source);
  run(window, listen, requestFrame, ScopedObserver, timeout,
    (url: string) => fetch(url, { signal: controller.signal }), scopedURL);
  window.ScrollCraft?.mount(root);

  const peak = root.querySelector<HTMLElement>('[data-sc-fall]');
  const line = peak?.querySelector<HTMLElement>('.fall-line');
  const windowFrame = peak?.querySelector<HTMLElement>('.fall-window');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = () => {
    if (peak && line && windowFrame) {
      const rect = peak.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const p = reduced ? 1 : Number(getComputedStyle(peak).getPropertyValue('--sc-p')) || 0;
        const angle = p * 90;
        const scale = 0.72 + p * 0.28;
        line.style.transform = `rotate(${angle.toFixed(2)}deg)`;
        windowFrame.style.transform = `scale(${scale.toFixed(3)})`;
        windowFrame.style.clipPath = `inset(0 ${(12 * (1 - p)).toFixed(2)}%)`;
        peak.dataset.scVerifyState = `${angle.toFixed(1)}:${scale.toFixed(3)}`;
      }
    }
    if (!reduced && peak) requestFrame(draw);
  };
  draw();
  return () => {
    active = false;
    controller.abort();
    frames.forEach(cancelAnimationFrame);
    timers.forEach(clearTimeout);
    observers.forEach((observer) => observer.disconnect());
    removeListeners.forEach((remove) => remove());
    urls.forEach(URL.revokeObjectURL);
    root.querySelectorAll('video').forEach((video) => { video.pause(); video.removeAttribute('src'); video.load(); });
    if (window.ScrollCraft) window.ScrollCraft.instances.length = 0;
    document.documentElement.classList.remove('sc-ready');
  };
}
