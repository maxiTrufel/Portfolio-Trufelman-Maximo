// Datos de sonidos simulados
const sonidos = [
  {
    id: 1,
    nombre: "Nivel ",
    categoria: "instrumentos",
    frecuencia: 500,
  },
  {
    id: 2,
    nombre: "Nivel 2",
    categoria: "instrumentos",
    frecuencia: 2000,
  },
  {
    id: 3,
    nombre: "Nivel 3",
    categoria: "instrumentos",
    frecuencia: 3500,
  },
  {
    id: 4,
    nombre: "Nivel 4",
    categoria: "instrumentos",
    frecuencia: 5000,
  }
  
];

let audioContext;
let categoriaActual = "todos";
let volumenActual = 0.5;
let sonidoReproduciendo = null;

// Inicializar Web Audio API
function inicializarAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// Generar tono sintético
function reproducirSonido(frecuencia, duracion = 1000) {
  if (!audioContext) inicializarAudio();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frecuencia, audioContext.currentTime);
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(volumenActual, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duracion / 1000
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duracion / 1000);

  return oscillator;
}

// Generar botones de sonidos
function generarBotonesSonidos() {
  const contenedor = document.getElementById("botones-sonidos");
  contenedor.innerHTML = "";

  sonidos.forEach((sonido) => {
    const boton = document.createElement("button");
    boton.className = "boton-sonido";
    boton.innerHTML = `
                    <div class="nombre-sonido">${sonido.nombre}</div>
                `;
    boton.onclick = () => reproducirSonidoBoton(sonido, boton);
    contenedor.appendChild(boton);
  });
}

// Reproducir sonido desde botón
function reproducirSonidoBoton(sonido, boton) {
  // Detener sonido anterior si existe
  if (sonidoReproduciendo) {
    document.querySelectorAll(".boton-sonido").forEach((b) => {
      b.classList.remove("reproduciendo");
    });
  }

  // Reproducir nuevo sonido
  boton.classList.add("reproduciendo");
  sonidoReproduciendo = reproducirSonido(sonido.frecuencia, 1500);


  // Remover clase después de la duración
  setTimeout(() => {
    boton.classList.remove("reproduciendo");
    sonidoReproduciendo = null;
  }, 1500);
}

// Inicializar aplicación
document.addEventListener("DOMContentLoaded", function () {
  generarBotonesSonidos();
});
