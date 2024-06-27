

document.addEventListener("DOMContentLoaded", documentOnLoad);


function documentOnLoad(){
    renderizarJuegosTabla()
}


const JUEGOS = traerJuegosStorage();

function traerJuegosStorage() {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}


function crearJuegosTabla(juego) {
    fila = document.createElement("tr");
    fila.dataset.idjuego = juego.id;

    celdaNombre = document.createElement("td");
    celdaNombre.innerText = juego.nombre;
    fila.appendChild(celdaNombre);

    celdaPrecio = document.createElement("td");
    celdaPrecio.innerText = `US$${juego.precio}`;
    fila.appendChild(celdaPrecio);

    celdaCantidadVendida =document.createElement("td");
    celdaCantidadVendida.innerText = juego.cantidadVendida;
    fila.appendChild(celdaCantidadVendida);

    celdaIngresoGenerado = document.createElement("td");
    if (juego.cantidadVendida > 3){
        celdaIngresoGenerado.innerText = "US$" + ((juego.precio * juego.cantidadVendida) * 0.85);
        fila.appendChild(celdaIngresoGenerado);
    }else {
        celdaIngresoGenerado.innerText = "US$" + (juego.precio * juego.cantidadVendida);
        fila.appendChild(celdaIngresoGenerado);

    }


    return fila;
}

function renderizarJuegosTabla() {
    const tablaJuegos = document.getElementById("listaVentasTabla");
    tablaJuegos.innerHTML = "";
    let fila;
    for (let juego of JUEGOS) {
       fila = crearJuegosTabla(juego);
       tablaJuegos.appendChild(fila);
    }
}
