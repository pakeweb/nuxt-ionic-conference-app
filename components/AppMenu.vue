<script lang="ts" setup>
defineProps<{ darkMode?: boolean, dark?: boolean }>()

const { isDark, toggleDarkMode } = useDarkMode()

const user = useUserStore()

async function openTutorial() {
  user.hasSeenTutorial = false

  return navigateTo({ name: 'tutorial' })
}

const appPages = [
  {
    title: 'Schedule',
    url: '/tabs/schedule',
    name: 'tabs.schedule',
    icon: ioniconsCalendar,
  },
  {
    title: 'Speakers',
    url: '/tabs/speakers',
    icon: ioniconsPeople,
  },
  {
    title: 'Map',
    url: '/tabs/map',
    icon: ioniconsMap,
  },
  {
    title: 'About',
    url: '/tabs/about',
    icon: ioniconsInformationCircle,
  },
]
</script>

<template>
  <ion-menu content-id="main-content" v-bind="$attrs">
    <ion-content class="ion-padding">
      <ion-list lines="none">
        <ion-list-header>
          Navigate
        </ion-list-header>
        <ion-menu-toggle v-for="p in appPages" :key="p.title" :auto-hide="false">
          <ion-item button :router-link="p.url">
            <ion-icon slot="start" :icon="p.icon" />
            <ion-label>
              {{ p.title }}
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list v-if="user.isAuthenticated" lines="none">
        <ion-list-header>
          Account
        </ion-list-header>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button router-link="/account'">
            <ion-icon slot="start" :icon="ioniconsPerson" />
            <ion-label>
              Account
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button router-link="/support">
            <ion-icon slot="start" :icon="ioniconsHelp" />
            <ion-label>
              Support
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="user.logOut">
            <ion-icon slot="start" :icon="ioniconsLogOut" />
            <ion-label>
              Logout
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list v-if="!user.isAuthenticated" lines="none">
        <ion-list-header>
          Account
        </ion-list-header>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button router-link="/login">
            <ion-icon slot="start" :icon="ioniconsLogIn" />
            <ion-label>
              Login
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button router-link="/support">
            <ion-icon slot="start" :icon="ioniconsHelp" />
            <ion-label>
              Support
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button router-link="/signup">
            <ion-icon slot="start" :icon="ioniconsPersonAdd" />
            <ion-label>
              Signup
            </ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-item>
          <ion-icon slot="start" :icon="ioniconsMoonOutline" />
          <ion-toggle :model-value="isDark" label-placement="start" @ion-change="() => toggleDarkMode()">
            Dark Mode
          </ion-toggle>
        </ion-item>
      </ion-list>
      <ion-list lines="none">
        <ion-list-header>
          Tutorial
        </ion-list-header>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="() => openTutorial()">
            <ion-icon slot="start" :icon="ioniconsHammer" />
            <ion-label>Show Tutorial</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
