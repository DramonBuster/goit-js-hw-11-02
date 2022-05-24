import '../sass/main';
import Swal from 'sweetalert2';

const inputDate = document.querySelector('#date-selector');
const startButton = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

inputDate.value = null;
startButton.disabled = true;

let timeLeft = 0;

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;

  return { days, hours, minutes, seconds };
}

const isDateInFuture = () => {
    if (Date.parse(inputDate.value) >= Date.now()) {
        startButton.disabled = false;
        return;
    } Swal.fire({
        icon: 'error',
        text: 'Please choose a date in the future'
    })
}

const startTimer = () => {
    startButton.disabled = true;
    const countdown = setInterval(() => {
        const currentTime = Date.now();
        const selectedDate = Date.parse(inputDate.value);
        const timeLeft = selectedDate - currentTime;
        convertMs(timeLeft);
        // console.log(convertMs(timeLeft));
    }, 1000)
}

inputDate.addEventListener('input', isDateInFuture);
startButton.addEventListener('click', startTimer);