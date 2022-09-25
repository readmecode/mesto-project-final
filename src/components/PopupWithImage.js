import Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup) {
    super(selectorPopup)
    this._image = this._popup.querySelector('.popup__illustration');
    this._title = this._popup.querySelector('.popup__title')
    this.open = this.open.bind(this)
  }

  open(name, url) {
    this._image.src = url;
    this._image.alt = name;
    this._title.textContent = name
    super.open()
  }
}