const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

addHabitBtn.addEventListener('click', () => {
    const habitText = habitInput.value.trim();
    if (habitText) {
        const listItem = document.createElement('li');
        listItem.textContent = habitText;
        
        // Botón para eliminar el hábito
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.classList.add('remove-btn');

        // Evento para marcar como completado
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        // Evento para eliminar el hábito
        removeBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que se marque como completado
            habitList.removeChild(listItem);
        });

        listItem.appendChild(removeBtn);
        habitList.appendChild(listItem);
        habitInput.value = ''; // Limpiar el campo de entrada
    }
});