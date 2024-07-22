<script setup lang="ts">
const user = useUserStore()
function updatePicture() {}
function changeUsername() {}
function changePassword() {}
function support() {}
function logOutUser() {}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <img src="http://www.gravatar.com/avatar?d=mm&s=420" alt="avatar">
        <ion-card-header>
          <ion-card-title>
            {{ user.userName || 'User' }}
          </ion-card-title>
        </ion-card-header>
        <ion-list inset>
          <ion-item @click="updatePicture">
            Update Picture
          </ion-item>
          <ion-item @click="changeUsername">
            Change Username
          </ion-item>
          <ion-item @click="changePassword">
            Change Password
          </ion-item>
          <ion-item @click="support">
            Support
          </ion-item>
          <ion-item @click="logOutUser">
            Logout
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ximg {
  max-width: 140px;
  border-radius: 50%;
}
</style>
