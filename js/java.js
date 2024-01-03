const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 0);
});

// POPUP DE INICIAR SESIÓN
document.querySelector("#show-login").addEventListener("click", function (event) {
   event.stopPropagation();
   document.querySelector(".popup").classList.add("activeL");
   document.querySelector(".popup-cart").classList.remove("activeC"); // Cerrar el popup de carrito si está abierto
});
document.querySelector(".popup .close-btn").addEventListener("click", function () {
 document.querySelector(".popup").classList.remove("activeL");

});

// POPUP DE CARRITO DE COMPRAS
document.querySelector("#show-cart").addEventListener("click", function (event) {
   event.stopPropagation();
   document.querySelector(".popup-cart").classList.add("activeC");
   document.querySelector(".popup").classList.remove("activeL"); // Cerrar el popup de inicio de sesión si está abierto
});
document.querySelector(".popup-cart .close-btn-cart").addEventListener("click", function () {
   document.querySelector(".popup-cart").classList.remove("activeC");
});

// Cerrar popups al hacer clic fuera de ellos
document.addEventListener("click", function (event) {
   const popup = document.querySelector(".popup");
   const popupCart = document.querySelector(".popup-cart");

   if (!popup.contains(event.target)) {
      popup.classList.remove("activeL");
   }

   // if (!popupCart.contains(event.target)) {
   //    popupCart.classList.remove("activeC");
   // }
});

/* CARRITO DE COMPRAS */
// VARIABLES CARRITO
const carrito = document.querySelector("#carrito");
const listacarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaproductos = document.querySelector("#products");

// arreglo para articulos
let articuloCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
   listaproductos.addEventListener("click", agregar_producto);
   // ELIMINAR PRODUCTOS SIN PROPAGAR EL EVENTO HACIA ARRIBA
   carrito.addEventListener("click", function (e) {
      eliminarProd(e);
      e.stopPropagation();
   });
}

function agregar_producto(e) {
   e.preventDefault();
   if (e.target.classList.contains("bx-cart-add")) {
      prodSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement;
      leerDatosProd(prodSeleccionado);
   }
}

function eliminarProd(e) {
   if (e.target.classList.contains('borrar-producto')) {
      const productoEliminar = e.target.parentElement.parentElement;
      const productoTitulo = productoEliminar.querySelector('td:nth-child(2)').textContent;
      
      const existe = articuloCarrito.some(producto => (producto.titulo === productoTitulo && producto.cantidad > 1));
      if (existe) {
         const productos = articuloCarrito.map(producto => {
            if (producto.titulo === productoTitulo) {
               producto.cantidad--;
            }
            return producto;
         });
         articuloCarrito = [...productos];
      } else {
         articuloCarrito = articuloCarrito.filter(producto => producto.titulo !== productoTitulo);
      }

      carritoHTML();
   }
}

function leerDatosProd(producto) {
   infoProd = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector('h4').textContent,
      precio: producto.querySelector('p').textContent,
      cantidad: 1
   }

   const existe = articuloCarrito.some(producto => producto.titulo === infoProd.titulo);
   if (existe) {
      const productos = articuloCarrito.map(producto => {
         if (producto.titulo === infoProd.titulo) {
            producto.cantidad++;
         }
         return producto;
      });
      articuloCarrito = [...productos];
   } else {
      articuloCarrito = [...articuloCarrito, infoProd];
   }

   carritoHTML();
}

function carritoHTML() {
   limpiarHTML();

   articuloCarrito.forEach(producto => {
      const { imagen, titulo, precio, cantidad } = producto;
      const row = document.createElement('tr');
      row.innerHTML = `
         <td>
            <img src="${imagen}" width=69px></img>
         </td>
         <td>${titulo}</td>     
         <td>${precio}</td> 
         <td>${cantidad}</td>
         <td>
            <a href="#" class="borrar-producto" data-id=""> X </a>         
         </td>
      `;
      listacarrito.appendChild(row);
   });
}

function limpiarHTML() {
   while (listacarrito.firstChild) {
      listacarrito.removeChild(listacarrito.firstChild)
   }
}





                        /*CATEGORÍAS */
function showCategoryMen(categoryIdM) {
   // Ocultar todas las categorías
   var categories = document.querySelectorAll('.swiper');
   categories.forEach(function (category) {
       category.classList.remove('activeM');
   });

   // Mostrar la categoría seleccionada
   var selectedCategory = document.querySelector('.' + categoryIdM);
   selectedCategory.classList.add('activeM');
}
function showCategoryWomen(categoryIdW) {
   // Ocultar todas las categorías
   var categories = document.querySelectorAll('.swiper');
   categories.forEach(function (category) {
       category.classList.remove('activeW');
   });

   // Mostrar la categoría seleccionada
   var selectedCategory = document.querySelector('.' + categoryIdW);
   selectedCategory.classList.add('activeW');
}



                              