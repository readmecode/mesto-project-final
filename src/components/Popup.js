export default class Popup {
  constructor(selectorPopup) {
    this._body = document.body
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened')
    this._body.classList.add('body_active')
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._body.classList.remove('body_active')
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListener() {
      this._popup.addEventListener('click', evt => {
        evt.target.classList.contains('popup__button-close') ? this.close() : false;
    })
    this._popup.querySelector('.popup__overlay').addEventListener('mousedown', this.close.bind(this)); 
  }
}
