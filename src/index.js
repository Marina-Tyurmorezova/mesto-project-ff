import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, isLiked, handleCardSubmit, formCard, placeList} from './components/card.js';
import {popupIsOpened, popupIsClosed, popupOverlayListener, popupOverlay, keydownListener, popupIsAnimated} from './components/modal.js';

// @todo: Вывести карточки на страницу 
// Используя полученную функцию, вывести все карточки из массива на страницу в элемент
initialCards.forEach(function(cardItem) {
    placeList.append(createCard(cardItem, deleteCard));
});

//@todo: В проекте есть три модальных окна. Они открываются по нажатию кнопок «Редактировать» и «+» и при нажатии на картинку, 
//а закрываются — при клике по крестику в правом верхнем углу
const popupWindow = document.querySelectorAll('.popup');
const EditProfile = document.querySelector('.popup_type_edit');
export const AddPlaces = document.querySelector('.popup_type_new-card');
const btnClosePopup = document.querySelectorAll('.popup__close');
//вызов функции добавляющей класс для плавного открытия и закрытия попапов
popupWindow.forEach((popup) => {
    popupIsAnimated(popup);
});
//открытие модальных окон по клику на кнопку
document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('profile__edit-button')) {
            //попап редактирования профила
            popupIsOpened(EditProfile); 
            //выводим по умолчанию имя и занятие из профиля
            EditProfileDefault ();
            };
        if (evt.target.classList.contains('profile__add-button')) {
            //попап добавления карточки
            popupIsOpened(AddPlaces);
            };
    }) 

//закрытие модального окна по клику на крестик
btnClosePopup.forEach((evt) => {
evt.addEventListener('click', () => {
    let popupParent = evt.closest('.popup');
    popupIsClosed(popupParent);
})
});

//TODO: При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
function EditProfileDefault () {
    document.forms['edit-profile'].elements.name.value =  document.querySelector('.profile__title').textContent; 
    document.forms['edit-profile'].elements.description.value = document.querySelector('.profile__description').textContent;
}

//TODO: Редактирование имени и информации о себе (SUBMIT по шаблону из задания) 
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;   
const jobInput = formElement.elements.description; 
   
function handleEditProfileSubmit (evt) {
    evt.preventDefault();
    const name = nameInput.value; 
    const job = jobInput.value; 
    const nameProfile =  document.querySelector('.profile__title');
    const descProfile = document.querySelector('.profile__description');
    nameProfile.textContent = name;
    descProfile.textContent = job;
    popupIsClosed(EditProfile);
}

formElement.addEventListener ('submit', handleEditProfileSubmit);

 //TODO: Дайте пользователю возможность добавлять карточки
formCard.addEventListener ('submit', handleCardSubmit);

 //TODO: Открытие попапа с картинкой
 //Функцию, которая обрабатывает клик по изображению, 
 //нужно, как и лайк, передать аргументом в функцию создания карточки
 const PopupImage = document.querySelector('.popup_type_image');
 export function imageOpened (imgLink,imgAlt) {
    PopupImage.querySelector('.popup__image').src = imgLink;
    PopupImage.querySelector('.popup__caption').textContent = imgAlt;
    popupIsOpened(PopupImage);
 }