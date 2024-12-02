
    // Datos de ejemplo de los miembros del equipo
    const members = [
        {
            name: "Juan Pérez",
            phone: "+1 234 567 8910",
            email: "juanperez@midominio.com",
            img: "https://via.placeholder.com/150"
        },
        {
            name: "Ana Gómez",
            phone: "+1 234 567 8911",
            email: "anagomez@midominio.com",
            img: "https://via.placeholder.com/150"
        },
        {
            name: "Carlos Martínez",
            phone: "+1 234 567 8912",
            email: "carlosmartinez@midominio.com",
            img: "https://via.placeholder.com/150"
        }
    ];

    // Función para agregar un miembro dinámicamente
    function addTeamMember(member) {
        const memberContainer = document.createElement('div');
        memberContainer.classList.add('team-member');
        
        memberContainer.innerHTML = `
            <img src="${member.img}" alt="Foto de miembro del equipo">
            <h3>${member.name}</h3>
            <p><i class="fas fa-phone-alt"></i> ${member.phone}</p>
            <p><i class="fas fa-envelope"></i> ${member.email}</p>
        `;
        
        // Añadir el nuevo miembro al contenedor de miembros
        document.querySelector('.team-members').appendChild(memberContainer);
    }

    // Al cargar la página, agregar los miembros iniciales
    members.forEach(addTeamMember);

    // Evento para agregar un nuevo miembro al hacer clic en el botón
    document.querySelector('.add-member-btn').addEventListener('click', function() {
        const newMember = {
            name: prompt("Nombre del nuevo miembro:"),
            phone: prompt("Número de teléfono:"),
            email: prompt("Correo electrónico:"),
            img: prompt("URL de la foto del miembro:")
        };
        
        addTeamMember(newMember);
    });