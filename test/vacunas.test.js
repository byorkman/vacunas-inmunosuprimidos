import { test } from "node:test";
import assert from "node:assert/strict";
import { nivelInmunosupresion, evaluar } from "../src/vacunas.js";

test("el nivel lo define la medicación más inmunosupresora", () => {
  assert.equal(nivelInmunosupresion(["hcq"]), "ninguno");
  assert.equal(nivelInmunosupresion(["hcq", "mtx"]), "bajo");
  assert.equal(nivelInmunosupresion(["mtx", "antitnf"]), "alto");
  assert.equal(nivelInmunosupresion([]), "ninguno");
});

test("antes de empezar: vivas al menos 4 semanas antes", () => {
  const r = evaluar(["antitnf"], "antes");
  assert.equal(r.vivas.estado, "permitidas");
  assert.match(r.vivas.texto, /4 semanas/);
  assert.ok(r.momento.some((m) => /2 semanas/.test(m)));
});

test("durante: vivas contraindicadas con alto nivel", () => {
  assert.equal(evaluar(["toci"], "durante").vivas.estado, "contraindicadas");
  assert.equal(evaluar(["cort-alta"], "durante").vivas.estado, "contraindicadas");
});

test("durante: caso a caso con bajo nivel, permitidas sin inmunosupresión", () => {
  assert.equal(evaluar(["mtx"], "durante").vivas.estado, "considerar");
  assert.equal(evaluar(["hcq", "ssz"], "durante").vivas.estado, "permitidas");
});

test("suspendido: tiempos de espera", () => {
  assert.match(evaluar(["cort-alta"], "suspendido").vivas.texto, /1 mes/);
  assert.match(evaluar(["cort-alta", "mtx"], "suspendido").vivas.texto, /3 meses/);
  assert.match(evaluar(["antitnf"], "suspendido").vivas.texto, /3 meses/);
  assert.match(evaluar(["ritux", "mtx"], "suspendido").vivas.texto, /6 a 12 meses/);
  assert.equal(evaluar(["cort-baja"], "suspendido").vivas.estado, "permitidas");
});

test("rituximab agrega la advertencia sobre la respuesta a inactivadas", () => {
  assert.ok(evaluar(["ritux"], "durante").momento.some((m) => /rituximab/.test(m)));
});
