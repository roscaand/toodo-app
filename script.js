const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');


window.addEventListener('load', () => {
  const storedTasks = JSON.parse(localStorage.getItem('todoItems')) || [];
  storedTasks.forEach(task => createTodoItem(task.text, task.completed));
});

function saveTasks() {
  const items = [];
  todoList.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    items.push({ text, completed });
  });
  localStorage.setItem('todoItems', JSON.stringify(items));
}

function createTodoItem(taskText, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('i');
  deleteBtn.className = 'fas fa-trash delete-btn';

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  saveTasks();
}

addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    createTodoItem(taskText);
    input.value = '';
  }
});

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  const tasks = Array.from(todoList.children);
  tasks.forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      todoList.removeChild(task);
    }
  });
  saveTasks();
});

