<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          size="27px"
          round
          icon="contact_phone"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Contact List System <span class="text-caption">Quasar v{{ $q.version }}</span>
        </q-toolbar-title>

        <q-btn-dropdown color="white" icon="account_circle" size="17px" flat :label="user.name">
          <q-list>
            <q-item exact to="/" clickable v-close-popup>
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>

            <q-item exact to="profile" clickable v-close-popup>
              <q-item-section>
                <q-item-label>My Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item exact clickable v-close-popup @click="logOut()">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="345"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Website',
    caption: 'https://donvie.github.io/website/',
    icon: 'language',
    link: 'https://donvie.github.io/website/'
  },
  {
    title: 'Github',
    caption: 'https://github.com/donvie',
    icon: 'code',
    link: 'https://github.com/donvie'
  },
  {
    title: 'Facebook',
    caption: 'https://www.facebook.com/heridonvi.tagaban/',
    icon: 'public',
    link: 'https://www.facebook.com/heridonvi.tagaban/'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const router = useRouter()
    const leftDrawerOpen = ref(false)

    return {
      user: LocalStorage.getItem('user'),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logOut () {
        LocalStorage.clear('user')
        router.push('/login');
      }
    }
  }
})
</script>
