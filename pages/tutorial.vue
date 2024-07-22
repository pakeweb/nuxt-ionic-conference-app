<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

definePageMeta({
  alias: ['/'],
})
const swiper = ref(null)

const user = useUserStore()

function onSwiper(instance: any) {
  swiper.value = instance
}

function onSlideChange() {
}

async function navigateToSchedule() {
  menuController.enable(true)
  user.sawTutorial()
  return navigateTo({ name: 'schedule' })
}

async function checkTutorialStatus() {
  if (user.hasSeenTutorial === true) {
    return navigateToSchedule()
  }
}

onIonViewDidEnter(async () => {
  menuController.enable(false)
  await checkTutorialStatus()
})
</script>

<template>
  <IonPage v-show="!user.hasSeenTutorial">
    <IonHeader>
      <IonToolbar color="translucent">
        <IonButtons slot="end">
          <IonButton color="primary" fill="clear" @click="navigateToSchedule">
            Skip
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <Swiper pagination :modules="[Pagination]" :slides-per-view="1" @swiper="onSwiper" @slide-change="onSlideChange">
        <SwiperSlide class="slide">
          <img src="/assets/img/ica-slidebox-img-1.png" class="slide-image">
          <h2 class="slide-title">
            Welcome to
            <b>ICA</b>
          </h2>
          <p>
            The
            <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.
          </p>
        </SwiperSlide>

        <SwiperSlide class="slide">
          <img src="/assets/img/ica-slidebox-img-1.png" class="slide-image">
          <h2 class="slide-title">
            What is Ionic?
          </h2>
          <p>
            <b>Ionic Framework</b> is an open source SDK that enables developers to build high-quality mobile apps with web technologies
            like HTML, CSS, and JavaScript.
          </p>
        </SwiperSlide>

        <SwiperSlide class="slide">
          <img src="/assets/img/ica-slidebox-img-3.png" class="slide-image">
          <h2 class="slide-title">
            What is Ionic Pro?
          </h2>
          <p>
            <b>Ionic Pro</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new
            level of app development agility to mobile dev teams.
          </p>
        </SwiperSlide>

        <SwiperSlide class="slide">
          <img src="/assets/img/ica-slidebox-img-4.png" class="slide-image">
          <h2 class="slide-title">
            Ready to Play?
          </h2>

          <IonButton fill="clear" @click="navigateToSchedule">
            Continue
            <IonIcon slot="end" :icon="ioniconsArrowForward" />
          </IonButton>
        </SwiperSlide>
      </Swiper>
    </IonContent>
  </IonPage>
</template>

<style scoped>
  ion-header {
    background-color: var(--ion-background-color, #fff);
  }

  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .slide-title {
    margin-top: 2.8rem;
  }

  .slide-image {
    max-height: 100%;
    max-width: 100%;
    margin: 36px 0;
  }

  b {
    font-weight: bold;
  }

  p {
    padding: 0 40px;

    color: var(--ion-color-step-600, #60646b);

    font-size: 14px;

    line-height: 1.5;

    b {
      color: var(--ion-text-color, #000000);
    }
  }
</style>
