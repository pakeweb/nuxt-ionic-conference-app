<script lang="ts" setup>
const props = defineProps({
  excludedTracks: {
    type: Array,
    default: () => [],
  },
  allTracks: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['filtersSelected'])

const {
  isFirstLoad,
  selectedTrackFilters,
  setFirstLoad,
  setSelectedTrackFilters,
} = useSessionStore()

const tracks = ref<{ name: string, icon: string, isChecked: boolean }[]>([])
// const selectedTrackNames = ref<string[]>(props.allTracks.map((track: any) => track.name))

onMounted(() => {
  const availableTracks = props.allTracks.length ? props.allTracks : []

  tracks.value = availableTracks.map((track: any) => ({
    name: track.name,
    icon: track.icon,
    isChecked: isFirstLoad ? true : selectedTrackFilters.includes(track.name),
  }))

  if (isFirstLoad)
    setFirstLoad(false)
})

const dismiss = () => modalController.dismiss()

function applyFilters() {
  const newSelectedTrackNames = tracks.value
    .filter(t => t.isChecked)
    .map(t => t.name)

  setSelectedTrackFilters(newSelectedTrackNames)

  emit('filtersSelected', newSelectedTrackNames)
  dismiss()
}

function selectAll(check: boolean) {
  tracks.value.forEach(track => (track.isChecked = check))
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss">
            Cancel
          </ion-button>
        </ion-buttons>
        <ion-title>
          Filter Sessions
        </ion-title>
        <ion-buttons slot="end">
          <ion-button strong @click="applyFilters">
            Done
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="outer-content">
      <ion-list>
        <ion-list-header>Tracks</ion-list-header>
        <ion-item v-for="track in tracks" :key="track.name">
          <ion-icon slot="start" :icon="track.icon" color="primary" />
          <ion-toggle :checked="track.isChecked" color="success" @ion-change="track.isChecked = !track.isChecked">
            {{ track.name }}
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="selectAll(false)">
            Deselect All
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="selectAll(true)">
            Select All
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
</style>
