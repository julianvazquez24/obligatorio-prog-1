document.addEventListener('DOMContentLoaded', documentOnLoad);

//CREAR ARRAY PARA JUEGOS Y CARRITO
// const JUEGOS = [
//   { id: 1, nombre: "Red Dead Redemption 2", descripcion:"Una historia del oeste sobre bandidos y lealtad.", precio: 50, urlImagen: "images/reddeadredemption.jpg", tipo: "Aventura", categoria:"M"},
//   { id: 2, nombre: "Resident Evil 2", descripcion:" Sobrevive al horror en una ciudad infestada de zombis.", precio: 50, urlImagen: "images/residentevil2.jpg", tipo: "Accion", categoria:"M" },
//   { id: 3, nombre: "NBA 2K24", descripcion:"Realismo extremo en el baloncesto profesional.", precio: 50, urlImagen: "images/NBA2K24.webp", tipo: "Deporte", categoria:"E" },
//   { id: 4, nombre: "Minecraft", descripcion:"Crea y explora mundos de bloques infinitos.", precio: 50, urlImagen: "images/minecraft.jpg", tipo: "Aventura", categoria:"E10+" },
//   { id: 5, nombre: "Grand Theft Auto V", descripcion:"Vive una vida criminal en Los Santos.", precio: 50, urlImagen: "images/grandtheftautoV.jpg", tipo: "Aventura", categoria:"M" },
//   { id: 6, nombre: "Far Cry Primal", descripcion:"Sobrevive y lucha en la Edad de Piedra.", precio: 50, urlImagen: "images/farcryprimal.avif", tipo: "Aventura", categoria:"M" },
//   { id: 7, nombre: "EAFC 24", descripcion:" Experiencia futbolística auténtica y actualizada.", precio: 50, urlImagen: "images/EAFC24.avif", tipo: "Deporte", categoria:"E" },
//   { id: 8, nombre: "Cyberpunk 2077", descripcion:" Futuro distópico con alta tecnología y acción.", precio: 45, urlImagen: "images/cyberpunk2077.jpg" , tipo: "Aventura", categoria:"M"},
//   { id: 9, nombre: "Dota 2", descripcion:" Estrategia y combate en tiempo real entre equipos.", precio: 30, urlImagen: "images/dota2.webp" , tipo: "Aventura", categoria:"M"},
//   { id: 10, nombre: "Rust", descripcion:"Sobrevive contra jugadores y la naturaleza.", precio: 60, urlImagen: "images/rust.webp" , tipo: "Accion", categoria:"M"},
//   { id: 11, nombre: "Assasins Creed Origins", descripcion:" Descubre el origen de los Asesinos en Egipto.", precio: 60, urlImagen: "images/assasinscreedorigins.webp" , tipo: "Aventura", categoria:"M"},
//   { id: 12, nombre: "Formula 1 2022", descripcion:"Simulación realista de carreras de F1.", precio: 40, urlImagen: "images/formula1.jpg" , tipo: "Deporte", categoria:"E"},
// ]


//Trae juegos de LS y los pone en constante JUEGOS
const JUEGOS = traerJuegosStorage();

function traerJuegosStorage() {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}


let CARRITO = []




// necesitamos hacer una funcion que recorra la constante de juego para cuando agreguemos un elemento al carrito lo identifique por la id
function buscarJuegos(idJuego) {
  for (let i = 0; i < JUEGOS.length; i++) {
    if (JUEGOS[i].id == idJuego) {
      return JUEGOS[i];
    }
  }
  return null;
}

//Esta funcion se corre cuando carga el documento y crea la lista de juegos ademas de un eventlistener para el comprar carrito
function documentOnLoad() {

  let ul = document.getElementById("lista-juegos");
  ul.innerHTML = "";

  for (let i = 0; i < JUEGOS.length; i++) {
    let li = crearListaJuegos(JUEGOS[i]);
    ul.appendChild(li); 
  }

  document.getElementById("comprar-carrito")
   .addEventListener("click", onClickBotonComprar)
}

// crea dentro de la lista las partes de cada juego
function crearListaJuegos(juego) {
  let li = document.createElement("li");
  li.dataset.idjuego = juego.id;
  let img = document.createElement("img");
  img.src = juego.urlImagen; 
  let span = document.createElement("span");
  span.innerHTML = juego.nombre;
  let span2 = document.createElement("span")
  span.innerHTML = juego.descripcion
  img.alt = juego.nombre;
  let span3 = document.createElement("span");
  span3.innerHTML = `US$${juego.precio}`;
  let button = document.createElement("button");
  button.innerHTML = "Agregar al Carrito";
  button.addEventListener("click", onClickBotonAgregarAlCarrito);

  li.appendChild(img);
  li.appendChild(span);
  li.appendChild(span2);
  li.appendChild(span3);
  li.appendChild(button);

  return li; 
}

//CARRITO
// esta funcion agrega los juegos al carrito y en el caso de que sean mas de tres aplica el descuento necesario.
function agregarJuegoAlCarrito(juego){
  let carritoTotalCantidad = document.getElementById("carritoTotalUnidades");
  let carritoUnidadesActuales = parseInt(carritoTotalCantidad.innerHTML);
  carritoTotalCantidad.innerHTML = carritoUnidadesActuales + 1;

  let carritoTotalNavegador = document.getElementById("cuenta-carrito");
  let carritoArribaActual = parseInt(carritoTotalNavegador.innerHTML);
  carritoTotalNavegador.innerHTML = carritoArribaActual + 1;


  let carritoTotalPrecio = document.getElementById("carritoTotalPrecio");
  let precioCarritoActual = parseInt(carritoTotalPrecio.innerHTML);

  if((carritoUnidadesActuales +1) > 3){
    let notificacionDescuento = document.getElementById("notificacion-descuento");
    notificacionDescuento.innerHTML = "Aplicando descuento del 15% a partir de la 4ta unidad.";
    carritoTotalPrecio.innerHTML = precioCarritoActual + (juego.precio * 0.85);
  }
  else { 
    carritoTotalPrecio.innerHTML = precioCarritoActual + juego.precio;
  }

  CARRITO.push(juego);

}




//cuando cliquea el boton comprar 
function onClickBotonAgregarAlCarrito(evento) {
  
  idJuego = evento.target.parentElement.dataset.idjuego;
  
  // usa la funcion de buscar juego para que coincida con su id
  let juego = buscarJuegos(idJuego);
  agregarJuegoAlCarrito(juego)



}

function vaciarBtnCompra(){
 let unidades = document.getElementById("carritoTotalUnidades")
 unidades.innerHTML = "0";

 let precio = document.getElementById("carritoTotalPrecio");
 precio.innerHTML = "0";

let notificacion = document.getElementById("notificacion-descuento");
notificacion.innerHTML = "";
}
function modificarJuego(juego) {
  let indice = buscarIndiceJuego(juego.id);
  JUEGOS[indice] = juego;
  guardarJuegosEnStorage();

  
}

function guardarJuegosEnStorage () {
  localStorage.setItem("juegos", JSON.stringify(JUEGOS))
}

function onClickBotonComprar() {

  for(juego of CARRITO){
   juego.cantidadVendida += 1;
   guardarJuegosEnStorage(juego)
  }
  vaciarBtnCompra();

}

