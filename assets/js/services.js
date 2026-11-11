const header = document.querySelector("header");
      const menuToggle = document.querySelector(".menu-toggle");
      const navLinks = document.querySelector(".nav-links");
      const scrollTopButton = document.getElementById("btn-scroll-top");

      function updateScrollUI() {
        const scrolled = window.scrollY > 30;
        header.classList.toggle("scrolled", scrolled);
        scrollTopButton.classList.toggle("show", window.scrollY > 600);
      }
      window.addEventListener("scroll", updateScrollUI, { passive: true });
      updateScrollUI();

      menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("open");
        navLinks.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Fechar menu" : "Abrir menu",
        );
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menuToggle.classList.remove("open");
          navLinks.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Abrir menu");
        });
      });

      scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      document
        .querySelectorAll(".reveal")
        .forEach((element) => revealObserver.observe(element));