// @todo: Темплейт карточки 
// - получаем доступ к содержимому шаблона
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
//написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
export function createCard (cardItem, deleteCall, viewingPopupImage) {
    // - клонируем элементы шаблона
    const cardUser = cardTemplate.cloneNode(true);
    // - устанавливаем значения вложенных элементов
    cardUser.querySelector('.card__image').src = cardItem.link;
    cardUser.querySelector('.card__image').alt = cardItem.name;
    cardUser.querySelector('.card__title').textContent = cardItem.name;
    // - определение кнопки удаления карточки
    const buttonDelete = cardUser.querySelector('.card__delete-button');
    // - добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк
    buttonDelete.addEventListener('click', () => {
    // - выбираем ближайший родительский элемент с переданным селектором
        const itemPlaces = buttonDelete.closest('.places__item');
        deleteCall(itemPlaces);
    });
    // Функция обработчика лайка в функции создания карточки 
    const buttonLike = cardUser.querySelector('.card__like-button');
    buttonLike.addEventListener('click', likedCard);
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
export function likedCard (like) {
    like.target.classList.toggle('card__like-button_is-active');
};