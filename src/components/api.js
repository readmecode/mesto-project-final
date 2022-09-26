export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResult(res) { 
    if (res.ok) { 
      return res.json(); 
    } 
    else { 
      return Promise.reject(`Ошибка: ${res.status}`); 
    } 
  } 
   
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'GET', 
      headers: this._headers 
    }) 
    .then(this._checkResult)
  }

  getInitialCards () {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'GET', 
      headers: this._headers 
    }) 
    .then(this._checkResult)
  }

  editProfileUser (data) {
    fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
      })
    })
    .then(res => console.log(res))
  }

   createCardLoad (cardName, cardLink)  { 
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'POST', 
      headers: this._headers, 
      body: JSON.stringify({ 
        name: cardName, 
        link: cardLink 
      }) 
    }) 
    .then(this._checkResult)
  }
  
   deleteCardUser (cardId) { 
    return fetch(`${this._baseUrl}/cards/${cardId}`, { 
      method: 'DELETE', 
      headers: this._headers, 
    }) 
    .then(this._checkResult)
  }
  
  addLike (cardId)  { 
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
      method: 'PUT', 
      headers: this._headers 
    }) 
    .then(this._checkResult)
  }

  deleteLike (cardId) { 
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
      method: 'DELETE', 
      headers: this._headers 
    }) 
    .then(this._checkResult)
  } 

  userEditIcon (avatarValue) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarValue
      })
    })
    .then(this._checkResult)
  }
}




 