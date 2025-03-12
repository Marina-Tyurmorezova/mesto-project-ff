//описаны функции для взаимодействия с сервером;

const configApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '9c82fa18-41e4-4bdb-920b-b57efab56c1d',
      'Content-Type': 'application/json'
    }
  }

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
   // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка информации о пользователе с сервера
export const getInitialUser = () => {
    return fetch(`${configApi.baseUrl}/users/me`, {
      headers: configApi.headers
    })
    .then(getResponse);
} 


//Загрузка карточек с сервера GET https://mesto.nomoreparties.co/v1/wff-cohort-31/cards 
export const getCardList = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers
  })
  .then(getResponse);
}

//Редактирование профиля
export const editUserProfile = (userUpdateInfo) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configApi.headers ,
    body: JSON.stringify({
      name: userUpdateInfo.name,
      about: userUpdateInfo.about
  })
  })
  .then(getResponse);
}

//Добавление новой карточки
export const addNewCard = (newCardObj) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: 'POST',
    headers: configApi.headers ,
    body: JSON.stringify({
      name: newCardObj.name,
      link: newCardObj.link
    })
})
.then(getResponse);
}

//удаление карточки с сервера
export const deleteCardApi = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configApi.headers
})
.then(getResponse);
}