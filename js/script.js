let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;

const mapInner = document.getElementById('mapInner');
const mapWrapper = document.getElementById('mapWrapper');

function updateTransform() {
  mapInner.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

window.onload = function() {
  resetView();
};

// Zoom con rueda
mapWrapper.addEventListener('wheel', function(e) {
  e.preventDefault();
  const rect = this.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const oldScale = scale;

  scale *= e.deltaY < 0 ? 1.2 : 0.8;
  scale = Math.max(0.5, Math.min(scale, 8));

  translateX = mouseX - (mouseX - translateX) * (scale / oldScale);
  translateY = mouseY - (mouseY - translateY) * (scale / oldScale);
  updateTransform();
});

// Arrastrar (mouse + touch)
function startDrag(e) {
  isDragging = true;
  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;
  startX = clientX - translateX;
  startY = clientY - translateY;
  mapInner.style.cursor = 'grabbing';
}

function drag(e) {
  if (!isDragging) return;
  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;
  translateX = clientX - startX;
  translateY = clientY - startY;
  updateTransform();
}

mapInner.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', () => { isDragging = false; mapInner.style.cursor = 'grab'; });

mapInner.addEventListener('touchstart', startDrag);
mapInner.addEventListener('touchmove', drag);
mapInner.addEventListener('touchend', () => { isDragging = false; });

// Controles de zoom
function zoomIn() { scale *= 1.25; scale = Math.min(scale, 8); updateTransform(); }
function zoomOut() { scale *= 0.8; scale = Math.max(scale, 0.5); updateTransform(); }
function resetView() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
}

// Información de hotspots
function showInfo(num) {
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const modal = document.getElementById('modal');

  if (num === 0) {
    title.textContent = "Sedimentadores";
    body.innerHTML = `<p><strong>Función:</strong> Separación de sólidos suspendidos por gravedad.</p><p>Permite que las partículas más pesadas se depositen en el fondo, facilitando el tratamiento posterior.</p>`;
  } else if (num === 1) {
    title.textContent = "Humedal Artificial";
    body.innerHTML = `<p><strong>Tratamiento terciario.</strong></p><p>Utiliza plantas acuáticas y un lecho de grava para filtrar, absorber nutrientes (nitrógeno y fósforo) y eliminar patógenos.</p>`;
  } else if (num === 2) {
    title.textContent = "Entrada Efluente";
    body.innerHTML = `<p><strong>Punto de ingreso de Aguas Residuales.</strong></p><p>Recibe el efluente (aguas residuales) y lo distribuye hacia los sedimentadores o etapas iniciales de tratamiento.</p>`;
  } else if (num === 3) {
    title.textContent = "Lecho de Secado";
    body.innerHTML = `<p><strong>Función:</strong> Deshidratación natural de lodos.</p><p>Los lodos provenientes de los sedimentadores se secan por evaporación y percolación para facilitar su manejo o disposición final.</p>`;
  } else if (num === 4) {
    title.textContent = "Filtro de Grava";
    body.innerHTML = `<p><strong>Función:</strong> Filtración física.</p><p>Retiene partículas finas y materia orgánica residual que no fueron removidas en etapas anteriores.</p>`;
  } else if (num === 5) {
    title.textContent = "Salida";
    body.innerHTML = `<p><strong>Punto de descarga.</strong></p><p>El agua ya tratada sale de la planta para ser devuelta al cuerpo receptor (río, laguna, etc.) con menor impacto ambiental.</p>`;
  } else if (num === 6) {
    title.textContent = "Efluente";
    body.innerHTML = `<p><strong>Agua tratada que sale del sistema.</strong></p><p>Corresponde al resultado final del proceso de tratamiento antes de su disposición final.</p>`;
  }

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}