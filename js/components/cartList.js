import {
  getFromLocalStorage,
  setItemToLocalStorage,
} from "../storage/storage.js";

import { compraRealizada } from "./compraRealizada.js";

export function renderCartList() {
  const cart = getFromLocalStorage();
  let template = `
    <div class="modal-header">
        <h5 class="modal-title" id="carritoModalLabel">Carrito</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
    </div>
    <div class="modal-body h-60 scroll">
        <ol class="list-group list-group-numbered">
            ${cart.items
              .map(
                (item) => `
                <li class="list-group-item d-flex justify-content-between align-items-end">
                    <div class="ms-2 me-auto">
                        <div class="d-flex flex-column justify-content-start align-items-start">
                            <img src="${item.image}" alt="${item.title}" class="w-25 h-25 img-fluid">
                            <div class="fw-bold">${item.title}</div>
                        </div>
                    </div>
                    <div class="d-flex flex-column justify-content-end align-items-end h-100">
                        <div class="d-flex justify-content-center gap-4">
                            <span class="fw-bold">Cantidad:</span>
                            <span class="badge rounded-pill bg-primary">${item.quantity}</span>
                        </div>
                        <div class="d-flex justify-content-start gap-4 my-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold">$${item.price * item.quantity}</span>
                        </div>
                        <div class="d-flex justify-content-end align-items-end gap-4 my-3">
                            <button class="btn btn-outline-danger" id="removeItem-${item.id}">Borrar</button>
                        </div>
                        
                    </div>
                        
                </li>`
              )
              .join("")}
        </ol>
    </div>
    <div class="modal-footer d-flex justify-content-between align-items-end">
        <div class="d-flex justify-content-start align-items-start gap-4 my-3">
          <P id="confirmarVaciarCarrito" hidden class="text-danger">¿Estás seguro de que deseas vaciar el carrito?</P>
          <button class="btn btn-success" hidden id="noVaciarCarrito" data-bs-dismiss="modal">Continuar Comprando</button>
          <button class="btn btn-danger" id="vaciarCarrito" onclick=vaciarCarrito();>Vaciar Carrito</button>
        </div>
        <div id="total" >
            <div class="d-flex justify-content-end gap-4 my-3">
                <span class="fw-bold">Total:</span>
                <span class="fw-bold">$${cart.total.toFixed(2)}</span>
            </div>
            </div>    
            <button id="comprar" type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="abrirModalCompraRealizada(${cart.total.toFixed(2)})">¡Comprar!</button>
    </div>
   `;

  if( cart.items.length === 0){
   template = `
    <div class="modal-header">
        <h5 class="modal-title" id="carritoModalLabel">Carrito</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
    </div>
    <div class="modal-body h-60 scroll d-flex justify-content-center">
      <h6> Carrito vacío</h6>
    </div>
    </div>
   `;
  }
  
  
  document.querySelector("#carritoModal .modal-content").innerHTML = template;
  

  borrarProductos();
}

function borrarProductos() {
  const cart = getFromLocalStorage();
  cart.items.forEach(item => {
    document.getElementById(`removeItem-${item.id}`).addEventListener("click", () => {
      removeItem(item.id);
    });
  });
}

function removeItem(id) {
  const cart = getFromLocalStorage();
  const itemToRemove = cart.items.find(item => item.id === id);
  if (itemToRemove) {
    const index = cart.items.indexOf(itemToRemove);
    cart.items.splice(index, 1);
    cart.total -= itemToRemove.price * itemToRemove.quantity;
    setItemToLocalStorage(cart);
    renderCartList();
  }
}


function vaciarCarrito() {
  const alerta = document.getElementById("confirmarVaciarCarrito");
  const noVaciarCarrito= document.getElementById("noVaciarCarrito");
  const total = document.getElementById("total");
  const comprar= document.getElementById("comprar");
  noVaciarCarrito.hidden = false;
  alerta.hidden = false;
  total.hidden = true;
  comprar.hidden = true;
  const button = document.getElementById("vaciarCarrito")
  button.addEventListener("click", () => {
    ConfirmarVaciarCarrito();
  });
  document.getElementById("noVaciarCarrito").addEventListener("click", () => {
    noVaciarCarrito.hidden = true;
    alerta.hidden = true;
    total.hidden = false;
    comprar.hidden = false;
    resetFunciones()
  });
}

function ConfirmarVaciarCarrito() {
  const cart = getFromLocalStorage();
  cart.items = [];
  cart.total = 0;
  setItemToLocalStorage(cart);
  renderCartList();
}

function resetFunciones(){
    document.getElementById("vaciarCarrito").addEventListener("click", () => {
    vaciarCarrito();
  });
   renderCartList();
}


function abrirModalCompraRealizada(total) {
  const cart = getFromLocalStorage();
  cart.items = [];
  cart.total = 0;
  setItemToLocalStorage(cart);
  compraRealizada(total);
}