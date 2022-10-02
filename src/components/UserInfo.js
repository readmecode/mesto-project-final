export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this.userName = document.querySelector(profileName)
    this.userAbout = document.querySelector(profileAbout)
    this.avatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userData = {
      name: this.userName.textContent,
      about: this.userAbout.textContent,
      id: this.userId,
      avatar: this.avatar.src,
    }
    return userData
  }

  getUserAvatar() {
    return this._avatar.src
  }

  getUserId() {
    return this.userId
  }

  setUserInfo(data) {
    this.userName.textContent = data.name
    this.userAbout.textContent = data.about
    this.userId = data.id
    this.avatar.src = data.avatar
  }
}
