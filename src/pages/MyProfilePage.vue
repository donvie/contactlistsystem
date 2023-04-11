<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-12">
        <q-btn to="/" label="Go back home" type="submit" icon="arrow_back" color="primary"/>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">{{user.name}}</div>
              <div class="text-caption text-grey">
                {{user.email}}
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                :src="user.avatar"
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.name"
                label="Name"
              />

              <q-input
                filled
                v-model="user.email"
                label="Email"

              />

              <q-input
                filled
                v-model="user.phone"
                label="Phone"

              />

              <q-input
                filled
                v-model="user.address"
                label="Address"

              />

              <div>
                <q-btn @click="updateProfile()" label="Update" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { collection, doc, setDoc, getDocs, deleteDoc, addDoc, query, where, updateDoc } from "firebase/firestore"; 
import { LocalStorage } from 'quasar'
import { ref, getCurrentInstance } from 'vue'
const app = getCurrentInstance().appContext.config.globalProperties;

const user = ref(LocalStorage.getItem('user'))

function updateProfile () {
  console.log('user.value', user.value)
  const docRef = doc(app.$db, 'users', user.value.uid);
  console.log(docRef)
  setDoc(docRef, user.value, { merge: true });
  LocalStorage.set('user', user.value)
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}
</script>

<style scoped>
</style>