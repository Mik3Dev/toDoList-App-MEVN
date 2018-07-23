<template>
  <div >
    <div class="space-between">
      <div>
        <h3>Your task list</h3>
      </div>
      <div class="buttons">
        <button
          v-show="!isNewTask"
          class="button is-success is-small"
          @click="isNewTask=true">
          Create new Task
        </button>
      </div>
    </div>
    <div
      v-show="isNewTask"
      class="modal is-active">
      <div
        class="modal-background"
        @click="isNewTask=false"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new task</p>
          <button
            class="delete"
            aria-label="close"
            @click="isNewTask=false"/>
        </header>
        <div class="modal-card-body">
          <form>
            <div class="field">
              <label
                for="title"
                class="label">Title</label>
              <div class="control">
                <input
                  id="title"
                  v-model="newTask.title"
                  type="text"
                  class="input"
                  placeholder="Enter the title of the new task">
              </div>
            </div>
            <div class="field">
              <label
                for="content"
                class="label">Content</label>
              <div class="control">
                <textarea
                  id="content"
                  v-model="newTask.content"
                  class="textarea"
                  placeholder="Enter a description of the new task"/>
              </div>
            </div>
          </form>
        </div>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="createNewTask">Save</button>
          <button
            class="button"
            @click="isNewTask=false">Cancel</button>
        </footer>
      </div>
    </div>
    <div
      v-for="task in tasks"
      :key="task._id"
    >
      <task-component
        :id="task._id"
        :title="task.title"
        :content="task.content"
        :completed="task.completed"
        class="task-card"
        @deleted-task="deletedTask"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import taskComponent from './task-component.vue'
export default {
  components: {
    'task-component': taskComponent
  },
  data () {
    return {
      token: null,
      tasks: [],
      newTask: {
        title: null,
        content: null
      },
      isNewTask: false
    }
  },
  created () {
    this.token = JSON.parse(window.localStorage.getItem('toDoToken'))
    if (!this.token) {
      this.$router.push('/login')
    }
    this.getAllTasks()
  },
  methods: {
    getAllTasks () {
      this.tasks = []
      axios.get('/tasks', {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': this.token.token
        }
      })
        .then(resp => {
          if (resp.status === 200) {
            this.tasks = resp.data
          }
        }).catch(err => {
          console.log(err)
        })
    },
    createNewTask () {
      axios.post('/tasks', {
        title: this.newTask.title,
        content: this.newTask.content
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': this.token.token
        }
      })
        .then(resp => {
          if (resp.status === 200) {
            this.tasks.push(resp.data)
            this.isNewTask = false
          }
        }).catch(err => {
          console.log(err)
        })
    },
    deletedTask (id) {
      this.getAllTasks()
    }
  }
}
</script>

<style>
  .space-between {
    display: flex;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;
    align-items: center;
    padding-bottom: 2.5rem;
  }

  @media(max-width: 768px) {
    .task-card {
      margin: 0.5rem 1rem;
    }
  }
  @media(min-width: 769px) {
    .task-card {
      margin: 0.5rem 3rem;
    }
  }

</style>
