const contenedor1 = document.getElementById("contenedor-1");
const contenedor2 = document.getElementById("contenedor-2");
const contenedor3 = document.getElementById("contenedor-3");
const contenedor4 = document.getElementById("contenedor-4");
const contenedor5 = document.getElementById("contenedor-5");

const button1 = document.getElementById("button-1");
const button2 = document.getElementById("button-2");
const button3 = document.getElementById("button-3");
const button4 = document.getElementById("button-4");
const button5 = document.getElementById("button-5");

function toggle1and2() {
  contenedor1.classList.toggle("ocultar");
  contenedor2.classList.toggle("ocultar");
}

function toggle2and3() {
  contenedor2.classList.toggle("ocultar");
  contenedor3.classList.toggle("ocultar");
}

function toggle3and4() {
  contenedor3.classList.toggle("ocultar");
  contenedor4.classList.toggle("ocultar");
}

function toggle4and5() {
  contenedor4.classList.toggle("ocultar");
  contenedor5.classList.toggle("ocultar");
}

button1.addEventListener("click", toggle1and2);

button2.addEventListener("click", toggle2and3);

button3.addEventListener("click", toggle3and4);

button4.addEventListener("click", toggle4and5);
