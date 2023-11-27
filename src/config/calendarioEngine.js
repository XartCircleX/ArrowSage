// Función para generar el calendario dinámicamente dentro de la tarjeta
function generateCalendar(month, year) {
    const calendarContainer = document.getElementById("calendarContainer");
  
    // Obtener el primer día y el último día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    // Crear el encabezado del calendario con el mes y año actual
    const monthYearHeader = `<h2 class="text-center titletext">${firstDay.toLocaleString('default', { month: 'long' })} ${year}</h2>`;
    let calendarHTML = '<div class="table-responsive"><table class="table table-bordered"><thead><tr><th>Domingo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th></tr></thead><tbody>';
  
    let date = new Date(firstDay);
    let dayOfWeek = date.getDay();
  
    // Agregar celdas vacías para los días anteriores al primer día del mes
    calendarHTML += '<tr>';
    for (let i = 0; i < dayOfWeek; i++) {
      calendarHTML += '<td></td>';
    }
  
    // Generar celdas para cada día del mes
    while (date <= lastDay) {
      if (dayOfWeek === 0) {
        calendarHTML += '</tr><tr>';
      }
  
      // Personalizar las celdas con clases específicas y agregar botón
      calendarHTML += `<td class="cell py-3"><h3>${date.getDate()}</h3><div>
                              <button class="btn btn-block darkgreen calendarbutton d-none d-lg-block col-md-auto btn-sm mx-auto" data-bs-toggle="offcanvas"
                                data-bs-target="#1" aria-controls="1">
                                <!--Creates a button using a blend of css and bootstrap to style it,-->
                                No appointments
                              </button>
                            </div>`;
  
      date.setDate(date.getDate() + 1);
      dayOfWeek = date.getDay();
    }
  
    // Completar la tabla con celdas vacías para los días restantes
    for (let i = dayOfWeek; i < 7; i++) {
      calendarHTML += '<td></td>';
    }
    calendarHTML += '</tr></tbody></table></div>';
  
    // Insertar el calendario generado en el contenedor de la tarjeta
    calendarContainer.innerHTML = monthYearHeader + calendarHTML;
  }
  
  // Obtener la fecha actual y generar el calendario
  const currentDate = new Date();
  generateCalendar(currentDate.getMonth(), currentDate.getFullYear());