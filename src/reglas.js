// Reglas de vacunación en pacientes inmunosuprimidos. ESTAS REGLAS DEBEN SER
// REVISADAS POR EL MÉDICO ANTES DE USAR LA HERRAMIENTA CON PACIENTES.
//
// Fuentes:
//   EULAR/PRES 2021: Jansen MHA, et al. Ann Rheum Dis 2023;82:35-47.
//   IDSA 2013: Rubin LG, et al. Clin Infect Dis 2014;58:e44-100.
//   Ministerio de Salud de la Nación: Calendario Nacional de Vacunación y
//   recomendaciones para huéspedes inmunocomprometidos.

// nivel: "ninguno" | "bajo" | "alto" (clasificación IDSA 2013).
export const MEDICACIONES = [
  { id: "hcq", nombre: "Hidroxicloroquina", nivel: "ninguno" },
  { id: "ssz", nombre: "Sulfasalazina", nivel: "ninguno" },
  { id: "aine", nombre: "AINEs", nivel: "ninguno" },
  { id: "cort-baja", nombre: "Corticoides < 20 mg/día (o < 2 mg/kg/día)", nivel: "bajo" },
  { id: "mtx", nombre: "Metotrexato", nivel: "bajo" },
  { id: "lef", nombre: "Leflunomida", nivel: "bajo" },
  { id: "aza", nombre: "Azatioprina", nivel: "bajo" },
  { id: "cort-alta", nombre: "Corticoides ≥ 20 mg/día (o ≥ 2 mg/kg/día) por ≥ 14 días", nivel: "alto" },
  { id: "pulsos", nombre: "Pulsos de metilprednisolona", nivel: "alto" },
  { id: "mmf", nombre: "Micofenolato", nivel: "alto" },
  { id: "ciclo", nombre: "Ciclofosfamida", nivel: "alto" },
  { id: "antitnf", nombre: "Anti-TNF (etanercept, adalimumab, infliximab)", nivel: "alto" },
  { id: "toci", nombre: "Tocilizumab", nivel: "alto" },
  { id: "aba", nombre: "Abatacept", nivel: "alto" },
  { id: "il1", nombre: "Anakinra / canakinumab", nivel: "alto" },
  { id: "ritux", nombre: "Rituximab", nivel: "alto", depletor: true },
];

export const VIVAS = [
  "Triple viral (sarampión, rubéola, paperas)",
  "Varicela",
  "Rotavirus",
  "BCG",
  "Fiebre amarilla",
  "Fiebre hemorrágica argentina (Candid #1)",
  "Dengue (Qdenga)",
  "Antigripal intranasal (no disponible en el calendario argentino)",
];

export const INACTIVADAS = [
  { nombre: "Antigripal inactivada", detalle: "Todos los años, también para los convivientes." },
  { nombre: "Neumococo", detalle: "Conjugada según edad y, desde los 2 años, polisacárida 23-valente al menos 8 semanas después de la conjugada." },
  { nombre: "Hepatitis B", detalle: "Completar el esquema y controlar anti-HBs." },
  { nombre: "Hepatitis A", detalle: "Si no está vacunado." },
  { nombre: "VPH", detalle: "Según calendario (desde los 11 años; puede adelantarse desde los 9)." },
  { nombre: "Meningococo", detalle: "Según calendario y riesgo." },
  { nombre: "Triple bacteriana (dTpa) / doble (dT)", detalle: "Según calendario." },
  { nombre: "COVID-19", detalle: "Según las recomendaciones vigentes para inmunocomprometidos." },
];

export const SEROLOGIAS = [
  "Varicela (IgG)",
  "Sarampión (IgG)",
  "Hepatitis B (HBsAg, anti-HBc, anti-HBs)",
  "Hepatitis A (IgG) si no está vacunado",
];

export const CONVIVIENTES = [
  "Calendario completo, incluidas las vacunas a virus vivos (triple viral, varicela, rotavirus).",
  "Antigripal anual.",
  "Si un conviviente recibe rotavirus, extremar el lavado de manos con los pañales durante 4 semanas.",
  "Si un conviviente tiene lesiones por la vacuna de varicela, evitar el contacto hasta que se sequen.",
];
