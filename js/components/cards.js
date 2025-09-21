import { getProducts } from '../services/api.js';
import { Modal } from './modal.js';
import { getFromLocalStorage, setItemToLocalStorage } from "../storage/storage.js";

export function RenderCards(filtro = '') {
  const list = document.querySelector('#listaProductos');
  if (!list) return;

  getProducts()
    .then((products) => {
      let template = '';
      if(filtro) {
        products = products.filter(p => p.title.toLowerCase().includes(filtro.toLowerCase()));
      }
      products.forEach((p) => {
        template += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card product-card h-100" data-id="${p.id}" tabindex="0" aria-label="Ver detalle de ${escapeHtml(p.title)}">
              <img src="${p.image}" class="card-img-top product-media" alt="${escapeHtml(p.title)}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title product-title text-truncate w-100">${escapeHtml(p.title)}</h5>
                <div class="product-price fw-bold mb-2">$${formatPrice(p.price)}</div>
                <button class="btn btn-primary mt-auto" type="button" data-role="add-to-cart" aria-label="Agregar ${escapeHtml(p.title)} al carrito">Agregar al carrito</button>
              </div>
            </div>
          </div>
        `;
      });

      list.innerHTML = template;

      list.addEventListener('click', (e) => {
        if (e.target.closest('button[data-role="add-to-cart"]')) return;
        const card = e.target.closest('.product-card');
        if (!card || !list.contains(card)) return;
        const id = Number(card.dataset.id);
        const prod = products.find((pp) => pp.id === id);
        if (prod) Modal(prod);
      });

      list.querySelectorAll('button[data-role="add-to-cart"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
            if (btn) {
                const id = Number(btn.closest('.product-card').dataset.id);
                const p = products.find((pp) => pp.id === id);
                if (!p) return;
                let cart = getFromLocalStorage();
                const existingItem = cart.items.find(item => item.id === p.id);
                if (existingItem) {
                  existingItem.quantity += 1;
                  cart.total += p.price * 1;
                } else {
                  p.quantity = 1;
                  cart.items.push(p);
                  cart.total += p.price * 1;
                }
                setItemToLocalStorage(cart);
              
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-check me-2"></i> Comprando...';
          
                setTimeout(() => {
                  btn.disabled = false;
                  btn.innerHTML = '<i class="fas fa-cart-plus me-2"></i> Agregar al carrito';
                }, 1000);
            }
        }); 
      });

      list.querySelectorAll('.product-card').forEach((cardEl) => {
        cardEl.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          const active = document.activeElement;
          if (active && active.closest('button[data-role="add-to-cart"]')) return;
          e.preventDefault();   
          const id = Number(cardEl.dataset.id);
          const prod = products.find((pp) => pp.id === id);
          if (prod) Modal(prod);
        });
      });
    })
    .catch(() => {
      list.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger">No se pudieron cargar los productos.</div>
        </div>
      `;
    });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[s]));
}

function formatPrice(n) {
  const num = Number(n);
  return Number.isNaN(num) ? n : num.toFixed(2);
}
