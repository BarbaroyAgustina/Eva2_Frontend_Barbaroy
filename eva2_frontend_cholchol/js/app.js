const noticiasBase = [
  { titulo: 'Atención municipal más cercana', texto: 'Nuevo enfoque digital para mejorar la orientación ciudadana.' },
  { titulo: 'Servicios comunitarios', texto: 'Información rápida sobre programas sociales y apoyo territorial.' },
  { titulo: 'Trámites en línea', texto: 'Accesos claros para reducir tiempos de búsqueda.' }
];
const tramites = ['Permiso de circulación', 'Patente comercial', 'Solicitud de apoyo social', 'Certificado de residencia', 'Contacto de emergencia comunal'];
const listaNoticias = document.querySelector('#listaNoticias');
const resultadoTramites = document.querySelector('#resultadoTramites');
const mensajeBienvenida = document.querySelector('#mensajeBienvenida');

function renderNoticias(noticias){
  listaNoticias.innerHTML = noticias.map((n, i)=>`<div class="col-md-4 noticia-extra"><article class="news-card"><span class="badge bg-primary mb-2">Noticia ${i+1}</span><h3 class="h5">${n.titulo}</h3><p>${n.texto}</p></article></div>`).join('');
}
function renderTramites(filtro=''){
  const filtrados = tramites.filter(t => t.toLowerCase().includes(filtro.toLowerCase()));
  resultadoTramites.innerHTML = filtrados.length ? filtrados.map(t=>`<li class="list-group-item">${t}</li>`).join('') : '<li class="list-group-item text-danger">No se encontraron trámites con esa búsqueda.</li>';
}
function validarCampo(campo){
  const valido = campo.checkValidity();
  campo.classList.toggle('is-valid', valido);
  campo.classList.toggle('is-invalid', !valido);
  return valido;
}

document.addEventListener('DOMContentLoaded',()=>{ // Evento 1: ciclo de carga inicial
  renderNoticias(noticiasBase);
  renderTramites();
});

document.querySelectorAll('.btnServicio').forEach(btn=>{
  btn.addEventListener('click',(event)=>{ // Evento 2: click en servicio
    const card = event.target.closest('.service-card');
    document.querySelector('#detalleServicio').textContent = card.dataset.service;
    mensajeBienvenida.textContent = 'Servicio seleccionado: ' + card.querySelector('h3').textContent;
  });
});

document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('mouseover',()=>{ // Evento 3: hover/mouseover
    card.setAttribute('aria-label','Servicio destacado: ' + card.querySelector('h3').textContent);
  });
});

document.querySelector('#btnAgregarNoticia').addEventListener('click',()=>{ // Evento 4: agregar DOM
  const nueva = { titulo:'Aviso importante para vecinos', texto:'Se agregó dinámicamente una noticia mediante manipulación del DOM.' };
  noticiasBase.push(nueva);
  renderNoticias(noticiasBase);
});

document.querySelector('#btnLimpiarNoticias').addEventListener('click',()=>{ // Evento 5: eliminar DOM
  noticiasBase.splice(3);
  renderNoticias(noticiasBase);
});

document.querySelector('#buscadorTramites').addEventListener('input',(event)=>{ // Evento 6: búsqueda en tiempo real
  renderTramites(event.target.value);
});

document.querySelector('#btnContraste').addEventListener('click',()=>{ // Evento 7: cambio de clase y texto
  document.body.classList.toggle('high-contrast');
  const activo = document.body.classList.contains('high-contrast');
  document.querySelector('#btnContraste').textContent = activo ? 'Contraste normal' : 'Alto contraste';
});

['nombre','correo','mensaje'].forEach(id=>{
  const campo = document.querySelector('#'+id);
  campo.addEventListener('input',()=>{ // Evento 8: validación en tiempo real
    validarCampo(campo);
    if(id === 'mensaje') document.querySelector('#contadorMensaje').textContent = `${campo.value.length} caracteres escritos.`;
  });
});

document.querySelector('#formContacto').addEventListener('submit',(event)=>{ // Evento 9: submit validado
  event.preventDefault();
  const campos = [...event.target.querySelectorAll('input, textarea')];
  const valido = campos.every(validarCampo);
  document.querySelector('#estadoFormulario').innerHTML = valido ? '<div class="alert alert-success">Solicitud enviada correctamente. Nos contactaremos pronto.</div>' : '<div class="alert alert-danger">Revise los campos marcados antes de enviar.</div>';
});
