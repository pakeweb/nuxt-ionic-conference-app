<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { Session } from '~/stores/sessions'

const sessions = useSessionStore()

const route = useRoute()

const session = ref<Session>()
const favorites = ref<number[]>([])

async function sessionClick(message: any) {
  const alert = await alertController.create({
    message: `${message}`,
  })
  await alert.present()
}

onMounted(() => {
  session.value = sessions.sessions.find(
    s => s.id === Number.parseInt(route.params.sessionId?.toString()),
  )
  favorites.value = sessions.favoriteSessions
})

definePageMeta({
  name: 'session-detail',
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>{{ session ? session.name : '' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="session" padding>
        <h1>{{ session.name }}</h1>
        <ion-grid no-padding>
          <ion-row>
            <ion-col size="6">
              <span
                v-for="track in session.tracks"
                :key="track.toLowerCase()"
                :class="`session-track-${track.toLowerCase()}`"
              >{{ track }}</span>
            </ion-col>
            <ion-col
              size="6"
              text-right
              :class="favorites.indexOf(session.id) !== -1 ? 'show-favorite' : ''"
            />
          </ion-row>
        </ion-grid>
        <p>{{ session.description }}</p>
        <ion-text color="medium">
          {{ useDateFormat(session.dateTimeStart, "h:mm a") }} &mdash; {{ useDateFormat(session.dateTimeEnd, "h:mm a") }}
          <br>
          {{ session.location }}
        </ion-text>
      </div>

      <ion-list>
        <ion-item button @click="sessionClick('Watched')">
          <ion-label color="primary">
            Watch
          </ion-label>
        </ion-item>
        <ion-item button @click="sessionClick('Added to Calendar')">
          <ion-label color="primary">
            Add to Calendar
          </ion-label>
        </ion-item>
        <ion-item button @click="sessionClick('Marked as Unwatched')">
          <ion-label color="primary">
            Mark as Unwatched
          </ion-label>
        </ion-item>
        <ion-item button @click="sessionClick('Downloaded Video')">
          <ion-label color="primary">
            Download Video
          </ion-label>
          <ion-icon slot="end" color="primary" size="small" :icon="ioniconsCloudDownload" />
        </ion-item>
        <ion-item button @click="sessionClick('Left Feedback')">
          <ion-label color="primary">
            Leave Feedback
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.session-track-ionic {
  color: var(--ion-color-primary);
}

.session-track-angular {
  color: var(--ion-color-angular);
}

.show-favorite {
  position: relative;
}

.icon-heart-empty {
  position: absolute;
  top: 5px;
  right: 5px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.icon-heart {
  position: absolute;
  top: 5px;
  right: 5px;
  transform: scale(0);
  transition: transform 0.3s ease;
}

.show-favorite .icon-heart {
  transform: scale(1);
}

.show-favorite .icon-heart-empty {
  transform: scale(0);
}
</style>
