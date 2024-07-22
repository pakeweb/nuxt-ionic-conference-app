<script setup lang="ts">
const user = useUserStore()

const username = ref('')
const password = ref('')
const submitted = ref(false)

const usernameValid = true
const passwordValid = true

const showToast = ref(false)
const toastMessage = ref('')

const canSubmit = computed(() => username.value.trim() !== '' && password.value.trim() !== '')

function onLogin() {
  submitted.value = true
  if (usernameValid && passwordValid) {
    user.logIn(username.value)
    navigateTo('/')
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
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="/assets/img/appicon.svg" alt="Ionic logo">
      </div>

      <form novalidate @submit.prevent="onLogin">
        <ion-list>
          <ion-item>
            <ion-input
              v-model="username"
              label="Username"
              label-placement="stacked"
              name="username"
              type="text"
              :spellcheck="false"
              autocapitalize="off"
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

        <ion-button :disabled="!canSubmit" type="submit" expand="block">
          Login
        </ion-button>

        <ion-button
          fill="clear"
          expand="block"
          router-link="/signup"
          class="ion-margin-top"
        >
          Signup
        </ion-button>
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
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}
</style>
