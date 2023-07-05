// Fetching the todos from the API
function fetchTodos() {
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => {
        // Call a function to display the todos on the page
        displayTodos(data);
      })
      .catch(error => {
        console.log('Error fetching todos:', error);
      });
  }
  
  // Adding a new todo for a specific user ID
  function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;
  
    // Send a POST request to the API to add the new todo
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: todoText, completed: false })
    })
      .then(response => response.json())
      .then(data => {
        // Call a function to update the todos on the page
        updateTodos(data);
      })
      .catch(error => {
        console.log('Error adding todo:', error);
      });
  
    // Clear the input field
    todoInput.value = '';
  }
  
  // Updating the todos on the page
  function updateTodos(newTodo = null) {
    // Fetch the updated list of todos and update the UI accordingly
    fetchTodos();
  
    // If a new todo was added, prepend it to the list
    if (newTodo) {
      const todosList = document.getElementById('all-todos');
      const listItem = document.createElement('li');
      listItem.textContent = newTodo.text;
  
      todosList.prepend(listItem);
    }
  }
  
  // Function to display the todos on the page
  function displayTodos(todos) {
    const todosList = document.getElementById('all-todos');
    todosList.innerHTML = '';
  
    todos.forEach(todo => {
      const listItem = document.createElement('li');
      listItem.textContent = todo.text;
  
      todosList.appendChild(listItem);
    });
  }
  
  // Example usage: Fetch the todos when the page loads
  window.addEventListener('DOMContentLoaded', fetchTodos);
  
  // Example usage: Add a new todo when the "Add" button is clicked
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', addTodo);
  