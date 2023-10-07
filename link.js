chrome.storage.local.get('linkList', function(data) {
    let linkList = data.linkList || [];
    let linkHtml = '';
    for (let task of linkList) {
      let taskData = task.split('|');
      let taskLink = taskData[0];
      let taskDescription = taskData[1].substr(0, 18);
      linkHtml += `<li style="padding-bottom: 10px;"><a href="${taskLink}" target="_blank">${taskDescription}</a><button class="delete-btn delete-btn-x">X</li>`;
    }
    document.getElementById('link-list').innerHTML = linkHtml;
  });
  
  // Handle form submissions to add new tasks to the list
  document.getElementById('link-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let taskLink = document.getElementById('link-link').value;
    let taskDescription = document.getElementById('link-description').value;
    
    if (taskLink.trim() === '' || taskDescription.trim() === '') {
      // Display "Please enter both link and description" message
      let errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerHTML = 'Please enter both link and description';
      document.body.appendChild(errorMessage);
      setTimeout(function() {
        errorMessage.remove();
      }, 1000);
      return;
    }
    
    taskDescription = taskDescription.substr(0, 18);
    let linkList = [];
    chrome.storage.local.get('linkList', function(data) {
      linkList = data.linkList || [];
      linkList.push(taskLink + '|' + taskDescription);
      chrome.storage.local.set({'linkList': linkList});
      let linkHtml = `<li style= padding-bottom: 10px;"><a href="${taskLink}" target="_blank">${taskDescription}</a><button class="delete-btn delete-btn-x">X</button></li>`;
      document.getElementById('link-list').innerHTML += linkHtml;
      document.getElementById('link-link').value = '';
      document.getElementById('link-description').value = '';
      // Display "Added successfully" message
      let successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = 'Link Added Successfully';
      document.body.appendChild(successMessage);
      setTimeout(function() {
        successMessage.remove();
      }, 1000);
    });
  });
  
  
  // Handle clicks on delete buttons to remove tasks from the list
  document.getElementById('link-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn-x')) {
      let task =event.target.parentNode.innerText;
        let linkList = [];
        chrome.storage.local.get('linkList', function(data) {
          linkList = data.linkList || [];
          linkList.splice(linkList.indexOf(task), 1);
          chrome.storage.local.set({'linkList': linkList});
          event.target.parentNode.remove();
        });
      }
    });
  
