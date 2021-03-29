<template>
  <div class="intro">
    <div class="px-4 container mx-auto space-y-6">
      <h2 class="text-3xl font-extrabold sm:text-4xl">
        <span class="block">
          ¡Bienvenida! 👋
        </span>
      </h2>
      <h3>
        <span class="text-3xl font-bold sm:text-3xl">
          ¿Quieres ver si tus libros pendientes de Goodreads
          <br>
          están en la biblioteca de Madrid?
        </span>
      </h3>

      <div>
        <div
          v-if="!url"
          class="grid place-items-center p-6"
        >
          <spring-spinner
            :animation-duration="3000"
            :size="40"
            color="#235c4d"
          />
        </div>
        <button
          v-if="!!url"
          class="bg-transparent font-semibold py-2 px-4 border-2 rounded"
          @click="goToWeb()"
        >
          Pincha aqui y comprueba
        </button>
      </div>
      <p class="text-xl mt-4 max-w-md mx-auto text-gray-400">
        Recuerda que si es la primera vez que entras con este dispositivo, vas a tener que vincular tu cuenta de Goodreads cuando pinches ☝️
      </p>
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

<style scoped>
  .intro {
    text-align: center;
  }

</style>
