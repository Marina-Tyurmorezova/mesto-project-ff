//Из файла экспортируется только функция активации валидации enableValidation 

// переменные для проверки валидности
export const popupForm = document.querySelector('.popup__form');
export const popupFormInput = popupForm.querySelector('.popup__input');
export const popupFormInputTextError = popupForm.querySelector('.popup__input__error');
export const buttonFormSubmit = popupForm.querySelector('.popup__button');

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupFormInput, errorMessage) => {
    // Выбираем элемент ошибки на основе уникального класса 
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.add('popup__input_type_error');
    popupFormError.textContent = errorMessage;
    popupFormError.classList.add('popup__error_visible');
  };

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (popupForm, popupFormInput) => {
  // Находим элемент ошибки
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.remove('popup__input_type_error');    
    popupFormError.classList.remove('popup__error_visible');
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
      buttonFormSubmit.classList.add('popup__button_disabled');
  } else {
      // иначе сделай кнопку активной
      buttonFormSubmit.disabled = false;
      buttonFormSubmit.classList.remove('popup__button_disabled');
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
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    //выбираем кнопку отправки внутри формы
    const buttonFormSubmit = popupForm.querySelector('.popup__button');
    toggleButtonState(inputList, buttonFormSubmit);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((popupFormInput) => {
      // каждому полю добавим обработчик события input
      popupFormInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(popupForm, popupFormInput);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonFormSubmit);
      });
    });
  }; 

//делайте функцию enableValidation ответственной за включение валидации всех форм. 
// Пусть она принимает все нужные функциям классы и селекторы элементов как объект настроек
export const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(popupForm);
    });
};

//тут всё логично. По сути, это как одна большая функция, которая разбита на несколько. 
// То есть одна точка входа в модуль. Функция enableValidation дальше по цепочке вызывает другие функции отвечающие 
// за навешивания слушателя инпута, скрытие и показ ошибок и т.д. Всем этим функциям нужны данные, которые есть в config. 
// Для этого передаем в enableValidation объект конфига со всеми данными, с помощью деструктуризации, например, 
// достаем все необходимые данные, а остаток пробрасываем дальше во вложенные функции. Таким образом enableValidation 
// должен принимать config и прокидывать его вглубь, но конфиг не должен экспортироваться или быть доступен каким-либо другим 
// способом в других функциях. Только из аргументов по цепочке от enableValidation


export function clearValidation (popupForm) {
  const popupFormInputList = Array.from(popupForm.querySelectorAll('.popup__input'));
  popupFormInputList.forEach((popupFormInput) => {
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    hideInputError(popupForm, popupFormInput);
    popupFormError.textContent = '';
  })
}