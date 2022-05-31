import '../sass/main';
import { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
      // Reject
        reject({ position, delay });
      }
    }, delay)
  })
}

const onSubmit = event => {
  event.preventDefault();

  const formDataList = {};
  const formDataListRaw = new FormData(event.currentTarget);
  formDataListRaw.forEach((value, name) => {
    formDataList[name] = value;
  })
  console.log(formDataList);

  let delay = Number(formDataList.delay);
  let step = Number(formDataList.step);
  let amount = Number(formDataList.amount);

  // console.log(delay, step, amount);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    
    delay += step;
  }
}

form.addEventListener('submit', onSubmit);

// // ======================= Subtask 1 =======================
// const delay = ms => {
//   // Change this function
//   return Promise.resolve(ms);
// };

// const logger = time => console.log(`Fulfilled after ${time}ms`);

// // Tests
// delay(2000).then(logger); // Fulfilled after 2000ms
// delay(1000).then(logger); // Fulfilled after 1000ms
// delay(1500).then(logger); // Fulfilled after 1500ms

// // ======================= Subtask 2 =======================
// const users = [
//   { name: 'Mango', active: true },
//   { name: 'Poly', active: false },
//   { name: 'Ajax', active: false },
// ];

// const toggleUserState = (allUsers, username) => {
//   return new Promise(resolve => {
//     resolve(allUsers.map(user =>
//       user.name === username ? { ...user, active: !user.active } : user
//     ));
//   })
// };

// // Currently the function works like this
// // toggleUserState(users, 'Mango', console.table);
// // toggleUserState(users, 'Ajax', console.table);

// // The function should work like this
// toggleUserState(users, 'Mango').then(console.table);
// toggleUserState(users, 'Ajax').then(console.table);

// // ======================= Subtask 3 =======================
// const randomIntegerFromInterval = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const makeTransaction = transaction => {
//   const delay = randomIntegerFromInterval(200, 500);

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//     const canProcess = Math.random() > 0.3;

//     if (canProcess) {
//       resolve({ id: transaction.id, time: delay });
//     } else {
//       reject(transaction.id);
//     }
//   }, delay);
//   })
// };

// const logSuccess = ({ id, time }) => {
//   console.log(`Transaction ${id} processed in ${time}ms`);
// };

// const logError = id => {
//   console.warn(`Error processing transaction ${id}. Please try again later.`);
// };

// // Currently the function works like this
// // makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// // makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// // makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// // makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);

// // The function should work like this
// // makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
// // makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);
// // makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);
// // makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
