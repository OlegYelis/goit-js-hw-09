import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const inputDateEl = document.querySelector('#datetime-picker');

startTimerBtnEl.setAttribute('disabled', true);

let selectedDate = 0;
let intervalId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startTimerBtnEl.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future', {
        timeout: 1923,
        showOnlyTheLastOne: true,
      });
      return;
    } else {
      startTimerBtnEl.removeAttribute('disabled');
      selectedDate = selectedDates[0];
      return selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
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

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  value = String(value).padStart(2, '0');
  return value;
};

const remainTime = () => {
  const timeLeft = selectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  if (timeLeft <= 1000) {
    clearInterval(intervalId);
  }

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

startTimerBtnEl.addEventListener('click', () => {
  startTimerBtnEl.setAttribute('disabled', true);
  intervalId = setInterval(remainTime, 1000);
  inputDateEl.setAttribute('disabled', true);
});
