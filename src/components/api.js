const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '926c6a3f-a217-4e7a-afc3-b54f61f5ab3a',
    'Content-Type': 'application/json'
  }
}



const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
/* Загрузка информации о пользователе с сервера */
const usersLoad = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResult(res))
}

/* загрузка аватара */
const userEditIcon = (avatarValue) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarValue.value}`
    })
  })
  .then(res => checkResult(res))
}


/* Загрузка карточек с сервера */
const cardsLoad = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResult(res))
}

/* Редактирование профиля */
const editProfileUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(res => checkResult(res))
}
/* создание карточки */
const createCardLoad = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => checkResult(res))
}
/* удаление карточки */
const deleteCardUser = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResult(res))
}

/*постановка лайка */
const cardPutLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkResult(res))
}
/* удаление лайка */
const cardDeleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResult(res))
}


export {
  checkResult,
  usersLoad,
  cardsLoad,
  editProfileUser,
  createCardLoad,
  deleteCardUser,
  cardPutLike, 
  cardDeleteLike,
  userEditIcon
}