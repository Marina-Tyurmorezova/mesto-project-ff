import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, isLiked} from './components/card.js';
import {openPopup, closePopup, listenerPopupOverlay, keydownListener, smoothAnimationPopup} from './components/modal.js';
// кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');
const buttonClosePopupList = document.querySelectorAll('.popup__close');
// - расположение выводимых карточек
const placeList = document.querySelector('.places__list');
//объявление модальных окон 
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupPlaceAdd = document.querySelector('.popup_type_new-card'); 
const popupImage = document.querySelector('.popup_type_image');
//переменные к ф-ии handleSubmitEditProfile
const formEditProfileElement = document.forms['edit-profile'];
const nameInput = formEditProfileElement.elements.name;   
const jobInput = formEditProfileElement.elements.description; 
const nameProfile =  document.querySelector('.profile__title');
const descProfile = document.querySelector('.profile__description');
//переменные к ф-ии handleCardSubmit
const formCard = document.forms['new-place'];
const namePlaceInput = formCard.elements['place-name'];
const linkPlaceInput = formCard.elements.link;
//переменные к функции editProfileDataDefault 
const profileName= document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNamePopupDefault = document.forms['edit-profile'].elements.name;
const profileDescriptionPopupDefault = document.forms['edit-profile'].elements.description;
//переменные для проверки валидности
const popupForm = document.querySelector('.popup__form');
const popupFormInput = popupForm.querySelector('.popup__input');
const popupFormInputTextError = popupForm.querySelector('.popup__input__error');
const buttonFormSubmit = popupForm.querySelector('.popup__button');

//TODO: При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
function editProfileDataDefault () {
    profileNamePopupDefault.value = profileName.textContent;
    profileDescriptionPopupDefault.value = profileDescription.textContent;
}

//TODO: Редактирование имени и информации о себе (SUBMIT по шаблону из задания) 
function handleSubmitEditProfile (evt) {
    evt.preventDefault();
    const name = nameInput.value; 
    const job = jobInput.value; 
    nameProfile.textContent = name;
    descProfile.textContent = job;
    closePopup(popupProfile);
}

//TODO: Дайте пользователю возможность добавлять карточки
function handleCardSubmit (evt) {
    evt.preventDefault();
    const placeName = namePlaceInput.value;
    const placeAlt = placeName;
    const placeLink = linkPlaceInput.value;
    //получаем данные (имя, описание и ссылку) новой карточки
    const newPlaceCard = 
        {name: placeName,
         alt: placeAlt,
        link: placeLink
        };
    //выводим первой новую карточку
    placeList.prepend(createCard(newPlaceCard, deleteCard, openPopupImage));
    //очищаем поля модалки
    formCard.reset();
    //закрываем модалку
    closePopup(popupPlaceAdd );
 }

 //TODO: Открытие попапа с картинкой
 function openPopupImage (imageLink,imageAlt) {
    popupImage.querySelector('.popup__image').src = imageLink;
    popupImage.querySelector('.popup__image').alt = imageAlt
    popupImage.querySelector('.popup__caption').textContent = imageAlt;
    openPopup(popupImage);
 }

// @todo: Вывести карточки на страницу 
initialCards.forEach(function(cardItem) {
    placeList.append(createCard(cardItem, deleteCard, openPopupImage));
});

//вызов функции добавляющей класс для плавного открытия и закрытия попапов
popupList.forEach((popup) => {
    smoothAnimationPopup(popup);
});

//открытие модального окна редактирования профиля по клику на кнопку
buttonEditProfile.addEventListener('click', () => {
    //попап редактирования профила
    openPopup(popupProfile); 
    //выводим по умолчанию имя и занятие из профиля
    editProfileDataDefault ();
})
//открытие модального окна добавления карточки по клику на кнопку
buttonAddPlace.addEventListener('click', () => {
    //попап добавления карточки
    openPopup(popupPlaceAdd );
})

//закрытие модального окна по клику на крестик
buttonClosePopupList.forEach((evt) => {
    evt.addEventListener('click', () => {
        const popupParentContainer = evt.closest('.popup');
        closePopup(popupParentContainer);
    })
    });

//слушатель клика по оверлэю для каждого модального окна
popupProfile.addEventListener('click', listenerPopupOverlay);
popupPlaceAdd .addEventListener('click', listenerPopupOverlay);
popupImage.addEventListener('click', listenerPopupOverlay); 

//слушатель отправки формы при редактировании профиля
formEditProfileElement.addEventListener ('submit', handleSubmitEditProfile);
//слушатель отправки формы при добавлении новой карточки
formCard.addEventListener ('submit', handleCardSubmit);

//ПР7: Слушатель поля "имя"  формы редактирования профиля ---------------------------------------------------------------------------
nameInput.addEventListener('input', function (evt){ //вместо функции вызвать экспортированную функцию валидации
    console.log(evt.target.validity.valid); //выводим в консоль результат валидности
})

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupFormInput, errorMessage) => {
    // Выбираем элемент ошибки на основе уникального класса 
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.add('popup__input_type_error');
    popupFormError.textContent = errorMessage;
    popupFormError.classList.add('popup__input__error__active');
  };

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupFormInput) => {
  // Находим элемент ошибки
    const popupFormError = popupForm.querySelector(`.${popupFormInput.id}_error`);
    popupFormInput.classList.remove('popup__input_type_error');    
    popupFormError.classList.remove('popup__input__error__active');
  //очистим ошибку
    popupFormError.textContent = '';
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
      console.log(popupFormInput.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupFormInput);
    }
  };
  
  // Вызовем функцию isValid на каждый ввод символа
  const setEventListeners = (popupForm) => {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));  
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

  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(popupForm);
    });
  };
  
  // Вызовем функцию
  enableValidation(); 

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
      buttonFormSubmit.classList.add('popup__button__submit_inactive');
  } else {
      // иначе сделай кнопку активной
      buttonFormSubmit.disabled = false;
      buttonFormSubmit.classList.remove('popup__button__submit_inactive');
  }
}; 