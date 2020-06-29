<template>
  <div class="bookgrid">
      <fulfilling-square-spinner
        class="center-msg spinner"
        v-if="!books"
        :animation-duration="1000"
        size="100"
        :color="'#47646f'"
      />
    <div v-if="!!books && books.length > 0">
      <a class="control" @click="orderByRating()">Ordena por nota</a>
      <br>
      <main class="grid">
        <div
          v-for="(book, index) in books"
          :key="index"
          class="book"
        >
          <img :src="book.image" alt="Book cover">
          <p>{{ book.title }} de {{ book.author }}</p>
          <p>Número de páginas: {{ book.pages }}</p>
          <p>Nota media en GoodReads: {{ book.rating }}</p>
          <a :href="book.libraryLinks.paper">Biblioteca</a>
          <br>
          <a :href="book.libraryLinks.ebiblio">eBiblio</a>
        </div>
      </main>
    </div>
    <div v-if="!!books && books.length === 0" class="center-msg">
      <h2>No tienes ningún libro marcado como pendiende de leer 😱</h2>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {FulfillingSquareSpinner} from 'epic-spinners'

  export default {
    name: "Books",
    data() {
      return {
        userId: this.$route.params.id,
        books: undefined
      }
    },
    components: {
      FulfillingSquareSpinner
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
    },
    mounted() {
      axios.get(`/to-read?userid=${this.userId}`)
        .then(res => {
          this.books = res.data
        })
        .catch(err => {
          console.log(err)
          this.$router.push({ path: `/error`})
        })
    }
  }
</script>

<style scoped>
  .bookgrid {
    margin: 1em;
  }

  .control {
      background-color:#f6f8fa;
      border-radius: 3px;
      padding: 1rem;
      text-align: center;
      border-left: 2px solid #1e383c;
      box-shadow: 0 2px 4px 0
      #1e383c,0 2px 4px 0 #1e383c;
      cursor: pointer;
      margin-bottom: 1em;
  }

    .grid { 
      margin-top: 1em;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 20px;
      align-items: stretch;
    }

    .grid #book {
      border: 1px solid #ccc;
      box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
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
