export default class UserInfo {
  constructor(profileName, profileAbout) {
    this.userName = document.querySelector(profileName)
    this.userAbout = document.querySelector(profileAbout)
    this.avatar = document.querySelector(".profile__avatar")
  }

  getUserInfo() {
    const userData = {
      name: this.userName.textContent,
      about: this.userAbout.textContent,
      id: this._userId,
      avatar: this.avatar.src,
    }
    return userData
  }

  getUserAvatar() {
    return this._avatar.src
  }

  getUserId() {
    return this._userId
  }

  setUserInfo(data) {
    this.userName.textContent = data.name
    this.userAbout.textContent = data.about
    this._userId = data.id
    this.avatar.src = data.avatar
  }
}
