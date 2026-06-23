/* ============================================================================
   FOR THE LOVE — interactions
   All content below marked REPLACE is placeholder data. Edit these two arrays
   to populate the collection grid and the music tracklist — everything else
   (search, likes, layout) updates automatically.
============================================================================ */

/* -------------------------------------------------------- REPLACE: CONTENT */
// Each item: { name, price, tag } — tag is the small red corner label.
const COLLECTION = [
  { name: "[ ITEM 01 — REPLACE ]", price: "[ $000 ]", tag: "New" },
  { name: "[ ITEM 02 — REPLACE ]", price: "[ $000 ]", tag: "" },
  { name: "[ ITEM 03 — REPLACE ]", price: "[ $000 ]", tag: "Limited" },
  { name: "[ ITEM 04 — REPLACE ]", price: "[ $000 ]", tag: "" },
  { name: "[ ITEM 05 — REPLACE ]", price: "[ $000 ]", tag: "" },
  { name: "[ ITEM 06 — REPLACE ]", price: "[ $000 ]", tag: "New" },
];

// Each track: { title, time }
const TRACKS = [
  { title: "[ TRACK 01 — REPLACE ]", time: "0:00" },
  { title: "[ TRACK 02 — REPLACE ]", time: "0:00" },
  { title: "[ TRACK 03 — REPLACE ]", time: "0:00" },
  { title: "[ TRACK 04 — REPLACE ]", time: "0:00" },
  { title: "[ TRACK 05 — REPLACE ]", time: "0:00" },
];
/* ------------------------------------------------------------------------- */

// Minimal geometric bird silhouette (swallow in flight). Fill = currentColor.
const BIRD_SVG =
  '<svg viewBox="0 0 64 64" aria-hidden="true">' +
  '<path fill="currentColor" d="M32 41 C26 31 16 23 4 19 C16 25 24 33 30 41 L28 53 L32 48 L36 53 L34 41 ' +
  'C40 33 48 25 60 19 C48 23 38 31 32 41 Z"/></svg>';

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  renderCollection();
  renderTracks();
  initBird();
  initLikes();
  initSearch();
  initNav();
  initForms();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------- rendering */
function renderCollection() {
  const grid = document.getElementById("collectionGrid");
  grid.innerHTML = COLLECTION.map((item) => `
    <article class="card" data-name="${escapeAttr(item.name)}">
      <div class="card__media">
        ${item.tag ? `<span class="card__tag">${escapeHtml(item.tag)}</span>` : ""}
        <!-- REPLACE: product image -->
        <span class="asset-slot">[ IMAGE — REPLACE ]</span>
      </div>
      <div class="card__body">
        <span class="card__name">${escapeHtml(item.name)}</span>
        <span class="card__price">${escapeHtml(item.price)}</span>
        <button class="like" type="button" aria-pressed="false"
                aria-label="Like ${escapeAttr(item.name)}" data-bird>♡</button>
      </div>
    </article>`).join("");
}

function renderTracks() {
  const list = document.getElementById("tracklist");
  list.innerHTML = TRACKS.map((track, i) => `
    <li class="track" data-title="${escapeAttr(track.title)}">
      <span class="track__num">${String(i + 1).padStart(2, "0")}</span>
      <span class="track__title">${escapeHtml(track.title)}</span>
      <span class="track__time">${escapeHtml(track.time)}</span>
      <button class="track__play" type="button" aria-label="Play ${escapeAttr(track.title)}" data-bird>▶</button>
    </li>`).join("");
}

/* ------------------------------------------------------------- bird effect */
function initBird() {
  const layer = document.getElementById("birdLayer");
  if (!layer) return;

  // Delegate: any element carrying [data-bird] releases a bird on click.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-bird]");
    if (!trigger) return;
    releaseBird(e.clientX, e.clientY, trigger);
  });
}

function releaseBird(x, y, fromEl) {
  if (reduceMotion) return;
  const layer = document.getElementById("birdLayer");

  // White bird when released over a dark section, red otherwise.
  const onDark = fromEl && fromEl.closest(".section--dark, .footer");

  const bird = document.createElement("span");
  bird.className = "bird" + (onDark ? " bird--light" : "");
  bird.style.left = x + "px";
  bird.style.top = y + "px";
  bird.innerHTML = BIRD_SVG;
  layer.appendChild(bird);
  bird.addEventListener("animationend", () => bird.remove());
}

/* -------------------------------------------------------------- like state */
function initLikes() {
  const counter = document.getElementById("likesCounter");
  let likes = 0;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".like");
    if (!btn) return;
    const liked = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!liked));
    btn.textContent = liked ? "♡" : "♥";
    likes += liked ? -1 : 1;
    counter.textContent = `${likes > 0 ? "♥" : "♡"} Likes (${likes})`;
  });
}

/* ----------------------------------------------------------------- search */
function initSearch() {
  const toggle = document.getElementById("searchToggle");
  const panel = document.getElementById("searchPanel");
  const input = document.getElementById("searchInput");
  const hint = document.getElementById("searchHint");

  toggle.addEventListener("click", () => {
    const open = panel.hidden === false;
    panel.hidden = open;
    toggle.setAttribute("aria-expanded", String(!open));
    if (!open) input.focus();
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();

    const cards = [...document.querySelectorAll("#collectionGrid .card")];
    const tracks = [...document.querySelectorAll("#tracklist .track")];

    const cardMatches = filterNodes(cards, "name", q);
    const trackMatches = filterNodes(tracks, "title", q);

    document.getElementById("collectionEmpty").hidden = cardMatches !== 0;
    document.getElementById("musicEmpty").hidden = trackMatches !== 0;

    hint.textContent = q ? `${cardMatches + trackMatches} result(s)` : "";
  });
}

// Hides nodes whose data-[key] doesn't include the query; returns match count.
function filterNodes(nodes, key, q) {
  let matches = 0;
  nodes.forEach((node) => {
    const hit = !q || (node.dataset[key] || "").toLowerCase().includes(q);
    node.style.display = hit ? "" : "none";
    if (hit) matches++;
  });
  return matches;
}

/* ------------------------------------------------------------------- nav */
function initNav() {
  const nav = document.getElementById("nav");
  const links = [...document.querySelectorAll(".nav__link")];
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav__links");

  // Shadow/accent state once scrolled past the top.
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Active link highlighting via the section currently in view.
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const byId = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("is-active"));
        const active = byId.get(entry.target.id);
        if (active) active.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));

  // Mobile menu toggle.
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  // Close the mobile menu after choosing a destination.
  links.forEach((l) =>
    l.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ------------------------------------------------------- demo-only forms */
function initForms() {
  const contact = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!contact.checkValidity()) {
      contactStatus.textContent = "Please complete all fields. (Demo)";
      return;
    }
    // DEMO ONLY — no data is sent. Wire this to a backend / form service.
    contactStatus.textContent = "Message sent — DEMO ONLY (replace with backend).";
    contact.reset();
  });

  const news = document.getElementById("newsForm");
  const newsStatus = document.getElementById("newsStatus");
  news.addEventListener("submit", (e) => {
    e.preventDefault();
    // DEMO ONLY — wire to a real newsletter service.
    newsStatus.textContent = "Subscribed — DEMO ONLY.";
    news.reset();
  });
}

/* ---------------------------------------------------------------- helpers */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
function escapeAttr(str) {
  return escapeHtml(str);
}
