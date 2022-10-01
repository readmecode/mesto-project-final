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
import createCard from "../components/Card"
import FormValidator from "../components/Validation.js"
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

const user = new UserInfo(".profile__name", ".profile__description")

const cardList = new Section(
  {
    renderer: (item) => {
      const createcard = new createCard(item)
      const card = createcard._generateCards()
      cardList.addItem(card)
    },
  },
  cardContainer
)

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    myId = res[0]._id
    profileName.textContent = res[0].name
    profileAbout.textContent = res[0].about
    profileAvatar.src = res[0].avatar
    res[1].forEach((data) => {
      const createcard = new createCard(
        data.name,
        data.link,
        data.likes,
        data.owner._id,
        data._id,
        handleDeleteCard,
        handleAddLike,
        handleDeleteLike,
        openCardPopup,
        myId,
        "#card-element"
      )
      const card = createcard._generateCards()
      cardContainer.append(card)
    })
  })
  .catch((err) => {
    console.log(err)
  })

const submitAddCardFormClass = new PopupWidthForm(
  "#addCard",
  function submitAddCardForm() {
    const linkImage = formCard.url.value
    const nameImage = formCard.text.value
    editButtonText(buttonElementCreate, "создать", true)
    api
      .createCardLoad(nameImage, linkImage)
      .then((item) => {
        const createcard = new createCard(
          item.name,
          item.link,
          [],
          myId,
          item._id,
          handleDeleteCard,
          handleAddLike,
          handleDeleteLike,
          openCardPopup,
          myId,
          "#card-element"
        )
        const card = createcard._generateCards()
        cardList.addItem(card)
      })
      .then(() => {
        formCard.reset()
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
submitAddCardFormValidator._enableValidation()

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

function handleAddLike(elemId, cardLikes, cardLike) {
  api
    .addLike(elemId)
    .then((res) => {
      cardLikes.textContent = res.likes.length
      cardLike.classList.add("element__icon_active")
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleDeleteLike(elemId, cardLikes, cardLike) {
  api
    .deleteLike(elemId)
    .then((res) => {
      cardLikes.textContent = res.likes.length
      cardLike.classList.remove("element__icon_active")
    })
    .catch((err) => {
      console.log(err)
    })
}

addButton.addEventListener("click", () => {
  submitAddCardFormClass.open()
  submitAddCardFormClass.setEventListener()
})

const popupEditIconFormValidator = new FormValidator(config, popupEditIcon)
popupEditIconFormValidator._enableValidation()

const popupEditIconFormClass = new PopupWidthForm(
  "#editIcon",
  function popupEditIconForm() {
    editButtonText(buttonElement, "сохранить", true)
    api
      .userEditIcon(formEditIcon.urlIcon.value)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          about: res.about,
          id: res._id,
          avatar: res.avatar,
        })
        popupEditIconFormClass.close()
        popupEditIconFormValidator._addButton
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
})

const editProfileInfoValidator = new FormValidator(config, popupProfile)
editProfileInfoValidator._enableValidation()

const editPofileInfoClass = new PopupWidthForm(
  "#editInfo",
  function editProfileInfo() {
    editButtonText(buttonElementEdit, "Сохранить", true)
    api.editProfileUser({
      name: formProfileEdit.name.value,
      about: formProfileEdit.description.value,
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

editButton.addEventListener("click", () => {
  const { name, about } = user.getUserInfo()
  formProfile.name.value = name
  formProfile.description.value = about
  editPofileInfoClass.open()
  editPofileInfoClass.setEventListener()
})

function openCardPopup() {
  popupWithImage.open(this._name, this._link)
}

const popupWithImage = new PopupWithImage("#imageModal")
popupWithImage.setEventListener()
