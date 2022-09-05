const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '926c6a3f-a217-4e7a-afc3-b54f61f5ab3a',
    'Content-Type': 'application/json'
  }
}

const userServe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return res.json()
  })
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    return res.json()
  })
}

const editUserProfile = (data) => {
  console.log(data)
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(res => {
    return res.json()
  })

}

const addCardServer = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(res => res.json())
}

/* const cardLike = (like) => {
  fetch(`${config.baseUrl}/cards`)
} */



export {editUserProfile, userServe, getInitialCards, addCardServer}




  

