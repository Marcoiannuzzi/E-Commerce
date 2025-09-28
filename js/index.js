import { RenderCards } from './components/cards.js';
import { renderCartList } from './components/cartList.js';
import { initLocalStorage } from './storage/storage.js';

initLocalStorage();

function start() {
  RenderCards();
}

function  mostrarCarrito() {
  renderCartList();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();

  document.getElementById('mostrarCarrito').addEventListener('click', mostrarCarrito);

  document.getElementById('buscador').addEventListener('input', (e) =>
    RenderCards(e.target.value)
  );
}

import { showAboutModal } from './components/modal.js';

document.getElementById('linkSobreNosotros')?.addEventListener('click', (e) => {
  e.preventDefault();
  showAboutModal();
});

// Destacar link activo en el navbar según el scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function activateLink() {
    let index = sections.length;

    while (--index && window.scrollY + 80 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    const currentSection = sections[index]?.id;
    const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  activateLink();
  window.addEventListener("scroll", activateLink);
});
