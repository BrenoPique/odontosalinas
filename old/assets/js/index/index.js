// =========================
// Carrossel Equipe
// =========================

let slideIndex = 0;

const wrapper = document.querySelector(".carousel-wrapper");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");

// Botões
function mudarSlide(n) {
  slideIndex += n;
  atualizarCarousel();
}

function irParaSlide(n) {
  slideIndex = n;
  atualizarCarousel();
}

// Atualização principal
function atualizarCarousel() {
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
  wrapper.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}

// Swipe mobile
let startX = 0;
let endX = 0;

wrapper.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

wrapper.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      mudarSlide(1);
    } else {
      mudarSlide(-1);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarCarousel();
});

// =========================
// Scroll to Top
// =========================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// quando a tela tiver no inicio nao aparece o scroll to top, quando tiver descido aparece
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('btn-scroll-top');
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// =========================
// Menu Mobile
// =========================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    // Alterna a classe 'active' no botão (faz o X) e no menu (abre/fecha)
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Trava o scroll do site no fundo quando o menu está aberto
    body.classList.toggle('no-scroll'); 
}

// Clica no botão hambúrguer/X
menuToggle.addEventListener('click', toggleMenu);

// Fecha o menu suavemente ao clicar em qualquer link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});
