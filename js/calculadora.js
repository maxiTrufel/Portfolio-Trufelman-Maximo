let pantalla = document.getElementById("pantalla");
let operacionActual = "";
let operadorAnterior = "";
let operacion = null;

function agregarNumero(numero) {
  if (pantalla.value === "0" || pantalla.value === "Error") {
    pantalla.value = numero;
  } else {
    pantalla.value += numero;
  }
}

function agregarDecimal() {
  if (pantalla.value.indexOf(".") === -1) {
    pantalla.value += ".";
  }
}

function agregarOperador(op) {
  if (operacion !== null) calcular();
  operadorAnterior = pantalla.value;
  operacion = op;
  pantalla.value = "0";
}

function calcular() {
  let resultado;
  const anterior = parseFloat(operadorAnterior);
  const actual = parseFloat(pantalla.value);

  if (isNaN(anterior) || isNaN(actual)) return;

  switch (operacion) {
    case "+":
      resultado = anterior + actual;
      break;
    case "-":
      resultado = anterior - actual;
      break;
    case "*":
      resultado = anterior * actual;
      break;
    case "/":
      if (actual === 0) {
        pantalla.value = "Error";
        return;
      }
      resultado = anterior / actual;
      break;
    default:
      return;
  }


  pantalla.value = resultado;
  operacion = null;
  operadorAnterior = "";
}

function limpiarTodo() {
  pantalla.value = "0";
  operacionActual = "";
  operadorAnterior = "";
  operacion = null;
}

function limpiarUltimo() {
  pantalla.value = "0";
}

document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    agregarNumero(event.key);
  } else if (event.key === ".") {
    agregarDecimal();
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    agregarOperador(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calcular();
  } else if (event.key === "Escape") {
    limpiarTodo();
  } else if (event.key === "Backspace") {
    limpiarUltimo();
  }
});

