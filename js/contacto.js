// Inicializar EmailJS
(function () {
  emailjs.init("o9d7g6jVI1wUO2Dzd");
})();

// Referencias al DOM
const formulario = document.getElementById("formulario-contacto");
const botonEnviar = document.getElementById("boton-enviar");
const textoBoton = document.getElementById("texto-boton");
const mensajeEstado = document.getElementById("mensaje-estado");

// Campos del formulario
const campos = {
  nombre: document.getElementById("nombre"),
  email: document.getElementById("email"),
  asunto: document.getElementById("asunto"),
  mensaje: document.getElementById("mensaje"),
};

// Elementos de error
const errores = {
  nombre: document.getElementById("error-nombre"),
  email: document.getElementById("error-email"),
  asunto: document.getElementById("error-asunto"),
  mensaje: document.getElementById("error-mensaje"),
};

// Mostrar mensaje
function mostrarMensaje(texto, tipo) {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje-estado mensaje-${tipo}`;
  mensajeEstado.style.display = "block";
  mensajeEstado.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Ocultar mensaje
function ocultarMensaje() {
  mensajeEstado.style.display = "none";
}

// Mostrar error en campo
function mostrarErrorCampo(campo, mostrar = true) {
  if (mostrar) {
    campos[campo].classList.add("campo-error");
    errores[campo].style.display = "block";
  } else {
    campos[campo].classList.remove("campo-error");
    errores[campo].style.display = "none";
  }
}

// Validar formulario
function validarFormulario() {
  let esValido = true;

  // Validar cada campo
  Object.keys(campos).forEach((campo) => {
    if (!campos[campo].value.trim()) {
      mostrarErrorCampo(campo, true);
      esValido = false;
    } else {
      mostrarErrorCampo(campo, false);
    }
  });

  // Validación adicional para email válido
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value);
  if (!emailValido) {
    mostrarErrorCampo("email", true);
    esValido = false;
  }

  return esValido;
}

// Estado de carga
function mostrarCarga(cargando) {
  if (cargando) {
    botonEnviar.classList.add("boton-cargando");
    botonEnviar.disabled = true;
    textoBoton.innerHTML = '<span class="spinner-carga"></span>Enviando...';
  } else {
    botonEnviar.classList.remove("boton-cargando");
    botonEnviar.disabled = false;
    textoBoton.textContent = "Enviar mensaje";
  }
}

// Limpiar formulario
function limpiarFormulario() {
  formulario.reset();
  Object.keys(campos).forEach((campo) => {
    mostrarErrorCampo(campo, false);
  });
}

// Enviar email con EmailJS
function enviarEmail(datos) {

  const parametros = {
    nombre: datos.nombre,
    email: datos.email,
    sujeto: datos.asunto,
    mensaje: datos.mensaje,
  };
  return emailjs.send("service_fngkzgm", "template_eoaggtb", parametros);
}

// Validación en tiempo real
Object.keys(campos).forEach((campo) => {
  campos[campo].addEventListener("blur", function () {
    if (this.value.trim()) {
      mostrarErrorCampo(campo, false);
    }
  });

  campos[campo].addEventListener("input", function () {
    if (this.value.trim()) {
      mostrarErrorCampo(campo, false);
    }
  });
});

// Manejo de envío
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  ocultarMensaje();

  if (!validarFormulario()) {
    mostrarMensaje("Por favor completa todos los campos requeridos.", "error");
    return;
  }

  mostrarCarga(true);

  const datos = {
    nombre: campos.nombre.value.trim(),
    email: campos.email.value.trim(),
    asunto: campos.asunto.value.trim(),
    mensaje: campos.mensaje.value.trim(),
  };

  enviarEmail(datos)
    .then(() => {
      mostrarCarga(false);
      mostrarMensaje(
        "¡Mensaje enviado correctamente! Te responderé pronto.",
        "exito"
      );
      limpiarFormulario();
    })
    .catch((error) => {
      mostrarCarga(false);
      mostrarMensaje(
        "Error al enviar el mensaje. Por favor intenta nuevamente.",
        "error"
      );
      console.error("Error:", error);
    });
});
