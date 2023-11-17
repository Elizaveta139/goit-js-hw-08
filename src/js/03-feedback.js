import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
// const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state'; //ключ

// Події

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormData, 500));

const formData = {};

// оновлення сторінки
onPageRefresh();

// Отримання значень + в локальне сховище

function onFormData(evt) {
  //   // const message = evt.currentTarget.value;
  //   const email = form.querySelector('.feedback-form input').value;
  //   const message = form.querySelector('.feedback-form textarea').value;

  //   // Створити об'єкт зі значеннями полів форми
  //   const formData = {
  //     email,
  //     message,
  //   };
  formData[evt.target.name] = evt.target.value;
  //   console.log(formData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// При кліку по відправці форми
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log({ email: form.email.value, message: form.message.value });

  if (form.email.value === '' || form.message.value === '') {
    return alert('Please fill in all fields');
  }

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// // // оновлення сторінки
function onPageRefresh() {
  const savedData = localStorage.getItem(STORAGE_KEY); //отримуємо дані з ключа
  if (savedData) {
    const ParseSavedData = JSON.parse(savedData);
    form.email.value = ParseSavedData.email || '';
    form.message.value = ParseSavedData.message || '';
    formData.email = ParseSavedData.email || '';
    formData.message = ParseSavedData.message || '';
  }
}
