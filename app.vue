<script lang="ts" setup>
const { fetchTracks, loadSessionData } = useSessionStore()
const { loadSpeakerData } = useSpeakerStore()

useHead({
  title: 'Ionic',
  titleTemplate: '%s - Conference',
})

callOnce(async () => {
  await Promise.all([
    loadSessionData(),
    loadSpeakerData(),
    fetchTracks(),
    import('./assets/custom.css'),
    import('@ionic/vue/css/palettes/dark.class.css'),
  ])
})
</script>

<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <app-menu content-id="main-content" />
      <ion-router-outlet id="main-content" />
    </ion-split-pane>
  </ion-app>
</template>
