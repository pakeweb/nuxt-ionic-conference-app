export interface Speaker {
  id: number
  name: string
  profilePic: string
  twitter: string
  about: string
  title: string
  location: string
  email: string
  phone: string
}

export interface SpeakerState {
  speakers: Speaker[]
}

const state: SpeakerState = {
  speakers: [],
}
export const useSpeakerStore = defineStore('speakers.store', {
  state: () => state,

  actions: {
    updateSpeakers(speakers: Speaker[]) {
      state.speakers = speakers
    },
    async loadSpeakerData() {
      const response = await $fetch<Speaker[]>('/api/speakers')
      this.updateSpeakers(response)
    },
  },
})
