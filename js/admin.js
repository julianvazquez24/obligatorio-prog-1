document.addEventListener("DOMContentLoaded", documentOnLoad);
const PRECARGA_JUEGOS = [
{ id: 1, nombre: "Red Dead Redemption 2", descripcion:"Una historia del oeste sobre bandidos y lealtad.", precio: 50, urlImagen: "images/reddeadredemption.jpg", tipo: "AVENTURA", categoria:"M", cantidadVendida:0 },
{ id: 2, nombre: "Resident Evil 2", descripcion:" Sobrevive al horror en una ciudad infestada de zombis.", precio: 30, urlImagen: "images/residentevil2.jpg", tipo: "ACCION", categoria:"M", cantidadVendida:0 },
{ id: 3, nombre: "NBA 2K24", descripcion:"Realismo extremo en el baloncesto profesional.", precio: 55, urlImagen: "images/NBA2K24.webp", tipo: "DEPORTES", categoria:"E", cantidadVendida:0 },
{ id: 4, nombre: "Minecraft", descripcion:"Crea y explora mundos de bloques infinitos.", precio: 60, urlImagen: "images/minecraft.jpg", tipo: "AVENTURA", categoria:"E10+", cantidadVendida:0 },
{ id: 5, nombre: "Grand Theft Auto V", descripcion:"Vive una vida criminal en Los Santos.", precio: 70, urlImagen: "images/grandtheftautoV.jpg", tipo: "AVENTURA", categoria:"M", cantidadVendida:0 },
{ id: 6, nombre: "Far Cry Primal", descripcion:"Sobrevive y lucha en la Edad de Piedra.", precio: 35, urlImagen: "images/farcryprimal.avif", tipo: "AVENTURA", categoria:"M", cantidadVendida:0 },
{ id: 7, nombre: "EAFC 24", descripcion:" Experiencia futbolística auténtica y actualizada.", precio: 80, urlImagen: "images/EAFC24.avif", tipo: "DEPORTE", categoria:"E", cantidadVendida:0 },
{ id: 8, nombre: "Cyberpunk 2077", descripcion:" Futuro distópico con alta tecnología y acción.", precio: 55, urlImagen: "images/cyberpunk2077.jpg" , tipo: "AVENTURA", categoria:"M", cantidadVendida:0 },
{ id: 9, nombre: "Dota 2", descripcion:" Estrategia y combate en tiempo real entre equipos.", precio: 25, urlImagen: "images/dota2.webp" , tipo: "AVENTURA", categoria:"M", cantidadVendida:0},
{ id: 10, nombre: "Rust", descripcion:"Sobrevive contra jugadores y la naturaleza.", precio: 55, urlImagen: "images/rust.webp" , tipo: "ACCION", categoria:"M", cantidadVendida:0},
{ id: 11, nombre: "Assasins Creed Origins", descripcion:" Descubre el origen de los Asesinos en Egipto.", precio: 65, urlImagen: "images/assasinscreedorigins.webp" , tipo: "AVENTURA", categoria:"M", cantidadVendida:0},
{ id: 12, nombre: "Formula 1 2022", descripcion:"Simulación realista de carreras de F1.", precio: 75, urlImagen: "images/formula1.jpg" , tipo: "DEPORTE", categoria:"E", cantidadVendida:0},
]

const JUEGOS = []; 

//guardamos array juegos del index en localstorage para poder ponerlo en la tabla y modificar desde el admin
function guardarJuegosEnStorage () {
    localStorage.setItem("juegos", JSON.stringify(JUEGOS))
}
//creamos funcion de traer los juegos para cuando necesitemos modificarlos solo llamar a la funcion
// " || []; " eso lo dimos en clase, si no poniamos la posibilidad de que este vacio se rompia el codigo creo
function traerJuegosStorage () {
    return JSON.parse(localStorage.getItem("juegos")) || [];

}

// esta funcion recorre los id's que hay y encuentra el ultimo, para usarlo en la funcion de afregar juego y sumarle =1 a ese ultimo Id
function ultimoIdJuego() {
    let ultimoId= -1;
    for( let juego of JUEGOS) {
        if(juego.id > ultimoId) {
            ultimoId = juego.id;
        }
    }
    return ultimoId;
} 

//las siguientes dos funciones son para agregar y eliminar un juego del array
function agregarJuego(juego) {
    juego.id = ultimoIdJuego() + 1;
    JUEGOS.push(juego);
    //guarda el juego con la funcion creada previamente
    guardarJuegosEnStorage();
}

function modificarJuego(juego) {
    let indice = buscarIndiceJuego(juego.id);
    JUEGOS[indice] = juego;
    guardarJuegosEnStorage();

    
}

// el splice quita del array el juego con el indice que le pasemos
function eliminarJuego(idJuego) {
    let indice = buscarIndiceJuego (idJuego);
    if (indice !== -1) {
        JUEGOS.splice(indice, 1);
        // se modifica el array de juegos
        guardarJuegosEnStorage();
    }   
}

function cargarJuegos(juegos) {
    for (let juego of juegos) {
        agregarJuego(juego)
    }
}

//copiamos la funcion buscar juego del index.js
function buscarJuegos(idJuego) {
    for (let i = 0; i < JUEGOS.length; i++) {
      if (JUEGOS[i].id == idJuego) {
        return JUEGOS[i];
      }
    }
    return null;
}

function buscarIndiceJuego (idJuego) {
    for (let i=0 ; i < JUEGOS.length ; i++) {
        if (JUEGOS[i].id == idJuego) {
            return i;
        }
    }
   //devuelve -1 si no lo encuentra al juego
    return -1;
}

function crearJuegosTabla(juego) {
    fila = document.createElement("tr");
    fila.dataset.idjuego = juego.id;

    let celdaUrlImagen = document.createElement("td");
    let imgImagen = document.createElement("img");
    
    if (juego.urlImagen.startsWith("http")) {
        imgImagen.src = juego.urlImagen;
    } else {
        imgImagen.src = "../" + juego.urlImagen;
    }
   

    imgImagen.alt = juego.nombre;
    imgImagen.classList.add("imagen-fila");
    celdaUrlImagen.appendChild(imgImagen);

    fila.appendChild(celdaUrlImagen);

    celdaNombre = document.createElement("td");
    celdaNombre.innerText = juego.nombre;
    fila.appendChild(celdaNombre);

    celdaDescripcion =document.createElement("td");
    celdaDescripcion.innerText = juego.descripcion;
    fila.appendChild(celdaDescripcion);

    celdaPrecio = document.createElement("td");
    celdaPrecio.innerText = `US$${juego.precio}`;
    fila.appendChild(celdaPrecio);

    celdaTipo = document.createElement("td");
    celdaTipo.innerText = juego.tipo;
    fila.appendChild(celdaTipo); 
    
    celdaCategoria = document.createElement("td");
    celdaCategoria.innerText = juego.categoria;
    fila.appendChild(celdaCategoria);

    celdaAcciones = document.createElement("td");
    divBtnAcciones = document.createElement("div");

    botonEditar = document.createElement("button");
    botonEditar.innerText = "Editar";
    botonEditar.addEventListener("click" , onClickBotonEditar)
    divBtnAcciones.appendChild(botonEditar);

    botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", onClickBotonEliminar);
    divBtnAcciones.appendChild(botonEliminar);  
    
    celdaAcciones.appendChild(divBtnAcciones);

    fila.appendChild(celdaAcciones)
    

    return fila;
}


function renderizarJuegosTabla() {
 const tablaJuegos = document.getElementById("listaJuegosTabla");
 tablaJuegos.innerHTML = "";
 let fila;
 for (let juego of JUEGOS) {
    fila = crearJuegosTabla(juego);
    tablaJuegos.appendChild(fila);
 }
}

function onClickBotonCancelar(evento) {
 evento.preventDefault();
 limpiarFormulario();
}

function onClickBotonAgregar(evento) {
    evento.preventDefault()
    const inputNombre = document.getElementById("nombre-form");
    const inputDescripcion = document.getElementById("descripcion-form");
    const inputPrecio = document.getElementById("precio-form"); 
    const selectTipo = document.getElementById("categoria-form");
    const inputUrlImagen = document.getElementById("urlImagen-form");
    const selectCategoria = document.getElementById("edad-form")
    const cantidadVendida = 0;
  
    const nombre = inputNombre.value;
    const descripcion = inputDescripcion.value;
    const precio = parseInt(inputPrecio.value);
    const tipo = selectTipo.value;
    const urlImagen = inputUrlImagen.value;
    const categoria = selectCategoria.value;
  
    if (nombre === "" || descripcion ==="" || precio === "" || categoria === "" || urlImagen === "" || tipo === "") {
      alert("Se requiere que todos los campos estén llenos");
      return;
    }
  
    
    agregarJuego({ nombre, descripcion, precio, tipo, urlImagen, categoria, cantidadVendida});
  


    limpiarFormulario();
    renderizarJuegosTabla();
}

function onClickBotonEliminar (evento){
  let idjuego = evento.target.closest("tr").dataset.idjuego;
 eliminarJuego(idjuego);
 renderizarJuegosTabla();
}

function onClickBotonEditar(evento) {
    evento.preventDefault()
    let idJuego = evento.target.closest("tr").dataset.idjuego;
    let juego = buscarJuegos(idJuego);

    document.getElementById("idJuegoParaEditar").value = juego.id;
    document.getElementById("nombre-form").value = juego.nombre;
    document.getElementById("descripcion-form").value = juego.descripcion;
    document.getElementById("precio-form").value = juego.precio;
    document.getElementById("categoria-form").value = juego.tipo;
    document.getElementById("urlImagen-form").value = juego.urlImagen;
    document.getElementById("edad-form").value = juego.categoria;

    document.getElementById("leyendaForm").textContent = "Editar Juego";

}

function onClickBotonModificar(evento) {
    const inputNombre = document.getElementById("nombre-form");
    const inputDescripcion = document.getElementById("descripcion-form");
    const inputPrecio = document.getElementById("precio-form"); 
    const selectTipo = document.getElementById("categoria-form");
    const inputUrlImagen = document.getElementById("urlImagen-form");
    const selectCategoria = document.getElementById("edad-form")
    const inputId = document.getElementById("idJuegoParaEditar");
  
    const nombre = inputNombre.value;
    const descripcion = inputDescripcion.value;
    const precio = inputPrecio.value;
    const tipo = selectTipo.value;
    const urlImagen = inputUrlImagen.value;
    const categoria = selectCategoria.value;
    const id = inputId.value;
  
    if (nombre === "" || descripcion ==="" || precio === "" || tipo === "" || urlImagen === "" || categoria === "") {
      alert("Se requiere que todos los campos estén llenos");
      return;
    }
    
    let juego = {id,nombre, descripcion, precio, tipo, urlImagen, categoria };
    modificarJuego(juego);
    console.log(juego)
    renderizarJuegosTabla(JUEGOS)
    renderizarJuegosTabla()


    
}

function limpiarFormulario() {
    document.getElementById("idJuegoParaEditar").value = "0";
    document.getElementById("nombre-form").value = "";
    document.getElementById("descripcion-form").value = "";
    document.getElementById("precio-form").value = "";
    document.getElementById("categoria-form").value = "ACCION";
    document.getElementById("urlImagen-form").value = "";
    document.getElementById("edad-form").value = "EC";
    document.getElementById("leyendaForm").textContent = "Agregar Juego";
}





//esa funcion es para que cuando se cargue el documento pase todo lo que nosotros pongamos dentro
function documentOnLoad() {
    document.getElementById("botonCancelar")
    .addEventListener("click", onClickBotonCancelar);
    document.getElementById("botonAgregar")
    .addEventListener("click", onClickBotonAgregar);
    document.getElementById("botonModificar")
    .addEventListener("click", onClickBotonModificar);
      

    let guardarJuegosEnStorage = traerJuegosStorage();

    if (guardarJuegosEnStorage.length === 0) {
        cargarJuegos(PRECARGA_JUEGOS);
        
    } else {
        cargarJuegos(guardarJuegosEnStorage);
    }

    renderizarJuegosTabla();
    
}
