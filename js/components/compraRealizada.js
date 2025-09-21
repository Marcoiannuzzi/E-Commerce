

export function compraRealizada(total) {
    const container = document.querySelector('#confirmModal');
    if (!container) return;
       const inst = bootstrap.Modal.getInstance(container);
    if (inst) inst.hide();
    const template = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Compra realizada</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>El pedido se ha realizado con exito.</p>
        <p>El total de su compra es de $${total}.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
      </div>
    </div>
  </div>
  `;
    container.innerHTML = template;
    const modalEl = bootstrap.Modal.getOrCreateInstance(container);
    modalEl.show();
}