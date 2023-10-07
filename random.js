let doneCount = parseInt(localStorage.getItem('doneCount'));

localStorage.setItem('doneCount', doneCount||0);

// Define a function to fetch a random Codeforces question
async function fetchRandomCodeforcesQuestion() {
  // Make a GET request to the Codeforces API to get a list of all problems
  const response = await fetch('https://codeforces.com/api/problemset.problems');
  const data = await response.json();

  // Extract a random question from the list of problems
  const problemCount = data.result.problems.length;
  const randomIndex = Math.floor(Math.random() * problemCount);
  const problem = data.result.problems[randomIndex];

  // Construct the URL for the selected problem
  const contestId = problem.contestId;
  const index = problem.index;
  const problemUrl = `https://codeforces.com/problemset/problem/${contestId}/${index}`;

  // Return the URL of the selected problem
  return problemUrl;
}

// Define a function to update the UI with the randomly selected Codeforces question
async function updateQuestion() {
  // Check if a question URL is already stored in Chrome storage
  chrome.storage.local.get(['questionUrl'], async function(data) {
    let questionUrl;
    if (data.questionUrl) {
      // If a question URL is already stored in Chrome storage, use it
      questionUrl = data.questionUrl;
    } else {
      // Otherwise, fetch a new question and store it in Chrome storage
      questionUrl = await fetchRandomCodeforcesQuestion();
      chrome.storage.local.set({questionUrl: questionUrl});
    }

    // Update the UI with the question URL
    const questionLink = document.getElementById('question-link');
    questionLink.href = questionUrl;
    questionLink.innerText = questionUrl;
  });
}

// Add an event listener to the button that updates the question when clicked
const button = document.getElementById('update-button');
button.addEventListener('click', function() {
  chrome.storage.local.remove('questionUrl'); // Remove the stored question URL from Chrome storage
  updateQuestion(); // Fetch a new question and update the UI
});

// Call the `updateQuestion` function on page load to display an initial question
updateQuestion();

// Get the "Done" button and add a click event listener to increment the variable, update the UI, and fetch a new question

const doneButton = document.getElementById('random_done');
doneButton.addEventListener('click', function() {
  let doneCount = parseInt(localStorage.getItem('doneCount'));
  doneCount++;
  localStorage.setItem('doneCount', doneCount);
  chrome.storage.local.remove('questionUrl'); // Remove the stored question URL from Chrome storage
  updateQuestion(); // Fetch a new question and update the UI

  let successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '&#10024; Congratulations! &#10024;';
        document.body.appendChild(successMessage);
        setTimeout(function() {
          successMessage.remove();
},1000);


});
