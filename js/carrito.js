
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) // productos obtenidos del local storage
const contenedorCarritoVacio = document.querySelector("#carrito-vacio")  // elemento del carrito vacio
const contenedorCarritoProductos = document.querySelector("#carrito-productos") // elemento de los productos del carrito
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones") // elemento de los botones de acciones del carrito 
const contenedorCarritoComprado = document.querySelector("#carrito-comprado") // elemento del carrito comprado
const botonesCategorias = document.querySelectorAll(".boton-categoria");     // se obtiene los botones con id=boton-categoria del index.html
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); // se obtienen los botones de eliminar del carrito de productos
const botonVaciarCarrito = document.querySelector("#vaciar-carrito"); // boton para la accion de vaciar carrito
const botonComprarCarrito = document.querySelector("#comprar-carrito"); // boton para la accion de comprar carrito

const total = document.querySelector("#total"); // etiqueta del total del carrito de productos

// Funcion para calcular el total del carrito de productos

function calculaTotal() {
    let nuevoTotal = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad*producto.precio,0);
    total.innerHTML = nuevoTotal;
}

// Funcion para eliminar productos del carrito

function eliminarDelCarrito(e) {
    Toastify({
        text: "producto eliminado",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
            background: "linear-gradient(to right, #4b33a8, #5539c7)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize:".75rem"
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // se obtiene el indice que coincide con el id del elemento
    productosEnCarrito.splice(index,1); // se elimina el elemento del carrito
    cargarProductosCarrito(); // se vuelve a cargar los productos del carrito
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito)); // se graba en el local storage los productos actuales del carrito
}

// Funcion para activar los botones de eliminar del carrito de productos

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click",eliminarDelCarrito); // se activa la funcion de eliminar el producto del carrito
    })
}

// Funcion para cargar los productos del carrito

function cargarProductosCarrito() {
    if(productosEnCarrito.length > 0) { // si el carrito no esta vacio
        contenedorCarritoVacio.classList.add('disabled'); // se oculta el elemento que hace referencia al carrito vacio
        contenedorCarritoProductos.classList.remove('disabled'); // se muestra el elemento de los productos en el carrito
        contenedorCarritoAcciones.classList.remove('disabled'); // se muestra el elemento de las acciones de los productos en el carrito
        contenedorCarritoComprado.classList.add('disabled');  // se oculta el elemento del carrito comprado
    
        contenedorCarritoProductos.innerHTML = ""; // se limpia los productos del carrito

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto"); // se crea la clase producto en el div
            div.innerHTML = `   
                            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>${producto.precio * producto.cantidad}</p>
                            </div>
                            <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
                        `;
            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.classList.remove('disabled'); // se muestra el elemento del carrito vacio
        contenedorCarritoProductos.classList.add('disabled'); // se oculta el elemento de los productos del carrito
        contenedorCarritoAcciones.classList.add('disabled'); // se oculta el elemento de las acciones del carrito
        contenedorCarritoComprado.classList.add('disabled'); // se oculta el elemento del carrito comprado
    }
    actualizarBotonesEliminar(); // se activa las funciones de los botones de eliminar producto
    calculaTotal(); // se calcula el total
}

cargarProductosCarrito(); // se inicia cargando los productos del carrito

// Funcion para vaciar el carrito de productos

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estas seguro de borrar todos tus productos?",
        html: `Se eliminaran ${productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0)} productos del carrito`,
        icon: "question",
        showCancelButton:true,
        focusConfirm: false,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0; // se vacea el carrito
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito)); // se graba en el localstorage el arreglo vacio del carrito de productos
            cargarProductosCarrito(); // se actualiza la carga de productos del carrito mostrando la etiqueta del carrito vacio (condicional else de la funcion cargarProductosCarrito)
        }
    });
    
}

// Funcion para comprar el carrito de productos

function comprarAhora() {
    Swal.fire({
        title: "¿Estas seguro de comprar todos tus productos?",
        html: `Se compraran ${productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0)} productos del carrito`,
        icon: "question",
        showCancelButton:true,
        focusConfirm: false,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0; // se vacea el carrito
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito)); // se graba en el localstorage el carrito vacio
        
            contenedorCarritoVacio.classList.add('disabled'); // se oculta el elemento del carrito vacio
            contenedorCarritoProductos.classList.add('disabled'); // se oculta el elemento del carrito de productos
            contenedorCarritoAcciones.classList.add('disabled'); // se oculta el elemento de las acciones del carrito
            contenedorCarritoComprado.classList.remove('disabled'); // se muestra el elemento del carrito comprado
        }
    });
}

// Activacion de funciones al hacer clic en los botones

botonVaciarCarrito.addEventListener("click",() => {
    vaciarCarrito();
})

botonComprarCarrito.addEventListener("click",() => {
    comprarAhora();
})
