<template>
  <q-page class="q-pa-sm bg-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
          >
            <q-tab @click="selected_contact = {}" name="all" icon="person" class="text-capitalize" label="Discover People"></q-tab>
            <q-tab @click="selected_contact = {}" name="friends" icon="diversity_3" class="text-capitalize" label="Friends">
            </q-tab>
            <q-tab @click="selected_contact = {}" name="favorites" icon="group_add" class="text-capitalize" label="Friend Requests">
              <q-badge color="red" floating>{{friend_requests_list.length}}</q-badge>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height">
              <q-list>
                <q-item-label header class="text-center">{{ contacts_list.length }} People</q-item-label>


                <span v-for="(contact, index) in contacts_list" :key="index" @click="selected_contact=contact">
                  <contact-item
                    :avatar="contact.avatar" :name="contact.name" :position="contact.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel>

            <q-tab-panel name="favorites" class="q-pa-none">
              <q-list>
                <q-item-label header class="text-center">{{ friend_requests_list.length }} Friend Requests</q-item-label>

                <span v-for="(favorite, index) in friend_requests_list" :key="index" @click="selected_contact=favorite">
                  <contact-item
                    :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel>


            <q-tab-panel name="friends" class="q-pa-none">
              <q-list>
                <q-item-label header class="text-center">{{ friends.length }} Friends</q-item-label>

                <span v-for="(favorite, index) in friends" :key="index" @click="selected_contact=favorite">
                  <contact-item
                    :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12" v-if="!(Object.keys(selected_contact).length === 0)">
        <q-card class="no-shadow" bordered >
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_contact.avatar">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{ selected_contact.position }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn v-if="tab === 'all'" @click="friendRequest(selected_contact)" label="Add as friend" flat icon="person_add" color="primary">
              <q-tooltip>Add as Friend</q-tooltip>
            </q-btn>
            <q-btn label="Accept Friend Request" v-if="tab === 'favorites'" @click="acceptFriendRequest(selected_contact)" flat icon="how_to_reg" color="primary">
              <q-tooltip>Accept Friend Request</q-tooltip>
            </q-btn>
            <q-btn label="Decline Friend Request" v-if="tab === 'favorites'" @click="unFriend(selected_contact)" flat icon="person_off" color="negative">
              <q-tooltip>Decline Friend Request</q-tooltip>
            </q-btn>
            <q-btn label="UnFriend" v-if="tab === 'friends'" @click="unFriend(selected_contact)" flat icon="how_to_reg" color="primary">
              <q-tooltip>UnFriend</q-tooltip>
            </q-btn>
            <q-btn v-if="tab === 'all' && user.position === 'admin'" @click="layout = true" label="Edit" flat icon="edit" color="secondary">
              <q-tooltip>Edit</q-tooltip>
            </q-btn>
            <q-btn v-if="tab === 'all' && user.position === 'admin'" @click="deleteUser(selected_contact)" label="Delete" flat icon="delete" color="negative">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
            <q-btn v-if="tab === 'all' && user.position === 'supervisor'" @click="deleteUser(selected_contact)" label="Delete" flat icon="delete" color="negative">
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </q-toolbar>

          <q-separator></q-separator>

          <div v-for="detail, detail_index in detail_list" :key="detail_index">
            <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                 :value="selected_contact[detail['field']]" :label="detail.label"></contact-detail-item>

            <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
          </div>

        </q-card>
      </div>
    </div>

    <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>
              Edit User
            </q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-transparent">
          <q-toolbar>
            <q-toolbar-title>Footer</q-toolbar-title>
            <q-btn @click="updateProfile()" color="primary" label="Save" v-close-popup icon="save" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page>
            <q-card flat>
              <q-card-section>
                <q-form
                  class="q-gutter-md"
                >
                  <q-input
                    filled
                    v-model="selected_contact.name"
                    label="Name"
                    lazy-rules
                  />

                  <q-input
                    filled
                    v-model="selected_contact.website"
                    label="Website"
                    lazy-rules
                  />

                  <q-input
                    filled
                    v-model="selected_contact.phone"
                    label="Phone"
                    lazy-rules
                  />

                  <q-input
                    filled
                    v-model="selected_contact.address"
                    label="Address"
                    lazy-rules
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import ContactDetailItem from 'components/ContactDetailItem.vue'
import ContactItem from 'components/ContactItem.vue'
    
import { LocalStorage } from 'quasar'
import { collection, doc, setDoc, getDocs, deleteDoc, addDoc, query, where, updateDoc } from "firebase/firestore"; 
import { defineAsyncComponent, getCurrentInstance, ref, onMounted } from 'vue';
import {useQuasar} from "quasar";

const detail_list = [
  {
    icon: 'phone',
    label: 'Phone',
    field: 'phone',
    text_color: 'blue'
  },
  {
    icon: 'phone_iphone',
    label: 'Secondary Phone',
    field: 'secondary_phone',
    text_color: 'orange'
  },
  {
    icon: 'mail',
    label: 'Personal Email',
    field: 'email',
    text_color: 'grey-8'
  },
  {
    icon: 'business_center',
    label: 'Company Email',
    field: 'company_email',
    text_color: 'grey-8'
  },
  {
    icon: 'location_on',
    label: 'Address',
    field: 'address',
    text_color: 'grey-8'
  },
  {
    icon: 'home_work',
    label: 'Website',
    field: 'website',
    text_color: 'grey-8'
  },
];
const contacts_list = ref([]);
const friend_requests_list = ref([]);
const friends = ref([]);
const layout = ref(false);

const app = getCurrentInstance().appContext.config.globalProperties;

const user = ref(LocalStorage.getItem('user'))
const $q = useQuasar()

const tab = ref('all')
const selected_contact = ref({})

async function getUsers () {
  // , where("position", "!=", 'supervisor'), where("position", "!=", 'admin')
 const querySnapshot = await getDocs(query(collection(app.$db, 'users'), where("uid", "!=", user.value.uid), where("position", "==", 'user')));
  querySnapshot.forEach((doc) => {
    contacts_list.value.push(doc.data())
  });

  selected_contact.value = contacts_list.value[0];
}

async function getFriedRequests () {
 const querySnapshot = await getDocs(query(collection(app.$db, `users/${user.value.uid}/friends`), where("status", "==", 'Friend Request')));
  querySnapshot.forEach((doc) => {
    const docID = {
      docID: doc.id
    }
    friend_requests_list.value.push(Object.assign({}, docID, doc.data()))
  });
}

async function getFriends () {
 const querySnapshot = await getDocs(query(collection(app.$db, `users/${user.value.uid}/friends`), where("status", "==", 'Accepted')));
  querySnapshot.forEach((doc) => {
    const docID = {
      docID: doc.id
    }
    friends.value.push(Object.assign({}, docID, doc.data()))
  });
}

async function deleteUser (user) {
  console.log('user', user)
  await deleteDoc(doc(app.$db, "users", user.uid));
  Notify.create({
    type: 'positive',
    message: 'Deleted!'
  })
}

async function friendRequest (selected_contact) {
  selected_contact.status = 'Friend Request'

  const docRef = await addDoc(collection(app.$db, `users/${selected_contact.uid}/friends`), selected_contact);
  console.log("Document written with ID: ", docRef.id);
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}

async function acceptFriendRequest (u) {
  const docRef = doc(app.$db, 'users', u.uid, 'friends', u.docID);
  setDoc(docRef, { status: 'Accepted' }, { merge: true });
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}

async function unFriend (u) {
  const docRef = doc(app.$db, 'users', u.uid, 'friends', u.docID);
  setDoc(docRef, { status: '' }, { merge: true });
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}

function updateProfile () {
  console.log('selected_contact', selected_contact.value)
  const docRef = doc(app.$db, 'users', selected_contact.value.uid);
  setDoc(docRef, selected_contact.value, { merge: true });
  Notify.create({
    type: 'positive',
    message: 'Success!'
  })
}

onMounted(() => {
    getUsers()
    getFriedRequests()
    getFriends()
})
</script>

<style scoped>
</style>
