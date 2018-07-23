<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="card">
          <div class="card-image has-text-centered">
            <i
              class="fas fa-user-circle fa-10x"
              aria-hidden="true"/>
          </div>
          <div class="card-content">
            <article
              v-show="showError"
              class="message is-danger">
              <div class="message-header">
                <p>Login error</p>
                <button
                  class="delete"
                  aria-label="delete"
                  @click="showError=false"/>
              </div>
              <div class="message-body">
                You can not login.
              </div>
            </article>
            <form @submit.prevent="login">
              <label
                class="label"
                for="email">email</label>
              <div class="control">
                <input
                  id="email"
                  v-model="email"
                  class="input"
                  type="text"
                  placeholde="enter your email">
              </div>
              <label
                class="label"
                for="password">password</label>
              <div class="control">
                <input
                  id="password"
                  v-model="password"
                  class="input"
                  type="password"
                  placeholde="enter your password">
              </div>
              <button class="button is-link is-fullwidth">Login</button>
              <router-link
                to="/register"
                class="is-size-7">Don't you have an account?</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      showError: false
    }
  },
  methods: {
    login () {
      axios.post('/users/login', {
        email: this.email,
        password: this.password
      }).then(resp => {
        if (resp.status === 200) {
          const xAuth = {
            token: resp.headers['x-auth']
          }
          window.localStorage.setItem('toDoToken', JSON.stringify(xAuth))
          this.$parent.$emit('login')
          this.$router.push('/todos')
        }
      }).catch(err => {
        console.log(err)
        this.showError = true
      })
    }
  }
}
</script>

<style lang="css">
    .container {
        padding-top: 5rem;
    }
    button.button {
        margin-top: 1rem;
    }
    i.fas {
        color: hsl(204, 86%, 53%);
    }
    div.card-image {
        padding-top: 2rem;
        padding-bottom: 1rem;
    }

</style>
