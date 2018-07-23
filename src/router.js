import VueRouter from 'vue-router'

let routes = [
  {
    path: '/',
    name: 'home',
    component: require('./components/home-component.vue').default
  },
  {
    path: '/login',
    name: 'login',
    component: require('./components/login-component.vue').default
  },
  {
    path: '/register',
    name: 'register',
    component: require('./components/register-component.vue').default
  },
  {
    path: '/todos',
    name: 'todos',
    component: require('./components/todos-component.vue').default,
    beforeEnter: (to, from, next) => {
      const token = JSON.parse(window.localStorage.getItem('toDoToken'))
      if (!token) {
        next('/login')
      } else {
        next()
      }
    }
  }
]

export default new VueRouter({
  routes,
  history: true,
  mode: 'history'
})
