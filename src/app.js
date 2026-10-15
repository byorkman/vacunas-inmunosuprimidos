import { MEDICACIONES, VIVAS, INACTIVADAS, SEROLOGIAS, CONVIVIENTES } from "./reglas.js";
import { evaluar } from "./vacunas.js";

const contMeds = document.getElementById("medicaciones");
const resultado = document.getElementById("resultado");

contMeds.innerHTML = MEDICACIONES.map((m) => `
  <label><input type="checkbox" value="${m.id}"> ${m.nombre}</label>`).join("");

const NIVELES = {
  ninguno: "Sin inmunosupresión significativa",
  bajo: "Inmunosupresión de bajo nivel",
  alto: "Inmunosupresión de alto nivel",
};
const ESTADOS = {
  permitidas: "Permitidas",
  considerar: "Considerar caso a caso",
  contraindicadas: "Contraindicadas",
  esperar: "Esperar",
};

const lista = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

function actualizar() {
  const ids = [...contMeds.querySelectorAll("input:checked")].map((i) => i.value);
  const fase = document.querySelector('input[name="fase"]:checked').value;
  if (!ids.length) {
    resultado.innerHTML = `<p class="pendiente">Seleccionar la medicación para ver las recomendaciones.</p>`;
    return;
  }
  const r = evaluar(ids, fase);
  resultado.innerHTML = `
    <div class="tarjeta nivel-${r.nivel}">
      <div class="etiqueta">${fase === "antes" ? "Va a recibir" : fase === "durante" ? "Recibe" : "Recibió"}</div>
      <div class="nivel">${NIVELES[r.nivel]}</div>
    </div>

    <div class="tarjeta vivas-${r.vivas.estado}">
      <h3>Vacunas a virus vivos: <span class="estado">${ESTADOS[r.vivas.estado]}</span></h3>
      <p>${r.vivas.texto}</p>
      <details><summary>Cuáles son</summary>${lista(VIVAS)}</details>
    </div>

    <div class="tarjeta">
      <h3>Vacunas inactivadas recomendadas</h3>
      ${r.momento.length ? lista(r.momento) : ""}
      <ul class="vacunas">${INACTIVADAS.map((v) => `<li><strong>${v.nombre}:</strong> ${v.detalle}</li>`).join("")}</ul>
    </div>

    ${fase === "antes" ? `
    <div class="tarjeta">
      <h3>Serologías antes de empezar</h3>
      ${lista(SEROLOGIAS)}
    </div>` : ""}

    <div class="tarjeta">
      <h3>Convivientes</h3>
      ${lista(CONVIVIENTES)}
    </div>`;
}

document.addEventListener("change", actualizar);
actualizar();
