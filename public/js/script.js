//Calendario
const dias = document.querySelector('.dias'),
diaActual = document.querySelector('.dia-actual'),
icons = document.querySelectorAll('.navegador span');

let dia = new Date(),
anioActual = dia.getFullYear(),
mesActual = dia.getMonth();

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
              "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const mostrarCalendario = () => {
    let primerDiaMes = new Date(anioActual, mesActual, 1).getDay(),
    ultimaFechaMes = new Date(anioActual, mesActual + 1, 0).getDate(),
    ultimoDiaMes= new Date(anioActual, mesActual, ultimaFechaMes).getDay(),
    ultimaFechaultimoMes = new Date(anioActual, mesActual, 0).getDate();
    let listado = "";

    //Listado para mostrar los ultimos dias del mes pasado
    for (let i = primerDiaMes; i > 0; i--) {
        listado += `<li class="inactivo">${ultimaFechaultimoMes -i +1 }</li>`;
    }

    //Listado para todos los dias del mes actual
    for (let i = 1; i <= ultimaFechaMes; i++) {
        //Señalar el dia, mes y año actual
        let hoy = i === dia.getDate() && mesActual === new Date().getMonth()
            && anioActual === new Date().getFullYear() ? "activo" : "";
            //listado += `<li class="${hoy}">${i}</li>`;
        //Fecha para bd
        const diaConCero = i.toString().padStart(2, '0');
        const mesConCero = (mesActual + 1).toString().padStart(2, '0');
        const fecha = `${anioActual}-${mesConCero}-${diaConCero}`;

        listado += `<li class="${hoy}" data-fecha="${fecha}">${i}</li>`;
    }

    //Listado para mostrar los primeros dias del mes
    for (let i = ultimoDiaMes; i < 6; i++) {
        listado += `<li class="inactivo">${i - ultimoDiaMes + 1}</li>`;
    }

    diaActual.innerText = `${meses[mesActual]} ${anioActual}`; //Texto de fecha actual
    dias.innerHTML = listado; //Listado de dias para mostrar en el calendario
}

mostrarCalendario();

const mostrarCalendarioEventos = () => {
    const modal = document.getElementById("modal");
    const contenido = document.getElementById("contenidoModal");
    const cerrar = document.getElementById("cerrar");

    let html = `<h3>Eventos del ${fecha}</h3>`;
    if (eventos.length === 0) {
        html += `<p>No hay eventos para esta fecha.</p>`;
    } else {
        html += "<ul>";
        eventos.forEach(evento => {
            html += `<li><strong>${evento.horaEvento}</strong> - ${evento.nombreCliente} (${evento.telefonoCliente})</li>`;
        });
        html += "</ul>";
    }

    contenido.innerHTML = html;
    modal.style.display = "block";

    cerrar.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        //Para que avance o retroceda un mes a la vez
        mesActual = icon.id === 'prev' ? mesActual - 1 : mesActual + 1;

        // Para evitar que el mes sea menor a 0 o mayor a 11
        if (mesActual < 0 || mesActual > 11) {
            dia = new Date(anioActual, mesActual, new Date().getDate());
            anioActual = dia.getFullYear(); //actualiza el año actual con el nuevo año
            mesActual = dia.getMonth(); //actualiza el mes actual con el nuevo mes
        } else {
            dia = new Date();
        }
        mostrarCalendario();
    });
});


//Abrir modal
const modal = document.getElementById("modal");
const btn = document.getElementById("btn");
const cerrar = document.getElementById("cerrar");

btn.addEventListener("click", function(){
    modal.style.display = "block";
});

cerrar.addEventListener("click", function(){
    modal.style.display = "none";
});

window.addEventListener("click", function(evento){
    if(evento.target == modal){
        modal.style.display = "none";
    }
});

//Para registrar el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado con scope:', reg.scope))
      .catch(err => console.error('Error al registrar SW:', err));
  });
}
