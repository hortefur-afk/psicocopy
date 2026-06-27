/* ===================================================================
   PSICOCOPY™ — Lógica de la aplicación (vanilla JS, sin dependencias)
   =================================================================== */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  /* ---------- Refs ---------- */
  const cover      = $("#cover");
  const app        = $("#app");
  const nav        = $("#nav");
  const content    = $("#content");
  const breadcrumb = $("#breadcrumb");
  const searchInput= $("#searchInput");
  const sidebar    = $("#sidebar");
  const overlay    = $("#overlay");

  /* =================================================================
     PORTADA
     ================================================================= */
  function animateCounters() {
    $$(".stat strong[data-count]").forEach(node => {
      const target = +node.dataset.count;
      const dur = 1200; const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        node.textContent = Math.floor(p * target).toLocaleString("es") + (p === 1 ? "+" : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  animateCounters();

  function enterApp() {
    cover.classList.add("is-hidden");
    app.hidden = false;
    setTimeout(() => { cover.style.display = "none"; }, 600);
    if (!location.hash) navigate("inicio");
  }
  $("#startBtn").addEventListener("click", enterApp);

  /* =================================================================
     TEMA (oscuro / claro) — persistente
     ================================================================= */
  const THEME_KEY = "psicocopy-theme";
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  $("#themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cur);
    localStorage.setItem(THEME_KEY, cur);
  });

  /* =================================================================
     SIDEBAR (móvil)
     ================================================================= */
  const openMenu  = () => { sidebar.classList.add("is-open"); overlay.hidden = false; };
  const closeMenu = () => { sidebar.classList.remove("is-open"); overlay.hidden = true; };
  $("#openSidebar").addEventListener("click", openMenu);
  $("#closeSidebar").addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  /* =================================================================
     NAV — construido desde SECTIONS
     ================================================================= */
  function buildNav() {
    SECTIONS.forEach(sec => {
      const item = el("a", "nav__item");
      item.href = "#" + sec.id;
      item.dataset.id = sec.id;
      item.innerHTML = `<span class="nav__ico">${sec.icon}</span><span>${esc(sec.title)}</span>`;
      item.addEventListener("click", (e) => { e.preventDefault(); navigate(sec.id); closeMenu(); });
      nav.appendChild(item);
    });
  }

  function setActive(id) {
    $$(".nav__item", nav).forEach(n => n.classList.toggle("is-active", n.dataset.id === id));
  }

  /* =================================================================
     RENDER DE BLOQUES
     ================================================================= */
  function renderBlock(b) {
    switch (b.type) {
      case "head": {
        const h = el("div", "page-head");
        h.innerHTML =
          (b.kicker ? `<div class="kicker">${esc(b.kicker)}</div>` : "") +
          `<h1>${esc(b.title)}</h1>` +
          (b.lead ? `<p class="lead">${esc(b.lead)}</p>` : "");
        return h;
      }
      case "h2": return el("h2", null, esc(b.text));
      case "p":  return el("p", null, esc(b.text));
      case "quote": return el("div", "quote", esc(b.text));
      case "list": {
        const ul = el("ul");
        b.items.forEach(i => ul.appendChild(el("li", null, esc(i))));
        return ul;
      }
      case "callout": {
        const c = el("div", "callout " + (b.variant || ""));
        c.innerHTML = (b.tag ? `<span class="tag">${esc(b.tag)}</span>` : "") + `<div>${b.html || esc(b.text || "")}</div>`;
        return c;
      }
      case "cards": {
        const wrap = el("div", "cards");
        b.items.forEach(it => {
          wrap.appendChild(el("div", "card",
            `<div class="card__ico">${it.ico || "•"}</div><h3>${esc(it.h)}</h3><p>${esc(it.p)}</p>`));
        });
        return wrap;
      }
      case "timeline": {
        const ol = el("ul", "timeline");
        b.items.forEach(it => ol.appendChild(el("li", null, `<strong>${esc(it.t)}</strong>${esc(it.d)}`)));
        return ol;
      }
      case "accordions": {
        const frag = document.createDocumentFragment();
        b.items.forEach(it => frag.appendChild(buildAccordion(it)));
        return frag;
      }
      default: return document.createComment("bloque desconocido: " + b.type);
    }
  }

  function buildAccordion(it) {
    const acc = el("div", "accordion");
    const head = el("button", "accordion__head");
    head.innerHTML = `<span class="a-ico">${it.ico || "▸"}</span><span>${esc(it.title)}</span><span class="chev">▾</span>`;
    const body = el("div", "accordion__body");
    body.appendChild(el("div", "accordion__inner", it.html || esc(it.text || "")));
    head.addEventListener("click", () => acc.classList.toggle("is-open"));
    acc.append(head, body);
    return acc;
  }

  /* =================================================================
     SECCIONES ESPECIALES
     ================================================================= */
  function renderBiblioteca(target) {
    const filters = el("div");
    const groups = [
      { label: "Emoción", key: "emocion", opts: EMOTIONS },
      { label: "Nicho",   key: "nicho",   opts: NICHES },
      { label: "Objetivo",key: "objetivo",opts: GOALS }
    ];
    const state = { emocion: null, nicho: null, objetivo: null };
    const list = el("div");

    groups.forEach(g => {
      const row = el("div");
      row.appendChild(el("div", "result-meta", g.label));
      const chips = el("div", "chips");
      g.opts.forEach(opt => {
        const chip = el("button", "chip", esc(opt));
        chip.addEventListener("click", () => {
          state[g.key] = state[g.key] === opt ? null : opt;
          $$(".chip", chips).forEach(c => c.classList.toggle("is-active", c.textContent === state[g.key]));
          paint();
        });
        chips.appendChild(chip);
      });
      row.appendChild(chips);
      filters.appendChild(row);
    });

    function paint() {
      list.innerHTML = "";
      const res = LIBRARY.filter(p =>
        (!state.emocion || p.emocion === state.emocion) &&
        (!state.nicho || p.nicho === state.nicho) &&
        (!state.objetivo || p.objetivo === state.objetivo));
      list.appendChild(el("div", "result-meta", `${res.length} publicación(es)`));
      if (!res.length) { list.appendChild(el("div", "search-empty", "No hay resultados con esos filtros.")); return; }
      res.forEach(p => list.appendChild(buildPost(p)));
    }

    target.append(filters, el("hr", "hr"), list);
    paint();
  }

  function buildPost(p) {
    const post = el("div", "post");
    post.appendChild(el("div", "frase", esc(p.frase)));
    const meta = el("div", "meta chips");
    [p.emocion, p.nicho, p.objetivo].forEach(t => meta.appendChild(el("span", "chip", esc(t))));
    post.appendChild(meta);
    post.appendChild(buildAccordion({ ico: "📝", title: "Descripción", html: `<p>${esc(p.descripcion)}</p>` }));
    post.appendChild(buildAccordion({ ico: "#️⃣", title: "Hashtags", html: `<p>${esc(p.hashtags)}</p>` }));
    post.appendChild(buildAccordion({ ico: "📷", title: "Prompt IA", html: `<p>${esc(p.prompt)}</p>` }));
    post.appendChild(buildAccordion({ ico: "🧠", title: "Técnicas utilizadas",
      html: "<ul>" + p.tecnicas.map(t => `<li>${esc(t)}</li>`).join("") + "</ul>" }));
    return post;
  }

  function renderGenerador(target) {
    const form = el("div", "gen-form");
    const mkSelect = (label, opts) => {
      const f = el("div", "field");
      f.innerHTML = `<label>${esc(label)}</label>`;
      const sel = el("select");
      opts.forEach(o => { const op = el("option", null, esc(o)); op.value = o; sel.appendChild(op); });
      f.appendChild(sel);
      return { f, sel };
    };
    const temaField = el("div", "field");
    temaField.innerHTML = `<label>Tema</label>`;
    const temaInput = el("input"); temaInput.type = "text"; temaInput.placeholder = "Ej. la ansiedad";
    temaField.appendChild(temaInput);

    const emo = mkSelect("Emoción", EMOTIONS);
    const nic = mkSelect("Nicho", NICHES);
    const goal = mkSelect("Objetivo", GOALS);
    const btn = el("button", "btn btn--primary", "Generar ✨");

    form.append(temaField, emo.f, nic.f, goal.f, btn);

    const out = el("div", "gen-output");

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function generate() {
      const tema = (temaInput.value || "eso que te quita la paz").trim();
      const frase = pick(GENERATOR_BANK.frases).replace(/\{tema\}/g, tema);
      const hashtags = GENERATOR_BANK.hashtags[nic.sel.value] || "#frases #reflexiones";
      const desc = `Una reflexión sobre ${tema} pensada para generar ${goal.sel.value.toLowerCase()} a través de ${emo.sel.value.toLowerCase()}.`;
      const prompt = `Fotografía cinematográfica que transmite ${emo.sel.value.toLowerCase()}, relacionada con "${tema}", luz natural suave, estética editorial, bokeh.`;

      out.innerHTML = "";
      [["Frase", frase], ["Descripción", desc], ["Hashtags", hashtags], ["Prompt IA", prompt]].forEach(([h, v]) => {
        const block = el("div", "out-block");
        block.innerHTML = `<button class="btn btn--ghost copy-btn">Copiar</button><h4>${h}</h4><pre>${esc(v)}</pre>`;
        block.querySelector(".copy-btn").addEventListener("click", (e) => {
          navigator.clipboard?.writeText(v);
          e.target.textContent = "¡Copiado!";
          setTimeout(() => e.target.textContent = "Copiar", 1200);
        });
        out.appendChild(block);
      });
      out.classList.add("is-visible");
    }
    btn.addEventListener("click", generate);
    target.append(form, out);
  }

  function renderAnatomia(target) {
    ANATOMY.forEach(a => {
      target.appendChild(el("div", "quote", esc(a.frase)));
      target.appendChild(el("h2", null, esc(a.titulo)));
      const ol = el("ul", "timeline");
      a.pasos.forEach(s => ol.appendChild(el("li", null, `<strong>${esc(s.t)}</strong>${esc(s.d)}`)));
      target.appendChild(ol);
      const c1 = el("div", "callout"); c1.innerHTML = `<span class="tag">Sesgo psicológico</span><div>${esc(a.sesgo)}</div>`;
      const c2 = el("div", "callout good"); c2.innerHTML = `<span class="tag">Cómo recrearla</span><div>${esc(a.recrear)}</div>`;
      target.append(c1, c2, el("hr", "hr"));
    });
  }

  /* =================================================================
     NAVEGACIÓN
     ================================================================= */
  function navigate(id) {
    const sec = SECTIONS.find(s => s.id === id) || SECTIONS[0];
    history.replaceState(null, "", "#" + sec.id);
    breadcrumb.textContent = sec.title;
    setActive(sec.id);
    content.innerHTML = "";

    sec.blocks.forEach(b => content.appendChild(renderBlock(b)));

    if (sec.special === "biblioteca") renderBiblioteca(content);
    else if (sec.special === "generador") renderGenerador(content);
    else if (sec.special === "anatomia") renderAnatomia(content);

    content.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
    content.focus({ preventScroll: true });
  }

  /* =================================================================
     BUSCADOR GLOBAL
     ================================================================= */
  function searchAll(q) {
    const term = q.trim().toLowerCase();
    breadcrumb.textContent = `Búsqueda: "${q}"`;
    setActive(null);
    content.innerHTML = "";
    const head = el("div", "page-head");
    head.innerHTML = `<div class="kicker">Resultados</div><h1>Búsqueda</h1>`;
    content.appendChild(head);

    if (!term) { content.appendChild(el("div", "search-empty", "Escribe algo para buscar.")); return; }

    // Buscar en secciones
    const secHits = SECTIONS.filter(s => JSON.stringify(s).toLowerCase().includes(term));
    // Buscar en biblioteca
    const libHits = LIBRARY.filter(p => JSON.stringify(p).toLowerCase().includes(term));

    content.appendChild(el("div", "result-meta",
      `${secHits.length} capítulo(s) y ${libHits.length} publicación(es) relacionadas con "${esc(q)}"`));

    if (secHits.length) {
      content.appendChild(el("h2", null, "Capítulos"));
      const cards = el("div", "cards");
      secHits.forEach(s => {
        const card = el("div", "card", `<div class="card__ico">${s.icon}</div><h3>${esc(s.title)}</h3><p>Ir al capítulo →</p>`);
        card.style.cursor = "pointer";
        card.addEventListener("click", () => navigate(s.id));
        cards.appendChild(card);
      });
      content.appendChild(cards);
    }

    if (libHits.length) {
      content.appendChild(el("h2", null, "Publicaciones"));
      libHits.forEach(p => content.appendChild(buildPost(p)));
    }

    if (!secHits.length && !libHits.length) {
      content.appendChild(el("div", "search-empty", `Sin resultados para "${esc(q)}". Prueba con otra palabra.`));
    }
  }

  let searchTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    const v = e.target.value;
    searchTimer = setTimeout(() => { if (v.trim()) searchAll(v); else navigate("inicio"); }, 220);
  });

  /* =================================================================
     INIT
     ================================================================= */
  buildNav();
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (id && app.hidden === false) navigate(id);
  });

  // Si entra con un hash directo, saltar la portada
  if (location.hash && location.hash !== "#") {
    enterApp();
    navigate(location.hash.slice(1));
  }
})();
