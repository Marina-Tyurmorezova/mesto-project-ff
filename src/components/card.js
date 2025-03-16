import { likedCardApi, dislikedCardApi } from "./api.js";

// - получаем доступ к содержимому шаблона
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
//написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
export function createCard(
  cardItem,
  deleteCardItem,
  viewingPopupImage,
  likedCard,
  userId
) {
  // - клонируем элементы шаблона
  const cardUser = cardTemplate.querySelector(".card").cloneNode(true);
  // - определение кнопки удаления карточки
  const buttonDelete = cardUser.querySelector(".card__delete-button");
  //определяем кнопку лайка карточки
  const buttonLike = cardUser.querySelector(".card__like-button");
  //Определяем счетчик лайка
  const likeCounter = cardUser.querySelector(".card__like-counter");
  const imgCard = cardUser.querySelector(".card__image");
  const imgCardTitle = cardUser.querySelector(".card__title");
  const ownerId = cardItem.owner["_id"];
  // - устанавливаем значения вложенных элементов
  imgCard.src = cardItem.link;
  imgCard.alt = cardItem.name;
  imgCardTitle.textContent = cardItem.name;
  likeCounter.textContent = cardItem.likes.length;

  //если карточка создана нами добавляем обработчик на кнопку удаления карточки
  if (userId === ownerId) {
    // - добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
    buttonDelete.addEventListener("click", () => {
      deleteCardItem(cardUser, cardItem._id);
    });
  } else {
    //если карточка создана не нами - убираем кнопку удаления
    buttonDelete.remove();
  }

  // Функция обработчика лайка в функции создания карточки
  buttonLike.addEventListener("click", () =>
    likedCard(buttonLike, cardItem, likeCounter, isLiked)
  );

  const isLiked = cardItem.likes.some((likeUser) => likeUser._id === userId);

  if (isLiked) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  //обработчик клика по картинки для открытия модального окна просмотра
  imgCard.addEventListener("click", () => {
    viewingPopupImage(imgCard.src, imgCard.alt);
  });
  //возвращаем подготовленный элемент карточки
  return cardUser;
}

// @todo: Функция удаления карточки
export function deleteCard(itemPlaces) {
  itemPlaces.remove();
}

//TODO: Лайк карточки
//Если лайкнуть карточку, сердечко поменяет цвет
export function likedCard(buttonLike, cardItem, likeCounter, isLiked) {
  const likeDefinition = isLiked ? dislikedCardApi : likedCardApi;
  const cardId = cardItem._id;
  likeDefinition(cardId)
    .then((updateCounter) => {
      buttonLike.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updateCounter.likes.length;
    })
    .catch((err) => console.log(err));
}
