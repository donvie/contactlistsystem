<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center bg-primary shadow-10">
              <q-icon name="contact_phone" color="white" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                {{ isRegisterMode ?  'Sign up' : 'Log in' }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-if="isRegisterMode"
                v-model="name"
                label="Name"
                lazy-rules
              />

              <q-input
                filled
                v-model="website"
                label="Website"
                lazy-rules
                v-if="isRegisterMode"
              />

              <q-input
                filled
                v-if="isRegisterMode"
                v-model="phone"
                label="Phone"
                lazy-rules
              />

              <q-input
                filled
                v-if="isRegisterMode"
                v-model="address"
                label="Address"
                lazy-rules
              />

              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div class="justify-between row q-gutter-xs">
                <q-btn outline @click="isRegisterMode = !isRegisterMode" :label="isRegisterMode ? 'Go back to login' : 'Create an account'" type="button" color="primary"/>
                <q-btn v-if="isRegisterMode" @click="signUp()" label="Register" type="button" color="primary"/>
                <q-btn v-else @click="signIn()" label="Login" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getCurrentInstance } from 'vue'

const router = useRouter()

const app = getCurrentInstance().appContext.config.globalProperties;
const name = ref('')
const website = ref('')
const phone = ref('')
const address = ref('')
const email = ref('')
const password = ref('')
const isRegisterMode = ref(false)

async function signIn() {
  signInWithEmailAndPassword(app.$auth, email.value, password.value).then((userCredential) => {
    const user = userCredential.user;
    console.log('user', user)
    isUserExists(user)

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error', error)
  });
}

async function signUp() {
  createUserWithEmailAndPassword(app.$auth, email.value, password.value).then((userCredential) => {
    const user = userCredential.user;
    console.log('user', user)
    addUser(user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error', error)
  });
}

async function isUserExists(user) {
  console.log('user', user)
  const docRef = doc(app.$db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    Notify.create({
      type: 'positive',
      message: 'Success!'
    })
    setUser(docSnap.data())
  } else {
    addUser(user)
    console.log("No such document!");
  }
}

async function addUser (user) {
  const currentUser = {
    name: name.value,
    position: 'user',
    avatar: `https://robohash.org/${name.value}`,
    email: email.value,
    company_email: email.value,
    website: website.value,
    phone: phone.value,
    secondary_phone:  phone.value,
    address: address.value,
    uid: user.uid,
  }

  const docRef = doc(app.$db, 'users', user.uid);
  await setDoc(docRef, currentUser, { merge: true });
  setUser(currentUser)
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}

function setUser (user) {
  LocalStorage.set('user', user)
  router.push('/');
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1976D2 0%, #e5b2ca 100%);
}
</style>