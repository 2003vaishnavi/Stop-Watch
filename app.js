let timeDisplay = document.getElementById('time-display');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let bgColorPicker = document.getElementById('bgColorPicker');
let logContainer = document.getElementById('log');

let startTime, updatedTime, difference, timerInterval;
let running = false;

// Update the stopwatch display
function updateTime() {
    updatedTime = new Date(Date.now() - startTime);
    let hours = String(Math.floor(updatedTime / 3600000)).padStart(2, '0');
    let minutes = String(Math.floor((updatedTime % 3600000) / 60000)).padStart(2, '0');
    let seconds = String(Math.floor((updatedTime % 60000) / 1000)).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Log start and stop times
function logTime(action) {
    let logItem = document.createElement('div');
    logItem.className = 'log-item';
    
    let timeLog = action === 'start' ? 
        `Started at: ${timeDisplay.textContent}` : 
        `Stopped at: ${timeDisplay.textContent}`;
    
    logItem.innerHTML = `${timeLog} <button class="delete-btn">Delete</button>`;
    logContainer.appendChild(logItem);

    // Add delete functionality
    logItem.querySelector('.delete-btn').addEventListener('click', () => {
        logContainer.removeChild(logItem);
    });
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
    if (!running) {
        running = true;
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000);
        logTime('start');
    }
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    if (running) {
        running = false;
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        logTime('stop');
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    running = false;
    clearInterval(timerInterval);
    difference = 0;
    timeDisplay.textContent = "00:00:00";
    logContainer.innerHTML = ''; // Clear the log on reset
});

// Change background color
bgColorPicker.addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
});
