// Lista de productos disponibles en la tienda
var productos = [
    { nombre: 'Mochila', precio: 350 },
    { nombre: 'Cartera', precio: 250 },
    { nombre: 'Tenis', precio: 1100 },
    { nombre: 'Gorra', precio: 200 }
];

// Carrito de compras (arreglo vacío)
var carrito = [];

// Función para mostrar el menú de productos
function mostrarMenu() {
    var menu = "===== Menú de la tienda =====\n";
    for (var i = 0; i < productos.length; i++) {
        menu += (i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    menu += (productos.length + 1) + ". Ver Carrito y Total\n";
    menu += (productos.length + 2) + ". Agregar nuevo producto (Solo Admin)\n";
    menu += (productos.length + 3) + ". Salir\n";
    menu += "=============================\n";
    return menu;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    var productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    console.log(`✅ Producto "${productoSeleccionado.nombre}" agregado al carrito.\n`);
}

// Función para mostrar el carrito y el total
function mostrarCarritoYTotal() {
    if (carrito.length === 0) {
        console.log("🛒 El carrito está vacío.\n");
    } else {
        var mensajeCarrito = "=== Carrito de compras ===\n";
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
            total += carrito[i].precio;
        }
        mensajeCarrito += `\n💰 Total a pagar: $${total}\n=========================\n`;
        console.log(mensajeCarrito);
    }
}

// Función para agregar un nuevo producto (solo Admin)
function agregarProducto() {
    var pass = prompt("🔐 Ingrese la contraseña de administrador:");
    if (pass === "admin123") {
        var desc = prompt("Ingrese la descripción del nuevo producto:");
        var precio = prompt("Ingrese el precio del nuevo producto:");
        precio = Number(precio);
        if (!isNaN(precio) && precio > 0) {
            productos.push({ nombre: desc, precio: precio });
            console.log(`✅ Producto "${desc}" agregado con un precio de $${precio}.\n`);
        } else {
            console.log("⚠️ Precio inválido. Producto no agregado.\n");
        }
    } else {
        alert("❌ Contraseña incorrecta. Acceso denegado.");
    }
}

// Bucle principal de la tienda
var opcion;
do {
    opcion = prompt(mostrarMenu());

    // Convertir la opción ingresada a un número
    opcion = Number(opcion);

    // Verificar si la opción es válida
    if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 3) {
        console.log("⚠️ Opción no válida, por favor intenta de nuevo.\n");
    } else if (opcion >= 1 && opcion <= productos.length) {
        // Si la opción es válida y corresponde a un producto, agregar al carrito
        agregarAlCarrito(opcion - 1);
    } else if (opcion === productos.length + 1) {
        // Si elige ver el carrito y el total
        mostrarCarritoYTotal();
    } else if (opcion === productos.length + 2) {
        // Si desea agregar un producto (Admin)
        agregarProducto();
    }
} while (opcion !== productos.length + 3); // El bucle continúa hasta que elige "Salir"

console.log("👋 Gracias por visitar la tienda. ¡Vuelve pronto!");


