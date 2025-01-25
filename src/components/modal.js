//функция окрывающая  попап путем добавления или удаления класса для открытия попапа
export function popupIsOpened (PopupElement) {
    PopupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown',keydownListener);
    popupOverlay(PopupElement);
};
//функция закрывающая попап путем добавления или удаления класса для открытия попапа
export function popupIsClosed (PopupElement) {
    PopupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownListener);
};

//закрытие модального окна по клику на оверлей  (вызов функции по слушателю)
export function popupOverlay (evt) {
    document.addEventListener('click', popupOverlayListener);   
    }; 
//функция слушателя клика по оверлей
export function popupOverlayListener (evt) {
    let popupContent = document.querySelector('.popup_is-opened .popup__content');
    const withinPopup = evt.composedPath().includes(popupContent);
    if ( ! withinPopup ) {
        popupIsClosed(evt.target);
    }    
}
 
//функция слушателя нажатия клавиши Esc
export function keydownListener (evt) {
    if (evt.key === 'Escape') {
      let OpenedPopup = document.querySelector('.popup_is-opened');
      popupIsClosed(OpenedPopup)}
};

//функция добавляет в попап класс с параметрами  для плавного открытия модального окна
export function popupIsAnimated (PopupElement) {
    PopupElement.classList.add('popup_is-animated');  
};