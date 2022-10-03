import "../style/index.css"
import {
  profileName,
  profileAbout,
  editButton,
  addButton,
  popupProfile,
  formProfileEdit,
  popupCard,
  formCard,
  formProfile,
  cardContainer,
  popupEditIcon,
  profileAvatarBtn,
  profileAvatar,
  formEditIcon,
  buttonElement,
  buttonElementEdit,
  buttonElementCreate,
  editButtonText,
  config,
} from "../../utils/utils.js"

import Api from "../components/Api.js"
import Card from "../components/Card"
import FormValidator from "../components/FormValidation.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWidthForm from "../components/PopupWithForm"
import UserInfo from "../components/UserInfo.js"
import Section from "../components/Section.js"

let myId

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "926c6a3f-a217-4e7a-afc3-b54f61f5ab3a",
    "Content-Type": "application/json",
  },
})

const user = new UserInfo(".profile__name", ".profile__description", ".profile__avatar")


const cardList = new Section(
  {
    renderer: (items) => {
      const card = createCard(items)
      cardList.addItem(card)
    },
  },
  cardContainer
)

function createCard(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    item.likes,
    item.owner._id,
    item._id,
    handleDeleteCard,
    handleAddLike,
    handleDeleteLike,
    handleCardClick,
    myId,
    "#card-element",
  )
  return cardElement
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    myId = res[0]._id
    user.setUserInfo({
      name: res[0].name,
      about: res[0].about,
      avatar: res[0].avatar
    })
    res[1].forEach((items) => {
      const card = createCard(items).generateCard()
      cardList.addItem(card)
    })
  })
  .catch((err) => {
    console.log(err)
  })

const submitAddCardFormClass = new PopupWidthForm(
  "#addCard",
  function submitAddCardForm() {
    const addCardInput = submitAddCardFormClass.getInputValues()
    const linkImage = addCardInput.url;
    const nameImage = addCardInput.text;
    editButtonText(buttonElementCreate, "создать", true)

    api
      .createCardLoad(nameImage, linkImage)
      .then((item) => {
        const card = createCard(item).generateCard()
        cardList.addItem(card)
      })
      .then(() => {
        submitAddCardFormClass.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        editButtonText(buttonElementCreate, "создать", false)
      })
  }
)

const submitAddCardFormValidator = new FormValidator(config, popupCard)
submitAddCardFormValidator.enableValidation()

function handleDeleteCard(elemId, elementCard) {
  api
    .deleteCardUser(elemId)
    .then(() => {
      elementCard.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleAddLike(elemId, cardLikes) {
  api
    .addLike(elemId)
    .then((res) => {
      cardLikes.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleDeleteLike(elemId, cardLikes) {
  api
    .deleteLike(elemId)
    .then((res) => {
      cardLikes.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(err)
    })
}
submitAddCardFormClass.setEventListener()

addButton.addEventListener("click", () => {
  submitAddCardFormClass.open()
  submitAddCardFormValidator.resetValidation()
})

const popupEditIconFormValidator = new FormValidator(config, popupEditIcon)
popupEditIconFormValidator.enableValidation()


const popupEditIconFormClass = new PopupWidthForm(
  "#editIcon",
  function popupEditIconForm() {
    const iconInputUrl = popupEditIconFormClass.getInputValues()
    editButtonText(buttonElement, "сохранить", true)
    api
      .userEditIcon(iconInputUrl.urlIcon)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          about: res.about,
          id: res._id,
          avatar: res.avatar,
          
        })
        popupEditIconFormClass.close()
        
      })
      .catch((res) => {
        console.log(res)
      })
      .finally(() => {
        editButtonText(buttonElement, "сохранить", false)
      })
  }
)


popupEditIconFormClass.setEventListener()

profileAvatarBtn.addEventListener("click", () => {
  popupEditIconFormClass.open()
  popupEditIconFormValidator.resetValidation()
})

const editProfileInfoValidator = new FormValidator(config, popupProfile)
editProfileInfoValidator.enableValidation()

const editPofileInfoClass = new PopupWidthForm(
  "#editInfo",
  function editProfileInfo() {
    const editPofileInput = editPofileInfoClass.getInputValues()
    editButtonText(buttonElementEdit, "Сохранить", true)
    api.editProfileUser({
      name:  editPofileInput.name,
      about: editPofileInput.description,
    })
    api
      .getUserInfo()
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          about: res.about,
          id: res._id,
          avatar: res.avatar,
        })
        editPofileInfoClass.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        editButtonText(buttonElementEdit, "Сохранить", false)
      })
  }
)
editPofileInfoClass.setEventListener()
editButton.addEventListener("click", () => {
  const { name, about } = user.getUserInfo()
  formProfile.name.value = name
  formProfile.description.value = about
  editPofileInfoClass.open()
  editProfileInfoValidator.resetValidation()
})

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
 }

const popupWithImage = new PopupWithImage("#imageModal")
popupWithImage.setEventListener()