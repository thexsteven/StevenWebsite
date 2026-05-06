declare global {
  interface Window {
    google?: any;
  }
}

let loaderPromise: Promise<any> | null = null;

export function loadGoogleMaps(): Promise<any> {
  if (typeof window === 'undefined') {
    return Promise.reject(
      new Error('Google Maps can only be loaded in the browser')
    );
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  if (loaderPromise) return loaderPromise;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey) {
    return Promise.reject(
      new Error('NEXT_PUBLIC_GOOGLE_MAPS_KEY is not set')
    );
  }

  loaderPromise = new Promise<any>((resolve, reject) => {
    const callbackName = `__googleMapsCallback_${Date.now()}__`;
    const w = window as unknown as Record<string, unknown>;

    w[callbackName] = () => {
      delete w[callbackName];
      if (window.google?.maps) {
        resolve(window.google);
      } else {
        reject(
          new Error('Google Maps loaded but window.google.maps is missing')
        );
      }
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete w[callbackName];
      loaderPromise = null;
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });

  return loaderPromise;
}

export {};
