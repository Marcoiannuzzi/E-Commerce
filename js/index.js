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
