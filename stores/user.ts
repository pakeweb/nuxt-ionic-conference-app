export interface User {
  pictureLocation: string | null
  userName: string | null
  isAuthenticated: boolean
  hasSeenTutorial: boolean
}

const defaultState: User = {
  pictureLocation: null,
  userName: null,
  isAuthenticated: false,
  hasSeenTutorial: false,
}

export const useUserStore = defineStore('user.store', {
  state: () => defaultState,

  actions: {
    sawTutorial() {
      this.hasSeenTutorial = true
    },
    logIn(userName: string) {
      this.userName = userName
      this.isAuthenticated = true
    },
    logOut() {
      Object.assign(defaultState)
    },
    updateUserPicture(pictureLocation: string) {
      this.pictureLocation = pictureLocation
    },
    setHasSeenTutorial(value: boolean) {
      this.hasSeenTutorial = value
    },
  },
})
