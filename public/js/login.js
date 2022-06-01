const contenedor1 = document.getElementById("contenedor-1");
const contenedor2 = document.getElementById("contenedor-2");

const button1 = document.getElementById("button-1");
const button2 = document.getElementById("button-2");

function toggle1and2() {
  contenedor1.classList.toggle("ocultar");
  contenedor2.classList.toggle("ocultar");
}

button1.addEventListener("click", toggle1and2);