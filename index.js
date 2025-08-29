// Variables
let productos = [];
let carrito = [];
let listaProductos = document.getElementById('listaProductos');



cargarProductos();




// Funciones
function cargarProductos(){
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data =>{
    productos = [...data];
    console.log(productos);
    generarCards(productos);
  });
}

function generarCards(productos){
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${producto.image}" class="card-img-top rounded img-fluid p-5" alt="imagen de Producto">
            <div class="card-body">
                <h5 class="card-title">${producto.title}</h5>
                <p class="card-text">${producto.description}</p>
                <button class="btn btn-primary" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>
        `;

        if(listaProductos){
            listaProductos.appendChild(card);
        }

        
    });
}