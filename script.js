const todoInput = document.querySelector('#todo');
const dateInput = document.querySelector('#due_date');
const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const filter = document.querySelector('#filter-todos');

let todos = [];

let todoListReference = [];

let exampleTodos = [
	{
		todo: 'städa',
		due_date: '2022-12-23',
		category: 'home',
	},
	{
		todo: 'diska',
		due_date: '2022-12-13',
		category: 'home',
	},
	{
		todo: 'beställ gummisnoddar',
		due_date: '2022-12-28',
		category: 'work',
	},
	{
		todo: 'ring Ralle',
		due_date: '2022-12-30',
		category: 'social',
	},
];
exampleTodos.forEach((exTodo) => buildTodo(exTodo));

const today = new Date(Date.now()).toLocaleDateString(undefined, {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
});
dateInput.value = today;
dateInput.min = today;

(function (today) {
	todos.forEach((todo) => {
		if (todo.due_date < today) todo.div.classList.add('overdue');
	});
})(today);

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteTodo);

filter.addEventListener('input', (e) => {
	let term = e.target.value.trim().toLowerCase();
	switch (term) {
		case 'all':
			filterCategories(term);
			break;
		case 'work':
			filterCategories(term);
			break;
		case 'home':
			filterCategories(term);
			break;
		case 'social':
			filterCategories(term);
			break;
		default:
			filterTodos(term);
	}
});

function addTodo(event) {
	event.preventDefault();

	const formData = new FormData(todoForm);
	const res = Object.fromEntries(formData);

	if (res.todo.trim() !== '') buildTodo(res);

	console.log(res);
	todoInput.value = '';
}

function buildTodo(res) {
	/* 
	todoList.innerHTML += `
      <div class="todo-div">
        <li>
          <span class="todo-text">${res.todo}</span>
          <span class="todo-date">${res.due_date}</span>
          <span class="todo-category">${res.category}</span>
        </li>
        //<button class="complete-btn">Complete</button>
        <button class="remove-btn">Remove</button>
      </div>  
    `;
 */
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo-div');

	const todoItem = document.createElement('li');

	const todoText = document.createElement('span');
	todoText.classList.add('todo-text');
	todoText.innerText = res.todo;
	todoItem.appendChild(todoText);

	const todoDate = document.createElement('span');
	todoDate.classList.add('todo-date');
	todoDate.innerText = res.due_date;
	todoItem.appendChild(todoDate);

	const todoCategory = document.createElement('span');
	todoCategory.classList.add('todo-category');
	todoCategory.innerText = res.category;
	todoItem.appendChild(todoCategory);

	todoDiv.appendChild(todoItem);

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('remove-btn');
	removeBtn.innerText = 'Remove';
	todoDiv.appendChild(removeBtn);

	todoList.appendChild(todoDiv);

	res.div = todoDiv;

	todoListReference.push(todoDiv);

	todos.push(res);
}

function deleteTodo(e) {
	const item = e.target;
	const todoEl = item.parentElement;

	if (item.className === 'remove-btn') {
		const index = todoListReference.findIndex((todoRef) => todoRef === todoEl);

		todoListReference.splice(index, 1);
		todos.splice(index, 1);
		todoEl.remove();
	}
}

function filterCategories(term) {
	todoListReference.forEach((el) => {
		const todoCategory = el.querySelector('.todo-category').innerText;
		if (term === 'all' || todoCategory === term) {
			el.classList.remove('hideCategory');
		} else if (todoCategory !== term) {
			el.classList.add('hideCategory');
		}
	});
}

function filterTodos(term) {
	let filteredList = todoListReference.filter((listItem) => {
		const todoText = listItem.querySelector('.todo-text').innerText.toLowerCase();
		return todoText.indexOf(term) > -1;
	});

	let diff = todoListReference.filter((x) => !filteredList.includes(x));

	diff.forEach((el) => el.classList.add('hide'));
	filteredList.forEach((el) => el.classList.remove('hide'));

	console.log('diff:', diff);
}
