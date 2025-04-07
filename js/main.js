let productos = [];

//Obteniendo los productos de un archivo JSON y llamandolo usando fetch

fetch('./js/productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data 
        cargarProductos(productos)
    })

const contenedorProductos = document.querySelector("#contenedor-productos"); // se obtiene el contenedor con id=contenedor-productos del index.html
const botonesCategorias = document.querySelectorAll(".boton-categoria");     // se obtiene los botones con id=boton-categoria del index.html
const tituloPrincipal = document.querySelector("#titulo-principal");    // se obtiene los encabezados h2 que tienen el id titulo-principal
const numerito = document.querySelector("#numerito"); // se obtiene el elemento html con el numero de items agregados al carrito

// Seteando al arreglo de productos en el carrito de compras

let productosEnCarrito; 

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); 

// Funcion para actualizar el numero de items del carrito

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0);
    numerito.innerHTML = nuevoNumerito;
}

if(productosEnCarritoLS){ // si ya hay productos en el carrito del local storage
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // se agregan esos productos en el arreglo
    actualizarNumerito(); // se actualiza el numero de items del carrito
} else {
    productosEnCarrito = []; // empieza como un arreglo vacio el carrito de productos
}

//Funcion para agregar productos al carrito
function agregarAlCarrito(e) {
    Toastify({
        text: "producto agregado",
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
    const productoAgregado = productos.find(producto => producto.id === idBoton); // se busca el producto agregado

    if(productosEnCarrito.some(producto => producto.id === idBoton)){ // si ya existe el producto que se va a agregar en el carrito, solo se le aumenta su cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++;
    } else { //sino se lo agrega al carrito
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito(); //se actualiza el contador de items del carrito
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito)); // se graba el arreglo en el localstorage
}

// Funcion para activar los botones de agregar producto al carrito

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregarAlCarrito);
    })
}

// Funcion para cargar los productos

function cargarProductos(productosElegidos) { 
    contenedorProductos.innerHTML = ''; // se limpia los registros anteriores
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");  // se crea un div
        div.classList.add("producto"); // se crea la clase producto en el div
        div.innerHTML = `   
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div); // se añade el div al contenedor div con id contenedor-productos
    })
    actualizarBotonesAgregar(); // se activa las funciones de agregar producto en cada elemento del arreglo productos
}

cargarProductos(productos);

// Mostrar productos por categoria con los botones del aside o menu

botonesCategorias.forEach(boton => {
    boton.addEventListener("click",(e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active")); // se remueve la clase active cuando se selecciona un boton
        e.currentTarget.classList.add("active"); // se le añade la clase active al boton seleccionado
        if(e.currentTarget.id !== "todos") { // se cambia el nombre del titulo de la pagina si el id actual es distinto al id de la pagina todos
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre; // se le coloca en el titulo de la pagina el nombre de la categoria en base al producto encontrado por el id actual

            const productosCategoria = productos.filter(producto => producto.categoria.id === e.currentTarget.id); // solo se quedan con productos que tengan el mismo id de la categoria del id actual
            cargarProductos(productosCategoria); // se cargan los productos en la pagina con la categoria actual
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos); // se carga todos los productos
        }
    })
})







