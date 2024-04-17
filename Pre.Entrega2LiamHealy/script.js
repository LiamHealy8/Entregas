const listar = (lista, propiedad1, propiedad2) => lista.map(startUp => startUp[propiedad1] + " - " + startUp[propiedad2]).join("\n")

function main() {
    
    let startUp = [
        { id: 1, nombre: "Buzo oversize", color: "negro", categoria: "hombre", stock: 2, precio: 10000 },
        { id: 2, nombre: "Remera", color: "blanco", categoria: "hombre", stock: 15, precio: 8000 },
        { id: 3, nombre: "Remera oversize", color: "Blanco", categoria: "hombre", stock: 4, precio: 10000 },
        { id: 4, nombre: "Remera manga larga", color: "Rojo", categoria: "hombre", stock: 4, precio: 10000 },
        
        
        { id: 5, nombre: "Buzo mujer", color: "Rosa", categoria: "mujer", stock: 4, precio: 10000 },
        { id: 6, nombre: "Polera mujer", color: "Gris", categoria: "mujer", stock: 4, precio: 10000 },
        { id: 7, nombre: "Buzo mujer", color: "Rosa", categoria: "mujer", stock: 4, precio: 10000 },
        { id: 8, nombre: "Buzo mujer", color: "Rosa", categoria: "mujer", stock: 4, precio: 10000 },
        
        
        { id: 9, nombre: "Zapatillas para correr", color: "rojas", categoria: "unisex", stock: 2, precio: 20000 },
        { id: 10, nombre: "Zapatillas", color: "negro", categoria: "unisex", stock: 5, precio: 30000 },
        { id: 11, nombre: "Zapatillas niños", color: "negro", categoria: "niños", stock: 4, precio: 10000 },
        
        { id: 12, nombre: "Clazones x4", color: "varios", categoria: "hombre", stock: 6, precio: 3000 },
        { id: 13, nombre: "Medias x 4", color: "negro", categoria: "unisex", stock: 9, precio: 2500 },
        { id: 14, nombre: "Gorra 1", color: "Negra", categoria: "unisex", stock: 4, precio: 1500 },
        { id: 15, nombre: "Gorra 2", color: "Gris", categoria: "unisex", stock: 4, precio: 1500 },
    ]
    
    
    let carrito = []
    let opcion
    do {
        
        opcion = Number(prompt("1 - agregar al carrito\n2 - filtrar por categoria\n3- para consultar precio\n4- para finalizar compra\n0 - salir"))
        
        if (opcion === 1) {
            agregarAlCarrito (startUp, carrito)
        } else if (opcion === 2) {
            filtarPorCategorias (startUp)
        } else if (opcion === 3) {
            let precioProducto = Number(prompt("Selecione id del producto para saber precio" + ("\n") + listar(startUp, "id", "nombre")))
            let precioBuscado = startUp.find(startUp => startUp.id === precioProducto)
            alert("precio: " + precioBuscado.precio + " Nombre: " + precioBuscado.nombre + " Stock: " + precioBuscado.stock)
        } else if (opcion === 4) {
            let total = carrito.reduce((acum, productoBuscado) => acum + productoBuscado.subtotal, 0)
            alert("El total de su compra es de : " + total)
        }
        
    } while (opcion !== 0);
}



function filtarPorCategorias (startUp) {
    let categorias = []
    startUp.forEach(startUp => {
        if (!categorias.includes(startUp.categoria)) {
            categorias.push(startUp.categoria)
        }
    })
    
    let categoria
    let salida
    
    do {
        categoria = prompt("Ingrese alguna de las siguentes categorias: " + categorias.join (", "))
        if (categorias.includes(categoria)) {
            let productosFiltrados = startUp.filter(startUp => startUp.categoria === categoria)
            salida = productosFiltrados.map(startUp => startUp.nombre).join("\n")
        } else {
            alert("Categoria no existe")
        }
        
    } while (!categorias.includes(categoria));
    
    alert(salida)
}

function agregarAlCarrito(startUp, carrito) {
    let opcion = Number(prompt(listar(startUp, "id", "nombre")))
    
    let productoBuscado = startUp.find(startUp => startUp.id === opcion)
    let indexProducto = carrito.findIndex(startUp => startUp.id === opcion)
    
    if (productoBuscado) {
        if (indexProducto !== -1) {
            carrito[indexProducto].unidades++
            carrito[indexProducto].subtotal = [indexProducto].precio * carrito[productoBuscado].unidades
        } else {
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precio: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
        }
    } else if (opcion !== 0) {
        alert("Id ingresado no existe")
        
    }
    
}
main()