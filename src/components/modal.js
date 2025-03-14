//функция открывающая  попап путем добавления или удаления класса для открытия попапа
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", listenerKeydownEscape);
}
//функция закрывающая попап путем добавления или удаления класса для открытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", listenerKeydownEscape);
}

//функция слушателя клика по оверлей
export function listenerPopupOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    return closePopup(evt.target);
  }
  if (evt.target.classList.contains("popup_close")) {
    closePopup(evt.target.closest(".popup"));
  }
}

//функция слушателя нажатия клавиши Esc
export function listenerKeydownEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

//функция добавляет в попап класс с параметрами  для плавного открытия модального окна
export function smoothAnimationPopup(popupElement) {
  popupElement.classList.add("popup_is-animated");
}
