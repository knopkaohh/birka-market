"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Наверх"
      onClick={() => {
        const html = document.documentElement;
        html.style.setProperty("overflow-anchor", "none");
        html.style.setProperty("scroll-behavior", "auto", "important");
        html.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
        document.querySelector<HTMLElement>(".logo")?.focus({ preventScroll: true });
        window.setTimeout(() => {
          html.style.removeProperty("scroll-behavior");
          html.style.removeProperty("overflow-anchor");
        }, 100);
      }}
    >
      Наверх ↑
    </button>
  );
}
