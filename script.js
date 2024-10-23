const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

addHabitBtn.addEventListener('click', () => {
    const habitText = habitInput.value.trim();
    if (habitText) {
        addHabit(habitText);
        habitInput.value = ''; // Limpiar el campo de entrada
    }
});

function addHabit(habitText, completed = false) {
    const listItem = document.createElement('li');
    listItem.textContent = habitText;

    // Botón para eliminar el hábito
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.classList.add('remove-btn');

    // Evento para marcar como completado
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        saveHabits(); // Guardar cambios en localStorage
    });

    // Evento para eliminar el hábito
    removeBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que se marque como completado
        habitList.removeChild(listItem);
        saveHabits(); // Guardar cambios en localStorage
    });

    listItem.appendChild(removeBtn);
    habitList.appendChild(listItem);

    // Si el hábito estaba completado, añadir la clase 'completed'
    if (completed) {
        listItem.classList.add('completed');
    }

    saveHabits(); // Guardar cambios en localStorage
}

function saveHabits() {
    const habits = [];
    document.querySelectorAll('#habitList li').forEach(item => {
        habits.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('habitList', JSON.stringify(habits));
}

function loadHabits() {
    const savedHabits = localStorage.getItem('habitList');
    if (savedHabits) {
        JSON.parse(savedHabits).forEach(habit => {
            addHabit(habit.text, habit.completed);
        });
    }
}

// Cargar hábitos al iniciar la página
window.onload = loadHabits;

