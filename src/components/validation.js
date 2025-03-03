export const ValidationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupFormInput, errorMessage, config) => {
    // Выбираем элемент ошибки на основе уникального класса 
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.add(config['inputErrorClass']);
    popupFormError.textContent = errorMessage;
    popupFormError.classList.add(config['errorClass']);
  };

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupFormInput, config) => {
  // Находим элемент ошибки
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.remove(config['inputErrorClass']);    
    popupFormError.classList.remove(config['errorClass']);
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
const toggleButtonState = (inputList, buttonFormSubmit, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonFormSubmit.disabled = true;
      buttonFormSubmit.classList.add(config['inactiveButtonClass']);
  } else {
      // иначе сделай кнопку активной
      buttonFormSubmit.disabled = false;
      buttonFormSubmit.classList.remove(config['inactiveButtonClass']);
  }
}; 

  // Функция, которая проверяет валидность поля
const isValid = (popupForm, popupFormInput, config) => {
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
      showInputError(popupForm, popupFormInput, popupFormInput.validationMessage, config);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupFormInput, config);
    }
  };
  
  // Вызовем функцию isValid на каждый ввод символа
  const setEventListeners = (popupForm, config) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(popupForm.querySelectorAll(config['inputSelector']));
    //выбираем кнопку отправки внутри формы
    const buttonFormSubmit = popupForm.querySelector(config['submitButtonSelector']);
    toggleButtonState(inputList, buttonFormSubmit, config);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((popupFormInput) => {
      // каждому полю добавим обработчик события input
      popupFormInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(popupForm, popupFormInput, config);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonFormSubmit,config);
      });
    });
  }; 

//делайте функцию enableValidation ответственной за включение валидации всех форм. 
// Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек
export const enableValidation = (config) => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config['formSelector']));
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(popupForm, config);
    });
};

//очистка ошибок валидации
export function clearValidation (popupForm, config) {
  const popupFormInputList = Array.from(popupForm.querySelectorAll(config['inputSelector']));
  popupFormInputList.forEach((popupFormInput) => {
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    hideInputError(popupForm, popupFormInput, config);
    popupFormError.textContent = '';
    popupFormInput.value = '';
  })
}