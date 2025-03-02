//ункции для валидации форм. Из файла экспортируется только функция активации валидации enableValidation 

import { findCacheDir } from "webpack-dev-server";

//переменные для проверки валидности
export const popupForm = document.querySelector('.popup__form');
export const popupFormInput = popupForm.querySelector('.popup__input');
export const popupFormInputTextError = popupForm.querySelector('.popup__input__error');
export const buttonFormSubmit = popupForm.querySelector('.popup__button');
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  }; 

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupFormInput, errorMessage) => {
    // Выбираем элемент ошибки на основе уникального класса 
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.add(enableValidation.inputErrorClass);
    popupFormError.textContent = errorMessage;
    popupFormError.classList.add(enableValidation.errorClass);
  };

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (popupForm, popupFormInput) => {
  // Находим элемент ошибки
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.remove(enableValidation.inputErrorClass);    
    popupFormError.classList.remove(enableValidation.errorClass);
  //очистим ошибку
    popupFormError.textContent = '';
  };

   // Блокируем кнопку отправки формы. Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((popupFormInput) => {
        // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !popupFormInput.validity.valid;
  })
}; 

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonFormSubmit) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonFormSubmit.disabled = true;
      buttonFormSubmit.classList.add(enableValidation.inactiveButtonClass);
  } else {
      // иначе сделай кнопку активной
      buttonFormSubmit.disabled = false;
      buttonFormSubmit.classList.remove(enableValidation.inactiveButtonClass);
  }
}; 

  // Функция, которая проверяет валидность поля
const isValid = (popupForm, popupFormInput) => {
    if (popupFormInput.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку и заменяет ею стандартное сообщение об ошибке
        popupFormInput.setCustomValidity(popupFormInput.dataset.errorMessage);
     } else {
        popupFormInput.setCustomValidity("");
    }

    if (!popupFormInput.validity.valid) {
      if (popupFormInput.validity.valueMissing === true) {
        popupFormInput.setCustomValidity("Вы пропустили это поле")
      }
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(popupForm, popupFormInput, popupFormInput.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupFormInput);
    }
  };
  
  // Вызовем функцию isValid на каждый ввод символа
  const setEventListeners = (popupForm) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(popupForm.querySelectorAll(enableValidation.inputSelector));
    //выбираем кнопку отправки внутри формы
    const buttonFormSubmit = popupForm.querySelector(enableValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonFormSubmit);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((popupFormInput) => {
      // каждому полю добавим обработчик события input
      popupForm.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(popupForm, popupFormInput);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonFormSubmit);
      });
    });
  }; 

export const enableValidationFormList = () => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(popupForm);
    });
  };
