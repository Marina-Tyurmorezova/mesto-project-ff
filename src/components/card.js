import {popupIsClosed} from './modal.js';
//import { AddPlaces, imageOpened } from '../index.js';

export const AddPlaces = document.querySelector('.popup_type_new-card');
// @todo: Темплейт карточки 
// - получаем доступ к содержимому шаблона
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
//написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
export function createCard (cardItem, deleteCall) {
    // - клонируем элементы шаблона
    const cardUser = cardTemplate.cloneNode(true);
    // - устанавливаем значения вложенных элементов
    cardUser.querySelector('.card__image').src = cardItem.link;
    cardUser.querySelector('.card__image').alt = cardItem.name;
    cardUser.querySelector('.card__title').textContent = cardItem.name;
    // - определение кнопки удаления карточки
    const deleteButton = cardUser.querySelector('.card__delete-button');
    // - добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
    deleteButton.addEventListener('click', () => {
    // - выбираем ближайший родительский элемент с переданным селектором
        const itemPlaces = deleteButton.closest('.places__item');
        deleteCall(itemPlaces);
    });
    // Функция обработчика лайка в функции создания карточки 
    const likeButton = cardUser.querySelector('.card__like-button');
    likeButton.addEventListener('click', isLiked);
    //
    const imgCard = cardUser.querySelector('.card__image');
    imgCard.addEventListener('click', () => {
      const imgLink = imgCard.src;
      const imgAlt = imgCard.alt;
     // imgOpened(imgLink,imgAlt);   НАДО ИСПРАВИТЬ БЕЗ ИМПОРТА ФУНКЦИИ!
    })
        // - возвращаем подготовленный элемент карточки
        return cardUser;
    };
    
// @todo: Функция удаления карточки
export function deleteCard(itemPlaces) {
    itemPlaces.remove();
};

//TODO: Лайк карточки
//Если лайкнуть карточку, сердечко поменяет цвет
export function isLiked (like) {
    like.target.classList.toggle('card__like-button_is-active');
};  