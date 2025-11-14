// Altura do cabeçalho
const header = document.querySelector("header");
const headerHeight = header ? header.offsetHeight : 0;

// Efeito de aparição suave ao rolar
const cards = document.querySelectorAll('.info-card');
const imgsReveal = document.querySelectorAll('.img-container .img');
const carousels = document.querySelectorAll(".carousel");

function showElements() {
  const trigger = window.innerHeight * 0.85;

  function revealItem(item) {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) item.classList.add('show');
  }

  cards.forEach(revealItem);
  imgsReveal.forEach(revealItem);
  carousels.forEach(revealItem);
}

window.addEventListener('scroll', showElements);
showElements();


// ===== MENU =====
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", event => {
    const menu = document.getElementById("menu");
    menu.classList.remove("show");

    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      event.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});


// ===== CARROSSEL MOBILE =====
const carousel = document.querySelector('.carousel-inner');
const imgs = document.querySelectorAll('.carousel-inner img');
const dotsContainer = document.querySelector('.dots');

let index = 0;
let startX = 0;
let moveX = 0;
let isDragging = false;

// Criar bolinhas
imgs.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
  carousel.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// toque começou
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

// arrastando
carousel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  moveX = e.touches[0].clientX - startX;
});

// soltou o dedo
carousel.addEventListener('touchend', () => {
  isDragging = false;

  if (moveX < -50) {
    index = (index + 1) % imgs.length;
  } else if (moveX > 50) {
    index = (index - 1 + imgs.length) % imgs.length;
  }

  updateCarousel();
  moveX = 0;
});
