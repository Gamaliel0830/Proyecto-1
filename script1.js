
document.addEventListener('DOMContentLoaded', function() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const monthYearTitle = document.getElementById('month-year');
    const calendarTableBody = document.querySelector('#calendar-table tbody');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventList = document.getElementById('event-list');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('events')) || {}; // Cargar eventos desde localStorage
    let importantDates = JSON.parse(localStorage.getItem('importantDates')) || []; // Cargar fechas importantes desde localStorage
    const importantColors = ["#ffdfdf", "#ffe0b3", "#f0e0ff", "#d9f7be", "#c2dfff"]; // Colores pastel
    let currentColorIndex = importantColors.length; // Índice para colores

    // Función para renderizar el calendario
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const numDaysInMonth = lastDayOfMonth.getDate();

        // Actualizar el título del mes y año
        monthYearTitle.textContent = `${firstDayOfMonth.toLocaleString('es', { month: 'long' })} ${year}`;

        // Limpiar el calendario antes de renderizar
        calendarTableBody.innerHTML = '';

        // Calcular el primer día de la semana para este mes
        let dayOfWeek = firstDayOfMonth.getDay();
        if (dayOfWeek === 0) dayOfWeek = 7; // Ajustar domingo a 7 para comenzar en lunes

        // Crear las filas de la tabla (semanas)
        let date = 1;
        while (date <= numDaysInMonth) {
            const row = document.createElement('tr');
            for (let i = 1; i <= 7; i++) {
                const cell = document.createElement('td');
                cell.className = ''; // Limpiar clases previas
                cell.style.backgroundColor = ''; // Limpiar estilos previos

                // Dejar las celdas vacías hasta llegar al primer día del mes
                if (date === 1 && i < dayOfWeek) {
                    row.appendChild(cell);
                } else if (date <= numDaysInMonth) {
                    cell.textContent = date;

                    const dayKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

                    // Agregar clase si el día tiene eventos
                    if (events[dayKey] && events[dayKey].length > 0) {
                        cell.classList.add('event');
                    }

                    // Agregar color si el día es importante
                    if (importantDates.includes(dayKey)) {
                        const color = importantColors[importantDates.indexOf(dayKey) % importantColors.length];
                        cell.classList.add('important');
                        cell.style.backgroundColor = color;
                    }

                    // Seleccionar el día al hacer clic
                    cell.addEventListener('click', function() {
                        const selectedCell = document.querySelector('.selected');
                        if (selectedCell) {
                            selectedCell.classList.remove('selected');
                        }
                        cell.classList.add('selected');
                        eventDateInput.value = dayKey;
                    });

                    row.appendChild(cell);
                    date++;
                }
            }
            calendarTableBody.appendChild(row);
        }
    }

    // Función para navegar al mes anterior
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Función para navegar al siguiente mes
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Función para agregar un día importante
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventDate = eventDateInput.value;
        const eventTitle = eventTitleInput.value;

        if (!eventDate || !eventTitle) return; // Validar que los campos no estén vacíos

        // Agregar el evento si no existe
        if (!events[eventDate]) {
            events[eventDate] = [];
        }

        events[eventDate].push(eventTitle);
        localStorage.setItem('events', JSON.stringify(events));

        // Si no existe el día importante, lo agregamos a la lista
        if (!importantDates.includes(eventDate)) {
            importantDates.push(eventDate);
            localStorage.setItem('importantDates', JSON.stringify(importantDates));
        }

        // Actualizar la lista de eventos
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `<strong>${eventTitle}</strong> <span>🗓️ ${eventDate}</span>`;
        eventList.appendChild(eventItem);

        // Limpiar el formulario
        eventForm.reset();

        renderCalendar();
    });

    // Renderizar el calendario por primera vez
    renderCalendar();
});
