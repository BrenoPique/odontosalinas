(function () {
  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    });
  });

  /* Header, botão topo e link ativo */
  var header = document.getElementById("topo");
  var topBtn = document.getElementById("btn-scroll-top");
  var sections = [
    "servicos",
    "horarios",
    "localizacao",
    "equipe",
    "contato",
  ].map(function (id) {
    return document.getElementById(id);
  });
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    topBtn.classList.toggle("show", y > 600);
    var cur = "";
    sections.forEach(function (s) {
      if (s && s.getBoundingClientRect().top < 140) cur = s.id;
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Animações ao rolar */
  var io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e, i) {
            if (e.isIntersecting) {
              setTimeout(function () {
                e.target.classList.add("show");
              }, e.target.dataset.delay || 0);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      )
      : null;
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.dataset.delay = (i % 3) * 90;
    io ? io.observe(el) : el.classList.add("show");
  });

  /* Contadores */

  // Calcula automaticamente os anos de experiência
  document.querySelectorAll("[data-year]").forEach(function (el) {
    var year = Number(el.dataset.year);
    el.dataset.count = new Date().getFullYear() - year;
  });

  var counters = document.querySelectorAll("[data-count]");

  if (io) {
    var co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;

          var el = e.target,
            end = +el.dataset.count,
            suf = el.dataset.suffix || "",
            t0 = performance.now();

          (function tick(t) {
            var p = Math.min((t - t0) / 2000, 1);

            el.textContent =
              Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : "");

            if (p < 1) requestAnimationFrame(tick);
          })(t0);

          co.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );

    counters.forEach(function (c) {
      co.observe(c);
    });
  }

  /* Foto indisponível -> iniciais */
  document.querySelectorAll(".photo img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
      img.parentElement.classList.add("noimg");
    });
  });

  /* Aberto agora (fuso de São Paulo) + destaque do dia */
  function agoraSP() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) {
      o[p.type] = p.value;
    });
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { dia: dias[o.weekday], min: (+o.hour % 24) * 60 + +o.minute };
  }
  
  function atualizaStatus() {
    var n = agoraSP();
    var aberto = false;

    var horarios = {
      0: [], // Domingo
      1: [
        [480, 720],
        [780, 1140],
      ], // Segunda
      2: [
        [480, 720],
        [780, 1140],
      ], // Terça
      3: [
        [480, 720],
        [780, 1140],
      ], // Quarta
      4: [
        [480, 720],
        [780, 1140],
      ], // Quinta
      5: [
        [480, 720],
        [780, 1140],
      ], // Sexta
      6: [[480, 720]], // Sábado
    };

    // 00h = 0
    // 01h = 60
    // 02h = 120
    // 03h = 180
    // 04h = 240
    // 05h = 300
    // 06h = 360
    // 07h = 420
    // 08h = 480
    // 09h = 540
    // 10h = 600
    // 11h = 660
    // 12h = 720
    // 13h = 780
    // 14h = 840
    // 15h = 900
    // 16h = 960
    // 17h = 1020
    // 18h = 1080
    // 19h = 1140
    // 20h = 1200
    // 21h = 1260
    // 22h = 1320
    // 23h = 1380

    var faixas = horarios[n.dia];

    faixas.forEach(function (f) {
      if (n.min >= f[0] && n.min < f[1]) {
        aberto = true;
      }
    });

    var badge = document.getElementById("status-badge");
    var txt = document.getElementById("status-text");

    badge.classList.remove("open", "closed");
    badge.classList.add(aberto ? "open" : "closed");

    txt.textContent = aberto
      ? "Aberto agora · Franco da Rocha"
      : "Fechado agora · veja os horários";

    document
      .getElementById("col-semana")
      .classList.toggle("today", n.dia >= 1 && n.dia <= 5);
    document
      .getElementById("col-sabado")
      .classList.toggle("today", n.dia === 6);
  }

  atualizaStatus();
  setInterval(atualizaStatus, 60000);
})();
