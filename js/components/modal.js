import { getFromLocalStorage, setItemToLocalStorage } from "../storage/storage.js";
import { contador, setupContador } from "./contador.js";

export function Modal(p) {
  const container = document.querySelector('#productModal');
  if (!container || !p) return;

  const existing = document.getElementById('detalleModal');
  if (existing) {
    const inst = bootstrap.Modal.getInstance(existing);
    if (inst) inst.hide();
    existing.remove();
    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('paddingRight');
  }

  let cart = getFromLocalStorage();
  const existingItem = cart.items.find(item => item.id === p.id);
  let quantity = existingItem ? existingItem.quantity : 0;

  const template = `
    <div class="modal fade" id="detalleModal" tabindex="-1"
         role="dialog" aria-modal="true" aria-labelledby="detailTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered product-modal-compact">
        <div class="modal-content custom-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="detailTitle">${escapeHtml(p.title || '')}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="row g-4 align-items-start">
              <div class="col-md-5">
                <img class="img-fluid rounded object-fit-contain"
                     src="${p.image || ''}"
                     alt="${escapeHtml(p.title || 'Imagen de producto')}">
              </div>
              <div class="col-md-7 text-start">
                <p class="text-muted">${escapeHtml(p.description || '')}</p>
                <div class="h5 mb-3">$${formatPrice(p.price)}</div>
                <div class="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3">
                  <button type="button" class="btn btn-success" id="addToCartBtn">
                  <i class="fas fa-cart-plus me-2"></i> Agregar al carrito
                  </button>
                  ${contador(p.id, quantity)}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = template;

  const modalEl = document.getElementById('detalleModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  setupContador(p.id, existingItem?.quantity || 1);

  let addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      p.quantity = parseInt(document.getElementById(`valorBtn-${p.id}`)?.textContent) || 1;
      if (existingItem) {
        existingItem.quantity = p.quantity;
        cart.total += p.price * p.quantity;
      } else {
        cart.items.push(p);
        cart.total += p.price * p.quantity;
      }
      setItemToLocalStorage(cart);
    
      addToCartBtn.disabled = true;
      addToCartBtn.innerHTML = '<i class="fas fa-check me-2"></i> Agregado al carrito';

      setTimeout(() => {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i class="fas fa-cart-plus me-2"></i> Agregar al carrito';
      }, 1000);

    });
  }
}

function formatPrice(n){ const x=Number(n); return Number.isNaN(x)?n:x.toFixed(2); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
