const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const switchColorBody = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const startSwitch = () => {
  intervalId = setInterval(switchColorBody, 1000);
  if (intervalId) {
    startBtnEl.setAttribute('disabled', true);
  }
};

const stopSwitch = () => {
  startBtnEl.removeAttribute('disabled');
  clearInterval(intervalId);
};

startBtnEl.addEventListener('click', startSwitch);
stopBtnEl.addEventListener('click', stopSwitch);
