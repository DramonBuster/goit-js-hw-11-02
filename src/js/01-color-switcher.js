// import '../css/common.css';

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

// body.style.backgroundColor = "#000000";

stopButton.disabled = true;

let timeOfChange = null;
let isActive = false;

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const setBodyColor = () => body.style.backgroundColor = getRandomHexColor();

// console.log(getRandomHexColor());

const start = () => {
    if (isActive) {
        return
    }

    startButton.disabled = true;
    stopButton.disabled = false;

    isActive = true;
    timeOfChange = setInterval(() => setBodyColor(), 1000);
}

const stop = () => {
    if (!isActive) {
        return
    }

    startButton.disabled = false;
    stopButton.disabled = true;

    isActive = false;
    clearInterval(timeOfChange);
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);