const views = Array.from(document.querySelectorAll("[data-view]"));
const navigation = document.querySelectorAll("nav a");

function showView(moveFocus) {
  const target = document.getElementById(window.location.hash.slice(1));
  const view = target?.closest("[data-view]") ?? views[0];

  for (const section of views) {
    section.hidden = section !== view;
  }

  const sectionHash = target?.id === "roles" || view.classList.contains("role-view")
    ? "#roles"
    : `#${view.id}`;
  for (const link of navigation) {
    if (link.hash === sectionHash) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    target.scrollIntoView({ block: "nearest" });
    if (moveFocus) target.querySelector("summary").focus({ preventScroll: true });
    return;
  }

  const heading = target?.matches("h1, h2") ? target : view.querySelector("h1, h2");
  if (target && target !== view) {
    target.scrollIntoView({ block: "start" });
  } else {
    window.scrollTo(0, 0);
  }
  if (moveFocus) heading.focus({ preventScroll: true });
}

showView(false);
window.addEventListener("hashchange", () => showView(true));
