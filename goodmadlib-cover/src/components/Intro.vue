<template>
  <div class="intro" >
      <h1>¡Hola!👋</h1>
      <h3> ¿Quieres ver si tus libros pendientes de Goodreads están en la biblioteca de Madrid?</h3>
      <a class="tagline" :href="url" v-if="!!url">Pincha aqui y comprueba</a>
      <br>
      <p>Recuerda que si es la primera vez que entras con este dispositivo, vas a tener que vincular tu cuenta de Goodreads cuando pinches ☝️</p>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'intro',
    data() {
      return {
        url: "",
        loadingBooks: false,
        userName: ""
      }
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
      })
      }
    },
    mounted () {
      axios.get('init_oauth')
      .then(res => {
        console.log("return")
        this.url = res.data.oAuthUrl
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .intro {
    text-align: center;
  }
</style>  
