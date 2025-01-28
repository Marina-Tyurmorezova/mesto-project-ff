//функция открывающая  попап путем добавления или удаления класса для открытия попапа
export function popupIsOpened (PopupElement) {
    PopupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown',keydownListener);
};
//функция закрывающая попап путем добавления или удаления класса для открытия попапа
export function popupIsClosed (PopupElement) {
    PopupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownListener);
};

//функция слушателя клика по оверлей
export function popupOverlayListener (evt) {
    const popupContent = document.querySelector('.popup_is-opened .popup__content');
    const withinPopup = evt.composedPath().includes(popupContent);
    if ( ! withinPopup ) {
        popupIsClosed(evt.target);
    }    
}
 
//функция слушателя нажатия клавиши Esc
//РАБОТАЕТ ?
export function keydownListener (evt) {
    if (evt.key === 'Escape') {
      const OpenedPopup = document.querySelector('.popup_is-opened');
      popupIsClosed(OpenedPopup)
      //снимаем слушатель нажатия клавиши
    document.removeEventListener('keydown',keydownListener);
    }
};

//функция добавляет в попап класс с параметрами  для плавного открытия модального окна 
export function popupIsAnimated (PopupElement) {
    PopupElement.classList.add('popup_is-animated');  
};