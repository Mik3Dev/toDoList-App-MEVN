<template>
  <div>
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <router-link
          to="/"
          class="navbar-item"><strong>toDo-List</strong></router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          @click="isMenu = !isMenu">
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
          <span aria-hidden="true"/>
        </a>
      </div>
      <div
        :class="{ 'is-active' : isMenu }"
        class="navbar-menu">
        <div class="navbar-end">
          <router-link
            v-show="isLogged"
            to="/todos"
            class="navbar-item"><i class="fas fa-tasks"/> Tasks</router-link>
          <router-link
            v-show="!isLogged"
            to="/login"
            class="navbar-item"><i class="fas fa-sign-in-alt"/> Login</router-link>
          <a
            v-show="isLogged"
            href="#"
            class="navbar-item"
            @click.prevent="logout"><i class="fas fa-sign-out-alt"/> Logout</a>
          <router-link
            v-show="!isLogged"
            to="/register"
            class="navbar-item"><i class="fas fa-user-plus"/>Register</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    isLogged: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isMenu: false
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('toDoToken')
      this.$parent.$emit('logout')
    }
  }
}
</script>

<style>

</style>
