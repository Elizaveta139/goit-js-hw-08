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
  formData[evt.target.name] = evt.target.value;
  //   console.log(formData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// При кліку по відправці форми
function onFormSubmit(evt) {
  evt.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    return alert('Please fill in all fields');
  }

  console.log({ email: form.email.value, message: form.message.value });

  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
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
