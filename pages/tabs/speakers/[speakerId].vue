<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { Speaker } from '~/stores/speakers'

const route = useRoute()

const speakers = useSpeakerStore()

const speaker = computed(() => {
  return route.params.speakerId ? speakers.speakers.find((s: Speaker) => s.id === Number.parseInt(route.params.speakerId?.toString())) : null
})

definePageMeta({
  name: 'speaker-detail',
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Speakers" />
        </ion-buttons>
        <ion-title>{{ speaker ? speaker.name : '' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding class="speaker-detail">
      <div v-if="speaker" text-center>
        <img :src="speaker.profilePic" :alt="speaker.name">
        <br>
        <ion-button fill="clear" size="small" color="twitter">
          <ion-icon slot="icon-only" :icon="ioniconsLogoTwitter" />
        </ion-button>
        <ion-button fill="clear" size="small" color="github">
          <ion-icon slot="icon-only" :icon="ioniconsLogoGithub" />
        </ion-button>
        <ion-button fill="clear" size="small" color="instagram">
          <ion-icon slot="icon-only" :icon="ioniconsLogoInstagram" />
        </ion-button>
      </div>

      <p>{{ speaker ? speaker.about : '' }}</p>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.speaker-detail img {
  max-width: 140px;
  border-radius: 50%;
}

.speaker-detail p {
  color: #60646b;
}
</style>
