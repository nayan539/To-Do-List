const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("Add");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Reusable function to get todos from localStorage
const getTodosFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

// Function to create To-Do Element
const createTodoElement = (todoText) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todoText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    return li;
};

// Function to Add To-Do
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Write something in todo");
        return;
    }

    if (addBtn.value === "Save") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        todoList.appendChild(createTodoElement(inputText));
        saveLocalTodos(inputText);
        inputBox.value = "";
    }
};

// Function to Update or Delete To-Do
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Save";
        editTodo = e;

        // Store old text as a data attribute before editing
        e.target.setAttribute("data-old-text", e.target.previousElementSibling.innerHTML);
    }
};


// Function to Save To-Do in Local Storage
const saveLocalTodos = (todo) => {
    let todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to Retrieve and Display Todos from Local Storage
const getLocalTodos = () => {
    let todos = getTodosFromLocalStorage();
    todos.forEach((todo) => {
        todoList.appendChild(createTodoElement(todo));
    });
};

// Function to Delete To-Do from Local Storage
const deleteLocalTodos = (todo) => {
    let todos = getTodosFromLocalStorage();
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

// Function to Edit To-Do in Local Storage
const editLocalTodos = (newTodoText) => {
    let todos = getTodosFromLocalStorage();
    let oldTodoText = editTodo.target.getAttribute("data-old-text"); // Get the old text from a custom attribute
    let todoIndex = todos.indexOf(oldTodoText);

    if (todoIndex !== -1) {
        todos[todoIndex] = newTodoText;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};


// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
