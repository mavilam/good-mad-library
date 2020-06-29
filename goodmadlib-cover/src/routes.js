import intro from './components/Intro.vue'
import userData from './components/UserData.vue'
import bookGrid from './components/BookGrid.vue'
import error from './components/Error.vue'
import pageNotFound from './components/PageNotFound.vue'

export const routes = [
  {path: '', component: intro},
  {path: '/callback', component: userData},
  {path: '/error', component: error},
  {path: '/books/:id', component: bookGrid, props: true},
  {path: "*", component: pageNotFound }
]