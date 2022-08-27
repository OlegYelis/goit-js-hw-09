import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

let totalDelay = Number(inputDelayEl.value) - Number(inputStepEl.value);

function createPromise(position, delay) {
  return (promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, totalDelay);
  }));
}

const totalPromises = () => {
  for (let i = 0; i < Number(inputAmountEl.value); i += 1) {
    createPromise(i + 1, (totalDelay += Number(inputStepEl.value)))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

formEl.addEventListener('submit', evt => {
  evt.preventDefault();

  setTimeout(totalPromises, Number(inputDelayEl.value));

  totalDelay = Number(inputDelayEl.value) - Number(inputStepEl.value);
});
