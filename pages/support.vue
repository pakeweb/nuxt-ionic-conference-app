<script lang="ts" setup>
const supportMessage = ref('')
const submitted = ref(false)

const showToast = ref(false)
const toastMessage = ref('')

const canSubmit = computed(() => supportMessage.value.trim() !== '')

function submitForm(event: any) {
  event.preventDefault()
  submitted.value = true

  if (canSubmit.value) {
    toastMessage.value = 'Successfully sent support message!'
    showToast.value = true
    supportMessage.value = ''
  }
}

onMounted(() => {
  toastMessage.value = 'This does not actually send a support request.'
  showToast.value = true
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Support</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="support-logo">
        <img src="/assets/img/appicon.svg" alt="Ionic Logo">
      </div>
      <form novalidate @submit="submitForm">
        <ion-textarea
          v-model="supportMessage"
          label="Support Message"
          label-placement="floating"
          fill="outline"
          placeholder="Message..."
          name="supportQuestion"
          :rows="6"
          required
        />
        <div class="ion-padding-top">
          <ion-button expand="block" type="submit">
            Submit
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
.support-logo {
  min-height: 200px;

  padding: 20px 0;

  text-align: center;
}

.support-logo img {
  max-width: 150px;
}
</style>
