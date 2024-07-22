export interface Location {
  id: number
  name?: string
  lat: number
  lng: number
}

export interface LocationState {
  mapCenterId: number
  locations: Location[]
}

export const useLocationStore = defineStore('location.store', {
  state: () => ({
    mapCenterId: 1,
    locations: [],
  }) as LocationState,
  actions: {
    updateLocations(locations: Location[]) {
      this.locations = locations
    },
    async loadLocationData() {
      const response = await $fetch<Location[]>('/api/locations')
      this.updateLocations(response)
    },
  },
  getters: {
    mapCenter(state) {
      return state.locations.find(l => l.id === state.mapCenterId)
    },
    allLocations(state) {
      return state.locations.filter(l => l.id !== state.mapCenterId)
    },
  },
})
