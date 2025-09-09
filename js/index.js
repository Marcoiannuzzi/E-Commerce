import { RenderCards } from './components/cards.js';

function start() {
  RenderCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
