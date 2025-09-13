import { RenderCards } from './components/cards.js';
import { initLocalStorage } from './storage/storage.js';

initLocalStorage();

function start() {
  RenderCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
