import { LocalStorage } from 'quasar'

export default async ({ Vue, router }) => {
  router.beforeEach((to, from, next) => {
    const currentUser = LocalStorage.getItem('user')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      next('/login')
    } else if (!requiresAuth && currentUser) {
      next('/')
    } else {
      next()
    }
  })
}