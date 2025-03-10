//описаны функции для взаимодействия с сервером;

const configApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '9c82fa18-41e4-4bdb-920b-b57efab56c1d',
      'Content-Type': 'application/json'
    }
  }

// Загрузка информации о пользователе с сервера
//GET https://mesto.nomoreparties.co/v1/:wff-cohort-31/users/me 
//Используйте свойства name, about и avatar в соответствующих элементах шапки страницы. 
// Свойство _id — идентификатор пользователя, в данном случае вашего.
export const getInitialUser = () => {
    return fetch(`${configApi.baseUrl}/users/me`, {
      headers: configApi.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
         // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
    })
} 


//Загрузка карточек с сервера GET https://mesto.nomoreparties.co/v1/wff-cohort-31/cards 
export const getCardList = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
})
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
}

//Отображение количества лайков карточки
export const likeCounter = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    headers: configApi.headers 
  })
}