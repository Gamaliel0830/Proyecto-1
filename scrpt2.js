// Función para el menú responsive
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Función para agregar un nuevo miembro al equipo
function addMember() {
    // Datos del nuevo miembro
    const name = prompt("Introduce el nombre del nuevo miembro:");
    const phone = prompt("Introduce el teléfono del nuevo miembro:");
    const email = prompt("Introduce el correo electrónico del nuevo miembro:");

    if (name && phone && email) {
        // Crear un nuevo elemento de miembro del equipo
        const teamMembersContainer = document.querySelector('.team-members');
        const newMember = document.createElement('div');
        newMember.classList.add('team-member');

        newMember.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Foto de miembro del equipo">
            <h3>${name}</h3>
            <p><i class="fas fa-phone-alt"></i> ${phone}</p>
            <p><i class="fas fa-envelope"></i> ${email}</p>
        `;

        // Agregar el nuevo miembro al contenedor
        teamMembersContainer.appendChild(newMember);

        alert("¡Miembro agregado exitosamente!");
    } else {
        alert("Por favor, completa todos los datos.");
    }
}

// Evento para el botón "Agregar Miembro"
const addMemberBtn = document.querySelector('.add-member-btn');
addMemberBtn.addEventListener('click', addMember);