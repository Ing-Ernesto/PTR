let scale = 0.52;           // Zoom inicial
let translateX = 300;
let translateY = 5;
let isDragging = false;
let startX, startY;

const mapInner = document.getElementById('mapInner');

function updateTransform() {
  mapInner.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Inicializar vista
window.onload = function() {
  updateTransform();
};

// Zoom con rueda
document.getElementById('mapWrapper').addEventListener('wheel', function(e) {
  e.preventDefault();
  const rect = this.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const oldScale = scale;
  scale *= e.deltaY < 0 ? 1.15 : 0.85;
  scale = Math.max(0.4, Math.min(scale, 10));

  translateX = mouseX - (mouseX - translateX) * (scale / oldScale);
  translateY = mouseY - (mouseY - translateY) * (scale / oldScale);
  updateTransform();
});

// Arrastrar
mapInner.addEventListener('mousedown', function(e) {
  if (e.button === 0) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    this.style.cursor = 'grabbing';
  }
});

document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateTransform();
});

document.addEventListener('mouseup', function() {
  isDragging = false;
  mapInner.style.cursor = 'grab';
});

function zoomIn() { scale *= 1.2; scale = Math.min(scale, 10); updateTransform(); }
function zoomOut() { scale *= 0.8; scale = Math.max(scale, 0.4); updateTransform(); }
function resetView() {
  scale = 0.75;
  translateX = 80;
  translateY = 30;
  updateTransform();
}

// Información de hotspots
function showInfo(num) {
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const modal = document.getElementById('modal');

if (num === 0) {  // Sedimentadores
    title.textContent = "Sedimentadores";
    body.innerHTML = `<p><strong>Función:</strong> Separación de sólidos suspendidos por gravedad.</p>
      <p>Permite que las partículas más pesadas se depositen en el fondo, facilitando el tratamiento posterior.</p>`;
  }
  else if (num === 1) {  // Humedal Artificial
    title.textContent = "Humedal Artificial";
    body.innerHTML = `<p><strong>Tratamiento terciario.</strong></p>
      <p>Utiliza plantas acuáticas y un lecho de grava para filtrar, absorber nutrientes (nitrógeno y fósforo) y eliminar patógenos.</p>`;
  }
  else if (num === 2) {  // Entrada Efluente
    title.textContent = "Entrada Efluente";
    body.innerHTML = `<p><strong>Punto de ingreso de aguas residuales.</strong></p>
      <p>Recibe el efluente (aguas residuales) y lo distribuye hacia los sedimentadores o etapas iniciales de tratamiento.</p>`;
  }
  else if (num === 3) {  // Lecho de Secado
    title.textContent = "Lecho de Secado";
    body.innerHTML = `<p><strong>Función:</strong> Deshidratación natural de lodos.</p>
      <p>Los lodos provenientes de los sedimentadores se secan por evaporación y percolación para facilitar su manejo o disposición final.</p>`;
  }
  else if (num === 4) {  // Filtro de Grava
    title.textContent = "Filtro de Grava";
    body.innerHTML = `<p><strong>Función:</strong> Filtración física.</p>
      <p>Retiene partículas finas y materia orgánica residual que no fueron removidas en etapas anteriores.</p>`;
  }
  else if (num === 5) {  // Salida
    title.textContent = "Salida";
    body.innerHTML = `<p><strong>Punto de descarga del efluente tratado.</strong></p>
      <p>El agua ya tratada sale de la planta para ser devuelta al cuerpo receptor (río, laguna, etc.) con menor impacto ambiental.</p>`;
  }
  else if (num === 6) {  // Efluente
    title.textContent = "Efluente";
    body.innerHTML = `<p><strong>Agua tratada que sale del sistema.</strong></p>
      <p>Corresponde al resultado final del proceso de tratamiento antes de su disposición final.</p>`;
  }

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}