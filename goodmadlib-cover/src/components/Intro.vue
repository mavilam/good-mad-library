<template>
  <div class="intro">
    <h1 class="text-4xl">Bienvenida!👋</h1>

  <div class="px-4 container mx-auto">
    <div class="flex items-center justify-between md:justify-center">
      <span class="border-b-2 border-t-2 w-8 md:w-24 inline-block mr-2 rounded"></span>

      <h1 class="blue-text md:text-2xl font-bold text-center">
        ¿Quieres ver si tus libros pendientes de Goodreads están en la biblioteca de Madrid?
      </h1>

      <span class="border-blue-text border-b-2 border-t-2 w-8 md:w-24 inline-block ml-2 rounded"></span>
    </div>
    <div class="space-y-6">
      <div
        v-if="!url"
        class="spinner h-auto w-32 p-6"
      >
        <spring-spinner
          :animation-duration="3000"
          :size="30"
          color="#47646f"
        />
      </div>
      <button
          v-if="!!url"
          class="bg-transparent font-semibold py-2 px-4 border-2 rounded"
          @click="goToWeb()"
        >Pincha aqui y comprueba</button>
      <br>
      <p>
        Recuerda que si es la primera vez que entras con este dispositivo, vas a tener que vincular tu cuenta de Goodreads cuando pinches ☝️
      </p>
    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios'
import { SpringSpinner } from 'epic-spinners'

export default {
  name: 'Intro',
  components: {
    SpringSpinner
  },
  data() {
    return {
      url: "",
      loadingBooks: false,
      userName: ""
    }
  },
  mounted() {
    axios.get('init_oauth')
      .then(res => {
        this.url = res.data.oAuthUrl
      })
      .catch(err => {
        console.log(err)
        this.$router.push({ path: `/error` })
      })
  },
  methods: {
    goToWeb() {
      window.location.href = this.url
    },
    getGoodReadsData() {
      axios.get(this.link)
        .then(res => {
          this.loadingBooks = true
          this.userName = res.user.name
        })
        .catch(err => {
          console.log(err)
          this.$router.push({ path: `/error` })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .intro {
    text-align: center;
  }

  .spinner {
    max-width: 30px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
  }

</style>
