import {likedCardApi, dislikedCardApi} from './api.js';

// - получаем доступ к содержимому шаблона
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
//написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
export function createCard (cardItem, deleteCardItem, viewingPopupImage, likedCard, userId, ownerId) {
    // - клонируем элементы шаблона
    const cardUser = cardTemplate.querySelector('.card').cloneNode(true);
    // - определение кнопки удаления карточки   
    const buttonDelete = cardUser.querySelector('.card__delete-button');
    //определяем кнопку лайка карточки
    const buttonLike = cardUser.querySelector('.card__like-button');
    //Определяем счетчик лайка 
    const likeCounter = cardUser.querySelector('.card__like-counter');
    // - устанавливаем значения вложенных элементов
    cardUser.querySelector('.card__image').src = cardItem.link;
    cardUser.querySelector('.card__image').alt = cardItem.name;
    cardUser.querySelector('.card__title').textContent = cardItem.name;

      
    //если карточка создана нами добавляем обработчик на кнопку удаления карточки
    if (userId === ownerId) {
    // - добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
    buttonDelete.addEventListener('click', ()=> {
    // - выбираем ближайший родительский элемент с переданным селектором
      // const itemPlaces = buttonDelete.closest('.places__item');
       // deleteCardItem(cardId);  
       deleteCardItem(cardUser, cardItem._id);
    })
    }
     else 
    {
        //если карточка создана не нами - убираем кнопку удаления
        buttonDelete.remove(); 
    }

    // Функция обработчика лайка в функции создания карточки 
    buttonLike.addEventListener('click', () =>  likedCard(buttonLike, cardItem ,likeCounter));

    //выводим 0 если нет лайков, если есть - количество лайков
    if (cardItem.likes.length !== null ) {
        likeCounter.textContent = cardItem.likes.length;
    } else {
        likeCounter.textContent = 0;
    }

    const isLiked = cardItem.likes.some((like) => like._id === userId);
    //console.log (like._id);
       if (isLiked) {
        buttonLike.classList.toggle('card__like-button_is-active');
        //likeCounter.textContent = cardItem.likes.length;
    }
    
    //обработчик клика по картинки для открытия модального окна просмотра
    const imgCard = cardUser.querySelector('.card__image');
    imgCard.addEventListener('click', () => {
     viewingPopupImage (imgCard.src, imgCard.alt);
    })
    //возвращаем подготовленный элемент карточки
        return cardUser;
    };
    
// @todo: Функция удаления карточки
export function deleteCard(itemPlaces) {
    itemPlaces.remove();
};

//TODO: Лайк карточки
//Если лайкнуть карточку, сердечко поменяет цвет
export function likedCard(buttonLike, cardItem, likeCounter) {
    const isLiked = buttonLike.classList.contains('card__like-button_is-active');
    const likeDefinition = isLiked ? dislikedCardApi : likedCardApi;
    const cardId = cardItem._id;
    likeDefinition(cardId)
    .then((updateCounter) => {
        buttonLike.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = updateCounter.likes.length;
        console.log (likeDefinition);
        
    })
    .catch (err => console.log(err));
};