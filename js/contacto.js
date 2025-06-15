// Inicializar EmailJS
(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // Reemplazar con tu clave pública de EmailJS
})();

// Referencias a elementos del DOM
const formulario = document.getElementById("formulario-contacto");
const botonEnviar = document.getElementById("boton-enviar");
const textoBoton = document.getElementById("texto-boton");
const mensajeEstado = document.getElementById("mensaje-estado");

// Campos del formulario
const campos = {
  nombre: document.getElementById("nombre"),
  asunto: document.getElementById("asunto"),
  mensaje: document.getElementById("mensaje"),
};

// Elementos de error
const errores = {
  nombre: document.getElementById("error-nombre"),
  asunto: document.getElementById("error-asunto"),
  mensaje: document.getElementById("error-mensaje"),
};

// Función para mostrar mensaje
function mostrarMensaje(texto, tipo) {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje-estado mensaje-${tipo}`;
  mensajeEstado.style.display = "block";

  // Scroll hacia el mensaje
  mensajeEstado.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Función para ocultar mensaje
function ocultarMensaje() {
  mensajeEstado.style.display = "none";
}

// Función para mostrar error en campo
function mostrarErrorCampo(campo, mostrar = true) {
  if (mostrar) {
    campos[campo].classList.add("campo-error");
    errores[campo].style.display = "block";
  } else {
    campos[campo].classList.remove("campo-error");
    errores[campo].style.display = "none";
  }
}

// Función para validar formulario
function validarFormulario() {
  let esValido = true;

  // Validar nombre
  if (!campos.nombre.value.trim()) {
    mostrarErrorCampo("nombre", true);
    esValido = false;
  } else {
    mostrarErrorCampo("nombre", false);
  }

  // Validar asunto
  if (!campos.asunto.value.trim()) {
    mostrarErrorCampo("asunto", true);
    esValido = false;
  } else {
    mostrarErrorCampo("asunto", false);
  }

  // Validar mensaje
  if (!campos.mensaje.value.trim()) {
    mostrarErrorCampo("mensaje", true);
    esValido = false;
  } else {
    mostrarErrorCampo("mensaje", false);
  }

  return esValido;
}

// Función para mostrar estado de carga
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

// Función para limpiar formulario
function limpiarFormulario() {
  formulario.reset();
  Object.keys(campos).forEach((campo) => {
    mostrarErrorCampo(campo, false);
  });
}

// Función para enviar email
function enviarEmail(datos) {
  // Parámetros para EmailJS
  const parametros = {
    from_name: datos.nombre,
    subject: datos.asunto,
    message: datos.mensaje,
    to_email: "maria.garcia@email.com", // Tu email
  };

  // Enviar email usando EmailJS
  return emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", parametros);
}

// Event listeners para validación en tiempo real
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

// Manejar envío del formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Ocultar mensaje anterior
  ocultarMensaje();

  // Validar formulario
  if (!validarFormulario()) {
    mostrarMensaje("Por favor completa todos los campos requeridos.", "error");
    return;
  }

  // Mostrar estado de carga
  mostrarCarga(true);

  // Recopilar datos del formulario
  const datos = {
    nombre: campos.nombre.value.trim(),
    asunto: campos.asunto.value.trim(),
    mensaje: campos.mensaje.value.trim(),
  };

  // Simular envío de email (reemplazar con EmailJS real)
  setTimeout(() => {
    // Simular éxito (en producción, usar EmailJS)
    mostrarCarga(false);
    mostrarMensaje(
      "¡Mensaje enviado correctamente! Te responderé pronto.",
      "exito"
    );
    limpiarFormulario();

    // En producción, usar esto:
    /*
                enviarEmail(datos)
                    .then(function(response) {
                        mostrarCarga(false);
                        mostrarMensaje('¡Mensaje enviado correctamente! Te responderé pronto.', 'exito');
                        limpiarFormulario();
                    })
                    .catch(function(error) {
                        mostrarCarga(false);
                        mostrarMensaje('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
                        console.error('Error:', error);
                    });
                */
  }, 2000);
});

// Configuración de EmailJS (comentado para demo)
/*
        Para usar EmailJS en producción:
        
        1. Regístrate en https://www.emailjs.com/
        2. Crea un servicio de email
        3. Crea una plantilla de email
        4. Reemplaza:
           - YOUR_PUBLIC_KEY con tu clave pública
           - YOUR_SERVICE_ID con tu ID de servicio
           - YOUR_TEMPLATE_ID con tu ID de plantilla
        5. Descomenta la función enviarEmail() en el evento submit
        */
