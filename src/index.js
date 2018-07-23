import Vue from 'vue'
import VueRouter from 'vue-router'
import './scss/main.scss'
import 'bulma'
import navbarComponent from './components/navbar-component.vue'
import router from './router'

Vue.use(VueRouter)
Vue.component('navbar-component', navbarComponent)

/* eslint-disable-next-line no-new */
new Vue({
  data () {
    return {
      isLogged: false,
      token: null
    }
  },
  created () {
    this.token = JSON.parse(window.localStorage.getItem('toDoToken'))
    if (this.token) {
      this.isLogged = true
    }

    this.$on('login', () => {
      this.isLogged = true
    })
    this.$on('logout', () => {
      this.isLogged = false
      this.token = null
      this.$router.push('/')
    })
  },
  methods: {
  },
  router
}).$mount('#app')
