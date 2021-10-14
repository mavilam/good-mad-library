<template>
  <div class="bookgrid">
    <fulfilling-square-spinner
      v-if="!books"
      class="center-msg spinner"
      :animation-duration="1000"
      :size="100"
      :color="'#235c4d'"
    />
    <div v-if="!!books && books.length > 0">
      <div class="header text-center space-y-6">
        <h1 class="text-3xl font-extrabold sm:text-4xl">
          Libros por leer
        </h1>
        <div class="content-center space-x-0 space-y-3 sm:space-x-4 sm:space-y-0">
          <button
          class="bg-transparent hover:bg-blue-500  font-semibold py-2 px-4 border hover:border-transparent rounded"
          @click="orderByRating()"
        >
          Ordena por nota
        </button>
        <button
          class="bg-transparent hover:bg-blue-500  font-semibold py-2 px-4 border hover:border-transparent rounded"
          @click="minimunInfo()"
        >
          Info. {{!minInfo ? "Reducida" : "Completa"}}
        </button>
        </div>
        
      </div>
      <br>
      <main class="grid grid-rows-1 justify-center">
        <div
          v-for="(book, index) in books"
          :key="index"
          class="book flex"
        >
          <div class="flex-shrink-0" v-if="!minInfo">
            <img
              class="rounded-lg shadow-md"
              :src="book.image"
              alt="Portada del libro"
            >
          </div>
          <div class="{mt-4: !minInfo, mt-0: !minInfo, ml-6: !minInfo}">
            <a class="block mt-1 text-lg leading-tight font-medium text-gray-900">{{ book.title }} de {{ book.author }}</a>
            <br v-if="!minInfo">
            <div class="uppercase tracking-wide text-sm text-indigo-600 font-normal" v-if="!minInfo">
              Páginas: {{ book.pages }}
            </div>
            <div class="uppercase tracking-wide text-sm text-indigo-600 font-normal" v-if="!minInfo">
              Nota media en GoodReads: {{ book.rating }}
            </div>
            <div>
              <a
                target="_blank"
                :href="chooseLinkForPaper(book.libraryLinks)"
                class="mt-2 text-gray-600 underline"
              >Biblioteca</a>
              <span> / </span>
              <a
                target="_blank"
                :href="book.libraryLinks.ebiblio"
                class="mt-2 text-gray-600 underline"
              >eBiblio</a>
            </div>
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
      minInfo: false,
      userId: this.$route.params.id,
      books: undefined,
      isMobile: false
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
    if ("maxTouchPoints" in navigator) {
      this.isMobile = navigator.maxTouchPoints > 0
    } else if ("msMaxTouchPoints" in navigator) {
      this.isMobile = navigator.msMaxTouchPoints > 0
    } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)")
      if (mQ && mQ.media === "(pointer:coarse)") {
        this.isMobile = !!mQ.matches
      } else if ('orientation' in window) {
        this.isMobile = true // deprecated, but good fallback          
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent
        this.isMobile = (/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA))
      }
    }
  },
  methods: {
    chooseLinkForPaper(bookLinks) {
      console.log(JSON.stringify(bookLinks))
      return this.isMobile ? bookLinks.paperMobile : bookLinks.paperDesktop
    },
    sortByRatingFn(a, b) {
      const ratingA = a.rating
      const ratingB = b.rating

      if (ratingA > ratingB) return -1
      else if (ratingA < ratingB) return 1
      return 0
    },
    orderByRating() {
      this.books.sort(this.sortByRatingFn)
    },
    minimunInfo() {
      this.minInfo = !this.minInfo
    }
  }
}
</script>

<style scoped>
  .bookgrid {
    margin: 1em;
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
  }

  a {
    color: #47646f;
  }

  .book {
    color: #235c4d;
    background-color:#d8f4ec;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    border-left: 2px solid #2a6f5d;
    box-shadow: 0 2px 4px 0
    #2a6f5d,0 2px 4px 0 #2a6f5d;
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
