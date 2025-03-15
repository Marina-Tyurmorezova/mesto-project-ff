// Функция, которая добавляет класс с ошибкой
const showInputError = (form, formInput, errorMessage, config) => {
  // Выбираем элемент ошибки на основе уникального класса
  const formInputError = form.querySelector(`.${formInput.id}_error`);
  formInput.classList.add(config.inputErrorClass);
  formInputError.textContent = errorMessage;
  formInputError.classList.add(config.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, formInput, config) => {
  // Находим элемент ошибки
  const formInputError = form.querySelector(`.${formInput.id}_error`);
  formInput.classList.remove(config.inputErrorClass);
  formInputError.classList.remove(config.errorClass);
  //очистим ошибку
  formInputError.textContent = "";
};

// Блокируем кнопку отправки формы. Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((popupFormInput) => {
    // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !popupFormInput.validity.valid;
  });
};

//функции измененя состояния кнопки
const disabledSubmitButton = (buttonSubmit, config) => {
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add(config.inactiveButtonClass);
};

const enabledSubmitButton = (buttonSubmit, config) => {
  buttonSubmit.disabled = false;
  buttonSubmit.classList.remove(config.inactiveButtonClass);
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonFormSubmit, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disabledSubmitButton(buttonFormSubmit, config);
  } else {
    // иначе сделай кнопку активной
    enabledSubmitButton(buttonFormSubmit, config);
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
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(
      popupForm,
      popupFormInput,
      popupFormInput.validationMessage,
      config
    );
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, popupFormInput, config);
  }
};

// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (popupForm, config) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(
    popupForm.querySelectorAll(config.inputSelector)
  );
  //выбираем кнопку отправки внутри формы
  const buttonFormSubmit = popupForm.querySelector(config.submitButtonSelector);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((popupFormInput) => {
    // каждому полю добавим обработчик события input
    popupFormInput.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(popupForm, popupFormInput, config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonFormSubmit, config);
    });
  });
};

//делайте функцию enableValidation ответственной за включение валидации всех форм.
// Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек
export const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((popupForm) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(popupForm, config);
  });
};

//очистка ошибок валидации
export function clearValidation(popupForm, config) {
  const popupFormInputList = Array.from(
    popupForm.querySelectorAll(config.inputSelector)
  );
  const buttonSubmit = popupForm.querySelector(config.submitButtonSelector);
  popupFormInputList.forEach((popupFormInput) => {
    hideInputError(popupForm, popupFormInput, config);
    disabledSubmitButton(buttonSubmit, config);
  });
}
