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

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'GET', 
    headers: config.headers 
  }) 
  .then(res => checkResult(res)) 
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { 
    method: 'GET', 
    headers: config.headers 
  }) 
  .then(res => checkResult(res)) 
}

const editProfileUser = (data) => {
  fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: data.name,
    about: data.about
    })
  })
  .then(res => checkResult(res)) 
}

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

const deleteCardUser = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers, 
  }) 
  .then(res => checkResult(res)) 
}

const addLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: config.headers 
  }) 
  .then(res => checkResult(res)) 
} 


const deleteLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers 
  }) 
  .then(res => checkResult(res)) 
} 

const userEditIcon = (avatarValue) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarValue
    })
  })
  .then(res => checkResult(res))
}

export {getUserInfo, getInitialCards, editProfileUser, createCardLoad, deleteCardUser, addLike, deleteLike, userEditIcon}
 