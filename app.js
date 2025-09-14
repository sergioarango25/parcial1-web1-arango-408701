// Seleccionamos los botones de navegación
const navButtons = document.querySelectorAll('.nav-btn');

// Función para ir a una sección
function goToSection(section) {
  // Ocultamos todas las secciones
  document.querySelectorAll('main.content-area > section')
    .forEach(s => s.classList.remove('active'));
function cargarSeccion(nombre) {
  fetch(`${nombre}.html`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("contenido").innerHTML = data;
    });
}


  // Mostramos la sección seleccionada
  const el = document.getElementById(section);
  if (el) el.classList.add('active');

  // Marcamos el botón activo
  navButtons.forEach(b =>
    b.classList.toggle('active', b.dataset.section === section)
  );

  // Actualizamos el hash de la URL
  if (location.hash !== '#' + section) {
    history.pushState(null, '', '#' + section);
  }
}

// Asignamos eventos a los botones
navButtons.forEach(b =>
  b.addEventListener('click', () => goToSection(b.dataset.section))
);

// Manejar el botón “atrás/adelante” del navegador
window.addEventListener('popstate', () => {
  const sec = location.hash.replace('#', '') || 'muro';
  goToSection(sec);
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const initial = location.hash.replace('#', '') || 'muro';
  goToSection(initial);
});
