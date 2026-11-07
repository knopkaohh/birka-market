/** Jump to the top without smooth scrolling. Smooth scroll stalls on the homepage
 * because the hero height changes while the browser is still animating. */
export function scrollPageTop() {
  const html = document.documentElement;
  html.style.setProperty("overflow-anchor", "none");
  html.style.setProperty("scroll-behavior", "auto", "important");
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  window.setTimeout(() => {
    html.style.removeProperty("scroll-behavior");
    html.style.removeProperty("overflow-anchor");
  }, 80);
}
