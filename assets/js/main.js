/* Star and Exoplanet Research Group (SERG) — site script.
   Content lives in the /data folder; this file only displays it.
   Members normally never need to edit this file. */
(function () {
  "use strict";

  var S = window.SITE || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var NAV = [
    ["index.html", "Home", "home"],
    ["research.html", "Research", "research"],
    ["people.html", "People", "people"],
    ["publications.html", "Publications", "publications"],
    ["software.html", "Software", "software"],
    ["collaborations.html", "Collaborations", "collaborations"],
    ["opportunities.html", "Opportunities", "opportunities"],
    ["summer-school.html", "Summer Research School", "summer-school"],
    ["contact.html", "Contact", "contact"]
  ];

  /* Two stars on a shared orbit: the group's mark */
  function brandMark() {
    return '<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">' +
      '<ellipse cx="20" cy="20" rx="17.5" ry="7" fill="none" stroke="currentColor" stroke-opacity=".5" stroke-width="1.2" transform="rotate(-20 20 20)"/>' +
      '<circle cx="13.6" cy="22.4" r="5.4" fill="#ffffff"/>' +
      '<circle cx="27.2" cy="17.5" r="3.5" fill="currentColor"/></svg>';
  }

  /* ---------- Header and footer ---------- */
  function buildHeader() {
    var el = $("#site-header");
    if (!el) return;
    var page = document.body.getAttribute("data-page");
    el.innerHTML =
      '<div class="wrap header-inner">' +
        '<a class="brand" href="index.html">' + brandMark() +
          '<span><span class="brand-name">' + esc(S.groupName) + '</span>' +
          '<span class="brand-sub">' + esc(S.institute) + ", " + esc(S.cityShort) + "</span></span></a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
          '<span class="nav-toggle-bars" aria-hidden="true"></span><span class="nav-toggle-label">Menu</span></button>' +
        '<nav class="site-nav" id="site-nav" aria-label="Main"><ul class="nav-list">' +
          NAV.map(function (n) {
            return '<li><a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a></li>";
          }).join("") +
        "</ul></nav></div>";

    var btn = $(".nav-toggle", el), nav = $("#site-nav", el);
    function setOpen(open) { nav.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); }
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); btn.focus(); }
    });
  }

  function buildFooter() {
    var el = $("#site-footer");
    if (!el) return;
    var ext = "";
    if (S.scholarUrl) ext += '<li><a href="' + esc(S.scholarUrl) + '" rel="noopener">Google Scholar</a></li>';
    if (S.instituteUrl) ext += '<li><a href="' + esc(S.instituteUrl) + '" rel="noopener">' + esc(S.institute) + "</a></li>";
    if (S.email) ext += '<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li>";
    el.innerHTML =
      '<div class="wrap footer-inner">' +
        '<div class="footer-brand">' + brandMark() +
          '<div><p class="footer-name">' + esc(S.groupName) + "</p><p>" + esc(S.institute) + "<br>" + esc(S.city) + "</p></div></div>" +
        '<nav aria-label="Footer"><p class="footer-head">Pages</p><ul class="footer-links">' +
          NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") +
        "</ul></nav>" +
        '<div><p class="footer-head">Links</p><ul class="footer-links single">' + ext + "</ul></div>" +
      "</div>" +
      '<div class="wrap footer-base"><p>© ' + new Date().getFullYear() + " " + esc(S.groupName) + '. Website developed by <a href="https://jiqbal-astro.github.io" rel="noopener">Javed Iqbal</a>.</p></div>';
  }

  /* ---------- Seeded random numbers (same sky on every visit) ---------- */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- Starfield ---------- */
  function drawStars(canvas) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var r = rng(884869);
    var n = Math.round((w * h) / 2400);
    for (var i = 0; i < n; i++) {
      var x = r() * w, y = r() * h, m = r(), a = 0.2 + r() * 0.65, tint = r();
      var size = m > 0.988 ? 1.5 : m > 0.92 ? 1.0 : 0.55;
      ctx.fillStyle = tint > 0.86 ? "rgba(255,212,168," + a + ")" : tint > 0.62 ? "rgba(190,210,255," + a + ")" : "rgba(255,255,255," + a + ")";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function initStars() {
    var canvases = $$("canvas.stars");
    if (!canvases.length) return;
    function draw() { canvases.forEach(drawStars); }
    draw();
    var t, lastW = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth === lastW) return; // ignore mobile address-bar height changes
      lastW = window.innerWidth;
      clearTimeout(t);
      t = setTimeout(draw, 150);
    });
  }

  /* ---------- Light-curve models (normalised flux vs. time 0..1) ---------- */
  function dip(t, c, w, d) { return d * Math.exp(-Math.pow((t - c) / w, 2)); }
  function smooth(x) { return x * x * (3 - 2 * x); }
  var MODELS = {
    // Primary and secondary eclipse of a binary star
    eclipse: function (t) { return 1 - dip(t, 0.28, 0.05, 0.55) - dip(t, 0.78, 0.05, 0.2); },
    // Flat-bottomed transit with ingress, egress and limb darkening (depth exaggerated)
    transit: function (t) {
      var c = 0.5, hw = 0.17, ing = 0.05, d = 0.3, x = Math.abs(t - c);
      if (x >= hw) return 1;
      var shape = x <= hw - ing ? 1 : smooth((hw - x) / ing);
      return 1 - d * shape * (1 - 0.3 * Math.pow(x / hw, 2));
    },
    // Fast rise, two-part exponential decay
    flare: function (t) {
      var p = 0.28, a = 0.85;
      if (t < p) return 1 + a * Math.exp(-Math.pow((t - p) / 0.012, 2));
      return 1 + a * (0.65 * Math.exp(-(t - p) / 0.025) + 0.35 * Math.exp(-(t - p) / 0.12));
    }
  };
  var RANGES = { eclipse: [0.36, 1.12], transit: [0.62, 1.1], flare: [0.88, 1.95] };
  var SEGMENTS = [["eclipse", 0, 0.36], ["transit", 0.36, 0.66], ["flare", 0.66, 1]];
  function composite(u) {
    for (var i = 0; i < SEGMENTS.length; i++) {
      var s = SEGMENTS[i];
      if (u <= s[2]) return MODELS[s[0]]((u - s[1]) / (s[2] - s[1]));
    }
    return 1;
  }

  function buildCurve(fn, o) {
    var r = rng(o.seed), pad = o.pad;
    function gauss() { var u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function X(u) { return pad + u * (o.w - 2 * pad); }
    function Y(f) { return pad + ((o.fmax - f) / (o.fmax - o.fmin)) * (o.h - 2 * pad); }
    var dots = "";
    for (var i = 0; i < o.n; i++) {
      var u = (i + 0.5) / o.n;
      dots += '<circle cx="' + X(u).toFixed(1) + '" cy="' + Y(fn(u) + gauss() * o.noise).toFixed(1) + '" r="' + o.r + '"/>';
    }
    var d = "", m = 600;
    for (var j = 0; j <= m; j++) { var uu = j / m; d += (j ? "L" : "M") + X(uu).toFixed(1) + " " + Y(fn(uu)).toFixed(1); }
    return { dots: dots, d: d, X: X, Y: Y };
  }

  function renderHeroCurve(animate) {
    var host = $("#hero-curve");
    if (!host) return;
    // Keep the curve readable on narrow screens: taller drawing, bigger dots, fewer points
    var px = host.clientWidth || 1000;
    var W = 1000, H = Math.round(Math.max(230, (1000 * 150) / px));
    var narrow = px < 640;
    var c = buildCurve(composite, { w: W, h: H, n: narrow ? 230 : 380, noise: 0.024, fmin: 0.36, fmax: 1.95, pad: 6, r: (1.7 * Math.max(1, 640 / px)).toFixed(2), seed: 7 });
    var dividers = SEGMENTS.slice(1).map(function (s) {
      var x = c.X(s[1]).toFixed(1);
      return '<line x1="' + x + '" x2="' + x + '" y1="0" y2="' + H + '" stroke="#a9c1f5" stroke-opacity=".22" stroke-dasharray="3 5" vector-effect="non-scaling-stroke"/>';
    }).join("");
    var startW = animate && !reduceMotion ? 0 : W;
    host.innerHTML =
      '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Illustrative light curve showing two stellar eclipses, a planetary transit and a stellar flare">' +
        '<defs><clipPath id="lc-reveal"><rect id="lc-reveal-rect" x="0" y="-20" width="' + startW + '" height="' + (H + 40) + '"/></clipPath></defs>' +
        dividers +
        '<g clip-path="url(#lc-reveal)">' +
          '<g fill="#a9c1f5" fill-opacity=".5">' + c.dots + "</g>" +
          '<path d="' + c.d + '" fill="none" stroke="#ffffff" stroke-opacity=".92" stroke-width="1.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>' +
        "</g></svg>";
    if (startW === W) return;
    var rect = document.getElementById("lc-reveal-rect"), start = null, dur = 2600;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - p, 3);
      rect.setAttribute("width", (W * e).toFixed(1));
      if (p < 1) requestAnimationFrame(step);
    }
    setTimeout(function () { requestAnimationFrame(step); }, 300);
  }
  (function () {
    var t, lastW = window.innerWidth;
    window.addEventListener("resize", function () {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(t);
      t = setTimeout(function () { renderHeroCurve(false); }, 200);
    });
  })();

  /* ---------- Animated research panels: the system above, its light curve below ----------
     Geometry is matched to the light-curve models: eclipses happen at the dips (t = 0.28, 0.78),
     the planet's first and last contact fall at the edges of the transit, and the flare's glow
     follows the flux of the flare model. */
  var SW = 320, SH = 124;
  var SCENES = {
    eclipse: { period: 7000, still: 0.27, label: "Animation of two stars orbiting each other; the smaller, cooler star passes in front of the larger, hotter one, and later behind it" },
    transit: { period: 6500, still: 0.5, label: "Animation of a planet passing in front of its host star" },
    flare: { period: 7000, still: 0.3, label: "Animation of a red dwarf star producing a flare near its edge" }
  };

  function sceneStars(seed) {
    var r = rng(seed), out = "";
    for (var i = 0; i < 28; i++) {
      out += '<circle cx="' + (r() * SW).toFixed(1) + '" cy="' + (r() * SH).toFixed(1) + '" r="' + (r() > 0.88 ? 0.9 : 0.5) +
        '" fill="#ffffff" fill-opacity="' + (0.25 + r() * 0.5).toFixed(2) + '"/>';
    }
    return out;
  }

  function sceneSVG(k, id) {
    var cx = SW / 2, cy = SH / 2, body;
    if (k === "eclipse") {
      body =
        '<defs><radialGradient id="' + id + 'a" cx="42%" cy="38%" r="62%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b8ccff"/></radialGradient>' +
        '<radialGradient id="' + id + 'b" cx="42%" cy="38%" r="62%"><stop offset="0" stop-color="#ffdcae"/><stop offset="1" stop-color="#ee8336"/></radialGradient></defs>' +
        '<ellipse cx="' + cx + '" cy="' + cy + '" rx="41.3" ry="5" fill="none" stroke="#a9c1f5" stroke-opacity=".28" stroke-dasharray="2 3"/>' +
        '<ellipse cx="' + cx + '" cy="' + cy + '" rx="20.7" ry="2.5" fill="none" stroke="#a9c1f5" stroke-opacity=".2" stroke-dasharray="2 3"/>' +
        '<g class="sc-bodies">' +
          '<g class="sc-a"><circle r="25" fill="#b8ccff" fill-opacity=".1"/><circle r="17" fill="url(#' + id + 'a)"/></g>' +
          '<g class="sc-b"><circle r="15" fill="#ffb36b" fill-opacity=".1"/><circle r="11" fill="url(#' + id + 'b)"/></g>' +
        "</g>";
    } else if (k === "transit") {
      body =
        '<defs><radialGradient id="' + id + 's" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6df"/><stop offset=".72" stop-color="#ffd27c"/><stop offset="1" stop-color="#e88c38"/></radialGradient></defs>' +
        '<line x1="34" x2="286" y1="' + (cy + 6) + '" y2="' + (cy + 6) + '" stroke="#a9c1f5" stroke-opacity=".22" stroke-dasharray="2 3"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="#ffc868" fill-opacity=".1"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="url(#' + id + 's)"/>' +
        '<circle class="sc-p" cx="' + cx + '" cy="' + (cy + 6) + '" r="6" fill="#0d1a30" stroke="#a9c1f5" stroke-opacity=".55" stroke-width=".8"/>';
    } else {
      body =
        '<defs><radialGradient id="' + id + 'd" cx="42%" cy="40%" r="62%"><stop offset="0" stop-color="#ffb47c"/><stop offset=".75" stop-color="#ee6d3a"/><stop offset="1" stop-color="#b53a22"/></radialGradient>' +
        '<radialGradient id="' + id + 'g" cx="38%" cy="32%" r="60%"><stop offset="0" stop-color="#fff4e2" stop-opacity=".95"/><stop offset=".45" stop-color="#ffb070" stop-opacity=".35"/><stop offset="1" stop-color="#ff9050" stop-opacity="0"/></radialGradient></defs>' +
        '<circle class="sc-glow" cx="' + cx + '" cy="' + cy + '" r="58" fill="url(#' + id + 'g)" opacity="0"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="38" fill="#ff7a45" fill-opacity=".1"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="url(#' + id + 'd)"/>' +
        '<circle cx="' + (cx + 9) + '" cy="' + (cy + 7) + '" r="4.5" fill="#7d2414" fill-opacity=".45"/>' +
        '<circle cx="' + (cx - 8) + '" cy="' + (cy + 15) + '" r="3" fill="#7d2414" fill-opacity=".4"/>' +
        '<path class="sc-loop" d="M' + (cx - 28) + " " + (cy - 11) + " Q" + (cx - 46) + " " + (cy - 44) + " " + (cx - 8) + " " + (cy - 29) + '" fill="none" stroke="#ffe6c2" stroke-width="2.2" stroke-linecap="round" opacity="0"/>' +
        '<circle class="sc-k" cx="' + (cx - 19) + '" cy="' + (cy - 23) + '" r="4" fill="#ffffff" opacity="0"/>';
    }
    return '<svg viewBox="0 0 ' + SW + " " + SH + '" role="img" aria-label="' + SCENES[k].label + '">' + sceneStars(101 + id.length * 7) + body + "</svg>";
  }

  var anims = [], rafId = null;

  function updateScene(a, t) {
    var f = MODELS[a.k](t), cx = SW / 2, cy = SH / 2;
    var x = a.X(t).toFixed(1), y = a.Y(f).toFixed(1);
    a.cursor.setAttribute("x1", x); a.cursor.setAttribute("x2", x);
    a.marker.setAttribute("cx", x); a.marker.setAttribute("cy", y);
    if (a.k === "eclipse") {
      var th = 2 * Math.PI * (t - 0.28), sn = Math.sin(th), cs = Math.cos(th);
      a.b.setAttribute("transform", "translate(" + (cx + 41.3 * sn).toFixed(2) + " " + (cy + 5 * cs).toFixed(2) + ")");
      a.a.setAttribute("transform", "translate(" + (cx - 20.7 * sn).toFixed(2) + " " + (cy - 2.5 * cs).toFixed(2) + ")");
      var front = cs > 0 ? a.b : a.a; // the smaller star is in front near t = 0.28 (primary eclipse)
      if (a.front !== front) { a.group.appendChild(front); a.front = front; }
    } else if (a.k === "transit") {
      a.p.setAttribute("cx", (cx + ((t - 0.5) / 0.17) * 40).toFixed(2)); // contact at |t - 0.5| = 0.17
      a.p.setAttribute("opacity", Math.max(0, Math.min(1, t / 0.06, (1 - t) / 0.06)).toFixed(2));
    } else {
      var amp = Math.max(0, Math.min(1, (f - 1) / 0.85));
      a.glow.setAttribute("opacity", (amp * 0.95).toFixed(3));
      a.loop.setAttribute("opacity", Math.min(1, amp * 1.6).toFixed(3));
      a.kern.setAttribute("opacity", Math.min(1, amp * 1.4).toFixed(3));
      a.kern.setAttribute("r", (3 + 5 * amp).toFixed(2));
    }
  }

  function tick(now) {
    var any = false;
    anims.forEach(function (a) {
      if (!a.visible) return;
      any = true;
      updateScene(a, ((now + a.offset) % a.period) / a.period);
    });
    rafId = any && !document.hidden ? requestAnimationFrame(tick) : null;
  }
  function kick() { if (!reduceMotion && rafId === null && anims.length) rafId = requestAnimationFrame(tick); }

  function renderMiniCurves() {
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.target.__lc) e.target.__lc.visible = e.isIntersecting; });
      kick();
    }) : null;
    $$("[data-curve]").forEach(function (el, i) {
      var k = el.getAttribute("data-curve");
      if (!MODELS[k]) return;
      var W = 320, H = 120, id = "lc" + i + k[0];
      var c = buildCurve(MODELS[k], { w: W, h: H, n: 95, noise: k === "transit" ? 0.018 : 0.03, fmin: RANGES[k][0], fmax: RANGES[k][1], pad: 6, r: 1.9, seed: 31 + i });
      el.innerHTML =
        '<div class="lc-scene">' + sceneSVG(k, id) + "</div>" +
        '<div class="lc-plot"><svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
          '<g class="lc-dots">' + c.dots + '</g><path class="lc-model" d="' + c.d + '"/>' +
          '<line class="lc-cursor" y1="0" y2="' + H + '"/><circle class="lc-marker" r="3.6"/></svg></div>';
      var a = {
        k: k, X: c.X, Y: c.Y, period: SCENES[k].period, offset: (0.08 + i * 0.13) * SCENES[k].period, visible: !io,
        cursor: $(".lc-cursor", el), marker: $(".lc-marker", el),
        group: $(".sc-bodies", el), a: $(".sc-a", el), b: $(".sc-b", el), p: $(".sc-p", el),
        glow: $(".sc-glow", el), loop: $(".sc-loop", el), kern: $(".sc-k", el)
      };
      el.__lc = a;
      updateScene(a, SCENES[k].still); // a meaningful still frame (also the reduced-motion view)
      if (!reduceMotion) { anims.push(a); if (io) io.observe(el); }
    });
    document.addEventListener("visibilitychange", kick);
    kick();
  }

  /* ---------- People ---------- */
  var SILHOUETTE = '<svg viewBox="0 0 160 200" aria-hidden="true"><rect width="160" height="200" style="fill:var(--panel)"/>' +
    '<circle cx="80" cy="78" r="30" style="fill:var(--line)"/><path d="M26 200c4-40 26-62 54-62s50 22 54 62z" style="fill:var(--line)"/></svg>';

  function initials(name) {
    var parts = String(name || "").replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, "").trim().split(/\s+/);
    if (!parts[0]) return "";
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  }
  function photoHTML(p, cls) {
    if (p.placeholder) return '<div class="' + cls + ' is-empty">' + SILHOUETTE + "</div>";
    var ini = esc(initials(p.name));
    if (!p.photo) return '<div class="' + cls + '"><span class="initials" aria-hidden="true">' + ini + "</span></div>";
    return '<div class="' + cls + '"><img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '" loading="lazy" data-initials="' + ini + '"></div>';
  }
  // If a photo file is missing, show initials instead of a broken image
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img && img.tagName === "IMG" && img.hasAttribute("data-initials")) {
      var span = document.createElement("span");
      span.className = "initials";
      span.setAttribute("aria-hidden", "true");
      span.textContent = img.getAttribute("data-initials");
      img.replaceWith(span);
    }
  }, true);

  function piHTML(pi, full) {
    var bio = full ? pi.bio : pi.bio.slice(0, 2);
    var links = "";
    if (S.scholarUrl) links += '<a class="btn btn-outline" href="' + esc(S.scholarUrl) + '" rel="noopener">Google Scholar profile</a>';
    if (full && pi.email) links += '<a class="btn btn-outline" href="mailto:' + esc(pi.email) + '">Email</a>';
    if (!full) links += '<a class="btn btn-solid" href="people.html">Meet the whole group</a>';
    var facts = "";
    if (full) {
      facts = '<div class="facts">' +
        (pi.education && pi.education.length ? "<div><h4>Education</h4><ul>" + pi.education.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
        (pi.specialisation && pi.specialisation.length ? "<div><h4>Specialisation</h4><ul>" + pi.specialisation.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
        "</div>";
    }
    return '<div class="pi">' + photoHTML(pi, "pi-photo") +
      '<div class="pi-body"><h3>' + esc(pi.name) + '</h3><p class="pi-role">' + esc(pi.title) + ", " + esc(pi.institute) + "<br>" + esc(pi.role) + "</p>" +
      bio.map(function (b) { return "<p>" + esc(b) + "</p>"; }).join("") + facts +
      '<div class="link-row">' + links + "</div></div></div>";
  }

  // Every card has the same five parts (some may be empty) so that, with CSS subgrid,
  // names, roles and descriptions line up across each row.
  function personHTML(p) {
    var links = [];
    if (p.email) links.push('<a href="mailto:' + esc(p.email) + '">Email</a>');
    if (p.website) links.push('<a href="' + esc(p.website) + '" rel="noopener">Personal website</a>');
    return '<li class="person' + (p.placeholder ? " is-placeholder" : "") + '">' + photoHTML(p, "photo") +
      "<h3>" + esc(p.name) + "</h3>" +
      '<p class="role">' + esc(p.role) + "</p>" +
      '<p class="affil">' + esc(p.affiliation || "") + "</p>" +
      '<div class="person-text"><p class="area">' + esc(p.area || "") + "</p>" +
      (links.length ? '<p class="person-links">' + links.join("") + "</p>" : "") + "</div></li>";
  }

  function renderPeople() {
    var P = window.PEOPLE;
    if (!P) return;
    var full = $("#pi-profile"), summary = $("#pi-summary");
    if (P.pi && full) full.innerHTML = piHTML(P.pi, true);
    if (P.pi && summary) summary.innerHTML = piHTML(P.pi, false);
    var members = P.members || [];
    [["#member-list", members], ["#alumni-list", P.alumni || []]].forEach(function (pair) {
      var el = $(pair[0]);
      if (!el) return;
      if (!pair[1].length) {
        var group = el.closest("[data-hide-empty]");
        if (group) { group.hidden = true; return; }
        el.outerHTML = '<p class="empty">No members listed yet.</p>';
        return;
      }
      el.innerHTML = pair[1].map(personHTML).join("");
    });
    // Home page: one row of four, preferring members who have a photo
    var home = $("#home-people");
    if (home) {
      var withPhoto = members.filter(function (m) { return m.photo; });
      var pick = withPhoto.concat(members.filter(function (m) { return !m.photo; })).slice(0, 4);
      pick.sort(function (x, y) { return members.indexOf(x) - members.indexOf(y); });
      if (!pick.length) home.closest("[data-hide-empty]").hidden = true;
      else home.innerHTML = pick.map(personHTML).join("");
    }
  }

  /* ---------- Publications ---------- */
  function pubHTML(p) {
    var hl = S.highlightAuthors || [];
    var authors = (p.authors || []).map(function (n) {
      var e = esc(n);
      return hl.some(function (h) { return n.indexOf(h) !== -1; }) ? "<strong>" + e + "</strong>" : e;
    }).join(", ");
    var url = p.doi ? "https://doi.org/" + p.doi : p.url ? p.url : p.arxiv ? "https://arxiv.org/abs/" + p.arxiv : p.ads ? "https://ui.adsabs.harvard.edu/abs/" + p.ads : p.pdf || "";
    var venue = "<em>" + esc(p.journal) + "</em>" + (p.volume ? ", " + esc(p.volume) : "") + (p.article ? ", " + esc(p.article) : "") + (p.pages ? ", " + esc(p.pages) : "") + ", " + esc(p.year);
    var links = [];
    if (p.doi) links.push('<a href="https://doi.org/' + esc(p.doi) + '" rel="noopener">DOI: ' + esc(p.doi) + "</a>");
    if (p.arxiv) links.push('<a href="https://arxiv.org/abs/' + esc(p.arxiv) + '" rel="noopener">arXiv:' + esc(p.arxiv) + "</a>");
    if (p.url && !p.doi) links.push('<a href="' + esc(p.url) + '" rel="noopener">Journal page</a>');
    if (p.ads) links.push('<a href="https://ui.adsabs.harvard.edu/abs/' + esc(p.ads) + '" rel="noopener">NASA ADS</a>');
    if (p.ssrn) links.push('<a href="https://ssrn.com/abstract=' + esc(p.ssrn) + '" rel="noopener">SSRN preprint</a>');
    if (p.pdf) links.push('<a href="' + esc(p.pdf) + '" rel="noopener">Free PDF</a>');
    return '<li class="pub"><h3>' + (url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title)) + "</h3>" +
      '<p class="pub-authors">' + authors + "</p>" +
      '<p class="pub-venue">' + venue + (p.type ? '<span class="pub-type">' + esc(p.type) + "</span>" : "") + "</p>" +
      (links.length ? '<p class="pub-links">' + links.join("") + "</p>" : "") + "</li>";
  }
  function sortedPubs() {
    return (window.PUBLICATIONS || []).slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
  }

  function renderPublications() {
    var root = $("#pub-root");
    if (!root) return;
    var all = sortedPubs(), input = $("#pub-search"), count = $("#pub-count");
    function draw(q) {
      var ql = (q || "").trim().toLowerCase();
      var items = all.filter(function (p) {
        return !ql || [p.title, (p.authors || []).join(" "), p.journal, p.year, p.type].join(" ").toLowerCase().indexOf(ql) !== -1;
      });
      if (count) count.textContent = ql ? items.length + " of " + all.length + " publications" : all.length + " publications";
      if (!all.length) { root.innerHTML = '<p class="empty">Publications will be listed here soon. Until then, see the Google Scholar profile above.</p>'; return; }
      if (!items.length) { root.innerHTML = '<p class="empty">No publications match “' + esc(q) + "”. Try an author’s surname, a star name or a journal.</p>"; return; }
      var years = [], byYear = {};
      items.forEach(function (p) { if (!byYear[p.year]) { byYear[p.year] = []; years.push(p.year); } byYear[p.year].push(p); });
      root.innerHTML = years.map(function (y) {
        return '<section class="pub-year" aria-labelledby="year-' + y + '"><h2 id="year-' + y + '">' + y + '</h2><ol class="pub-list">' +
          byYear[y].map(pubHTML).join("") + "</ol></section>";
      }).join("");
    }
    if (input) input.addEventListener("input", function () { draw(input.value); });
    draw("");
  }

  function renderPresentations() {
    var root = $("#talks-root");
    if (!root) return;
    var list = (window.PRESENTATIONS || []).slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    var section = root.closest("[data-hide-empty]");
    if (!list.length) { if (section) section.hidden = true; return; }
    var hl = S.highlightAuthors || [];
    var years = [], byYear = {};
    list.forEach(function (p) { if (!byYear[p.year]) { byYear[p.year] = []; years.push(p.year); } byYear[p.year].push(p); });
    root.innerHTML = years.map(function (y) {
      return '<section class="pub-year" aria-labelledby="talks-' + y + '"><h3 class="pub-year-label" id="talks-' + y + '">' + y + '</h3><ol class="pub-list">' +
        byYear[y].map(function (p) {
          var authors = (p.authors || []).map(function (n) {
            var e = esc(n);
            return hl.some(function (h) { return n.indexOf(h) !== -1; }) ? "<strong>" + e + "</strong>" : e;
          }).join(", ");
          var where = [p.event, p.location, p.date].filter(Boolean).map(esc).join(", ");
          var links = [];
          if (p.pdf) links.push('<a href="' + esc(p.pdf) + '" rel="noopener">' + (p.type === "Poster" ? "Poster (PDF)" : "Slides (PDF)") + "</a>");
          if (p.url) links.push('<a href="' + esc(p.url) + '" rel="noopener">Conference page</a>');
          (p.links || []).forEach(function (l) { links.push('<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.text) + "</a>"); });
          var main = p.pdf || p.url;
          return '<li class="pub"><h3>' + (main ? '<a href="' + esc(main) + '" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title)) + "</h3>" +
            '<p class="pub-authors">' + authors + "</p>" +
            '<p class="pub-venue">' + where + (p.type ? '<span class="pub-type">' + esc(p.type) + "</span>" : "") + "</p>" +
            (links.length ? '<p class="pub-links">' + links.join("") + "</p>" : "") + "</li>";
        }).join("") + "</ol></section>";
    }).join("");
  }

  function renderRecentPubs() {
    var el = $("#recent-pubs");
    if (!el) return;
    var list = sortedPubs().slice(0, 3);
    if (!list.length) { el.closest("section").hidden = true; return; }
    el.innerHTML = list.map(pubHTML).join("");
  }

  /* ---------- Software ---------- */
  function renderSoftware() {
    var el = $("#software-list");
    if (!el) return;
    var list = window.SOFTWARE || [];
    if (!list.length) { el.outerHTML = '<p class="empty">Software will be listed here.</p>'; return; }
    el.innerHTML = list.map(function (t) {
      var shot = t.screenshot ? '<a class="sw-shot" href="' + esc(t.repo || t.screenshot) + '" rel="noopener"><img src="' + esc(t.screenshot) + '" alt="Screenshot of ' + esc(t.name) + '" loading="lazy"></a>' : "";
      var facts = [];
      if (t.stack) facts.push("<div><dt>Built with</dt><dd>" + esc(t.stack) + "</dd></div>");
      if (t.license) facts.push("<div><dt>Licence</dt><dd>" + esc(t.license) + " (open source)</dd></div>");
      if (t.developers && t.developers.length) facts.push("<div><dt>Developers</dt><dd>" + t.developers.map(esc).join(", ") + "</dd></div>");
      return '<article class="sw' + (shot ? " has-shot" : "") + '">' + shot +
        '<div class="sw-body"><h2>' + esc(t.name) + "</h2>" +
        (t.summary ? '<p class="sw-summary">' + esc(t.summary) + "</p>" : "") +
        (t.features && t.features.length ? '<ul class="checklist sw-features">' + t.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" : "") +
        (facts.length ? '<dl class="sw-facts">' + facts.join("") + "</dl>" : "") +
        (t.repo ? '<div class="link-row"><a class="btn btn-solid" href="' + esc(t.repo) + '" rel="noopener">View on GitHub</a>' +
          '<a class="btn btn-outline" href="' + esc(t.repo) + '#installation" rel="noopener">Installation guide</a></div>' : "") +
        "</div></article>";
    }).join("");
  }

  /* ---------- Collaborations and summer school ---------- */
  function renderCollaborations() {
    var el = $("#collab-list");
    if (!el) return;
    var list = window.COLLABORATIONS || [];
    if (!list.length) { el.outerHTML = '<p class="empty">Partner institutions will be listed here.</p>'; return; }
    el.innerHTML = list.map(function (c) {
      var name = c.url ? '<a href="' + esc(c.url) + '" rel="noopener">' + esc(c.name) + "</a>" : esc(c.name);
      var k = c.contact, photo = "", person = "";
      if (k) {
        if (k.photo) photo = '<div class="collab-photo">' + photoHTML({ name: k.name, photo: k.photo }, "collab-photo-frame") + "</div>";
        person = '<p class="collab-person">' + (k.url ? '<a href="' + esc(k.url) + '" rel="noopener">' + esc(k.name) + "</a>" : esc(k.name)) +
          (k.title ? '<span class="collab-person-title">' + esc(k.title) + "</span>" : "") + "</p>";
      }
      var links = (c.links || []).map(function (l) { return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.text) + "</a>"; }).join("");
      return '<li' + (k ? ' class="has-contact' + (photo ? " has-photo" : "") + '"' : "") + ">" + photo +
        '<div class="collab-body"><h3>' + name + '</h3><p class="place">' + esc(c.place) + "</p>" +
        (c.work ? '<p class="work">' + esc(c.work) + "</p>" : "") + person +
        (links ? '<p class="collab-links">' + links + "</p>" : "") + "</div></li>";
    }).join("");
  }

  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return esc(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }
  function renderAnnouncements() {
    var el = $("#announcements");
    if (!el) return;
    var list = ((window.SUMMER_SCHOOL || {}).announcements || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!list.length) {
      el.outerHTML = '<p class="empty">No announcements yet. Dates, registration details and the programme will appear here once the first Summer Research School is confirmed.</p>';
      return;
    }
    el.innerHTML = list.map(function (a) {
      return '<li><time datetime="' + esc(a.date) + '">' + formatDate(a.date) + "</time><h3>" + esc(a.title) + "</h3>" +
        (a.text ? "<p>" + esc(a.text) + "</p>" : "") +
        (a.url ? '<p><a href="' + esc(a.url) + '" rel="noopener">' + esc(a.linkText || "More details") + "</a></p>" : "") + "</li>";
    }).join("");
  }

  /* ---------- Contact ---------- */
  function initContact() {
    $$("[data-site-email]").forEach(function (el) {
      el.innerHTML = S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>" : "Official email address coming soon";
    });
    $$("[data-site-address]").forEach(function (el) { el.textContent = S.address || ""; });

    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status"), btn = $("button[type=submit]", form), topic = $("#topic");

    // Pre-select the subject from links such as contact.html?topic=supervision
    var m = /[?&]topic=([^&]+)/.exec(window.location.search);
    if (m && topic) {
      var val = decodeURIComponent(m[1]);
      if ($$("option", topic).some(function (o) { return o.value === val; })) topic.value = val;
    }

    function say(msg, kind) { status.textContent = msg; status.className = "form-status" + (kind ? " " + kind : ""); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      if (data.get("_gotcha")) return; // spam trap
      var subjectLine = (topic ? topic.options[topic.selectedIndex].text : "Enquiry") + ": " + data.get("subject");

      if (S.formEndpoint) {
        data.append("_subject", "[" + (S.groupName || "Website") + "] " + subjectLine);
        btn.disabled = true;
        say("Sending your message…");
        fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("status " + r.status);
            form.reset();
            say("Message sent. We’ll reply to the email address you gave.", "ok");
          })
          .catch(function () {
            say(S.email ? "The message couldn’t be sent. Please email " + S.email + " directly." : "The message couldn’t be sent. Please try again later.", "error");
          })
          .then(function () { btn.disabled = false; });
      } else if (S.email) {
        var body = data.get("message") + "\n\n" + data.get("name") + "\n" + data.get("email");
        window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subjectLine) + "&body=" + encodeURIComponent(body);
        say("Your email app should now open with this message filled in. Press send there to finish.", "ok");
      } else {
        say("The contact form isn’t connected yet. Please check back soon.", "error");
      }
    });
  }

  /* ---------- Start ---------- */
  buildHeader();
  buildFooter();
  initStars();
  renderHeroCurve(true);
  renderMiniCurves();
  renderPeople();
  renderPublications();
  renderPresentations();
  renderRecentPubs();
  renderSoftware();
  renderCollaborations();
  renderAnnouncements();
  initContact();
})();
