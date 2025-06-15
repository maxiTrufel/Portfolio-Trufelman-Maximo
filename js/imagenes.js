// Datos de imágenes simuladas
const imagenes = [
  {
    id: 1,
    titulo: "Foto 1",
    categoria: "naturaleza",
    url: "./img/lightbox/img-1.jpeg",
  },
  {
    id: 2,
    titulo: "Foto 2",
    categoria: "naturaleza",
    url: "./img/lightbox/img-2.jpg",
  },
  {
    id: 3,
    titulo: "Foto 3",
    categoria: "naturaleza",
    url: "./img/lightbox/img-3.jpg",
  },
  {
    id: 4,
    titulo: "Foto 4",
    categoria: "naturaleza",
    url: "./img/lightbox/img-4.jpg",
  }
  
];

let indiceActual = 0;

// Generar galería
function generarGaleria() {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  imagenes.forEach((imagen, indice) => {
    const item = document.createElement("div");
    item.className = "item-galeria";
    item.onclick = () => abrirLightbox(indice);

    item.innerHTML = `
                    <img class="imagen-galeria" src="${imagen.url}" alt="${imagen.titulo}" loading="lazy">
                    <div class="overlay-galeria">
                        <div class="info-imagen">
                            <div class="titulo-imagen">${imagen.titulo}</div>
                        </div>
                    </div>
                `;

    galeria.appendChild(item);
  });
}

// Abrir lightbox
function abrirLightbox(indice) {
  indiceActual = indice;
  const lightbox = document.getElementById("lightbox");
  const imagen = document.getElementById("imagen-lightbox");
  const titulo = document.getElementById("titulo-lightbox");
  const categoria = document.getElementById("categoria-lightbox");
  const contador = document.getElementById("contador-imagenes");

  const imagenActual = imagenes[indiceActual];

  imagen.src = imagenActual.url;
  imagen.alt = imagenActual.titulo;
  titulo.textContent = imagenActual.titulo;
  categoria.textContent = imagenActual.categoria;
  contador.textContent = `${indiceActual + 1} de ${imagenes.length}`;

  lightbox.classList.add("activo");
  document.body.style.overflow = "hidden";
}

// Cerrar lightbox
function cerrarLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("activo");
  document.body.style.overflow = "auto";
}

// Imagen anterior
function imagenAnterior() {
  indiceActual = indiceActual > 0 ? indiceActual - 1 : imagenes.length - 1;
  actualizarLightbox();
}

// Imagen siguiente
function imagenSiguiente() {
  indiceActual = indiceActual < imagenes.length - 1 ? indiceActual + 1 : 0;
  actualizarLightbox();
}

// Actualizar lightbox
function actualizarLightbox() {
  const imagen = document.getElementById("imagen-lightbox");
  const titulo = document.getElementById("titulo-lightbox");
  const categoria = document.getElementById("categoria-lightbox");
  const contador = document.getElementById("contador-imagenes");

  const imagenActual = imagenes[indiceActual];

  imagen.src = imagenActual.url;
  imagen.alt = imagenActual.titulo;
  titulo.textContent = imagenActual.titulo;
  categoria.textContent = imagenActual.categoria;
  contador.textContent = `${indiceActual + 1} de ${imagenes.length}`;
}

// Navegación por teclado
document.addEventListener("keydown", function (event) {
  const lightbox = document.getElementById("lightbox");

  if (lightbox.classList.contains("activo")) {
    switch (event.key) {
      case "Escape":
        cerrarLightbox();
        break;
      case "ArrowLeft":
        imagenAnterior();
        break;
      case "ArrowRight":
        imagenSiguiente();
        break;
    }
  }
});

// Cerrar lightbox al hacer clic fuera de la imagen
document.getElementById("lightbox").addEventListener("click", function (event) {
  if (event.target === this) {
    cerrarLightbox();
  }
});

// Inicializar galería
document.addEventListener("DOMContentLoaded", function () {
  generarGaleria();
});
