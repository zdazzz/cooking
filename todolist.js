// Массив для хранения задач
let tasks = [];

// Загрузка задач из localStorage при загрузке страницы
window.onload = function() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
};

// Добавление новой задачи
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskPriority = document.getElementById('taskPriority');
    
    if (taskInput.value.trim() === '') {
        alert('Введите текст задачи!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false,
        checked: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    // Очистка поля ввода
    taskInput.value = '';
    taskDate.value = '';
    taskPriority.value = 'medium';
}

// Отображение списка задач
function renderTasks(filteredTasks = null) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    const tasksToRender = filteredTasks || tasks;
    
    tasksToRender.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.priority} ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <input type="checkbox" ${task.checked ? 'checked' : ''} onchange="toggleCheck(${task.id})">
            <span>${task.text}</span>
            <span class="date">${task.date || 'Без даты'}</span>
            <span class="priority">${getPriorityLabel(task.priority)}</span>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Возобновить' : 'Завершить'}</button>
            <button onclick="moveTaskUp(${task.id})">↑</button>
            <button onclick="moveTaskDown(${task.id})">↓</button>
            <button onclick="deleteTask(${task.id})">Удалить</button>
        `;
        
        taskList.appendChild(taskElement);
    });
}

// Вспомогательные функции
function getPriorityLabel(priority) {
    switch(priority) {
        case 'high': return 'Высокий';
        case 'medium': return 'Средний';
        case 'low': return 'Низкий';
        default: return '';
    }
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function toggleCheck(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.checked = !task.checked;
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function deleteSelected() {
    tasks = tasks.filter(task => !task.checked);
    saveTasks();
    renderTasks();
}

function moveTaskUp(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index > 0) {
        [tasks[index], tasks[index-1]] = [tasks[index-1], tasks[index]];
        saveTasks();
        renderTasks();
    }
}

function moveTaskDown(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index < tasks.length - 1) {
        [tasks[index], tasks[index+1]] = [tasks[index+1], tasks[index]];
        saveTasks();
        renderTasks();
    }
}

function filterTasks() {
    const filter = document.getElementById('filterPriority').value;
    if (filter === 'all') {
        renderTasks();
    } else {
        const filtered = tasks.filter(task => task.priority === filter);
        renderTasks(filtered);
    }
}

function sortByDate() {
    tasks.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
    });
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}