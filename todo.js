chrome.storage.local.get(['todoList', 'addCount', 'tickCount', 'deleteCount'], function(data) {
  let todoList = data.todoList || [];
  let addCount = data.addCount || 0;
  let tickCount = data.tickCount || 0;
  chrome.storage.local.set({'tickCount': tickCount||0});
  let deleteCount = data.deleteCount || 0;
  chrome.storage.local.set({'deleteCount': deleteCount||0});
  let todoHtml = '';
  for (let task of todoList) {
    let taskData = task.split('|');
    let taskLink = taskData[0];
    let taskDescription = taskData[1].substr(0, 18);
    todoHtml += `<li style="padding-bottom: 10px;"><a href="${taskLink}" target="_blank">${taskDescription}</a><button class="delete-btn delete-btn-x">X</button><button class="tick-btn delete-btn-check">&#10003;</button></li>`;
  }
  document.getElementById('todo-list').innerHTML = todoHtml;

  // Handle form submissions to add new tasks to the list
  document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let taskLink = document.getElementById('todo-link').value;
    let taskDescription = document.getElementById('todo-description').value.substr(0, 18);
    
    // Check if taskLink and taskDescription are not null before adding to the list
    if (taskLink && taskDescription) {
      let todoList = [];
      chrome.storage.local.get('todoList', function(data) {
        todoList = data.todoList || [];
        todoList.push(taskLink + '|' + taskDescription);
        chrome.storage.local.set({'todoList': todoList});
        let todoHtml = `<li style="padding-bottom: 10px;"><a href="${taskLink}" target="_blank">${taskDescription}</a><button class="delete-btn delete-btn-x">X</button><button class="tick-btn delete-btn-check">&#10003;</button></li>`;
        document.getElementById('todo-list').innerHTML += todoHtml;
        document.getElementById('todo-link').value = '';
        document.getElementById('todo-description').value = '';
        // Increment the addCount variable and store it in chrome local storage
        addCount++;
        chrome.storage.local.set({'addCount': addCount});
  
        // Display "Added successfully" message
        let successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = 'Task Added successfully ';
        document.body.appendChild(successMessage);
        setTimeout(function() {
          successMessage.remove();
        },1000);
      });
    } else {
      // Display error message if either taskLink or taskDescription is null
      let errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = 'Task Link and Description are required!';
      document.body.appendChild(errorMessage);
      setTimeout(function() {
        errorMessage.remove();
      }, 1000);
    }
  });
  

  // Handle clicks on delete and tick buttons to remove tasks from the list
  document.getElementById('todo-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn-x')) {
      let task =event.target.parentNode.innerText;
      let todoList = [];
      chrome.storage.local.get('todoList', function(data) {
        todoList = data.todoList || [];
        todoList.splice(todoList.indexOf(task), 1);
        chrome.storage.local.set({'todoList': todoList});
        event.target.parentNode.remove();
        // Increment the deleteCount variable and store it in chrome local storage
        deleteCount++;
        chrome.storage.local.set({'deleteCount': deleteCount});
      });
    } else if (event.target.classList.contains('delete-btn-check')) {
      let task =event.target.parentNode.innerText;
      let todoList = [];
      chrome.storage.local.get('todoList', function(data) {
        todoList = data.todoList || [];
        todoList.splice(todoList.indexOf(task), 1);
        chrome.storage.local.set({'todoList': todoList});
        event.target.parentNode.remove();
        // Increment the tickCount variable and store it in chrome local storage
        tickCount++;
        chrome.storage.local.set({'tickCount': tickCount});

        let successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '&#10024 Congratulatons &#10024;';
        document.body.appendChild(successMessage);
        setTimeout(function() {
          successMessage.remove();
        },1000);
      });
    }
  });
});
