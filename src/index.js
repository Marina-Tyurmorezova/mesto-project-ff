import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, isLiked} from './components/card.js';
import {openPopup, closePopup, listenerPopupOverlay, keydownListener, smoothAnimationPopup} from './components/modal.js';
import {ValidationConfig, enableValidation, clearValidation} from './components/validation.js';
import { getInitialUser , getCardList, editUserProfile} from './components/api.js';
import { data } from 'autoprefixer';

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
const avatarUser = document.querySelector('.profile__image');
//для работы с Id пользователя
let userId = null;
//для загрузки данных пользователя и карточек 
Promise.all([getInitialUser(),getCardList()])
.then(([data, cardData]) => {
    //получение данных пользователя
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    avatarUser.style.textContent = data.avatar;
    //вывод карточек с сервера
    cardData.forEach(function(cardItem) {
        placeList.append(createCard(cardItem, deleteCard, openPopupImage));
    })
})


//TODO: При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
function editProfileDataDefault () {
    //очищаем оибки валидации перед открытием
    clearValidation(popupProfile, ValidationConfig);
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

    //создаем объект с новыми данными пользователя
    const dataUserProfile = {
        name: nameInput.value,
        about: jobInput.value
    };
    console.log (dataUserProfile);
    closePopup(popupProfile);
    //отправляем данные на сервер
    editUserProfile(dataUserProfile)   
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
//initialCards.forEach(function(cardItem) {
//    placeList.append(createCard(cardItem, deleteCard, openPopupImage));
//});

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
    clearValidation(popupPlaceAdd, ValidationConfig);
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

//ПР7:  ---------------------------------------------------------------------------
// включение валидации вызовом enableValidation все настройки передаются при вызове
enableValidation(ValidationConfig);

