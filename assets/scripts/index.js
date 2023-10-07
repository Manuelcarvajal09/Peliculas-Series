/* Aca van las variables globales */
let selector = document.getElementById("miSelector");
let busqueda = document.getElementById("miInput");
let boton = document.getElementById("miBoton");
let lista = document.getElementById("miLista");

let archivo = "assets/json/peliculas.json";
let datosJson;

/* Aca estan los selectores */
selector.addEventListener("change", cambiarArchivo);
selector.addEventListener("cambioModo", mostrarTipo);
busqueda.addEventListener("keydown", verificar);
boton.addEventListener("click", buscar);
/* Aca estan las funciones */
function cambiarArchivo() {
  archivo = selector.value;
  let evento = new CustomEvent("cambioModo");
  selector.dispatchEvent(evento);
}
function mostrarTipo() {
  alert("Se esta buscando en: " + selector.value);
}
function verificar(evento) {
  if (
    (evento.keyCode < 65 || evento.keyCode > 90) &&
    evento.keyCode != 32 &&
    evento.keyCode != 8
  ) {
    evento.preventDefault();
  }
}
function buscar() {
  lista.innerHTML = "";
  fetch(archivo)
    .then((respuesta) => respuesta.json())
    .then(function (salida) {
      for (let item of salida.data) {
        if (item.nombre.startsWith(busqueda.value.toUpperCase())) {
          let p = document.createElement("p");
          p.id = item.nombre;
          p.innerHTML = item.sinopsis;
          p.style.display = "none";

          let li = document.createElement("li");
          li.innerHTML = item.nombre;
          li.addEventListener("mouseover", function () {
            let p = document.getElementById(item.nombre);
            p.style.display = "block";
          });
          li.addEventListener("mouseout", function () {
            let p = document.getElementById(item.nombre);
            p.style.display = "none";
          });
          li.appendChild(p);
          lista.appendChild(li);
        }
      }
    })
    .catch(function (error) {
      alert(error);
    });
}
