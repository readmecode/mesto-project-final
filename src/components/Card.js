export default class Card {
  constructor(
    name,
    link,
    likes,
    ownerId,
    elemId,
    handleDeleteCard,
    handleAddLike,
    handleDeleteLike,
    handleCardClick,
    myId,
    selector,
  ) {
    this._name = name
    this._link = link
    this._likes = likes
    this._ownerId = ownerId
    this._elemId = elemId
    this._handleDeleteCard = handleDeleteCard
    this._handleAddLike = handleAddLike
    this._handleDeleteLike = handleDeleteLike
    this._handleCardClick = handleCardClick;
    this._myId = myId
    this._selector = selector
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(".element")
      .cloneNode(true)

    return cardElement
  }

  generateCard() {
    this.element = this._getTemplateElement()

    this._cardImage = this.element.querySelector(".element__illustration")
    this._deleteCard = this.element.querySelector(".element__delete-button")
    this._cardLike = this.element.querySelector(".element__icon")
    this._cardLikes = this.element.querySelector(".element__likes")
    this._cardTitle = this.element.querySelector(".element__title")

    this._cardLikes.textContent = this._likes.length
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name

    this._checkLikes()
    this._setEventListener()
    this._checkDeleteCard()
    this._toggleLikes()

    return this.element
  }

  _checkLikes() {
    if (this._likes) {
      const myLike = this._likes.some((like) => {
        return like._id === this._myId
      })
      if (myLike) {
        this._cardLike.classList.add("element__icon_active")
      }
    }
  }
 
  _setEventListener() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardClick(this._name, this._link)
    })
  }

  _toggleLikes() {
    this._cardLike.addEventListener("click", (evt) => {
      if (this._cardLike.classList.contains("element__icon_active")) {
        this._handleDeleteLike(this._elemId, this._cardLikes)
        this._cardLike.classList.remove("element__icon_active")
      } else {
        this._handleAddLike(this._elemId, this._cardLikes)
        this._cardLike.classList.add("element__icon_active")
      }
    })
  }

  _checkDeleteCard() {
    if (this._myId !== this._ownerId) {
      this._deleteCard.classList.add("element__delete-button_disabled")
    } else {
      this._deleteCard.addEventListener("click", (evt) => {
        this._handleDeleteCard(this._elemId, this.element)
      })
    }
  }
}
