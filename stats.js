
const meter1 = document.querySelector(".meter-1");
const meter2 = document.querySelector(".meter-2");

// Function to update the stroke-dasharray and stroke-dashoffset properties of meter-1 based on the percentage
function updateMeter1(percent) {
  const circumference = 100;
  const dasharray = circumference;
  const dashoffset = circumference - percent / 100 * circumference;
  meter1.style.strokeDasharray = dasharray;
  meter1.style.strokeDashoffset = dashoffset;
}

// Function to update the stroke-dasharray and stroke-dashoffset properties of meter-2 based on the percentage
function updateMeter2(percent) {
  const circumference = 100;
  const dasharray = circumference;
  const dashoffset = circumference - percent / 100 * circumference;
  meter2.style.strokeDasharray = dasharray;
  meter2.style.strokeDashoffset = dashoffset;
}

chrome.storage.local.get(['addCount', 'tickCount', 'deleteCount'], function(data) {
  let done_percent = data.addCount > 0 ? Math.round(data.tickCount / data.addCount * 100) : 0;
  let delete_percent = data.addCount > 0 ? Math.round(data.deleteCount / data.addCount * 100) : 0;

  updateMeter1(done_percent);
  updateMeter2(delete_percent);
  document.getElementById('add_count').textContent = data.addCount;
  document.getElementById('doneques_count').textContent = done_percent+"%";
  document.getElementById('notdone_count').textContent = delete_percent+"%";
  
  function showRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star">&#9733;</span>';
      } else {
        stars += '<span class="star">&#9734;</span>';
      }
    }
    document.getElementById("rating").innerHTML = stars;
  }

  if (data.tickCount ==0 && data.tickCount <=100) {
    showRating(0);}
  else if (data.tickCount >0 && data.tickCount <=100) {
    showRating(1);
  } else if (data.tickCount >100&& data.tickCount <=200) {
    showRating(2);
  }  else if (data.tickCount >200 &&data.tickCount <=300) {
    showRating(3);
  } else if (data.tickCount >300 &&data.tickCount <=400) {
    showRating(4);
  } else if (data.tickCount >400) {
    showRating(5);
  }
  else {
    document.getElementById('rating').textContent = 0;
  }

});

document.getElementById('done_count').textContent = localStorage.getItem('doneCount');

 

//  for the circular percentage
 
 
  //----------------------------------------------------------------
  const resetButton = document.getElementById("reset-stats-button");
  const confirmationButton = document.getElementById("reset-stats-confirmation");
  
  confirmationButton.addEventListener("click", function() {
    resetButton.style.display = "inline-block";
  });
  
  const buttonContainer = document.querySelector('.reset-stats-button');
  confirmationButton.style.marginTop = '5px';
  confirmationButton.style.backgroundColor = '#007e63';
  confirmationButton.style.color = '#fff';
  confirmationButton.style.border = 'none';
  confirmationButton.style.borderRadius = '5px';
  confirmationButton.style.padding = '5px 10px';
  confirmationButton.style.cursor = 'pointer';
  
  const btnContainer = document.querySelector('.reset-stats-confirmation');
  resetButton.style.marginTop = '5px';
  resetButton.style.backgroundColor = '#ea6b04';
  resetButton.style.color = '#fff';
  resetButton.style.border = 'none';
  resetButton.style.borderRadius = '5px';
  resetButton.style.padding = '5px 10px';
  resetButton.style.cursor = 'pointer';

//  To hide the "Are you sure?" button after clicking on it
  const confirmButton = document.getElementById("reset-stats-button");
  confirmButton.addEventListener("click", () => {
      confirmButton.style.display = "none";
     
  });

  document.getElementById('reset-stats-button').addEventListener('click', function() {
    chrome.storage.local.get(['addCount', 'tickCount', 'deleteCount'], function(data) {
      const remainingCount = data.addCount - data.tickCount - data.deleteCount ;
      chrome.storage.local.set({addCount: remainingCount, tickCount: 0, deleteCount: 0}, function() {
        localStorage.setItem('doneCount', 0);
        document.getElementById('done_count').textContent = 0;
  
        // Reset the percentage values
        updateMeter1(0);
        updateMeter2(0);

        document.getElementById('add_count').textContent = remainingCount;
  document.getElementById('doneques_count').textContent = "0%";
  document.getElementById('notdone_count').textContent = "0%";
  
        let successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = 'Stats Reset successfully';
        document.body.appendChild(successMessage);
        setTimeout(function() {
          successMessage.remove(); 
        }, 1000);
      });
    });
  });
  

