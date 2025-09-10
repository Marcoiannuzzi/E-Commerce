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
                <button type="button" class="btn btn-success" id="addToCartBtn">
                  <i class="fas fa-cart-plus me-2"></i> Agregar al carrito
                </button>
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
}

function formatPrice(n){ const x=Number(n); return Number.isNaN(x)?n:x.toFixed(2); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
