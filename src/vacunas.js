import { MEDICACIONES } from "./reglas.js";

const ORDEN = { ninguno: 0, bajo: 1, alto: 2 };

// Medicaciones cuya suspensión solo exige esperar por los corticoides en dosis alta.
const SIN_ESPERA_PROPIA = ["cort-alta", "pulsos", "cort-baja", "hcq", "ssz", "aine"];

// Nivel de inmunosupresión según la medicación más inmunosupresora.
export function nivelInmunosupresion(ids) {
  let nivel = "ninguno";
  for (const m of MEDICACIONES.filter((m) => ids.includes(m.id))) {
    if (ORDEN[m.nivel] > ORDEN[nivel]) nivel = m.nivel;
  }
  return nivel;
}

// fase: "antes" (todavía no empezó), "durante" o "suspendido".
// Devuelve { nivel, vivas: { estado, texto }, inactivadas: [textos], momento: [textos] }.
export function evaluar(ids, fase) {
  const nivel = nivelInmunosupresion(ids);
  const ritux = ids.includes("ritux");
  const cortAlta = ids.includes("cort-alta") || ids.includes("pulsos");
  const momento = [];
  let vivas;

  if (fase === "antes") {
    vivas = {
      estado: "permitidas",
      texto: "Aplicar las vacunas a virus vivos que falten al menos 4 semanas antes de empezar el tratamiento.",
    };
    momento.push("Vacunas inactivadas: idealmente al menos 2 semanas antes de empezar.");
    if (nivel !== "ninguno") momento.push("Si no se puede esperar, no demorar el tratamiento: las inactivadas pueden darse durante el mismo.");
  } else if (fase === "suspendido") {
    const soloCorticoides = ids.every((id) => SIN_ESPERA_PROPIA.includes(id));
    const espera = ritux
      ? "6 a 12 meses desde la última dosis de rituximab"
      : soloCorticoides
        ? (cortAlta ? "1 mes desde que suspendió los corticoides en dosis alta" : null)
        : "3 meses desde que suspendió el inmunosupresor o biológico";
    vivas = espera
      ? { estado: "esperar", texto: `Las vacunas a virus vivos pueden aplicarse después de ${espera}.` }
      : { estado: "permitidas", texto: "Esta medicación no contraindica las vacunas a virus vivos." };
  } else if (nivel === "alto") {
    vivas = { estado: "contraindicadas", texto: "Contraindicadas mientras dure el tratamiento." };
  } else if (nivel === "bajo") {
    vivas = {
      estado: "considerar",
      texto: "Los refuerzos de triple viral y varicela pueden considerarse con inmunosupresión de bajo nivel, por ejemplo metotrexato o corticoides en dosis bajas (EULAR/PRES 2021). Decisión individual; evitar las demás vacunas vivas.",
    };
  } else {
    vivas = { estado: "permitidas", texto: "Esta medicación no contraindica las vacunas a virus vivos." };
  }

  if (fase === "durante" && nivel !== "ninguno") {
    momento.push("Las vacunas inactivadas son seguras durante el tratamiento, aunque la respuesta puede ser menor.");
  }
  if (ritux) {
    momento.push("Con rituximab, aplicar las inactivadas al menos 2 semanas antes de la dosis: la respuesta queda reducida hasta 6 meses después.");
  }

  return { nivel, vivas, momento };
}
