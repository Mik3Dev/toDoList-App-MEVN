<template>
  <div>
    <div
      v-show="showUpdateModal"
      class="modal is-active">
      <div
        class="modal-background"
        @click="showUpdateModal=false"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Updated</p>
          <button
            class="delete"
            aria-label="close"
            @click="showUpdateModal=false"/>
        </header>
        <section class="modal-card-body">
          <p>
            Task has been updated successfully.
          </p>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button"
            @click="showUpdateModal=false">Ok</button>
        </footer>
      </div>
    </div>
    <div
      v-show="isEdit"
      class="modal is-active">
      <div
        class="modal-background"
        @click="isEdit=false"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update Task</p>
          <button
            class="delete"
            aria-label="close"/>
        </header>
        <section
          id="editForm"
          class="modal-card-body">
          <form @submit.prevent="updateTask">
            <div class="field">
              <label
                for="title"
                class="label">Title</label>
              <div class="control">
                <input
                  id="title"
                  v-model="newTask.title"
                  type="text"
                  class="input">
              </div>
            </div>
            <div class="field">
              <label
                for="conten"
                class="label">Content</label>
              <div class="control">
                <textarea
                  id="content"
                  v-model="newTask.content"
                  class="textarea"/>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label
                  for="completed"
                  class="checkbox">
                  <input
                    id="checkbox"
                    v-model="newTask.completed"
                    type="checkbox">
                  Completed
                </label>
              </div>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="saveChanges">Save Changes</button>
          <button
            class="button"
            @click="cancelEdit">Cancel</button>
        </footer>
      </div>
    </div>
    <div
      v-show="isDelete"
      class="modal is-active">
      <div
        class="modal-background"
        @click="isDelete=false"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete</p>
          <button
            class="delete"
            @click="isDelete=false"/>
        </header>
        <section class="modal-card-body">
          <p>Do you want to <strong>delete</strong> this task?</p>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-danger"
            @click="deleteTask">Delete</button>
          <button
            class="button"
            @click="isDelete=false">Cancel</button>
        </footer>
      </div>
    </div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title space-between">
          {{ task.title }} <span
            :class="[ task.completed ? 'is-success' : 'is-warning' ]"
            class="tag">{{ task.completed ? 'Completed' : 'Not completed' }}</span>
        </p>
        <a
          v-show="!showDetails"
          class="card-header-icon"
          aria-label="more options"
          @click.prevent="showDetails=true">
          <span class="icon">
            <i
              class="fas fa-angle-down"
              aria-hidden="true"/>
          </span>
        </a>
        <a
          v-show="showDetails"
          class="card-header-icon"
          aria-label="less options"
          @click.prevent="showDetails=false">
          <span class="icon">
            <i
              class="fas fa-angle-up"
              aria-hidden="true"/>
          </span>
        </a>
      </header>
      <div
        v-show="showDetails"
        class="card-content">
        <div class="content">
          {{ task.content }}
        </div>
      </div>
      <footer
        v-show="showDetails"
        class="card-footer">
        <a
          v-show="!task.completed"
          class="card-footer-item"
          @click.prevent="updateCompletion">Complete</a>
        <a
          v-show="task.completed"
          class="card-footer-item"
          @click.prevent="updateCompletion">Uncomplete</a>
        <a
          class="card-footer-item"
          @click.prevent="editTask">Edit</a>
        <a
          class="card-footer-item"
          @click.prevent="isDelete=true">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDetails: false,
      task: {},
      showUpdateModal: false,
      isEdit: false,
      token: null,
      newTask: {},
      isDelete: false
    }
  },
  created () {
    this.token = JSON.parse(window.localStorage.getItem('toDoToken'))
    if (!this.token) {
      this.$router.push('/login')
    }

    this.refreshTask()
  },
  methods: {
    refreshTask () {
      this.task = {
        _id: this.id,
        title: this.title,
        content: this.content,
        completed: this.completed
      }
    },
    updateTask () {
      axios.put(`/tasks/${this.id}`, {
        title: this.task.title,
        content: this.task.content,
        completed: this.task.completed
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': this.token.token
        }
      }).then(resp => {
        if (resp.status === 200) {
          this.isEdit = false
          this.showUpdateModal = true
        }
      }).catch(err => {
        console.log(err)
        this.refreshTask()
      })
    },
    updateCompletion () {
      this.task.completed = !this.task.completed
      this.updateTask()
    },
    editTask () {
      this.newTask = {
        title: this.task.title,
        content: this.task.content,
        completed: this.task.completed
      }
      this.isEdit = true
    },
    saveChanges () {
      this.task = {
        title: this.newTask.title,
        content: this.newTask.content,
        completed: this.newTask.completed
      }
      this.updateTask()
    },
    cancelEdit () {
      this.isEdit = false
      this.refreshTask()
    },
    deleteTask () {
      axios.delete(`/tasks/${this.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': this.token.token
        }
      }).then(resp => {
        this.$emit('deleted-task', this.id)
        this.isDelete = false
      }).catch(err => {
        console.log(err)
        this.isDelete = false
      })
    }
  }
}
</script>

<style>
    .space-between {
        display: flex;
        justify-content: space-between;
    }
</style>
