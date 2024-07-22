<script lang="ts" setup>
const username = ref('')
const password = ref('')
const submitted = ref(false)

const showToast = ref(false)
const toastMessage = ref('')

const usernameValid = computed(() => {
  return true
})

const passwordValid = computed(() => {
  return true
})

function onSignup() {
  submitted.value = true

  if (usernameValid.value && passwordValid.value) {
    toastMessage.value = 'Successfully signed up!'

    showToast.value = true

    username.value = ''
    password.value = ''
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Signup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="signup-logo">
        <img src="/assets/img/appicon.svg" alt="Ionic Logo">
      </div>
      <form @submit.prevent="onSignup">
        <ion-list>
          <ion-item>
            <ion-input
              v-model="username"
              label-placement="stacked"
              label="Username"
              name="username"
              type="text"
              required
            />
          </ion-item>
          <ion-item>
            <ion-input
              v-model="password"
              label-placement="stacked"
              label="Password"
              name="password"
              type="password"
              required
            />
          </ion-item>
        </ion-list>
        <div class="ion-padding">
          <ion-button type="submit" expand="block">
            Create
          </ion-button>
        </div>
      </form>
      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.signup-logo {
  min-height: 200px;

  padding: 20px 0;

  text-align: center;
}

.signup-logo img {
  max-width: 150px;
}
</style>
