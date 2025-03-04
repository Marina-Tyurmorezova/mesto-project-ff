//описаны функции для взаимодействия с сервером;

//обращение к серверу по выданному токену
//return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/cards', {
//    headers: {
//      authorization: '9c82fa18-41e4-4bdb-920b-b57efab56c1d'
//    }
//  })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Загрузка информации о пользователе с сервера
//GET https://mesto.nomoreparties.co/v1/:wff-cohort-31/users/me 

fetch('https://mesto.nomoreparties.co/v1/:wff-cohort-31/users/me' , {
    headers: {
        authorization: '9c82fa18-41e4-4bdb-920b-b57efab56c1d'
    }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
        console.log(err); 
    });


//Загрузка карточек с сервера GET https://mesto.nomoreparties.co/v1/wff-cohort-31/cards 