const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const filterTodo = document.querySelector(".todo__filter");

// add todo
todoButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__wrapper");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo_item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    saveLocalTodo(todoInput.value);

    const completedButton = document.createElement("button");
    completedButton.classList.add("button__completed");
    completedButton.innerHTML = ' <i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("button__removed");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(removeButton);

    // append to list
    todoList.appendChild(todoDiv);
    //   clear todo input
    todoInput.value = "";
  }
});

// remove todo

todoList.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList[0] === "button__removed") {
    const todo = item.parentElement;
    removeLocalTodo(todo.children[0].innerText);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => todo.remove());
    // removeLocalTodo();
  }
  if (item.classList[0] === "button__completed") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
});

// filter todo list

filterTodo.addEventListener("click", (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      default:
        break;
    }
  });
});

// save todo to local storage

const saveLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__wrapper");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo_item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.classList.add("button__completed");
    completedButton.innerHTML = ' <i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("button__removed");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(removeButton);

    // append to list
    todoList.appendChild(todoDiv);
  });
};
// loaded todos when page load

document.addEventListener("DOMContentLoaded", getTodos);

// remove todo from localstorage

const removeLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const newTodos = todos.filter((item) => item !== todo);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};
