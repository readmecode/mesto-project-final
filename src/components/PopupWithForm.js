import Popup from "./Popup"

export default class PopupWidthForm extends Popup {
  constructor(selectorPopup, callBackSubmitForm) {
    super(selectorPopup)
    this._form = this._popup.querySelector(".popup-form")
    this._callBackSubmitForm = callBackSubmitForm
    this._inputList = this._form.querySelectorAll(".popup-form__place")
    this._inputValue = {}
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value
    })
    return this._inputValue
  }

  setEventListener() {
    super.setEventListener()
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._callBackSubmitForm(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
