export function UiFallbackScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  function ready() {
    return document.documentElement.getAttribute("data-ui-ready") === "1";
  }
  function menuOpen(open) {
    var menu = document.getElementById("side-menu");
    var overlay = document.querySelector(".side-overlay");
    var toggle = document.querySelector(".menu-toggle");
    if (menu) menu.classList.toggle("is-open", open);
    if (overlay) overlay.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  function calcOpen(open) {
    var overlay = document.getElementById("quick-calc-overlay");
    var button = document.querySelector(".quick-cta");
    if (overlay) overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("quick-calc-open", open);
    if (button) button.setAttribute("aria-expanded", open ? "true" : "false");
  }
  document.addEventListener("click", function (event) {
    if (ready()) return;
    var target = event.target;
    if (!target || !target.closest) return;
    if (target.closest(".menu-toggle")) {
      event.preventDefault();
      var menu = document.getElementById("side-menu");
      menuOpen(!(menu && menu.classList.contains("is-open")));
      return;
    }
    if (target.closest(".side-menu-close") || target.closest(".side-overlay")) {
      event.preventDefault();
      menuOpen(false);
      return;
    }
    var arrow = target.closest(".side-menu-arrow");
    if (arrow) {
      event.preventDefault();
      var item = arrow.closest(".side-menu-item");
      if (!item) return;
      var submenu = item.querySelector(".side-submenu");
      var row = item.querySelector(".side-menu-row");
      var willOpen = submenu && !submenu.classList.contains("is-open");
      if (submenu) submenu.classList.toggle("is-open", !!willOpen);
      arrow.classList.toggle("is-open", !!willOpen);
      if (row) row.classList.toggle("is-active", !!willOpen);
      arrow.setAttribute("aria-expanded", willOpen ? "true" : "false");
      return;
    }
    if (target.closest(".quick-cta")) {
      event.preventDefault();
      calcOpen(true);
      var name = document.querySelector("#quick-calc-overlay input[name='name']");
      if (name) name.focus();
      return;
    }
    if (target.closest(".quick-calc-close") || target.id === "quick-calc-overlay") {
      event.preventDefault();
      calcOpen(false);
    }
  });
  document.addEventListener("keydown", function (event) {
    if (ready()) return;
    if (event.key !== "Escape") return;
    menuOpen(false);
    calcOpen(false);
  });
  document.addEventListener("submit", function (event) {
    if (ready()) return;
    var form = event.target && event.target.closest ? event.target.closest("#quick-calc-overlay form") : null;
    if (!form) return;
    event.preventDefault();
    var data = new FormData(form);
    data.set("page", location.pathname);
    data.set("quick", "1");
    fetch("/api/lead", { method: "POST", body: data })
      .then(function (response) {
        if (response.ok) location.assign("/spasibo");
      })
      .catch(function () {});
  });
})();
        `.trim(),
      }}
    />
  );
}
