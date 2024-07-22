<script lang="ts" setup>

</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet/>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="schedule" href="/tabs/schedule">
          <ion-icon :icon="ioniconsCalendar" />
          <ion-label>Schedule</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="speakers" href="/tabs/speakers">
          <ion-icon :icon="ioniconsPeople" />
          <ion-label>Speakers</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="map" href="/tabs/map">
          <ion-icon :icon="ioniconsLocation" />
          <ion-label>Map</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about" href="/tabs/about">
          <ion-icon :icon="ioniconsInformationCircle" />
          <ion-label>About</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
