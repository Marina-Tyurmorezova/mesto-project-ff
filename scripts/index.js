// @todo: Темплейт карточки
    // - получаем доступ к содержимому шаблона
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
    // - расположение выводимых карточек
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
//написать функцию, которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
function createCard (cardItem, deleteCall) {
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
        let itemPlaces = deleteButton.closest('.places__item');
        deleteCall(itemPlaces);
    });
    // - возвращаем подготовленный элемент карточки
    return cardUser;
};

// @todo: Функция удаления карточки
function deleteCard(itemPlaces) {
    itemPlaces.remove();
};

// @todo: Вывести карточки на страницу 
// Используя полученную функцию, вывести все карточки из массива на страницу в элемент
initialCards.forEach(function(cardItem) {
    placeList.append(createCard(cardItem, deleteCard));
});