<script lang="ts" setup>
import { useRoute } from 'vue-router'

definePageMeta({
  name: 'speakers',
})

const { speakers } = useSpeakerStore()
const { sessions } = useSessionStore()
// const speakers = computed(() => xpx.concat().sort())

function sessionsBySpeaker(speakerId: number) {
  return sessions.filter((s: Session) =>
    s.speakerIds.includes(speakerId),
  )
}

function goToSessionDetail(session: Session) {
  navigateTo({
    name: 'speaker-session-detail',
    params: { sessionId: session.id.toString() },
  })
}

function goToSpeakerDetail(speaker: Speaker) {
  navigateTo({
    name: 'speaker-detail',
    params: { speakerId: speaker.id.toString() },
  })
}

async function gotToOffsite(msg: string) {
  const loading = await loadingController.create({
    message: msg,
    duration: Math.random() * 1000 + 500,
  })
  await loading.present()
  await loading.onWillDismiss()
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Speakers</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Speakers
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-grid fixed>
          <ion-row align-items-stretch>
            <ion-col
              v-for="speaker in speakers"
              :key="speaker.id"
              size="12"
              size-md="6"
            >
              <ion-card class="speaker-card">
                <ion-card-header>
                  <ion-item
                    :detail="false"
                    lines="none"
                    button
                    @click="goToSpeakerDetail(speaker)"
                  >
                    <ion-avatar slot="start">
                      <img
                        :src="speaker.profilePic"
                        alt="Speaker profile pic"
                      >
                    </ion-avatar>
                    <ion-label>
                      <h2>{{ speaker.name }}</h2>
                      <p>{{ speaker.title }}</p>
                    </ion-label>
                  </ion-item>
                </ion-card-header>

                <ion-card-content>
                  <ion-list lines="none">
                    <ion-item
                      v-for="session in sessionsBySpeaker(speaker.id)"
                      :key="session.id"
                      button
                      @click="goToSessionDetail(session)"
                    >
                      <h3>{{ session.name }}</h3>
                    </ion-item>

                    <ion-item button @click="goToSpeakerDetail(speaker)">
                      <h3>About {{ speaker.name }}</h3>
                    </ion-item>
                  </ion-list>
                </ion-card-content>

                <ion-row no-padding justify-content-center>
                  <ion-col text-left size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Tweet')"
                    >
                      <ion-icon slot="start" :icon="ioniconsLogoTwitter" />Tweet
                    </ion-button>
                  </ion-col>
                  <ion-col text-center size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Share')"
                    >
                      <ion-icon slot="start" :icon="ioniconsShare" />Share
                    </ion-button>
                  </ion-col>
                  <ion-col text-right size="4">
                    <ion-button
                      fill="clear"
                      size="small"
                      color="primary"
                      @click="gotToOffsite('Contact')"
                    >
                      <ion-icon slot="start" :icon="ioniconsChatbubbles" />Contact
                    </ion-button>
                  </ion-col>
                </ion-row>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
