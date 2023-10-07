chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get('todoList', function(data) {
    let numTasks = data.todoList ? data.todoList.length : 0;
    if (numTasks > 0) {
      chrome.notifications.create({
        type: "image",
        iconUrl: "icon.png",
        imageUrl: "notification.jpg",
        title: "Time to Code!",
        message: `You have ${numTasks} tasks in your bucket.`
      });
    }
  });
});
