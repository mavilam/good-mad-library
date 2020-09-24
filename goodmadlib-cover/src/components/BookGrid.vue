<template>
  <div class="bookgrid">
    <fulfilling-square-spinner
      v-if="!books"
      class="center-msg spinner"
      :animation-duration="1000"
      :size="100"
      :color="'#47646f'"
    />
    <div v-if="!!books && books.length > 0">
      <div class="header">
        <h1 class="text-4xl">Libros pendientes de leer</h1>
        <button
          class="bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="orderByRating()"
        >Ordena por nota</button>
      </div>
      <br>
      <main class="grid">
        <div v-for="(book, index) in books"
          :key="index"
          class="book flex">
          <div class="flex-shrink-0">
            <img class="rounded-lg shadow-md" :src="book.image" alt="Portada del libro">
          </div>
          <div class="mt-4 mt-0 ml-6">
            <a class="block mt-1 text-lg leading-tight font-semibold text-gray-900">{{ book.title }} de {{ book.author }}</a>
            <br>
            <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">Número de páginas: {{ book.pages }}</div>
            <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">Nota media en GoodReads: {{ book.rating }}</div>
            <a :href="book.libraryLinks.paper" class="mt-2 text-gray-600 underline">Biblioteca</a>
            <br>
            <a :href="book.libraryLinks.ebiblio" class="mt-2 text-gray-600 underline">eBiblio</a>
          </div>
        </div>
      </main>
    </div>
    <div
      v-if="!!books && books.length === 0"
      class="center-msg"
    >
      <h2>No tienes ningún libro marcado como pendiende de leer 😱</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: "Books",
  components: {
    FulfillingSquareSpinner
  },
  data() {
    return {
      userId: this.$route.params.id,
      books: undefined
    }
  },
  mounted() {
    axios.get(`/to-read?userid=${this.userId}`)
      .then(res => {
        this.books = res.data
      })
      .catch(err => {
        console.log(err)
        this.$router.push({ path: `/error` })
      })
  },
  methods: {
    sortByRatingFn(a, b) {
      const ratingA = a.rating
      const ratingB = b.rating

      if (ratingA > ratingB) return -1
      else if (ratingA < ratingB) return 1
      return 0
    },
    orderByRating() {
      this.books.sort(this.sortByRatingFn)
    }
  }
}
</script>

<style scoped>
  .bookgrid {
    margin: 1em;
  }

  .header {
    text-align: center;
    margin-top: 1em;
  }

  .grid {
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    grid-gap: 2em;
    align-items: stretch;
  }

  .grid #book {
    border: 1px solid #ccc;
    max-width: 100%;
  }

  a {
    color: #47646f;
  }

  .book {
    background-color:#f6f8fa;
    border-radius: 3px;
    padding: 1rem;
    text-align: center;
    border-left: 2px solid #1e383c;
    box-shadow: 0 2px 4px 0
    #1e383c,0 2px 4px 0 #1e383c;
  }

  .spinner {
    max-width: 100px;
  }

  .center-msg {
    text-align: center;
    margin: auto;
    max-height: 100px;
    margin: auto;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
