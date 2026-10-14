# Vacunas en inmunosuprimidos

Herramienta web para revisar las vacunas de pacientes de reumatología pediátrica según su tratamiento inmunosupresor. Pensada para usar desde el celular durante la consulta.

- Se elige el momento (antes de empezar, durante o después de suspender) y la medicación.
- Muestra el nivel de inmunosupresión, si se pueden aplicar vacunas a virus vivos, las inactivadas recomendadas, las serologías a pedir antes de empezar y qué tienen que recibir los convivientes.

**No guarda ni envía datos.** Todo se hace en el navegador.

> ⚠️ **Las reglas tienen que ser revisadas por un médico antes de usarse con pacientes.**

## Reglas

| Nivel (IDSA 2013) | Medicación | Vacunas vivas durante el tratamiento |
|---|---|---|
| Sin inmunosupresión | Hidroxicloroquina, sulfasalazina, AINEs | Permitidas |
| Bajo | Corticoides < 20 mg/día (o < 2 mg/kg/día), metotrexato, leflunomida, azatioprina | Refuerzos de triple viral y varicela, caso a caso (EULAR/PRES 2021) |
| Alto | Corticoides ≥ 20 mg/día (o ≥ 2 mg/kg/día) por ≥ 14 días, pulsos, micofenolato, ciclofosfamida, biológicos | Contraindicadas |

- **Antes de empezar:** vivas al menos 4 semanas antes; inactivadas al menos 2 semanas antes.
- **Después de suspender:** vivas 1 mes después de los corticoides en dosis alta, 3 meses después de otros inmunosupresores o biológicos y 6 a 12 meses después de rituximab.

Fuentes: EULAR/PRES 2021 (Jansen MHA, et al. *Ann Rheum Dis* 2023;82:35-47), IDSA 2013 (Rubin LG, et al. *Clin Infect Dis* 2014;58:e44-100) y Calendario Nacional de Vacunación (Ministerio de Salud de la Nación).

Las reglas y listas están en `src/reglas.js` y la lógica en `src/vacunas.js`.

## Desarrollo

Sitio estático, sin dependencias ni compilación.

```sh
npm test               # pruebas
npx serve .            # o cualquier servidor estático para verlo localmente
```

## Publicar en Vercel

En Vercel: **Add New → Project → Import** este repositorio, con Framework Preset **Other** y sin comando de build. Cada cambio que entre a `main` se publica solo.
