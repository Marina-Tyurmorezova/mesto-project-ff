//функция открывающая  попап путем добавления или удаления класса для открытия попапа
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown',listenerKeydownEscape);
};
//функция закрывающая попап путем добавления или удаления класса для открытия попапа
export function closePopup (popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', listenerKeydownEscape);
};

//функция слушателя клика по оверлей
export function listenerPopupOverlay (evt) {
    closePopup(evt.target);
}

//функция слушателя нажатия клавиши Esc (работает)
export function listenerKeydownEscape (evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);    
    }
    console.log('нажата клавиша',evt.key);
};

//функция добавляет в попап класс с параметрами  для плавного открытия модального окна
export function smoothAnimationPopup (popupElement) {
    popupElement.classList.add('popup_is-animated');  
};