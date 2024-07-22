import { parse as parseDate } from 'date-fns'

export interface Session {
  id: number
  dateTimeStart: string
  dateTimeEnd: string
  name: string
  location: string
  description: string
  speakerIds: number[]
  tracks: string[]
  selectedTrackFilters: string[]
}

export interface SessionState {
  searchText: string
  trackFilters: string[]
  sessions: Session[]
  favoriteSessions: number[]
  tracks: any[]
  selectedTrackFilters: string[]
  isFirstLoad: boolean
}

export interface SessionGroup {
  startTime: string
  sessions: Session[]
  isFirstLoad: true
}

const defaultState: SessionState = {
  searchText: '',
  trackFilters: [],
  sessions: [],
  favoriteSessions: [],
  tracks: [],
  selectedTrackFilters: [],
  isFirstLoad: true,
}

export const useSessionStore = defineStore('session.store', {
  state: () => defaultState,
  actions: {
    updateSessions(sessions: Session[]) {
      this.sessions = sessions
    },
    setSearchText(searchText: string) {
      this.searchText = searchText
    },
    addTrackFilter(trackName: string) {
      if (!this.trackFilters.includes(trackName)) {
        this.trackFilters.push(trackName)
      }
    },
    removeTrackFilter(trackName: string) {
      this.trackFilters = this.trackFilters.filter(tn => tn !== trackName)
    },
    updateTrackFilters(trackNames: string[]) {
      this.trackFilters = trackNames
    },
    updateSelectedTrackFilters(trackFilters: string[]) {
      this.selectedTrackFilters = trackFilters
    },
    addFavorite(sessionId: number) {
      if (!this.favoriteSessions.includes(sessionId)) {
        this.favoriteSessions.push(sessionId)
      }
    },
    removeFavorite(sessionId: number) {
      this.favoriteSessions = this.favoriteSessions.filter(fsId => fsId !== sessionId)
    },
    updateFavoriteFilter(sessionIds: number[]) {
      this.favoriteSessions = sessionIds
    },
    setTracks(tracks: any[]) {
      this.tracks = tracks
    },
    setFirstLoad(value: boolean) {
      this.isFirstLoad = value
    },
    async loadSessionData() {
      const response = await $fetch<Session[]>('/api/sessions')
      this.updateSessions(response)
    },
    async fetchTracks() {
      const response = await $fetch<any[]>('/api/tracks')
      this.setTracks(response)
    },

    setSelectedTrackFilters(trackFilters: string[]) {
      this.updateSelectedTrackFilters(trackFilters)
    },
  },
  getters: {
    conferenceStart(state) {
      const firstSession = state.sessions
        .concat()
        .sort((a, b) => (
          parseDate(a.dateTimeStart, 'yyyy-MM-dd HH:mm:ss', new Date()).valueOf()
          - parseDate(b.dateTimeStart, 'yyyy-MM-dd HH:mm:ss', new Date()).valueOf()
        ))[0]
      return firstSession ? firstSession.dateTimeStart : null
    },
    allTracks(state) {
      return state.sessions
        .reduce((all, session) => all.concat(session.tracks), <string[]>[])
        .filter((trackName, index, array) => array.indexOf(trackName) === index)
        .sort()
    },
    allTracksFilter(state) {
      return state.tracks
    },
    allFiltered(state) {
      const searchSessions = searchText(state.searchText)
      const searchTracks = filterByTrack(state.trackFilters)

      return state.sessions
        .filter(searchSessions)
        .filter(searchTracks)
    },
    favoritesFiltered(state) {
      const searchSessions = searchText(state.searchText)
      const searchTracks = filterByTrack(state.trackFilters)

      function isFavorite(session: Session) {
        return state.favoriteSessions.includes(session.id)
      }

      return state.sessions
        .filter(isFavorite)
        .filter(searchSessions)
        .filter(searchTracks)
    },
  },
})

function searchText(searchText: string) {
  if (!searchText) {
    return () => true
  }
  const lowerSearchText = searchText.toLowerCase()
  return (session: Session) => session.name.toLowerCase().includes(lowerSearchText)
}

function filterByTrack(trackFilters: string[]) {
  if (trackFilters.length === 0) {
    return () => true
  }
  return (session: Session) => (
    session.tracks.some(sessionTrackName => (
      trackFilters.includes(sessionTrackName)
    ))
  )
}
