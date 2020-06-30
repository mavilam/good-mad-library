<template>
  <div class="intro">
    <h1>¡Hola!👋</h1>
    <h3> ¿Quieres ver si tus libros pendientes de Goodreads están en la biblioteca de Madrid?</h3>
    <a
      v-if="!!url"
      class="tagline"
      :href="url"
    >Pincha aqui y comprueba</a>
    <br>
    <p>Recuerda que si es la primera vez que entras con este dispositivo, vas a tener que vincular tu cuenta de Goodreads cuando pinches ☝️</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Intro',
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
</style>
