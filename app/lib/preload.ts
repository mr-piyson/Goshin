/** Load and decode an image so it can be painted without a pop-in. */
export function preloadImage(src: string, timeoutMs = 700): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(ok);
    };
    const timeout = window.setTimeout(() => finish(false), timeoutMs);
    const image = new Image();
    image.onload = () => {
      if (typeof image.decode === "function") {
        void image.decode().then(
          () => finish(true),
          () => finish(true),
        );
      } else {
        finish(true);
      }
    };
    image.onerror = () => finish(false);
    image.src = src;
  });
}
