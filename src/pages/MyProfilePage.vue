<template>
  <q-page>
    <!-- <pre>{{user}}</pre> -->
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
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <q-separator/>

          <q-card-section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dicta laborum fuga tempora dolorum earum eligendi quos eveniet ipsam, expedita maiores iste optio unde ex quaerat sunt consequuntur laboriosam quas.
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

              <q-input
                filled
                v-model="user.position"
                label="Position"

              />

              <div>
                <q-btn label="Update" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { LocalStorage } from 'quasar'
import { ref } from 'vue'

const user = ref(LocalStorage.getItem('user'))
</script>

<style scoped>
</style>