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
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
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

              <div class="text-right q-gutter-xs">
                <q-btn @click="signup()" label="Register" type="button" color="primary"/>
                <q-btn @click="signIn()" label="Login" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'src/config/firebase'

import {defineComponent} from 'vue'
import {ref} from 'vue'
export default defineComponent({
  setup() {
    const router = useRouter()

    const signIn = () => {
      signInWithEmailAndPassword(auth, '12heridonvitagaban@gmail.com', 'Donvie12').then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user)
        router.push('/');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', error)
      });
    }
    const signUp = () => {
      createUserWithEmailAndPassword(auth, 'heridonvi_tagaban12@yahoo.com', 'Donvie12').then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', error)
      });
    }

    return {
      signIn,
      signUp,
      email: ref('heridonvi_tagaban12@yahoo.com'),
      password: ref('Donvie12')
    }
  }
})
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1976D2 0%, #e5b2ca 100%);
}
</style>