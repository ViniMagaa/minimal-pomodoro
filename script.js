let duration = 25 * 60;
let timeLeft = duration;
let timer;
let running = false;
const alarm = new Audio("alarm.mp3");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (running) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  running = true;
  document.getElementById("toggleButton").textContent = "pause";
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      running = false;
      document.getElementById("toggleButton").textContent = "start";
      alarm.play();
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
  document.getElementById("toggleButton").textContent = "start";
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = duration;
  running = false;
  updateDisplay();
  document.getElementById("toggleButton").textContent = "start";
  alarm.pause();
  alarm.currentTime = 0;
}

function setMode(minutes) {
  clearInterval(timer);
  duration = minutes * 60;
  timeLeft = duration;
  running = false;
  updateDisplay();
  document.getElementById("toggleButton").textContent = "start";
  alarm.pause();
  alarm.currentTime = 0;
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

updateDisplay();
