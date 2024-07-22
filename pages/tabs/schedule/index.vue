<script setup lang="ts">
import { IonRouterOutlet } from '@ionic/vue'
import SessionListFilter from '~/components/SessionListFilter.vue'

interface GroupedSession {
  id: string
  startTime: string
  sessions: Session[]
}

interface Session {
  id: number
  dateTimeStart: string
  dateTimeEnd: string
  name: string
  location: string
  description: string
  speakerIds: number[]
  tracks: string[]
}

const session$ = useSessionStore()
const { loadSpeakerData } = useSpeakerStore()

const segment = ref('all')
const queryText = ref('')
const fab = ref<HTMLIonFabElement | null>(null)
const fabButton = ref(null)
const fabList = ref(null)
const allGroupedRef = ref<GroupedSession[]>([])
const allGroupedComputed = computed(() => {
  return allGroupedRef.value
})

function groupedByStartTime(sessions: Session[]): GroupedSession[] {
  const sortedSessions = [...sessions].sort(
    (a, b) =>
      new Date(a.dateTimeStart).getTime() - new Date(b.dateTimeStart).getTime(),
  )

  const groups: GroupedSession[] = sortedSessions.reduce(
    (acc: GroupedSession[], curr: Session) => {
      const sessionDate = new Date(curr.dateTimeStart)
      sessionDate.setMinutes(0, 0, 0)
      const startTime = sessionDate.toISOString()

      const existingGroup = acc.find(group => group.startTime === startTime)

      if (existingGroup) {
        existingGroup.sessions.push(curr)
      }
      else {
        acc.push({ startTime, sessions: [curr] } as any)
      }

      return acc
    },
    [],
  )

  return groups
}

const allGrouped = computed(() => {
  if (segment.value === 'all') {
    return groupedByStartTime(session$.allFiltered)
  }
  else {
    return groupedByStartTime(session$.favoritesFiltered)
  }
})

watch(allGrouped, (newValue) => {
  allGroupedRef.value = newValue
})

// Simulate dispatching the action
// function addTrackFilter(trackName: string) {
//   session$.addTrackFilter(trackName)
// }

// Simulate dispatching the action
// function removeTrackFilter(trackName: string) {
//   session$.removeTrackFilter(trackName)
// }

function getLabelStyle(track: any) {
  const colorVar = track === 'Ionic' ? 'primary' : track.toLowerCase()
  return {
    borderLeft: `2px solid var(--ion-color-${colorVar})`,
    paddingLeft: '10px',
  }
}

async function addFavorite(event: any, session: any) {
  if (session$.favoriteSessions.includes(session.id)) {
    removeFavorite(event, session, 'Favorite already added')
  }
  else {
    session$.addFavorite(session.id)

    const alert = await alertController.create({
      header: 'Favorite Added',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const slidingItem = event.target.closest('ion-item-sliding')
            slidingItem.close()
          },
        },
      ],
    })
    await alert.present()
  }
}

async function removeFavorite(event: any, session: any, title: any) {
  const alert = await alertController.create({
    header: title,
    message: 'Would you like to remove this session from your favorites?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          const slidingItem = event.target.closest('ion-item-sliding')
          slidingItem.close()
        },
      },
      {
        text: 'Remove',
        handler: () => {
          session$.removeFavorite(session.id)

          const slidingItem = event.target.closest('ion-item-sliding')
          slidingItem.close()
        },
      },
    ],
  })
  await alert.present()
}

function goToSessionDetail(session: any) {
  navigateTo({
    name: 'session-detail',
    params: { sessionId: session.id.toString() },
  })
}

async function presentFilter() {
  const modal = await modalController.create({
    component: SessionListFilter,
    presentingElement: IonRouterOutlet.nativeEl,
    componentProps: {
      excludedTracks: session$.trackFilters,
      allTracks: session$.allTracksFilter,
    },
  })

  modal.componentProps!.onFiltersSelected = async (selectedTrackNames: any) => {
    if (selectedTrackNames.length === 0) {
      allGroupedRef.value = []
    }
    else {
      await session$.loadSessionData()
      await loadSpeakerData()
      await session$.fetchTracks()
      const previousTrackFilters = session$.trackFilters
      const addedTrackFilters = selectedTrackNames.filter(
        (track: any) => !previousTrackFilters.includes(track),
      )
      const removedTrackFilters = previousTrackFilters.filter(
        (track: any) => !selectedTrackNames.includes(track),
      )

      addedTrackFilters.forEach((track: any) =>
        session$.addTrackFilter (track),
      )
      removedTrackFilters.forEach((track: any) =>
        session$.removeTrackFilter(track),
      )
    }
  }

  await modal.present()
}

function updateSegment(e: any) {
  segment.value = e.detail.value
}

function updateSearchTerm(e: any) {
  session$.setSearchText(e.detail.value)
}

async function openSocial(network: any) {
  if (fab.value) {
    const loading = await loadingController.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000 + 500) as number,
    })
    await loading.present()
    await loading.onWillDismiss()
    fab.value.close()
  }
}

async function checkAndLoadData() {
  if (allGroupedRef.value.length === 0) {
    await session$.loadSessionData()
    await loadSpeakerData()
    await session$.fetchTracks()
  }
}

onIonViewDidEnter(() => {
  menuController.enable(true)
  checkAndLoadData()
})

watch(
  () => session$.allFiltered,
  (newAllFiltered) => {
    allGroupedRef.value = groupedByStartTime(newAllFiltered)
  },
)

definePageMeta({
  name: 'schedule',
})
</script>

<template>
  <ion-page id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>

        <ion-segment :value="segment" @ion-change="updateSegment">
          <ion-segment-button value="all">
            All
          </ion-segment-button>
          <ion-segment-button value="favorites">
            Favorites
          </ion-segment-button>
        </ion-segment>

        <ion-buttons slot="end">
          <ion-button @click="presentFilter">
            <ion-icon slot="icon-only" :icon="ioniconsOptions" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="queryText"
          :debounce="500"
          placeholder="Search"
          @ion-input="updateSearchTerm($event)"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Schedule
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list v-show="allGroupedComputed?.length > 0">
        <ion-item-group v-for="group in allGroupedComputed" :key="group.id">
          <ion-item-divider sticky>
            <ion-label>{{ useDateFormat(group.startTime, "h:mm a") }}</ion-label>
          </ion-item-divider>

          <ion-item-sliding
            v-for="session in group.sessions"
            :key="session.id"
            :data-track="session.tracks[0].toLowerCase()"
          >
            <ion-item button @click="goToSessionDetail(session)">
              <ion-label :style="getLabelStyle(session.tracks[0])">
                <h3>{{ session.tracks[0] }} - {{ session.name }}</h3>
                <p>
                  {{ useDateFormat(session.dateTimeStart, "h:mm a") }} &mdash;
                  {{ useDateFormat(session.dateTimeEnd, "h:mm a") }}:
                  {{ session.location }}
                </p>
              </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option
                v-if="segment === 'all'"
                color="favorite"
                @click="addFavorite($event, session)"
              >
                Favorite
              </ion-item-option>
              <ion-item-option
                v-if="segment === 'favorites'"
                color="danger"
                @click="removeFavorite($event, session, 'Remove Favorite')"
              >
                Remove
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-item-group>
      </ion-list>

      <ion-list-header v-show="allGroupedComputed?.length === 0">
        No Sessions Found
      </ion-list-header>
      <ion-fab slot="fixed" ref="fab" vertical="bottom" horizontal="end">
        <ion-fab-button ref="fabButton">
          <ion-icon :icon="ioniconsShareSocial" />
        </ion-fab-button>
        <ion-fab-list ref="fabList" side="top">
          <ion-fab-button color="vimeo" @click="openSocial('Vimeo')">
            <ion-icon :icon="ioniconsLogoVenmo" />
          </ion-fab-button>
          <ion-fab-button color="google" @click="openSocial('Google+')">
            <ion-icon :icon="ioniconsLogoGoogle" />
          </ion-fab-button>
          <ion-fab-button color="twitter" @click="openSocial('Twitter')">
            <ion-icon :icon="ioniconsLogoTwitter" />
          </ion-fab-button>
          <ion-fab-button color="facebook" @click="openSocial('Facebook')">
            <ion-icon :icon="ioniconsLogoFacebook" />
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<style scoped>
  ion-fab-button {
    --background: var(--ion-color-step-150, #ffffff);
    --background-hover: var(--ion-color-step-200, #f2f2f2);
    --background-focused: var(--ion-color-step-250, #d9d9d9);
    --color: var(--ion-color-primary, #3880ff);
  }

  /*
   * Material Design uses the ripple for activated
   * so only style the iOS activated background
   */
  .ios ion-fab-button {
    --background-activated: var(--ion-color-step-250, #d9d9d9);
  }
</style>
