let startUp = [
    { id: 1, nombre: "Buzo oversize", color: "negro", categoria: "hombre", stock: 2, precio: 10000, rutaImagen:"buzo-h.jpg"},
    { id: 2, nombre: "Remera", color: "blanco", categoria: "hombre", stock: 15, precio: 8000, rutaImagen:"remera-h.jpg"},
    { id: 3, nombre: "Remera oversize", color: "Blanco", categoria: "hombre", stock: 4, precio: 10000, rutaImagen:"remera-over.jpg"},
    { id: 4, nombre: "Camisas", color: "Rojo", categoria: "hombre", stock: 4, precio: 10000, rutaImagen:"camisas h.jpg"},
    
    
    { id: 5, nombre: "Buzo mujer", color: "Rosa", categoria: "mujer", stock: 4, precio: 10000, rutaImagen:"buzo-mujer.jpg"},
    { id: 6, nombre: "Sweater mujer", color: "Gris", categoria: "mujer", stock: 4, precio: 10000, rutaImagen:"SweaterM.jpg"},
    { id: 7, nombre: "Remera mujer", color: "Rosa", categoria: "mujer", stock: 4, precio: 10000, rutaImagen:"remeras-m.jpg"},
    
    { id: 10, nombre: "Zapatillas", color: "negro", categoria: "hombre", stock: 5, precio: 30000, rutaImagen:"zapatillas.jpg"},
    { id: 11, nombre: "Zapatos", color: "negro", categoria: "hombre", stock: 4, precio: 10000, rutaImagen:"zapatos.jpg"},
    
    
    { id: 14, nombre: "Gorra 1", color: "Negra", categoria: "accesorios", stock: 4, precio: 1500, rutaImagen:"gorra.jpg"},
    { id: 15, nombre: "Corbatas", color: "Varios", categoria: "accesorios", stock: 4, precio: 1500, rutaImagen:"corbata.jpg"},

]

principal(startUp)

function principal(productos) {
    renderizarCarrito()

    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", () => filtrarYRenderizar(productos))

    let inputBusqueda = document.getElementById("inputBusqueda")
    inputBusqueda.addEventListener("keypress", (e) => filtrarYRenderizarEnter(productos, e))

    let botonVerOcultar = document.getElementById("botonVerOcultar")
    botonVerOcultar.addEventListener("click", verOcultar)

    renderizarProductos(productos)

    let botonComprar = document.getElementById("botonComprar")
    botonComprar.addEventListener("click", finalizarCompra)

    let botonesFiltro = document.getElementsByClassName("botonFiltro")
    for (const botonFiltro of botonesFiltro) {
        botonFiltro.addEventListener("click", (e) => filtrarProductoCategoria(e, productos))
    }
}

function filtrarProductoCategoria(e, productos) {
    let value = e.target.value
    let productosFiltados = productos.filter(producto => producto.categoria === value)
    renderizarProductos(productosFiltados)
}


function verOcultar(e) {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    contenedorCarrito.classList.toggle("oculto")
    contenedorProductos.classList.toggle("oculto")

    if (e.target.innerText === "VER CARRITO") {
        e.target.innerText = "VER PRODUCTOS"
    } else {
        e.target.innerText = "VER CARRITO"
    }
}

function obtenerCarritoLS() {
    let carrito = []
    let carritoLS = JSON.parse(localStorage.getItem("carrito"))
    if (carritoLS) {
        carrito = carritoLS
    }
    return carrito
}

function finalizarCompra() {
   
   
    localStorage.removeItem("carrito")
    renderizarCarrito([])
}

function filtrarYRenderizarEnter(productos, e) {
    if (e.keyCode === 13) {
        let productosFiltrados = filtrarProductos(productos)
        renderizarProductos(productosFiltrados)
    }
}

function filtrarYRenderizar(productos) {
    let productosFiltrados = filtrarProductos(productos)
    renderizarProductos(productosFiltrados ? productosFiltrados : productos)
}

function filtrarProductos(productos) {
    let inputBusqueda = document.getElementById("inputBusqueda")
    return productos.filter(producto => producto.nombre.includes(inputBusqueda.value) || producto.categoria.includes(inputBusqueda.value)) 
}

function renderizarProductos(productos) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    productos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")

        tarjetaProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="./img/${producto.rutaImagen}"/>
            <h4>Precio: ${producto.precio}</h4>
            <p>Stock: ${producto.stock}</p>
            <button id=botonCarrito${producto.id}>Agregar al carrito</button>
        `

        contenedorProductos.appendChild(tarjetaProducto)

        let botonAgregarAlCarrito = document.getElementById("botonCarrito" + producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos))
    });
}

function agregarProductoAlCarrito(e, productos) {
   
    tostadas("Producto agregado", 1000, "left", "top")

    let carrito = obtenerCarritoLS()
    let idDelProducto = Number(e.target.id.substring(12))

    let posProductoEnCarrito = carrito.findIndex(producto => producto.id === idDelProducto)
    let productoBuscado = productos.find(producto => producto.id === idDelProducto)

    if (posProductoEnCarrito !== -1) {
        carrito[posProductoEnCarrito].unidades++
        carrito[posProductoEnCarrito].subtotal = carrito[posProductoEnCarrito].precioUnitario * carrito[posProductoEnCarrito].unidades
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito()
}

function renderizarCarrito() {
    let carrito = obtenerCarritoLS()
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.className = "tarjetaProductoCarrito"

        tarjetaProductoCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
            <button id=eliminar${producto.id}>ELIMINAR</button>
        `
        contenedorCarrito.appendChild(tarjetaProductoCarrito)

        let botonEliminar = document.getElementById("eliminar" + producto.id)
        botonEliminar.addEventListener("click", eliminarProductoC)
    })
}

function eliminarProductoC(e) {
    tostadas("Producto eliminado", 1000, "left", "top")
    
    let carrito = obtenerCarritoLS()
    let id = Number(e.target.id.substring(8))
    carrito = carrito.filter(producto => producto.id !== id)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    e.target.parentElement.remove()


}

function tostadas(text, duration, position, gravity) {
    Toastify({
        text,
        duration,
        newWindow: true,
        close: true,
        gravity,
        position,
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:"black"
          
        },
      }).showToast();
    
}





// function alertas(title, icon, text) {
//     Swal.fire({
//         icon,
//         title,
//         text,
        
//       });
// }
