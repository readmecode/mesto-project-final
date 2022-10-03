import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this.image = this._popup.querySelector(".popup__illustration")
    this.title = this._popup.querySelector(".popup__title")
    this.open = this.open.bind(this)
  }

  open(name, url) {
    this.image.src = url
    this.image.alt = name
    this.title.textContent = name
    super.open()
  }
}
